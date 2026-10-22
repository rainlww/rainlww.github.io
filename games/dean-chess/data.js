/* 院长的棋局 — characters, voices, and the table talk. */
(function (root) {
  'use strict';

  const DEAN = {
    id: 'dean',
    name: '荷穆勒夏',
    role: '圣拉姆特救济院院长',
    img: 'assets/chars/homulesia.webp'
  };

  const CHARACTERS = {
    ispera: {
      id: 'ispera',
      name: '伊斯派菈',
      role: '总管家 · OW 情报部部长',
      seat: '第一个来到圣拉姆特的孩子',
      img: 'assets/chars/ispera.webp',
      tint: '#e0b7cf',
      ability: {
        id: 'confess',
        name: '坦诚',
        max: 2,
        hint: '摊开这一步。她听不见它。'
      },
      abilityLine: '我不藏。这一步，您听见也没关系。',
      script: {
        start: [
          { who: 'ispera', text: '院长，我执白。' },
          { who: 'dean', text: '嗯。今晚不必让我。' }
        ],
        moves: {
          2: [
            { who: 'ispera', text: '我小时候，您教我的第一颗子，是王。' },
            { who: 'dean', text: '因为你总想护住它。' }
          ],
          4: [
            { who: 'ispera', text: '贝兰说，您今天没吃晚饭。' },
            { who: 'dean', text: '她在情报部屈才了。' }
          ],
          6: [
            { who: 'ispera', text: '我到现在也没有能力。您说过，那不要紧。' },
            { who: 'dean', text: '我说过的话，不必每句都拿来试我。' }
          ],
          8: [
            { who: 'ispera', text: '如果这局我赢了，您能不能少替我担一件事。' },
            { who: 'dean', text: '……下完再说。' }
          ],
          10: [
            { who: 'ispera', text: '您读我吧。我不躲。' },
            { who: 'dean', text: '这一局我不读。你自己走。' }
          ],
          12: [
            { who: 'ispera', text: '您今天一直没有读我。是故意，还是累了。' },
            { who: 'dean', text: '都有。' }
          ],
          14: [
            { who: 'ispera', text: '贝兰把情报部的灯留给我。她说晚一点没关系。' },
            { who: 'dean', text: '她总是这样。' }
          ],
          16: [
            { who: 'ispera', text: '您左手的纹又浮出来了。今晚用过几次？' },
            { who: 'dean', text: '一次。你数得倒清楚。' }
          ],
          18: [
            { who: 'ispera', text: '这盘下完您去睡吧。剩下的我来收。' },
            { who: 'dean', text: '你先赢。' }
          ]
        },
        firstCapture: [
          { who: 'dean', text: '吃掉了。别急着换回来。' },
          { who: 'ispera', text: '我没有急。' }
        ],
        firstCheck: [
          { who: 'ispera', text: '将军。' },
          { who: 'dean', text: '手很稳。' }
        ],
        playerCapture: [
          { who: 'ispera', text: '吃掉了。' },
          { who: 'dean', text: '嗯。下手比上次稳。' },
          { who: 'ispera', text: '您教得好。' }
        ],
        deanCheck: [
          { who: 'dean', text: '将军。别慌。' },
          { who: 'ispera', text: '我没慌。' },
          { who: 'dean', text: '手在抖。' }
        ],
        castle: [
          { who: 'ispera', text: '易位。您教我的第一件事。' },
          { who: 'dean', text: '你记得比塞缪尔清楚。' }
        ],
        promotion: [
          { who: 'ispera', text: '升变。我选后。' },
          { who: 'dean', text: '贪心。' },
          { who: 'ispera', text: '跟您学的。' }
        ],
        end: [
          { who: 'dean', text: '收棋吧。今晚你没有一处是替我下的。' }
        ],
        win: [
          { who: 'ispera', text: '我赢了。' },
          { who: 'dean', text: '嗯。我看见了。' },
          { who: 'dean', text: '明天早上，别替我留那盏灯。' }
        ],
        lose: [
          { who: 'dean', text: '输了。' },
          { who: 'ispera', text: '嗯。' },
          { who: 'dean', text: '输了也坐在这儿。这就够了。' }
        ],
        ending: {
          title: '不必替我担心',
          text: '她收棋的时候，把最后一颗子放回盒里，动作很慢。窗外的白玫瑰被夜风吹得贴在玻璃上。她没有说「你长大了」——她只是把灯往你这边推了推，让光多照过来一点。'
        }
      }
    },

    belanstan: {
      id: 'belanstan',
      name: '贝兰斯坦',
      role: '副总管家 · OW 情报部副部长',
      seat: '第二个来到圣拉姆特的孩子',
      img: 'assets/chars/belanstan.webp',
      tint: '#9fc6e8',
      ability: {
        id: 'file',
        name: '建档',
        max: 1,
        hint: '看清她下一步的打算。'
      },
      abilityLine: '让我看看您在想什么——不，是打算走什么。',
      script: {
        start: [
          { who: 'belanstan', text: '院长，我坐下了。先声明，我下棋很脏。' },
          { who: 'dean', text: '我拭目以待。' }
        ],
        moves: {
          2: [
            { who: 'belanstan', text: '您左手在敲桌沿。您在算杀。' },
            { who: 'dean', text: '观察力用在这儿，浪费。' }
          ],
          4: [
            { who: 'belanstan', text: '情报部今日简报：客人偷了厨房一根萝卜，拒不交代。' },
            { who: 'dean', text: '它比你诚实。' }
          ],
          6: [
            { who: 'belanstan', text: '伊斯当部长，不是我让贤。是我更爱往外跑。' },
            { who: 'dean', text: '我知道。她不知道。' }
          ],
          8: [
            { who: 'belanstan', text: '全院孩子的生日我都记得。连玛莎阿姨的。' },
            { who: 'dean', text: '……你查过账。' }
          ],
          10: [
            { who: 'belanstan', text: '这局我赢了，换您明天多睡一个时辰。成交？' },
            { who: 'dean', text: '先赢。' }
          ],
          12: [
            { who: 'belanstan', text: '院长，您知道全院有多少人怕您吗？' },
            { who: 'dean', text: '知道。' },
            { who: 'belanstan', text: '我不怕。' }
          ],
          14: [
            { who: 'belanstan', text: '我只是每次撒谎都被您听见，所以后来懒得撒了。' },
            { who: 'dean', text: '省了你很多力气。' }
          ],
          16: [
            { who: 'belanstan', text: '客人的萝卜案结了。是厨房那小子。' },
            { who: 'dean', text: '你替它背了三天。' },
            { who: 'belanstan', text: '它不会说话嘛。' }
          ],
          18: [
            { who: 'belanstan', text: '这局输了，我能不能拿一条情报换一步？' },
            { who: 'dean', text: '不能。' },
            { who: 'belanstan', text: '那换半条。' }
          ]
        },
        firstCapture: [
          { who: 'dean', text: '你的马，我收了。' },
          { who: 'belanstan', text: '好，这条我记下了。' }
        ],
        firstCheck: [
          { who: 'belanstan', text: '将军。别瞪我，是您教的。' }
        ],
        playerCapture: [
          { who: 'belanstan', text: '这条我记下了。' },
          { who: 'dean', text: '记性太好不是好事。' }
        ],
        deanCheck: [
          { who: 'dean', text: '将军。' },
          { who: 'belanstan', text: '哎，别急。' },
          { who: 'dean', text: '你急也没用。' }
        ],
        castle: [
          { who: 'belanstan', text: '王车易位。教科书第一步。' },
          { who: 'dean', text: '你不是不看书。' },
          { who: 'belanstan', text: '我只看有用的。' }
        ],
        promotion: [
          { who: 'belanstan', text: '升变！这回周报有东西写了。' },
          { who: 'dean', text: '不许写。' }
        ],
        end: [
          { who: 'dean', text: '收棋。你今晚的话比棋多。' },
          { who: 'belanstan', text: '话也是情报。' }
        ],
        win: [
          { who: 'belanstan', text: '赢了！我要写进情报部周报。' },
          { who: 'dean', text: '不许写。' }
        ],
        lose: [
          { who: 'dean', text: '输了。' },
          { who: 'belanstan', text: '那明年再报。' }
        ],
        ending: {
          title: '话也是情报',
          text: '她输得很干脆，收子的时候还在笑。走到门口，她回头说：「院长，萝卜的事真是客人干的。」门关上以后，你听见走廊里她小声补了一句：「……是我给的。」'
        }
      }
    },

    samuel: {
      id: 'samuel',
      name: '塞缪尔',
      role: '副院长 · 卢塞罗家主',
      seat: '唯一直呼她名字的人',
      img: 'assets/chars/samuel.webp',
      tint: '#d9cdb4',
      ability: {
        id: 'bear',
        name: '承负',
        max: 1,
        hint: '她吃掉的子，还回来；她会另走一步。'
      },
      abilityLine: '这一下，我替你疼。',
      script: {
        start: [
          { who: 'samuel', text: '荷穆勒夏，别让我。' },
          { who: 'dean', text: '你今晚话多。' }
        ],
        moves: {
          2: [
            { who: 'samuel', text: '你又剪了白玫瑰。上次说好不剪。' },
            { who: 'dean', text: '插在你窗外的，不算剪。' }
          ],
          4: [
            { who: 'samuel', text: '孩子们睡了。伊斯在楼下留灯。' },
            { who: 'dean', text: '她总留。' }
          ],
          6: [
            { who: 'samuel', text: '你替所有人扛，也该有人在棋盘上替你扛一次。' },
            { who: 'dean', text: '棋盘上不需要。' }
          ],
          8: [
            { who: 'samuel', text: '我最近常想，那天晚上我要是不守在你门口——' },
            { who: 'dean', text: '塞缪尔。' },
            { who: 'samuel', text: '……好，不说了。' }
          ],
          10: [
            { who: 'samuel', text: '这局不算任务，也不算赌。就当今晚没事。' },
            { who: 'dean', text: '嗯。就当没事。' }
          ],
          12: [
            { who: 'samuel', text: '你今晚没戴手套。' },
            { who: 'dean', text: '没必要。' },
            { who: 'samuel', text: '手凉。' }
          ],
          14: [
            { who: 'samuel', text: '伊斯在楼下留了灯。她知道你不睡。' },
            { who: 'dean', text: '她知道得太多了。' }
          ],
          16: [
            { who: 'samuel', text: '上次那七天，我没能替你疼。' },
            { who: 'dean', text: '塞缪尔。' },
            { who: 'samuel', text: '……好，不说了。' }
          ],
          18: [
            { who: 'samuel', text: '下完这局，我陪你走回房间。' },
            { who: 'dean', text: '就这么点路。' },
            { who: 'samuel', text: '那就走慢一点。' }
          ]
        },
        firstCapture: [
          { who: 'dean', text: '吃吧。' },
          { who: 'samuel', text: '我不疼。' },
          { who: 'dean', text: '你总是这句。' }
        ],
        firstCheck: [
          { who: 'samuel', text: '将军。' },
          { who: 'dean', text: '你笑什么。' },
          { who: 'samuel', text: '没什么。' }
        ],
        playerCapture: [
          { who: 'samuel', text: '吃。别客气。' },
          { who: 'dean', text: '你倒是大方。' }
        ],
        deanCheck: [
          { who: 'dean', text: '将军。' },
          { who: 'samuel', text: '嗯。看见了。' },
          { who: 'dean', text: '你每次都这样说。' }
        ],
        castle: [
          { who: 'samuel', text: '易位。你以前总说这一步太保守。' },
          { who: 'dean', text: '现在不说了。' }
        ],
        promotion: [
          { who: 'samuel', text: '升变。我不客气了。' },
          { who: 'dean', text: '别客气。' }
        ],
        end: [
          { who: 'dean', text: '收棋。' },
          { who: 'samuel', text: '再坐一会儿。' }
        ],
        win: [
          { who: 'samuel', text: '我赢了。' },
          { who: 'dean', text: '……你让了我一步。' },
          { who: 'samuel', text: '没有。是你今晚太累。' }
        ],
        lose: [
          { who: 'dean', text: '输了。' },
          { who: 'samuel', text: '那我替你收棋。' }
        ],
        ending: {
          title: '再坐一会儿',
          text: '他没有走。灯芯烧短了一截，他把手杖靠在桌边，坐下来陪你把最后几颗子收完。谁也没提明天的事。楼下的灯还亮着，伊斯派菈大概又在等。'
        }
      }
    },

    sumingruo: {
      id: 'sumingruo',
      name: '苏明若',
      role: '成渝辣子店老板 · 赤莲街',
      seat: '比塞缪尔还早认识她的人',
      img: 'assets/chars/sumingruo.webp',
      tint: '#e08a72',
      ability: {
        id: 'table',
        name: '拍桌',
        max: 1,
        hint: '撤回你和她的上一手。'
      },
      abilityLine: '拍桌！重来！',
      script: {
        start: [
          { who: 'sumingruo', text: '荷夏！我不客气了啊。' },
          { who: 'dean', text: '你什么时候客气过。' }
        ],
        moves: {
          2: [
            { who: 'sumingruo', text: '你这屋里一股花香，呛得我打喷嚏。下回摆火锅。' },
            { who: 'dean', text: '棋盘会油。' }
          ],
          4: [
            { who: 'sumingruo', text: '赤莲街新来了个说书的，把你说成三头六臂。' },
            { who: 'dean', text: '你去纠正了？' },
            { who: 'sumingruo', text: '我把桌子拍了。' }
          ],
          6: [
            { who: 'sumingruo', text: '我不管什么王车易位，我就想拿马踩你。' },
            { who: 'dean', text: '请。' }
          ],
          8: [
            { who: 'sumingruo', text: '你多久没回来了？清落给你留了药，我给她留了危辣。' },
            { who: 'dean', text: '两样都不必留。' }
          ],
          10: [
            { who: 'sumingruo', text: '你要是哪天撑不住了，就来店里坐一晚。不说话也行。' },
            { who: 'dean', text: '……好。' }
          ],
          12: [
            { who: 'sumingruo', text: '荷夏，你这椅子硌得慌。下次换我店里的条凳。' },
            { who: 'dean', text: '不换。' }
          ],
          14: [
            { who: 'sumingruo', text: '清落说你最近又没按点吃饭。' },
            { who: 'dean', text: '她告状告到赤莲街了。' },
            { who: 'sumingruo', text: '她那是关心你。' }
          ],
          16: [
            { who: 'sumingruo', text: '我爹当年说，你这人太硬，迟早折。' },
            { who: 'dean', text: '你爹说得对。' },
            { who: 'sumingruo', text: '那你还硬。' }
          ],
          18: [
            { who: 'sumingruo', text: '折了就来店里。火锅管够，不说话也行。' },
            { who: 'dean', text: '……好。' },
            { who: 'sumingruo', text: '说定了。' }
          ]
        },
        firstCapture: [
          { who: 'dean', text: '吃我子？' },
          { who: 'sumingruo', text: '行啊你。' },
          { who: 'dean', text: '棋盘上不讲情面。' },
          { who: 'sumingruo', text: '你讲一个试试。' }
        ],
        firstCheck: [
          { who: 'sumingruo', text: '将军！哈哈哈——' },
          { who: 'dean', text: '小声点，孩子们睡了。' }
        ],
        playerCapture: [
          { who: 'sumingruo', text: '吃你一个！' },
          { who: 'dean', text: '手别抖。' },
          { who: 'sumingruo', text: '谁抖了。' }
        ],
        deanCheck: [
          { who: 'dean', text: '将军。' },
          { who: 'sumingruo', text: '你等着。' },
          { who: 'dean', text: '我等着。' }
        ],
        castle: [
          { who: 'sumingruo', text: '易位！我也会！' },
          { who: 'dean', text: '看出来了。' }
        ],
        promotion: [
          { who: 'sumingruo', text: '升变！危辣！' },
          { who: 'dean', text: '棋盘不辣。' }
        ],
        end: [
          { who: 'sumingruo', text: '不下了不下了，再下我要掀桌。' },
          { who: 'dean', text: '你掀。' }
        ],
        win: [
          { who: 'sumingruo', text: '赢了！危辣，你请。' },
          { who: 'dean', text: '我请。' }
        ],
        lose: [
          { who: 'sumingruo', text: '输就输。明天再来。' },
          { who: 'dean', text: '明天我不一定有空。' },
          { who: 'sumingruo', text: '那我等你。' }
        ],
        ending: {
          title: '那我等你',
          text: '她把棋子一把扫进盒里，动作大得吓人，其实一颗都没掉。临走前她在门口站了一下，说：「荷夏，你那盏灯，别总留到天亮。」然后头也不回地下楼了。'
        }
      }
    }
  };


  const CHAT = {
    ispera: [
      [{ who: 'ispera', text: '今天孩子们问我，院长会不会下棋输。' }, { who: 'dean', text: '你怎么说。' }, { who: 'ispera', text: '我说会。但只输给该输的人。' }],
      [{ who: 'ispera', text: '贝兰又在厨房偷吃。' }, { who: 'dean', text: '她以为我不知道。' }, { who: 'ispera', text: '她知道您知道。' }],
      [{ who: 'ispera', text: '您教我的第一碗面，真的很咸。' }, { who: 'dean', text: '你喝了一壶水。' }, { who: 'ispera', text: '我没说不好吃。' }],
      [{ who: 'ispera', text: '有时候我想，如果我有能力，能不能替您分担一点。' }, { who: 'dean', text: '你已经分担了。' }],
      [{ who: 'ispera', text: '客人今天在花园里挖了个洞。' }, { who: 'dean', text: '它想埋什么。' }, { who: 'ispera', text: '埋它偷的萝卜。' }],
      [{ who: 'ispera', text: '院长，您今晚会梦到什么。' }, { who: 'dean', text: '不记得。' }, { who: 'ispera', text: '那明早告诉我。' }]
    ],
    belanstan: [
      [{ who: 'belanstan', text: '院长，情报部今天收到一条没用的情报。' }, { who: 'dean', text: '什么。' }, { who: 'belanstan', text: '说您今晚会赢。' }],
      [{ who: 'belanstan', text: '客人胖了。' }, { who: 'dean', text: '厨房的问题。' }, { who: 'belanstan', text: '我举报厨房。' }],
      [{ who: 'belanstan', text: '我给全院孩子起了代号。您要一个吗。' }, { who: 'dean', text: '不要。' }, { who: 'belanstan', text: '已经起了。' }],
      [{ who: 'belanstan', text: '伊斯当部长比我合适。她记得住每个人的生日。' }, { who: 'dean', text: '你记得住每个人的把柄。' }, { who: 'belanstan', text: '这也是本事。' }],
      [{ who: 'belanstan', text: '您知道我最怕什么吗。' }, { who: 'dean', text: '不知道。' }, { who: 'belanstan', text: '怕有一天您不在这张桌子后面。' }],
      [{ who: 'belanstan', text: '院长，笑一下。就一下。' }, { who: 'dean', text: '……' }]
    ],
    samuel: [
      [{ who: 'samuel', text: '你今天的茶凉了。' }, { who: 'dean', text: '你泡的。' }, { who: 'samuel', text: '我再去泡一杯。' }],
      [{ who: 'samuel', text: '花园的晚香玉开了。你窗下那片。' }, { who: 'dean', text: '明天剪几枝。' }, { who: 'samuel', text: '你不是说不剪。' }],
      [{ who: 'samuel', text: '卢卡斯今天带孩子们跑步，摔了三个。' }, { who: 'dean', text: '他没事吧。' }, { who: 'samuel', text: '他摔得最重。' }],
      [{ who: 'samuel', text: '维奥莱特又在算账。她说这个月亏了。' }, { who: 'dean', text: '她每个月都这么说。' }],
      [{ who: 'samuel', text: '你昨晚又没关窗。' }, { who: 'dean', text: '风不大。' }, { who: 'samuel', text: '你咳嗽了。' }],
      [{ who: 'samuel', text: '荷穆勒夏。' }, { who: 'dean', text: '嗯。' }, { who: 'samuel', text: '没什么。就叫一声。' }]
    ],
    sumingruo: [
      [{ who: 'sumingruo', text: '荷夏，你猜我今天在街上看见谁。' }, { who: 'dean', text: '谁。' }, { who: 'sumingruo', text: '一个跟你长得很像的人。我差点喊。' }],
      [{ who: 'sumingruo', text: '清落给你留了药，记得喝。' }, { who: 'dean', text: '知道了。' }, { who: 'sumingruo', text: '你每次都说知道。' }],
      [{ who: 'sumingruo', text: '我店里新来了个跑堂，笨得要命。' }, { who: 'dean', text: '你骂他了。' }, { who: 'sumingruo', text: '我给他加了工钱。' }],
      [{ who: 'sumingruo', text: '你什么时候来赤莲街吃火锅。' }, { who: 'dean', text: '等这阵子过去。' }, { who: 'sumingruo', text: '你每次都这么说。' }],
      [{ who: 'sumingruo', text: '我爹说，你要是哪天不干了，赤莲街给你留个位置。' }, { who: 'dean', text: '什么位置。' }, { who: 'sumingruo', text: '我旁边。' }],
      [{ who: 'sumingruo', text: '荷夏。' }, { who: 'dean', text: '嗯。' }, { who: 'sumingruo', text: '没事。就是想叫你一声。' }]
    ]
  };
  Object.keys(CHAT).forEach((id) => {
    if (CHARACTERS[id]) CHARACTERS[id].chat = CHAT[id];
  });

  const SERIOUS = {
    start: [{ who: 'dean', text: '这一局，我不听。' }],
    win: [{ who: 'dean', text: '……好棋。' }],
    lose: [{ who: 'dean', text: '再来。' }],
    draw: [{ who: 'dean', text: '和棋。难得。' }],
    timeWin: [{ who: 'dean', text: '时间到了。' }],
    timeLose: [{ who: 'dean', text: '你的钟停了。' }]
  };

  const MODES = {
    narrative: {
      id: 'narrative',
      label: '棋谈',
      en: 'TALK',
      blurb: '推棋即说话，落子即沉默。',
      note: '落子推进对话，不争输赢。'
    },
    duel: {
      id: 'duel',
      label: '对局',
      en: 'DUEL',
      blurb: '带上你这个人，和她下。',
      note: '她会读你。你有一次自己的办法。'
    },
    serious: {
      id: 'serious',
      label: '认真局',
      en: 'SERIOUS',
      blurb: '这一局，我不听。',
      note: '无读心，无能力，全力出手。'
    }
  };

  const ui = { DEAN, CHARACTERS, MODES, SERIOUS };
  if (typeof module !== 'undefined' && module.exports) module.exports = ui;
  root.TABLE = ui;
})(typeof window !== 'undefined' ? window : globalThis);
