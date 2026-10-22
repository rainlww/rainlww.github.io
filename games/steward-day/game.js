(function () {
  'use strict';

  const $ = (id) => document.getElementById(id);
  const el = {
    title: $('title-screen'),
    game: $('game'),
    ending: $('ending-screen'),
    start: $('start-btn'),
    clock: $('clock'),
    hudDay: $('hud-day'),
    staminaNum: $('stamina-num'),
    staminaBar: $('stamina-bar'),
    moraleNum: $('morale-num'),
    moraleBar: $('morale-bar'),
    pantryNum: $('pantry-num'),
    pantryDots: $('pantry-dots'),
    list: $('todo-list'),
    bench: $('bench-note'),
    stove: $('stove'),
    stoveTime: $('stove-time'),
    stoveTitle: $('stove-title'),
    stoveNote: $('stove-note'),
    stoveBtn: $('stove-btn'),
    stoveFill: $('stove-fill'),
    sheetStove: $('sheet-stove'),
    doneCount: $('done-count'),
    allCount: $('all-count'),
    sheet: $('todo-sheet'),
    sheetHandle: $('sheet-handle'),
    sheetCount: $('sheet-count'),
    tokens: $('tokens'),
    scene: $('scene'),
    sceneText: $('scene-text'),
    sceneChoices: $('scene-choices'),
    sceneName: $('scene-name'),
    scenePortrait: $('scene-portrait'),
    scenePortraitImg: $('scene-portrait-img'),
    todoFoot: $('todo-foot'),
    endingKicker: $('ending-kicker'),
    endingTitle: $('ending-title'),
    endingBody: $('ending-body'),
    endingJournal: $('ending-journal'),
    endingStats: $('ending-stats'),
    again: $('again-btn'),
    backTitle: $('title-btn')
  };

  const TOTAL = TASKS.length;
  el.allCount.textContent = TOTAL;

  let S = null;
  const params = new URLSearchParams(location.search);
  let qaMode = params.has('qa');
  const shotMode = params.get('shot');
  const pageErrors = [];
  window.addEventListener('error', (e) => pageErrors.push(String(e.message || e.error)));
  window.addEventListener('unhandledrejection', (e) => pageErrors.push(String(e.reason)));
  if (shotMode) document.documentElement.classList.add('shot');

  const ANCHORS = {
    kitchen: [50, 30],
    kitchen2: [57, 32],
    veg: [23, 40],
    gate: [50, 88],
    west: [14, 56],
    infirmary: [19, 32],
    bench: [40, 48],
    tree: [69, 58],
    hall: [50, 36]
  };

  const TOKENS = [
    { id: 'ispera', cast: 'ispera', at: 'kitchen', shown: true },
    { id: 'belanstan', cast: 'belanstan', at: 'kitchen2', shown: true },
    { id: 'provence', cast: 'provence', at: 'gate', shown: true },
    { id: 'lilivian', cast: 'lilivian', at: 'infirmary', shown: true },
    { id: 'homulesia', cast: 'homulesia', at: 'gate', shown: false }
  ];

  /* ---------------- state ---------------- */

  function freshState() {
    return {
      time: DAY_START,
      stamina: 100,
      morale: 60,
      pantry: 2,
      flags: {},
      done: [],
      journal: [],
      fired: {},
      stove: null,
      collapsed: false,
      mode: 'idle',
      ending: null,
      fallbackUsed: false
    };
  }

  function clockStr(t) {
    const m = Math.max(0, Math.min(24 * 60, t));
    const h = Math.floor(m / 60);
    const mm = m % 60;
    return String(h).padStart(2, '0') + ':' + String(mm).padStart(2, '0');
  }

  function fmtCost(minutes) {
    if (!minutes) return '不花时间';
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h && m) return h + ' 时 ' + m + ' 分';
    if (h) return h + ' 小时';
    return m + ' 分钟';
  }

  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  function applyEffects(e) {
    if (!e) return;
    if (e.minutes) S.time += e.minutes;
    if (e.stamina) S.stamina -= e.stamina;
    if (e.morale) S.morale += e.morale;
    if (e.pantry) S.pantry += e.pantry;
    S.stamina = clamp(S.stamina, 0, 100);
    S.morale = clamp(S.morale, 0, 100);
    S.pantry = clamp(S.pantry, 0, 9);
    if (S.stamina <= 0) S.collapsed = true;
  }

  function addJournal(line) {
    if (!line) return;
    S.journal.push(line);
  }

  function updateHud() {
    el.clock.textContent = clockStr(S.time);
    el.staminaNum.textContent = Math.round(S.stamina);
    el.staminaBar.style.width = S.stamina + '%';
    el.moraleNum.textContent = Math.round(S.morale);
    el.moraleBar.style.width = S.morale + '%';
    el.pantryNum.textContent = S.pantry;
    const dots = [];
    for (let i = 0; i < 6; i++) {
      dots.push('<i class="' + (i < S.pantry ? 'on' : '') + '"></i>');
    }
    el.pantryDots.innerHTML = dots.join('');
    el.doneCount.textContent = S.done.length;
    el.sheetCount.textContent = S.done.length + ' / ' + TOTAL;
    el.staminaNum.classList.toggle('warn', S.stamina <= 25);
    el.moraleNum.classList.toggle('warn', S.morale <= 30);
    document.body.classList.toggle('low-stamina', S.stamina <= 25);
    renderStove();
  }

  /* ---------------- stove ---------------- */

  function stoveTask() {
    return S && S.stove ? TASKS.find((t) => t.id === S.stove.id) : null;
  }

  function stoveStatus() {
    if (!S || !S.stove) return null;
    if (S.time >= S.stove.lateAt) return 'late';
    if (S.time >= S.stove.readyAt) return 'ready';
    return 'cooking';
  }

  function fmtShort(minutes) {
    const m = Math.max(0, Math.round(minutes));
    if (m >= 60) {
      const h = Math.floor(m / 60);
      const r = m % 60;
      return h + ' 时' + (r ? ' ' + r + ' 分' : '');
    }
    return m + ' 分钟';
  }

  function renderStove() {
    const t = stoveTask();
    const st = stoveStatus();
    if (!t || !st) {
      el.stove.hidden = true;
      el.sheetStove.hidden = true;
      return;
    }
    const remain = Math.max(0, S.stove.readyAt - S.time);
    const pct = clamp(((t.simmer - remain) / t.simmer) * 100, 3, 100);
    el.stove.hidden = false;
    el.stoveTitle.textContent = t.id === 'dinner' ? '晚饭' : '粥';
    el.stoveNote.textContent = st === 'cooking'
      ? (t.id === 'dinner' ? '汤在灶上咕嘟着。' : '米在锅里慢慢开花。')
      : st === 'ready' ? '可以起锅了。' : '过了火候，还温着。';
    el.stoveTime.textContent = st === 'cooking' ? '还差 ' + fmtShort(remain)
      : st === 'ready' ? '正好' : '温着了';
    el.stoveBtn.disabled = st === 'cooking';
    el.stoveBtn.textContent = st === 'cooking' ? '还差一会儿' : '起锅';
    el.stoveFill.style.width = pct + '%';
    el.sheetStove.hidden = false;
    el.sheetStove.textContent = st === 'cooking' ? '灶上 ' + Math.ceil(remain) + '′' : '灶上 · 起锅';
  }

  function startPassive(t) {
    if (S.stove) autoCollectStove();
    if (t.flags) Object.assign(S.flags, t.flags);
    if (t.special === 'dinner') {
      S.flags.dinner_started = true;
      if (S.pantry >= 3) {
        S.pantry -= 3;
      } else {
        S.pantry = 0;
        S.flags.thin_dinner = true;
      }
    }
    S.stamina = clamp(S.stamina - (t.stamina || 0), 0, 100);
    if (S.stamina <= 0) S.collapsed = true;
    S.time += t.minutes;
    S.stove = {
      id: t.id,
      startedAt: S.time,
      readyAt: S.time + t.simmer,
      lateAt: S.time + t.simmer + 45
    };
    updateHud();
    renderList();
    playScene({ lines: [{ text: t.startText }] }, () => {
      if (S.collapsed) return endDay('collapse');
      afterAction();
    });
  }

  function finalizeStove() {
    const t = stoveTask();
    if (!t || S.time < S.stove.readyAt) return null;
    const late = S.time >= S.stove.lateAt;
    S.time += 5;
    S.stove = null;
    S.done.push(t.id);
    S.flags['done_' + t.id] = true;
    S.morale = clamp(S.morale + (late ? 1 : 5), 0, 100);
    addJournal(late ? (t.id === 'dinner' ? '晚饭有点过火' : '粥熬稠了') : t.journal);
    if (t.id === 'dinner') S.flags.dinner_done = true;
    return { t: t, late: late };
  }

  function autoCollectStove() {
    if (!S.stove) return;
    const t = stoveTask();
    if (S.time < S.stove.readyAt) {
      S.stove = null;
      S.done.push(t.id);
      S.flags['done_' + t.id] = true;
      addJournal(t.id === 'dinner' ? '晚饭提前下了桌' : '粥还没熬开');
      if (t.id === 'dinner') S.flags.dinner_done = true;
      return;
    }
    finalizeStove();
  }

  function collectStove() {
    if (!S.stove || S.time < S.stove.readyAt) return;
    closeSheetOnMobile();
    const res = finalizeStove();
    updateHud();
    renderList();
    if (!res) return;
    if (res.t.special === 'dinner') {
      const line = res.late
        ? '锅里收得有点干。你还是把最后一道菜端上了桌。'
        : res.t.result;
      playScene({ lines: [{ text: line }] }, () => {
        if (S.collapsed) return endDay('collapse');
        runTriggers(() => playDinner());
      });
    } else {
      const line = res.late
        ? '粥在灶上多熬了一会儿，稠了。但还热。'
        : '你揭开盖子，米香扑上来。';
      playScene({ lines: [{ text: line }] }, () => afterAction());
    }
  }

  /* ---------------- tokens ---------------- */

  function renderTokens() {
    el.tokens.innerHTML = TOKENS.map((t) => {
      const c = CAST[t.cast];
      const p = ANCHORS[t.at];
      return '<div class="token token-' + t.id + (t.shown ? '' : ' is-hidden') + '" data-token="' + t.id + '"' +
        ' style="left:' + p[0] + '%;top:' + p[1] + '%">' +
        '<span class="token-face"><img src="' + c.img + '" alt="' + c.name + '"></span>' +
        '<span class="token-tag">' + c.name + '</span>' +
        '</div>';
    }).join('');
  }

  function moveToken(id, anchor) {
    const node = document.querySelector('[data-token="' + id + '"]');
    if (!node) return;
    const p = ANCHORS[anchor] || ANCHORS.hall;
    node.style.left = p[0] + '%';
    node.style.top = p[1] + '%';
  }

  function showToken(id, anchor) {
    const node = document.querySelector('[data-token="' + id + '"]');
    if (!node) return;
    if (anchor) moveToken(id, anchor);
    node.classList.remove('is-hidden');
  }

  /* ---------------- scene helpers ---------------- */

  function setSpeaker(id) {
    if (!id || !CAST[id]) {
      el.sceneName.hidden = true;
      el.scenePortrait.hidden = true;
      return;
    }
    const c = CAST[id];
    el.sceneName.hidden = false;
    el.sceneName.innerHTML = c.name + '<span>' + c.role + '</span>';
    el.scenePortrait.hidden = false;
    el.scenePortraitImg.src = c.img;
    el.scenePortraitImg.alt = c.name;
  }

  function clearChoices() {
    el.sceneChoices.innerHTML = '';
  }

  function addAction(label, opts, handler) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'btn ' + (opts && opts.primary ? 'btn-primary' : 'btn-ghost');
    b.textContent = label;
    b.addEventListener('click', handler);
    el.sceneChoices.appendChild(b);
    return b;
  }

  function showReply(text, next) {
    setSpeaker(null);
    el.sceneText.innerHTML = '<p class="fade-in">' + text + '</p>';
    clearChoices();
    addAction('继续', { primary: true }, next);
  }

  function playScene(scene, done) {
    S.mode = 'scene';
    let i = 0;
    const lines = scene.lines || [];

    function step() {
      setSpeaker(scene.speaker);
      const line = lines[i] || { text: '' };
      el.sceneText.innerHTML = '<p class="fade-in">' + line.text + '</p>';
      clearChoices();

      if (i < lines.length - 1) {
        addAction('继续', { primary: true }, () => { i++; step(); });
        return;
      }

      if (scene.choices && scene.choices.length) {
        scene.choices.forEach((c) => {
          const b = document.createElement('button');
          b.type = 'button';
          b.className = 'choice-btn';
          b.innerHTML = '<span class="choice-label">' + c.label + '</span>' +
            (c.hint ? '<span class="choice-hint">' + c.hint + '</span>' : '');
          b.addEventListener('click', () => {
            applyEffects(c);
            if (c.flags) Object.assign(S.flags, c.flags);
            if (c.journal) addJournal(c.journal);
            updateHud();
            showReply(c.reply, () => {
              if (S.collapsed) return endDay('collapse');
              done();
            });
          });
          el.sceneChoices.appendChild(b);
        });
        return;
      }

      addAction(scene.continueLabel || '继续', { primary: true }, done);
    }

    step();
  }

  /* ---------------- panels ---------------- */

  function chipsFor(t) {
    const out = [];
    if (t.passive) {
      out.push('<span class="chip chip-time">备料 ' + fmtCost(t.minutes) + '</span>');
      out.push('<span class="chip chip-stove">灶上 ' + fmtCost(t.simmer) + '</span>');
    } else if (t.minutes) {
      out.push('<span class="chip chip-time">' + fmtCost(t.minutes) + '</span>');
    }
    if (t.stamina > 0) out.push('<span class="chip chip-stamina">体力 −' + t.stamina + '</span>');
    if (t.stamina < 0) out.push('<span class="chip chip-stamina good">体力 +' + Math.abs(t.stamina) + '</span>');
    if (t.morale > 0) out.push('<span class="chip chip-morale">心气 +' + t.morale + '</span>');
    if (t.morale < 0) out.push('<span class="chip chip-morale bad">心气 −' + Math.abs(t.morale) + '</span>');
    if (t.pantry) out.push('<span class="chip chip-pantry">米 ' + (t.pantry > 0 ? '+' : '−') + Math.abs(t.pantry) + '</span>');
    return out.join('');
  }

  function showTaskConfirm(t) {
    S.mode = 'confirm';
    closeSheetOnMobile();
    setSpeaker(null);
    const thin = t.special === 'dinner' && S.pantry < 3;
    el.sceneName.hidden = true;
    el.sceneText.innerHTML =
      '<p class="panel-kicker">待办 · ' + t.section + '</p>' +
      '<h2 class="panel-title">' + t.title + '</h2>' +
      '<p class="panel-line">' + t.desc + '</p>' +
      '<div class="cost-row">' + chipsFor(t) + '</div>' +
      (thin ? '<p class="panel-extra">米缸见底了。今晚只能煮一锅薄粥。</p>' : '') +
      (t.passive ? '<p class="panel-extra">下锅之后它会自己走。你可以去做别的，回来再起锅。</p>' : '') +
      (t.rest ? '<p class="panel-extra">这行字不是你的笔迹。</p>' : '');
    clearChoices();
    addAction('去做', { primary: true }, () => doTask(t));
    addAction('先放着', {}, showIdle);
  }

  function showNotice(title, text) {
    S.mode = 'notice';
    setSpeaker(null);
    el.sceneName.hidden = true;
    el.sceneText.innerHTML =
      '<p class="panel-kicker">' + title + '</p>' +
      '<p class="panel-line">' + text + '</p>';
    clearChoices();
    addAction('好', { primary: true }, showIdle);
  }

  function idleLine() {
    if (S.stove) {
      const st = stoveStatus();
      const what = S.stove.id === 'dinner' ? '晚饭' : '粥';
      if (st === 'ready') return '灶上的' + what + '正好。去起锅。';
      if (st === 'late') return '灶上的' + what + '过了火候，还温着。';
    }
    if (S.time >= DINNER_OPEN && !S.flags.dinner_done) {
      return '该准备晚饭了。厨房的灯还没亮。';
    }
    if (S.stamina <= 25) {
      return '手有点抖。你扶着桌沿站了一会儿。';
    }
    if (S.time < 8 * 60) {
      return '天刚亮。院子里还没有人声。';
    }
    if (S.time < 12 * 60) {
      return '清单还在桌上。挑一件，划掉它。';
    }
    if (S.time < 17 * 60) {
      return '日头偏过去了。还有几件没做。';
    }
    return '天快黑了。';
  }

  function marginNote() {
    const notes = [
      [8 * 60, '灶膛里的火是昨夜埋的。塞缪尔教过你：火要留一点，第二天才生得起来。'],
      [11 * 60, '这栋楼有十七扇窗。你数过很多次，每次数出来的都不一样。'],
      [14 * 60, '客人的全名是阿耳忒弥斯·卢娜·塞勒涅·客人。贝兰斯坦坚持叫全名，叫了三天。'],
      [17 * 60, '晚香玉是荷穆勒夏种的。她说这花夜里最香，白天反而闻不见。'],
      [19 * 60, '长桌能坐二十个人。最挤的时候，坐过二十六个。'],
      [24 * 60, '灯要一盏一盏地熄。你习惯从西楼开始。']
    ];
    const hit = notes.find((n) => S.time < n[0]);
    return hit ? hit[1] : notes[notes.length - 1][1];
  }

  function showIdle() {
    S.mode = 'idle';
    setSpeaker(null);
    el.sceneName.hidden = true;
    el.sceneText.innerHTML = '<p class="idle-line">' + idleLine() + '</p>' +
      '<p class="margin-note">' + marginNote() + '</p>';
    clearChoices();

    if (S.stove && stoveStatus() !== 'cooking') {
      addAction('起锅', { primary: true }, collectStove);
    }

    if (window.matchMedia('(max-width: 900px)').matches && S.time >= DINNER_OPEN && !S.flags.dinner_done && !(S.stove && S.stove.id === 'dinner')) {
      const dinnerTask = TASKS.find((t) => t.id === 'dinner');
      if (getTaskState(dinnerTask).state === 'ok') {
        addAction('去厨房做晚饭', { primary: true }, () => showTaskConfirm(dinnerTask));
      }
    }

    const available = TASKS.filter((t) => getTaskState(t).state === 'ok');
    if (!available.length && !(S.stove && stoveStatus() !== 'cooking')) {
      addAction('在廊下坐一会儿（30 分钟）', {}, () => {
        applyEffects({ minutes: 30, stamina: -5 });
        updateHud();
        runTriggers(() => {
          if (S.time >= DINNER_LAST && !S.flags.dinner_done) return endDay('cold');
          showIdle();
        });
      });
    }
    updateHud();
  }

  /* ---------------- tasks ---------------- */

  function getTaskState(t) {
    if (S.flags['done_' + t.id]) return { state: 'done' };
    if (S.stove && S.stove.id === t.id) return { state: 'stove' };
    if (S.time > t.window[1]) return { state: 'missed', reason: '这个点已经过了。' };
    if (S.time < t.window[0]) return { state: 'locked', reason: '还没到做这件事的时候。' };
    if (!t.rest && S.stamina < t.stamina) return { state: 'tired', reason: '体力不够了。先缓一缓，或者把这件事放掉。' };
    if (t.rest && S.stamina >= 95) return { state: 'locked', reason: '现在还不累。等到真的累了再坐。' };
    return { state: 'ok' };
  }

  function doTask(t) {
    if (getTaskState(t).state !== 'ok') return;
    if (t.passive) {
      S.mode = 'busy';
      closeSheetOnMobile();
      if (t.anchor) moveToken('ispera', t.anchor);
      if (t.id === 'breakfast') moveToken('belanstan', 'bench');
      return startPassive(t);
    }
    S.mode = 'busy';
    closeSheetOnMobile();

    if (t.anchor) moveToken('ispera', t.anchor);
    if (t.id === 'breakfast') moveToken('belanstan', 'bench');

    let resultText = t.result;
    let mood = t.morale || 0;

    if (t.special === 'dinner') {
      S.flags.dinner_started = true;
      if (S.pantry >= 3) {
        S.pantry -= 3;
        mood = 5;
        addJournal(t.journal);
      } else {
        S.pantry = 0;
        mood = -4;
        S.flags.thin_dinner = true;
        resultText = '锅里是薄粥。你给它撒了一点盐。';
        addJournal('煮了一锅薄粥');
      }
      S.flags.dinner_done = true;
    } else {
      if (t.flags) Object.assign(S.flags, t.flags);
      if (t.journal) addJournal(t.journal);
      if (t.pantry) S.pantry += t.pantry;
      if (t.rest) S.flags.rested = true;
    }

    S.done.push(t.id);
    S.flags['done_' + t.id] = true;
    S.morale = clamp(S.morale + mood, 0, 100);
    S.stamina = clamp(S.stamina - (t.stamina || 0), 0, 100);
    if (S.stamina <= 0) S.collapsed = true;

    S.time += t.minutes;
    updateHud();
    renderList();

    playScene({ lines: [{ text: resultText }] }, () => {
      if (S.collapsed) return endDay('collapse');
      if (t.special === 'dinner') {
        runTriggers(() => {
          if (S.collapsed) return endDay('collapse');
          playDinner();
        });
        return;
      }
      afterAction();
    });
  }

  function afterAction() {
    updateHud();
    renderList();
    if (S.collapsed) return endDay('collapse');
    runTriggers(() => {
      updateHud();
      renderList();
      if (S.collapsed) return endDay('collapse');
      if (S.stove && S.stove.id === 'dinner' && S.time >= 20 * 60 + 30 && S.time >= S.stove.readyAt) {
        return collectStove();
      }
      if (S.time >= DINNER_LAST && !S.flags.dinner_done && !(S.stove && S.stove.id === 'dinner')) return endDay('cold');
      showIdle();
    });
  }

  function runTriggers(done) {
    const list = TRIGGERS.slice().sort((a, b) => a.at - b.at);
    const t = list.find((x) => !S.fired[x.id] && S.time >= x.at && (!x.when || x.when(S)));
    if (!t) return done();

    S.fired[t.id] = true;
    const sc = t.run(S);
    playScene(sc, () => {
      if (sc.effects) applyEffects(sc.effects);
      if (sc.flags) Object.assign(S.flags, sc.flags);
      if (sc.journal) addJournal(sc.journal);
      if (sc.minutes) S.time += sc.minutes;
      updateHud();
      renderList();
      if (S.collapsed) return endDay('collapse');
      runTriggers(done);
    });
  }

  /* ---------------- list ---------------- */

  function renderList() {
    const groups = [];
    let current = null;
    TASKS.forEach((t) => {
      if (t.id === 'bench') return;
      if (t.section !== current) {
        current = t.section;
        groups.push({ section: t.section, items: [] });
      }
      groups[groups.length - 1].items.push(t);
    });

    el.list.innerHTML = groups.map((g) => {
      return '<div class="todo-group">' +
        '<p class="todo-section">' + g.section + '</p>' +
        g.items.map((t) => {
          const st = getTaskState(t);
          const cls = ['todo-item', 'is-' + st.state, t.rest ? 'is-rest' : ''].join(' ');
          const timeLabel = fmtCost(t.minutes);
          const meta = st.state === 'done' ? '划掉了'
            : st.state === 'stove' ? '灶上'
            : st.state === 'blocked' ? '灶上占着'
            : st.state === 'missed' ? '错过了'
            : st.state === 'locked' ? '还没到点'
            : st.state === 'tired' ? '做不动了'
            : timeLabel;
          return '<button type="button" class="' + cls + '" data-id="' + t.id + '" role="listitem">' +
            '<span class="todo-check" aria-hidden="true"></span>' +
            '<span class="todo-main"><span class="todo-title">' + t.title + '</span>' +
            (t.note ? '<span class="todo-note">' + t.note + '</span>' : '') + '</span>' +
            '<span class="todo-meta">' + meta + '</span>' +
            '</button>';
        }).join('') +
        '</div>';
    }).join('');

    el.list.querySelectorAll('.todo-item').forEach((b) => {
      b.addEventListener('click', () => {
        const t = TASKS.find((x) => x.id === b.dataset.id);
        const st = getTaskState(t);
        if (st.state === 'done') return;
        if (st.state === 'stove') return showNotice(t.title, '在灶上。去上面的灶台起锅。');
        if (st.state === 'ok') return showTaskConfirm(t);
        showNotice(t.title, st.reason || '现在做不了这件事。');
      });
    });

    const bench = TASKS.find((t) => t.id === 'bench');
    const bst = getTaskState(bench);
    el.bench.className = 'bench-note is-' + bst.state;
    el.bench.innerHTML =
      '<span class="bench-check"></span>' +
      '<span class="bench-main"><span class="bench-title">' + bench.title + '</span>' +
      '<span class="bench-sub">' + (bst.state === 'done' ? '划掉了' : '贝兰斯坦添的 · ' + fmtCost(bench.minutes)) + '</span></span>';

    const dinner = TASKS.find((t) => t.id === 'dinner');
    const dstate = getTaskState(dinner);
    if (S.stove && S.stove.id === 'dinner') {
      el.todoFoot.textContent = stoveStatus() === 'cooking' ? '晚饭在灶上。' : '晚饭可以起锅了。';
    } else if (dstate.state === 'ok') {
      el.todoFoot.innerHTML = '<button type="button" class="dinner-cta" id="dinner-cta">该做晚饭了 · 去厨房</button>';
      el.todoFoot.querySelector('#dinner-cta').addEventListener('click', () => showTaskConfirm(dinner));
    } else if (dstate.state === 'done') {
      el.todoFoot.textContent = '晚饭端上桌了。';
    } else if (S.time < DINNER_OPEN) {
      const left = DINNER_OPEN - S.time;
      const h = Math.floor(left / 60);
      const m = left % 60;
      el.todoFoot.textContent = '离晚饭还有 ' + (h ? h + ' 小时 ' : '') + (m ? m + ' 分钟。' : '');
    } else {
      el.todoFoot.textContent = '天黑了，厨房的灶还凉着。';
    }
  }

  /* ---------------- dinner ---------------- */

  function playDinner() {
    S.mode = 'scene';
    showToken('homulesia', 'gate');
    moveToken('ispera', 'kitchen');
    moveToken('belanstan', 'bench');

    const lines = [{ text: '孩子们洗了手，围在长桌边。碗一只只摆好。' }];

    if (S.flags.provence_knot) {
      lines.push({ text: '普罗旺斯系着你给他打的结，端着一摞碗，走得很慢。' });
    } else if (S.flags.flowers_kid) {
      lines.push({ text: '桌上的瓶里插着晚香玉，摆得有点歪。' });
    } else if (S.flags.flowers) {
      lines.push({ text: '桌上的瓶里插着晚香玉。' });
    }

    if (S.flags.fever_care) {
      lines.push({ text: '小满坐在桌边，额头不烫了，正把勺子敲得叮当响。' });
    } else if (S.flags.fever_medicine) {
      lines.push({ text: '小满喝完了药，皱着眉，还是把碗推回给莉莉维安。' });
    } else if (S.flags.fever_ma) {
      lines.push({ text: '小满没来吃饭。玛莎阿姨说她睡着了。' });
    }

    if (S.flags.rain_in) {
      lines.push({ text: '西楼走廊摆着两只接水的桶，隔一会儿就响一声。' });
    } else if (S.flags.window_fixed) {
      lines.push({ text: '外面下起雨来。西楼的窗没有漏。' });
    }

    if (S.flags.thin_dinner) {
      lines.push({ text: '桌上只有一锅薄粥，和一小碟咸菜。' });
    }

    lines.push({ text: '门外有脚步声。' });

    playScene({ lines: lines, choices: DINNER_CHOICES }, () => {
      const doorLine = S.flags.waited
        ? '门开了。荷穆勒夏站在门口，肩上落着一点雨。她看见你，脚步停了一下。'
        : '门开了。荷穆勒夏站在门口，肩上落着一点雨。她看了一眼桌上的碗，没有立刻说话。';
      playScene({ speaker: 'homulesia', lines: [{ text: doorLine }] }, () => {
        endDay(computeEnding());
      });
    });
  }

  function computeEnding() {
    if (S.collapsed) return 'collapse';
    if (!S.flags.dinner_done) return 'cold';
    const feverHandled = S.flags.fever_care || S.flags.fever_medicine;
    if (S.flags.rested && S.morale >= 68 && feverHandled) return 'true';
    if (S.morale >= 55 && !S.flags.thin_dinner) return 'good';
    return 'thin';
  }

  /* ---------------- ending ---------------- */

  function endDay(type) {
    if (S.mode === 'ending') return;
    S.mode = 'ending';
    S.ending = type;
    const e = ENDINGS[type];

    el.endingKicker.textContent = e.kicker;
    el.endingTitle.textContent = e.title;
    el.endingBody.innerHTML = e.paras.map((p) => '<p>' + p + '</p>').join('');

    const js = S.journal.slice(0, 18);
    el.endingJournal.innerHTML = js.length
      ? '<p class="ending-label">今天记得的事</p><ul>' + js.map((j) => '<li>' + j + '</li>').join('') + '</ul>'
      : '';

    const undone = TASKS.filter((t) => !S.flags['done_' + t.id]).map((t) => t.title);
    const left = undone.slice(0, 3).join('、');
    el.endingStats.innerHTML =
      '<div class="stat"><span>待办</span><b>' + S.done.length + ' / ' + TOTAL + '</b></div>' +
      '<div class="stat"><span>心气</span><b>' + Math.round(S.morale) + '</b></div>' +
      '<div class="stat"><span>米缸</span><b>' + S.pantry + '</b></div>' +
      (left ? '<p class="stat-left">还留在清单上的：' + left + (undone.length > 3 ? '……' : '') + '</p>' : '');

    el.game.hidden = true;
    el.title.hidden = true;
    el.ending.hidden = false;
    window.scrollTo(0, 0);
    if (qaMode) finishQa(type);
  }

  /* ---------------- mobile sheet ---------------- */

  function closeSheetOnMobile() {
    if (window.matchMedia('(max-width: 900px)').matches) {
      el.sheet.classList.remove('sheet-open');
      el.sheetHandle.setAttribute('aria-expanded', 'false');
    }
  }

  el.stoveBtn.addEventListener('click', collectStove);
  el.sheetStove.addEventListener('click', (e) => {
    e.stopPropagation();
    el.sheet.classList.add('sheet-open');
    el.sheetHandle.setAttribute('aria-expanded', 'true');
  });

  el.bench.addEventListener('click', () => {
    const t = TASKS.find((x) => x.id === 'bench');
    const st = getTaskState(t);
    if (st.state === 'done') return;
    if (st.state === 'ok') return showTaskConfirm(t);
    showNotice(t.title, st.reason || '现在做不了这件事。');
  });

  el.sheetHandle.addEventListener('click', () => {
    const open = el.sheet.classList.toggle('sheet-open');
    el.sheetHandle.setAttribute('aria-expanded', String(open));
  });

  /* ---------------- start / reset ---------------- */

  function startGame() {
    S = freshState();
    qaPlanIndex = 0;
    el.sheet.classList.remove('sheet-open');
    el.sheetHandle.setAttribute('aria-expanded', 'false');
    el.title.hidden = true;
    el.ending.hidden = true;
    el.game.hidden = false;
    renderTokens();
    renderList();
    updateHud();
    playScene({ lines: INTRO }, () => {
      showIdle();
      if (window.matchMedia('(max-width: 900px)').matches && !qaMode && !shotMode) {
        el.sheet.classList.add('sheet-open');
        el.sheetHandle.setAttribute('aria-expanded', 'true');
      }
      if (qaMode) qaTick();
    });
    if (qaMode) window.setTimeout(qaTick, 30);
  }

  el.start.addEventListener('click', startGame);
  el.again.addEventListener('click', startGame);
  el.backTitle.addEventListener('click', () => {
    el.ending.hidden = true;
    el.game.hidden = true;
    el.title.hidden = false;
  });

  /* ---------------- qa harness ---------------- */

  let qaPlanIndex = 0;
  let qaSteps = 0;
  const QA_PLAN = ['breakfast', 'water', 'keys', 'market', 'class', 'accounts', 'flowers', 'window', 'bench', 'dinner'];

  function qaTick() {
    if (!qaMode) return;
    if (qaSteps++ > 400) return finishQa('timeout');
    window.setTimeout(() => {
      if (S && S.mode === 'ending') return finishQa(S.ending);

      const primary = el.sceneChoices.querySelector('.btn-primary');
      if (primary && S.mode !== 'idle') { primary.click(); return qaTick(); }

      const choice = el.sceneChoices.querySelector('.choice-btn');
      if (choice) { choice.click(); return qaTick(); }

      if (S.mode === 'idle') {
        if (S.stove && S.time >= S.stove.readyAt) { el.stoveBtn.click(); return qaTick(); }
        while (qaPlanIndex < QA_PLAN.length) {
          const id = QA_PLAN[qaPlanIndex++];
          const t = TASKS.find((x) => x.id === id);
          if (getTaskState(t).state === 'ok') {
            if (id === 'bench') { el.bench.click(); return qaTick(); }
            const row = el.list.querySelector('[data-id="' + id + '"]');
            if (row) { row.click(); return qaTick(); }
          }
        }
        // fall through: no planned task available
        const any = Array.from(el.list.querySelectorAll('.todo-item.is-ok'))[0];
        if (any) { any.click(); return qaTick(); }
        const benchTask = TASKS.find((x) => x.id === 'bench');
        if (getTaskState(benchTask).state === 'ok') { el.bench.click(); return qaTick(); }
        const fallback = el.sceneChoices.querySelector('.btn');
        if (fallback) { fallback.click(); return qaTick(); }
        return finishQa('stuck');
      }
      return qaTick();
    }, 25);
  }

  function finishQa(status) {
    if (document.getElementById('qa-out')) return;
    const out = {
      status: status,
      ending: S ? S.ending : null,
      time: S ? clockStr(S.time) : null,
      stamina: S ? S.stamina : null,
      morale: S ? S.morale : null,
      done: S ? S.done.slice() : [],
      flags: S ? S.flags : null,
      journal: S ? S.journal : [],
      errors: pageErrors,
      failedImages: Array.from(document.images).filter((i) => i.complete && !i.naturalWidth).map((i) => i.getAttribute('src')),
      scrollable: document.documentElement.scrollHeight > window.innerHeight + 1
    };
    const pre = document.createElement('pre');
    pre.id = 'qa-out';
    pre.textContent = 'QA_RESULT ' + JSON.stringify(out);
    document.body.appendChild(pre);
    document.title = 'QA ' + status + ' ' + (S ? S.ending : 'none');
  }

  window.__steward = {
    state: () => S,
    tasks: TASKS,
    start: startGame,
    doTask: (id) => doTask(TASKS.find((t) => t.id === id)),
    ending: computeEnding
  };

  if (qaMode || shotMode) {
    window.addEventListener('load', () => {
      startGame();
      if (shotMode && shotMode !== 'intro') {
        window.setTimeout(() => {
          if (shotMode === 'ending') return endDay(params.get('kind') || 'true');
          for (let i = 0; i < 6; i++) {
            const b = el.sceneChoices.querySelector('.btn-primary');
            if (b) b.click();
          }
          if (shotMode === 'provence') { S.fired['rabbit'] = true; S.fired['breakfast-missed'] = true; S.time = 750; updateHud(); return runTriggers(() => {}); }
          if (shotMode === 'fever') { S.fired['rabbit'] = true; S.fired['provence'] = true; S.fired['breakfast-missed'] = true; S.time = 880; updateHud(); return runTriggers(() => {}); }
          if (shotMode === 'dinner') { S.time = 1140; S.flags.dinner_done = true; S.flags.window_fixed = true; S.flags.provence_knot = true; S.flags.fever_care = true; return playDinner(); }
          if (params.get('sheet') === '1') {
            el.sheet.classList.add('sheet-open');
            el.sheetHandle.setAttribute('aria-expanded', 'true');
          }
          if (shotMode === 'stove') {
            S.time = 345;
            updateHud();
            return startPassive(TASKS.find((t) => t.id === 'breakfast'));
          }
          if (shotMode === 'stoveReady') {
            S.time = 400;
            S.stove = { id: 'breakfast', startedAt: 360, readyAt: 390, lateAt: 435 };
            updateHud();
            renderList();
            return showIdle();
          }
          if (shotMode === 'dinnercta') { S.time = 1030; updateHud(); renderList(); return showIdle(); }
          if (shotMode === 'task') {
            const row = el.list.querySelector('[data-id="' + (params.get('id') || 'breakfast') + '"]');
            if (row) row.click();
          }
        }, 60);
      }
    });
  }
})();
