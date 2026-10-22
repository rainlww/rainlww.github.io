/* 总管家的一天 — content */

const CAST = {
  ispera: {
    name: '伊斯派菈', role: '总管家',
    img: 'assets/portraits/portrait-ispera-chibi-neutral.webp'
  },
  belanstan: {
    name: '贝兰斯坦', role: '副总管家',
    img: 'assets/portraits/portrait-belanstan-chibi-neutral.webp'
  },
  provence: {
    name: '普罗旺斯', role: '十二岁',
    img: 'assets/portraits/portrait-provence-chibi-neutral.webp'
  },
  lilivian: {
    name: '莉莉维安', role: '见习护士',
    img: 'assets/portraits/portrait-lilivian-chibi-neutral.webp'
  },
  homulesia: {
    name: '荷穆勒夏', role: '院长',
    img: 'assets/portraits/portrait-homulesia-chibi-neutral.webp'
  }
};

const DAY_START = 5 * 60 + 45;   // 05:45
const DINNER_OPEN = 17 * 60;     // 17:00
const DINNER_LAST = 19 * 60;     // 19:00

const TASKS = [
  {
    id: 'breakfast', section: '清晨', title: '生火熬粥',
    minutes: 15, stamina: 10, morale: 5, passive: true, simmer: 45,
    window: [345, 600], anchor: 'kitchen', flags: { breakfast: true },
    desc: '淘米，添柴，等水开。米下了锅，火压小，就不用一直守着。',
    startText: '米下了锅。火压小，盖上盖子。接下来它会自己走一会儿。',
    result: '粥开了。米香顺着楼梯往上爬，二楼有人开了门。',
    journal: '熬了一锅粥'
  },
  {
    id: 'water', section: '清晨', title: '给客人添水',
    minutes: 15, stamina: 2, morale: 2,
    window: [345, 1140], anchor: 'veg', flags: { watered: true },
    desc: '客人在菜地边上蹲着，水碗见了底。它不看你，耳朵动了一下。',
    result: '你换了水。客人等你走远了，才低头去喝。',
    journal: '给客人换了水'
  },
  {
    id: 'keys', section: '清晨', title: '数一遍钥匙',
    minutes: 30, stamina: 4, morale: 3,
    window: [345, 1200], anchor: 'gate',
    desc: '大门、东楼、西楼、储物间。四把钥匙串在一根旧皮绳上。',
    result: '四把，一把不少。你把皮绳在手指上绕了一圈，挂回门后。',
    journal: '数过四把钥匙'
  },
  {
    id: 'market', section: '上午', title: '去赤莲街采买',
    minutes: 180, stamina: 20, morale: 1, pantry: 3,
    window: [390, 1020], anchor: 'gate',
    desc: '赤莲街的早市。米、盐、灯油，还有一包给孩子们的糖。',
    result: '回来的路上，米袋压得肩膀发酸。糖藏在最底下，没让人看见。',
    journal: '去赤莲街采买'
  },
  {
    id: 'class', section: '上午', title: '陪孩子们上完半节课',
    minutes: 90, stamina: 13, morale: 5,
    window: [480, 720], anchor: 'west',
    desc: '卢卡斯在教孩子们怎么从背后接近一个人。你站在廊下看了一会儿。',
    result: '普罗旺斯做得最好。他走路几乎没有声音，卢卡斯拍了拍他的头。',
    journal: '看完半节体能课'
  },
  {
    id: 'accounts', section: '上午', title: '记昨天的账',
    minutes: 75, stamina: 8, morale: 3,
    window: [480, 1020], anchor: 'kitchen',
    desc: '昨天的账。维奥莱特把每一笔都写得清清楚楚，只有一笔没写用途：「修屋顶」。',
    result: '你把「修屋顶」三个字看了两遍，在旁边补了一个小勾。',
    journal: '记完了昨天的账'
  },
  {
    id: 'window', section: '午后', title: '修西楼漏雨的窗',
    minutes: 120, stamina: 18, morale: 4,
    window: [720, 1020], anchor: 'west', flags: { window_fixed: true },
    desc: '西楼走廊的窗框松了。钉子、木条、一块旧油布。',
    result: '你把窗框重新钉紧，又在外侧压了一层油布。风试了试，没进来。',
    journal: '修好了西楼的窗'
  },
  {
    id: 'infirmary', section: '午后', title: '去医务室搭把手',
    minutes: 90, stamina: 13, morale: 4,
    window: [720, 1020], anchor: 'infirmary',
    desc: '莉莉维安在整理药柜，看见你就站直了，手里的瓶子差点掉下来。',
    result: '你帮她把药按名字排好。她小声说谢谢，声音比瓶子还轻。',
    journal: '在医务室搭了把手'
  },
  {
    id: 'flowers', section: '午后', title: '给晚香玉换水',
    minutes: 20, stamina: 1, morale: 2,
    window: [480, 1140], anchor: 'bench', flags: { flowers: true },
    desc: '花园里的晚香玉。昨天那瓶水已经浑了。',
    result: '换了水，剪掉两片发黄的叶子。花在瓶里重新站直了。',
    journal: '给晚香玉换了水'
  },
  {
    id: 'copy', section: '午后', title: '替莉莉维安抄药方',
    minutes: 30, stamina: 4, morale: 2,
    window: [720, 1020], anchor: 'infirmary',
    desc: '莉莉维安的字太小，药方要重抄一份给玛莎阿姨。',
    result: '你抄到第三行，才发现自己一直屏着呼吸。',
    journal: '替莉莉维安抄了药方'
  },
  {
    id: 'mend', section: '午后', title: '补三件衣服',
    minutes: 45, stamina: 5, morale: 3,
    window: [600, 1080], anchor: 'kitchen',
    desc: '储物间的针线篮。有三件衣服等着补，都是袖子先破。',
    result: '补到第二件的时候，窗外开始有孩子跑过去。你把线咬断，收了针。',
    journal: '补好了三件衣服'
  },
  {
    id: 'dinner', section: '傍晚', title: '做晚饭',
    minutes: 30, stamina: 15, morale: 5, passive: true, simmer: 45,
    window: [1020, 1140], anchor: 'kitchen', special: 'dinner',
    desc: '米下锅，汤先炖上。火候到了，锅盖边缘冒白气。',
    startText: '汤在灶上咕嘟着。你腾出手来，去把别的事收个尾。',
    result: '你把最后一道菜端上桌。孩子们已经坐好了，筷子在手里转。',
    journal: '做了一顿晚饭'
  },
  {
    id: 'bench', section: '随时', title: '在长椅上坐十分钟',
    minutes: 15, stamina: -25, morale: 2,
    window: [345, 1140], anchor: 'bench', once: true, rest: true,
    note: '贝兰斯坦添的',
    desc: '清单最下面多了一行字，不是你的笔迹：「十分钟。就十分钟。——贝兰斯坦」',
    result: '你坐下。风从晚香玉那边过来。远处有人在笑，听不清是谁。你没有立刻站起来。',
    journal: '在长椅上坐了十分钟'
  }
];

