/*!
 * mbti-engine.js — 一套可解释的 MBTI 文本分析引擎
 * 原理同棋局引擎：不联网、不调用模型；拆证据 → 评轴 → 让 16 个类型各自认领 → 给出置信度。
 * 每条判定都能追回输入里的原句。
 */
(function (root) {
  'use strict';

  /* ---------------- 词典 ----------------
     每个标记 = 一个可读的“行为/自述线索”，挂在某一极上。
     weight 1=弱线索 2=明确 3=强线索。terms 支持中文子串与英文单词。
  */
  var MARKERS = [
    // ---------- E / I ----------
    { dim: 'E', w: 2, label: '主动靠近人', terms: ['自来熟', '见谁都能聊', '主动搭话', '主动打招呼', '健谈', '话多', '爱说话', '说个不停', '喜欢分享', '喜欢交流', '爱聊天', '聊天', '搭话', '招呼', '喜欢热闹', '凑热闹', '热闹', '聚会', '派对', '朋友多', '朋友很多', '一群人', '团队', '社交场合', '站在人前', '发言', '演讲', '外向', '开朗', '活泼', '热情', '直率', '爽快', '爱笑', '说干就干', '带气氛', '活跃', 'sociable', 'outgoing', 'talkative', 'party', 'crowd'] },
    { dim: 'E', w: 3, label: '在人群里恢复精力', terms: ['越聊越有精神', '人越多越', '跟人待在一起', '闲不住', '坐不住', '第一个到场', '第一时间到场', '喜欢热闹的地方'] },
    { dim: 'I', w: 2, label: '安静自持', terms: ['独处', '一个人', '独自', '自己待', '喜欢安静', '安静地', '安静', '内向', '沉默', '不爱说话', '话少', '少言', '不太在人前说话', '不擅长表达', '慢热', '清冷', '淡漠', '独来独往', '避开人群', '躲', '回避', '疏离', '保持距离', '自己的世界', '私人空间', '不出门', '不爱出门', '不太爱出门', '不想出门', '宅', 'introvert', 'solitary', 'quiet', 'reserved', 'recharge', 'prefer solitude'] },
    { dim: 'I', w: 3, label: '社交耗电', terms: ['社交之后很累', '人多的场合会累', '需要缓一缓', '不爱应酬', '社交后'] },
    { dim: 'I', w: 3, label: '先在心里过一遍', terms: ['在心里', '想清楚再说', '不轻易开口', '很少主动', '不说多余的话'] },

    // ---------- S / N ----------
    { dim: 'S', w: 2, label: '抓住具体的事', terms: ['具体', '细节', '实际', '务实', '脚踏实地', '事实', '数据', '例子', '看得见', '摸得着', '亲手', '操作', '步骤', '按部就班', '一步一步', '稳定', '习惯', '传统', '经验', '记得每个人', '记得', '记录', '清单', '现状', '可靠', '现实', '眼前', '日常', '照做', '落地', 'concrete', 'details', 'practical', 'facts', 'step by step', 'hands-on', 'realistic', 'routine', 'experience', 'memory'] },
    { dim: 'S', w: 3, label: '相信亲眼所见', terms: ['亲眼看到', '亲自做过', '事实摆在', '有一说一', '把事做完', '不许出错'] },
    { dim: 'N', w: 2, label: '推演与设想', terms: ['想象', '可能性', '未来', '抽象', '理论', '概念', '隐喻', '象征', '灵感', '直觉', '大局', '模式', '意义', '假设', '如果', '联想', '创意', '新想法', '远景', '本质', '脑内', '天马行空', '推演', '设想', '预想', '盘算', '构想', '预判', '预料', '背后的意思', '弦外之音', '反复想', '预感', '看穿', '长远', '愿景', 'abstract', 'possibilities', 'future', 'theory', 'idea', 'pattern', 'meaning', 'imagination', 'metaphor', 'big picture', 'what if', 'conceptual'] },
    { dim: 'N', w: 3, label: '总在想“还可能怎样”', terms: ['总在想', '忍不住想', '如果当初', '另一种可能', '说不清的预感', '把所有可能'] },

    // ---------- T / F ----------
    { dim: 'T', w: 2, label: '用逻辑与标准判断', terms: ['逻辑', '理性', '分析', '客观', '效率', '规则', '公平', '对错', '原则', '判断', '论证', '讲道理', '冷静', '直接', '标准', '结果', '系统', '因果', '权衡', '就事论事', '克制', '依据', '只宣布结果', '账算得清', '厌恶官腔', 'logic', 'reason', 'objective', 'analyse', 'analyze', 'efficient', 'fair', 'principles', 'criteria', 'evidence', 'consistent'] },
    { dim: 'T', w: 3, label: '先讲对错，再讲感受', terms: ['对就是对', '错了就是错了', '按规矩', '不讲情面', '只看结果', '不掺感情'] },
    { dim: 'F', w: 2, label: '把人的感受放在前面', terms: ['感受', '情绪', '共情', '体贴', '温柔', '在意别人', '在意', '和谐', '善良', '照顾', '心疼', '不忍', '不忍心', '安慰', '氛围', '人情', '温暖', '暖', '敏感', '体谅', '换位思考', '护短', '重情', '心软', '包容', '记得每个人怕', '怕伤到', '不想让人难过', '先问', '第一个到场', 'feelings', 'empathy', 'harmony', 'care', 'kind', 'values', 'relationships', 'warmth', 'sensitive', 'comfort'] },
    { dim: 'F', w: 1, label: '在意关系', terms: ['关系', '价值', '在意的人'] },
    { dim: 'F', w: 3, label: '做决定先看人', terms: ['人情上过不去', '心里过不去', '不想让人难堪', '先看对方', '大家过得去'] },

    // ---------- J / P ----------
    { dim: 'J', w: 2, label: '安排与收束', terms: ['计划', '安排', '目标', '条理', '清单', '提前', '准时', '收尾', '秩序', '掌控', '定下来', '定下', '规划', '截止', '结构', '按计划', '不喜欢变', '有条不紊', '认定', '完成任务', '把事办完', '期限', '规矩', 'deadline', 'schedule', 'planned', 'organised', 'organized', 'list', 'structure', 'order', 'closure', 'control'] },
    { dim: 'J', w: 3, label: '讨厌悬而未决', terms: ['必须定下来', '受不了拖', '说好就算', '按约定', '提前做完', '说干就干'] },
    { dim: 'P', w: 2, label: '跟着当下走', terms: ['随性', '灵活', '临时', '变化', '再看', '顺其自然', '开放', '即兴', '拖延', '走一步看一步', '不喜欢被安排', '弹性', '自由', '选项', '试试看', '随机', '到时候', '不着急', '边走边看', '看情况', '随意', '主意来得快', '无所谓', 'flexible', 'spontaneous', 'improvise', 'open-ended', 'options', 'wait and see', 'adapt', 'random'] },
    { dim: 'P', w: 3, label: '保留选择比定下来重要', terms: ['不想被框住', '留有余地', '到时候再说', '先看看再说', '不一定非要', '不按计划'] }
  ];

  var TYPE_INFO = {
    INTJ: { name: '建筑师型', line: '独立、长线、把世界当成一张可以推演的图。', stack: ['Ni', 'Te', 'Fi', 'Se'] },
    INTP: { name: '逻辑学家型', line: '对原理上瘾，宁可把问题拆开也不肯含糊过去。', stack: ['Ti', 'Ne', 'Si', 'Fe'] },
    ENTJ: { name: '指挥官型', line: '把目标变成路线，把路线变成别人的分工。', stack: ['Te', 'Ni', 'Se', 'Fi'] },
    ENTP: { name: '辩论家型', line: '先提出一个可能，再亲手把它推翻。', stack: ['Ne', 'Ti', 'Fe', 'Si'] },
    INFJ: { name: '提倡者型', line: '安静地看见人心，又固执地相信更好的可能。', stack: ['Ni', 'Fe', 'Ti', 'Se'] },
    INFP: { name: '调停者型', line: '把价值放在成败之前，把真实放在体面之前。', stack: ['Fi', 'Ne', 'Si', 'Te'] },
    ENFJ: { name: '主人公型', line: '先让每个人被看见，再谈事情怎么成。', stack: ['Fe', 'Ni', 'Se', 'Ti'] },
    ENFP: { name: '竞选者型', line: '被可能性推着走，也被人的故事留住了脚。', stack: ['Ne', 'Fi', 'Te', 'Si'] },
    ISTJ: { name: '物流师型', line: '答应过的事，会一直记到做完。', stack: ['Si', 'Te', 'Fi', 'Ne'] },
    ISFJ: { name: '守卫者型', line: '不声不响地记住每个人的习惯与忌口。', stack: ['Si', 'Fe', 'Ti', 'Ne'] },
    ESTJ: { name: '总经理型', line: '秩序不是束缚，是让事情真的能落地。', stack: ['Te', 'Si', 'Ne', 'Fi'] },
    ESFJ: { name: '执政官型', line: '把一桌人的情绪都照顾到，才叫把事办完。', stack: ['Fe', 'Si', 'Ne', 'Ti'] },
    ISTP: { name: '鉴赏家型', line: '少说，动手，把问题当场拆开看看。', stack: ['Ti', 'Se', 'Ni', 'Fe'] },
    ISFP: { name: '探险家型', line: '按自己的感受活，也允许别人按他们的。', stack: ['Fi', 'Se', 'Ni', 'Te'] },
    ESTP: { name: '企业家型', line: '先上场，再在场上找办法。', stack: ['Se', 'Ti', 'Fe', 'Ni'] },
    ESFP: { name: '表演者型', line: '此刻的快乐是真的，身边的人也是真的。', stack: ['Se', 'Fi', 'Te', 'Ni'] }
  };

  var NEG = /(并不|并非|从不|从来没有|没有|不|没|未|毫不|无)/;
  var NEG_EXCEPT = /(不仅|不但|不只|不光)/;
  var INTENSIFY = /(极其|非常|特别|十分|格外|尤其|尤其地|很|极|最)$/;
  var SOFTEN = /(有点|有些|稍微|略微|偶尔|有时|还算|比较)$/;

  function isAscii(s) { return /^[\x00-\x7F]+$/.test(s); }

  function splitSentences(text) {
    var out = [];
    var re = /[^。！？!?；;\n]+[。！？!?；;\n]?/g;
    var m;
    while ((m = re.exec(text)) !== null) {
      var raw = m[0];
      var s = raw.trim();
      if (!s) continue;
      var start = m.index + raw.indexOf(s);
      out.push({ text: s.replace(/[。！？!?；;\n]$/, ''), start: start, end: start + s.length, index: out.length });
    }
    return out;
  }

  function splitClauses(sent) {
    var out = [];
    var re = /[^，,、；;：:\n]+/g;
    var m;
    while ((m = re.exec(sent.text)) !== null) {
      var raw = m[0];
      var t = raw.trim();
      if (!t) continue;
      var start = sent.start + m.index + raw.indexOf(t);
      out.push({ text: t, start: start, end: start + t.length, sent: sent });
    }
    return out;
  }

  function sentenceAt(sents, idx) {
    for (var i = 0; i < sents.length; i++) {
      if (idx >= sents[i].start && idx <= sents[i].end) return sents[i];
    }
    return null;
  }

  function clauseAt(clauses, idx) {
    for (var i = 0; i < clauses.length; i++) {
      if (idx >= clauses[i].start && idx < clauses[i].end) return clauses[i];
    }
    return null;
  }

  function asciiBoundary(text, idx, term) {
    if (!isAscii(term)) return true;
    var before = idx > 0 ? text[idx - 1] : ' ';
    var after = text[idx + term.length] || ' ';
    return !/[A-Za-z0-9]/.test(before) && !/[A-Za-z0-9]/.test(after);
  }

  function collect(text) {
    var sents = splitSentences(text);
    var clauses = [];
    sents.forEach(function (st) { clauses = clauses.concat(splitClauses(st)); });

    var lowered = text.toLowerCase();
    var occs = [];

    MARKERS.forEach(function (mk) {
      mk.terms.forEach(function (term) {
        var needle = isAscii(term) ? term.toLowerCase() : term;
        var hay = isAscii(term) ? lowered : text;
        var from = 0;
        while (from <= hay.length) {
          var idx = hay.indexOf(needle, from);
          if (idx === -1) break;
          from = idx + needle.length;
          if (!asciiBoundary(hay, idx, needle)) continue;
          var cl = clauseAt(clauses, idx);
          if (!cl) continue;
          occs.push({ mk: mk, term: term, idx: idx, end: idx + needle.length, clause: cl });
        }
      });
    });

    // 否定 + 程度：按分句、按出现顺序，只作用到否定词之后的“下一个”线索
    var NEG_RE = /(并不|并非|从不|从来没有|不太|不怎么|没有|不|没|未|毫不|无)/g;
    var INT_RE = /(极其|非常|特别|十分|格外|尤其|很|极|最)$/;
    var SOFT_RE = /(有点|有些|稍微|略微|偶尔|有时|还算|比较)$/;
    var FLIP = { E: 'I', I: 'E', S: 'N', N: 'S', T: 'F', F: 'T', J: 'P', P: 'J' };

    var negSpans = {};
    clauses.forEach(function (cl) {
      var list = [];
      var m;
      NEG_RE.lastIndex = 0;
      while ((m = NEG_RE.exec(cl.text)) !== null) {
        list.push({ start: cl.start + m.index, end: cl.start + m.index + m[0].length });
      }
      negSpans[cl.start] = list;
    });

    var byClause = {};
    occs.forEach(function (o) {
      var key = o.clause.start;
      if (!byClause[key]) byClause[key] = [];
      byClause[key].push(o);
    });

    var evidence = [];
    var seen = {};
    Object.keys(byClause).forEach(function (key) {
      var list = byClause[key].sort(function (a, b) { return a.idx - b.idx; });
      var negs = negSpans[key] || [];
      // 给每个否定词找到它后面最近的一条线索
      var negatedSet = {};
      negs.forEach(function (n) {
        for (var i = 0; i < list.length; i++) {
          if (list[i].idx >= n.end) {
            var between = text.slice(n.end, list[i].idx);
            if (/[，,、；;：:。！？!?]/.test(between)) break;
            negatedSet[list[i].idx + '|' + list[i].term] = true;
            break;
          }
        }
      });

      list.forEach(function (o) {
        var key2 = o.mk.dim + '|' + o.mk.label + '|' + o.clause.start;
        if (seen[key2]) return;
        seen[key2] = true;

        var negated = !!negatedSet[o.idx + '|' + o.term];
        var before = text.slice(Math.max(o.clause.start, o.idx - 4), o.idx);
        var boost = INT_RE.test(before) ? 1.5 : (SOFT_RE.test(before) ? 0.7 : 1);
        var dim = negated ? FLIP[o.mk.dim] : o.mk.dim;

        evidence.push({
          dim: dim,
          rawDim: o.mk.dim,
          weight: o.mk.w * (negated ? 0.8 : 1) * boost,
          label: negated ? '反证「' + o.term + '」' : o.mk.label,
          term: o.term,
          sentence: o.clause.sent.text.length > 72 ? o.clause.sent.text.slice(0, 72) + '…' : o.clause.sent.text,
          negated: negated
        });
      });
    });

    return { sents: sents, evidence: evidence };
  }

  function axisScore(ev, a, b) {
    var A = ev.filter(function (e) { return e.dim === a; });
    var B = ev.filter(function (e) { return e.dim === b; });
    var massA = A.reduce(function (s, e) { return s + e.weight; }, 0);
    var massB = B.reduce(function (s, e) { return s + e.weight; }, 0);
    var total = massA + massB;
    var net = massA - massB;
    var pctA = total > 0 ? Math.round(50 + 45 * Math.tanh(net / 4.5)) : 50;
    var confidence = total > 0
      ? Math.max(0, Math.min(1, Math.min(1, total / 7) * Math.min(1, Math.abs(net) / 2.5)))
      : 0;
    var letter = (total > 0 && Math.abs(net) > 0.001) ? (net > 0 ? a : b) : null;
    var all = A.concat(B).sort(function (x, y) { return y.weight - x.weight; });
    return {
      pair: a + b, a: a, b: b, massA: r2(massA), massB: r2(massB),
      pctA: pctA, pctB: 100 - pctA,
      confidence: r2(confidence), letter: letter,
      evidence: all.slice(0, 4)
    };
  }

  function r2(n) { return Math.round(n * 100) / 100; }

  function analyze(text) {
    var clean = String(text || '').trim();
    var got = collect(clean);
    var ev = got.evidence;
    var axes = [
      axisScore(ev, 'E', 'I'),
      axisScore(ev, 'S', 'N'),
      axisScore(ev, 'T', 'F'),
      axisScore(ev, 'J', 'P')
    ];

    var letters = axes.map(function (x) { return x.letter; });
    var type = letters.every(Boolean) ? letters.join('') : null;

    var candidates = [];
    var missingIdx = [];
    axes.forEach(function (x, i) { if (!x.letter) missingIdx.push(i); });
    if (!type && missingIdx.length > 0 && missingIdx.length <= 2) {
      var base = letters.slice();
      var combos = missingIdx.length === 1
        ? [[axes[missingIdx[0]].a], [axes[missingIdx[0]].b]]
        : [
            [axes[missingIdx[0]].a, axes[missingIdx[1]].a],
            [axes[missingIdx[0]].a, axes[missingIdx[1]].b],
            [axes[missingIdx[0]].b, axes[missingIdx[1]].a],
            [axes[missingIdx[0]].b, axes[missingIdx[1]].b]
          ];
      combos.forEach(function (c) {
        var l = base.slice();
        missingIdx.forEach(function (ax, k) { l[ax] = c[k]; });
        candidates.push(l.join(''));
      });
    }

    var totalMass = ev.reduce(function (s, e) { return s + e.weight; }, 0);
    var meanConf = axes.reduce(function (s, x) { return s + x.confidence; }, 0) / 4;
    var lengthFactor = Math.min(1, clean.length / 160);
    var confidence = Math.max(0, Math.min(1, meanConf * (0.55 + 0.45 * lengthFactor)));
    var level = confidence < 0.35 ? '低' : (confidence < 0.65 ? '中' : '高');

    var runnerUp = null;
    if (type) {
      var weakest = axes.slice().sort(function (x, y) {
        return (x.confidence + Math.abs(x.pctA - 50) / 100) - (y.confidence + Math.abs(y.pctA - 50) / 100);
      })[0];
      var alt = letters.map(function (L, i) { return axes[i] === weakest ? (L === weakest.a ? weakest.b : weakest.a) : L; }).join('');
      runnerUp = {
        type: alt,
        name: TYPE_INFO[alt] ? TYPE_INFO[alt].name : alt,
        axis: weakest.pair,
        pctA: weakest.pctA,
        pctB: weakest.pctB,
        delta: Math.abs(weakest.pctA - 50) * 2
      };
    }

    var HINTS = {
      EI: '补一句：人多的场合，你是越聊越有精神，还是想早点回家？',
      SN: '补一句：你更信亲眼看到的事实，还是更常想“还可能怎样”？',
      TF: '补一句：做决定时，你先看对错，还是先看会不会伤到人？',
      JP: '补一句：出门前你会先安排好，还是走到哪算哪？'
    };
    var needed = [];
    axes.forEach(function (x) { if (!x.letter) needed.push({ pair: x.pair, hint: HINTS[x.pair] }); });
    var warnings = [];
    if (clean.length < 40) warnings.push('文本太短，证据不足以支撑四组维度。');
    if (totalMass < 4) warnings.push('命中的线索很少，以下结果更像倾向，而不是结论。');
    axes.forEach(function (x) {
      if (x.letter && x.confidence < 0.3) warnings.push(x.pair + ' 维度证据偏弱，换一段描述可能会变。');
    });

    return {
      ok: true,
      chars: clean.length,
      mass: r2(totalMass),
      evidenceCount: ev.length,
      type: type,
      typeName: type && TYPE_INFO[type] ? TYPE_INFO[type].name : null,
      typeLine: type && TYPE_INFO[type] ? TYPE_INFO[type].line : null,
      stack: type && TYPE_INFO[type] ? TYPE_INFO[type].stack : null,
      confidence: r2(confidence),
      level: level,
      axes: axes,
      runnerUp: runnerUp,
      candidates: candidates,
      needed: needed,
      warnings: warnings
    };
  }

  var api = { analyze: analyze, TYPE_INFO: TYPE_INFO, _markers: MARKERS };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.MBTIEngine = api;
})(typeof window !== 'undefined' ? window : this);