const INTRO = [
  { text: '六点差一刻。天还没亮。' },
  { text: '灶膛里压着昨夜的火，扒开还有一点红。' },
  { text: '你叫伊斯派菈。这座院子里的人叫你总管家，孩子们叫你伊斯姐姐。' },
  { text: '今天有十三件事。你只有一天。' }
];

const TRIGGERS = [
  {
    id: 'breakfast-missed', at: 600, once: true,
    when: (s) => !s.flags.breakfast,
    run: () => ({
      lines: [
        { text: '十点了。厨房的灶还是凉的。' },
        { text: '孩子们自己找到了昨天的面包。有人问你今天是不是很忙。' },
        { text: '你说有一点。' }
      ],
      effects: { morale: -6 },
      journal: '错过了早饭'
    })
  },
  {
    id: 'rabbit', at: 540, once: true,
    when: () => true,
    run: (s) => {
      if (s.flags.watered) {
        return {
          lines: [
            { text: '客人从菜地那边钻出来，嘴边没有泥。' },
            { text: '它今天很给你面子。' }
          ],
          effects: { morale: 2 },
          journal: '客人今天没闯祸'
        };
      }
      return {
        lines: [
          { text: '客人从菜地那边钻出来，嘴边挂着一截胡萝卜缨。' },
          { text: '新补的那一畦被翻得乱七八糟。它蹲在原地，没有要跑的意思。' }
        ],
        speaker: null,
        choices: [
          {
            label: '亲手补种', hint: '45 分钟 · 体力 -8',
            minutes: 45, stamina: 8, morale: 4,
            flags: { carrots: true },
            reply: '你把土重新压好，补上种子。客人蹲在旁边看，像一个不认错的犯人。',
            journal: '补好了被客人刨开的菜畦'
          },
          {
            label: '叫普罗旺斯来帮忙', hint: '30 分钟 · 体力 -4',
            minutes: 30, stamina: 4, morale: 2,
            flags: { provence_help: true },
            reply: '他跑得很快，蹲下去就知道该怎么扶苗。你忽然发现，他其实一直在看你做事。',
            journal: '和普罗旺斯一起补了菜畦'
          },
          {
            label: '先不管，翻到下一页', hint: '不花时间 · 心气 -6',
            minutes: 0, morale: -6,
            flags: { rabbit_loose: true },
            reply: '土里的种子会不会活，只能看它们自己。',
            journal: '菜畦还乱着'
          }
        ]
      };
    }
  },
  {
    id: 'provence', at: 750, once: true,
    when: () => true,
    run: () => ({
      speaker: 'provence',
      lines: [
        { text: '普罗旺斯站在门口，怀里抱着一大把晚香玉，根上还带着土。' },
        { text: '他大概等了一会儿，鞋尖在地上蹭出一小片白印。' },
        { text: '「我……我能帮忙吗。」他说，「我不会白吃饭的。」' }
      ],
      choices: [
        {
          label: '教他系围裙', hint: '10 分钟 · 体力 -1',
          minutes: 10, stamina: 1, morale: 4,
          flags: { provence_knot: true },
          reply: '你教他打了一个结。他学得很慢，但打得很认真。结有点歪。',
          journal: '普罗旺斯学会了打围裙结'
        },
        {
          label: '让他把花插进瓶里', hint: '5 分钟',
          minutes: 5, morale: 3,
          flags: { flowers_kid: true },
          reply: '他把花插得歪歪的，退后看了很久，又偷偷扶正了一点。',
          journal: '普罗旺斯插了一瓶花'
        },
        {
          label: '摸摸头，让他去玩', hint: '不花时间',
          minutes: 0, morale: 1,
          flags: { provence_play: true },
          reply: '他点点头，抱着花走了。走到廊下，又回头看了一眼灶台。',
          journal: '让普罗旺斯去玩了'
        }
      ]
    })
  },
  {
    id: 'fever', at: 870, once: true,
    when: () => true,
    run: () => ({
      speaker: 'lilivian',
      lines: [
        { text: '莉莉维安站在门口，手指绞着围裙。' },
        { text: '「小满有点烫。三十八度七。」' },
        { text: '她说完就低下头，像是怕你怪她。' }
      ],
      choices: [
        {
          label: '亲自守着', hint: '1 小时 45 分 · 体力 -16',
          minutes: 105, stamina: 16, morale: 6,
          flags: { fever_care: true },
          reply: '你守在床边，换了三次毛巾。天快黑的时候，小满的额头终于凉下来。她醒来第一句话是问你晚饭吃什么。',
          journal: '守到小满退了烧'
        },
        {
          label: '请玛莎阿姨来', hint: '不花时间 · 心气 -3',
          minutes: 0, morale: -3,
          flags: { fever_ma: true },
          reply: '玛莎阿姨来得很快，进门就让你去忙。你走到楼梯口，还是站了一会儿。',
          journal: '请玛莎阿姨看了小满'
        },
        {
          label: '先熬药，再过去', hint: '1 小时 · 体力 -8',
          minutes: 60, stamina: 8, morale: 3,
          flags: { fever_medicine: true },
          reply: '药熬好了，你端过去。莉莉维安一勺一勺地喂，手很稳。',
          journal: '给小满熬了药'
        }
      ]
    })
  },
  {
    id: 'rain', at: 1020, once: true,
    when: () => true,
    run: (s) => {
      if (s.flags.window_fixed) {
        return {
          lines: [
            { text: '外面下起雨来。' },
            { text: '西楼的窗没有漏。雨落在油布上，声音很闷。' }
          ],
          effects: { morale: 3 },
          journal: '雨落在修好的窗上'
        };
      }
      return {
        lines: [
          { text: '外面下起雨来。' },
          { text: '西楼走廊开始滴水。有人把两只桶摆在了下面，隔一会儿就响一声。' }
        ],
        effects: { morale: -8 },
        flags: { rain_in: true },
        journal: '西楼漏了雨'
      };
    }
  }
];

const DINNER_TAIL = [
  { text: '门外有脚步声。' }
];

const DINNER_CHOICES = [
  {
    label: '把她的那份留出来',
    hint: '心气 +4',
    minutes: 0, morale: 4,
    flags: { saved_bowl: true },
    reply: '你把一只碗扣在锅边，又往上压了一个盘子。',
    journal: '给院长留了一碗面'
  },
  {
    label: '把她的份分给孩子们',
    hint: '心气 +6',
    minutes: 0, morale: 6,
    flags: { shared_bowl: true },
    reply: '孩子们欢呼了一声，又立刻安静下来，偷偷看你。',
    journal: '把院长的份分给了孩子们'
  },
  {
    label: '去门口迎她',
    hint: '心气 +3',
    minutes: 0, morale: 3,
    flags: { waited: true },
    reply: '你走到门口。雨已经小了，廊下的灯笼晃了一下。',
    journal: '在门口等院长回家'
  }
];

const ENDINGS = {
  collapse: {
    title: '灯还亮着',
    kicker: '星期三 · 你没能过完',
    paras: [
      '你是在医务室的床上醒来的。窗外已经黑了。',
      '莉莉维安坐在床边打瞌睡，手里还攥着体温计。贝兰斯坦站在门口，抱着手臂，看你醒了，第一句话是：「你吓死我了。」',
      '这一天剩下的部分，是别人替你过完的。院子没有塌，晚饭也开了。',
      '你只是不在。',
      '——明天，把那十分钟坐完。'
    ]
  },
  cold: {
    title: '冷灶',
    kicker: '星期三 · 天黑了',
    paras: [
      '天黑了，厨房的灶还是凉的。',
      '孩子们分掉了昨天剩下的面包。有人问今晚吃什么，没有人回答。',
      '荷穆勒夏回来的时候，在门口站了一会儿。她没有问为什么，只是把外套挂好，走进厨房，点着了火。',
      '你站在门边，想说点什么。她说：「去洗手吧。」',
      '这一天的清单上，还有很多空着的格子。'
    ]
  },
  thin: {
    title: '凑合的一天',
    kicker: '星期三 · 过完了',
    paras: [
      '晚饭端上桌的时候，已经比平时晚了。菜不多，但热。',
      '孩子们吃得很安静。普罗旺斯把最后一点汤刮进碗里，抬头看见你在看他，就笑了一下。',
      '荷穆勒夏回来得晚，她的那份已经凉了。她还是坐下来，一口一口吃完。',
      '你收拾完厨房，靠在门框上，忽然想不起来今天到底做了什么。',
      '好像什么都做了，又好像什么都没做好。'
    ]
  },
  good: {
    title: '热着的那碗',
    kicker: '星期三 · 过完了',
    paras: [
      '碗洗完了，桌子擦了，明天的米也泡上了。',
      '你在桌边坐下，本来只是想歇一会儿。',
      '再睁眼的时候，身上盖着贝兰斯坦的外套。桌上的灯已经调小了，厨房里留着一碗面，还热着。',
      '她从门口探进头来：「醒了？面再不吃就坨了。」',
      '你笑了一下，说好。这一天算是过完了。'
    ]
  },
  true: {
    title: '都熄了灯',
    kicker: '星期三 · 都熄了灯',
    paras: [
      '孩子们睡了。荷穆勒夏房间的灯还亮着，塞缪尔在楼下等她。',
      '你把最后一只碗扣在架子上，围裙挂回门后。',
      '贝兰斯坦在长椅上等你，手里两只杯子，一只已经凉了。',
      '「明天还有明天的事。」她说。',
      '「嗯。」你坐下。',
      '院子里只剩虫声。晚香玉在暗处开着，白得几乎发亮。',
      '你忽然想起十二岁那年，第一碗咸得发苦的面条。那时候你以为，家就是有人肯为你煮一碗面。',
      '现在你知道了——家还得有人肯坐下来，把它吃完。'
    ]
  }
};
