(() => {
  "use strict";

  const SAVE_KEY = "keren-garden-v1";
  const MAX_BUNDLE = 2;

  const ITEMS = {
    carrot: {
      name: "胡萝卜", icon: "assets/items/item-carrot.webp",
      desc: "菜地里刚拔的，还带着泥。客人闻了闻，没吃。"
    },
    "white-rose": {
      name: "白玫瑰", icon: "assets/items/item-white-rose.webp",
      desc: "花园里开得最直的一朵。刺已经摘掉了。"
    },
    tuberose: {
      name: "晚香玉", icon: "assets/items/item-tuberose.webp",
      desc: "白天不香，到了晚上才香。院长窗下那一丛。"
    },
    note: {
      name: "纸条", icon: "assets/items/item-note.webp",
      desc: "只写了半行字，剩下的话被折进去了。"
    },
    blanket: {
      name: "旧毛毯", icon: "assets/items/item-blanket.webp",
      desc: "叠得很小，边角磨白了。夜里凉。"
    },
    herb: {
      name: "药草", icon: "assets/items/item-herb-bundle.webp",
      desc: "晒干的，闻起来像下雨前的院子。"
    },
    "dried-chili": {
      name: "干辣椒", icon: "assets/items/item-dried-chili.webp",
      desc: "厨房梁上拿的。客人闻了闻，打了个喷嚏。"
    }
  };

  const SOUVENIRS = {
    "brass-bell": {
      name: "小铜铃", icon: "assets/items/item-brass-bell.webp",
      desc: "从菜地边翻出来的，摇一摇，声音很旧。"
    },
    pear: {
      name: "梨", icon: "assets/items/item-pear.webp",
      desc: "梨香园树下捡的。咬一口很甜，它只咬了一口。"
    },
    "draft-paper": {
      name: "半张稿纸", icon: "assets/items/item-draft-paper.webp",
      desc: "上头只有一句被划掉的话。"
    },
    "tea-bowl": {
      name: "茶碗", icon: "assets/items/item-tea-bowl.webp",
      desc: "窗台上多出来的一只，里头盛着清水。"
    },
    lantern: {
      name: "小灯笼", icon: "assets/items/item-lantern.webp",
      desc: "赤莲街的铺子送的，只有拇指大，还亮着。"
    },
    "theatre-ticket": {
      name: "戏票", icon: "assets/items/item-theatre-ticket.webp",
      desc: "票面是空的。茶馆的人说，兔子不用买票。"
    },
    "herb-packet": {
      name: "药包", icon: "assets/items/item-herb-packet.webp",
      desc: "系得很紧。里面是安神的方子，写着「少熬夜」。"
    },
    "chili-string": {
      name: "干辣椒串", icon: "assets/items/item-chili-string.webp",
      desc: "挂在架子上，厨房那边闻着味儿就能找到。"
    },
    "zither-string": {
      name: "琴弦", icon: "assets/items/item-zither-string.webp",
      desc: "不知是谁换下来的，还留着一点松香。"
    }
  };

  const DESTS = {
    patch: {
      name: "菜园",
      img: "assets/postcards/postcard-vegetable-patch-3x4.webp",
      req: null,
      hint: "",
      weights: { carrot: 3, herb: 1, tuberose: 1 },
      gift: "brass-bell",
      bonus: "pear",
      caption: "它在两行萝卜之间蹲了很久，露水把耳朵尖打湿了。\n照片是早上拍的，那时你还在睡。",
      repeat: "又是菜园。它把同一行萝卜数了一遍，这次数对了。"
    },
    window: {
      name: "三楼窗台",
      img: "assets/postcards/postcard-third-floor-window-3x4.webp",
      req: "tuberose",
      hint: "包里带一支晚香玉",
      weights: { tuberose: 4, blanket: 2, "white-rose": 1 },
      gift: "draft-paper",
      bonus: "tea-bowl",
      caption: "三楼只有这一扇窗还亮着。\n它在窗台上坐到灯灭，才想起来回家。纸上那句话被划掉了，它捡了回来。",
      repeat: "窗还亮着。它没上去，只在楼下仰头看了一会儿。"
    },
    street: {
      name: "赤莲街",
      img: "assets/postcards/postcard-chilian-street-3x4.webp",
      req: "note",
      hint: "包里放一张纸条",
      weights: { note: 4, blanket: 1, "dried-chili": 1 },
      gift: "lantern",
      bonus: null,
      caption: "灯笼比院里任何一盏都亮。\n它在台阶上坐了一会儿，看人走过。有人给了它一小块热的东西。",
      repeat: "灯笼还是那些灯笼。它这次走到了街尾。"
    },
    teahouse: {
      name: "裕宏茶馆",
      img: "assets/postcards/postcard-yuhong-teahouse-3x4.webp",
      req: "note",
      hint: "包里放一张纸条",
      weights: { note: 4, "white-rose": 1 },
      gift: "theatre-ticket",
      bonus: null,
      caption: "说书人一拍醒木，满堂都笑。\n它躲在长凳下面，听见了整段故事，回来时耳朵还竖着。",
      repeat: "今天说的是别的故事。它听到一半就睡着了。"
    },
    herbshop: {
      name: "芷兰之室",
      img: "assets/postcards/postcard-zhilan-herb-shop-3x4.webp",
      req: "herb",
      hint: "包里放一包药草",
      weights: { herb: 4, "white-rose": 1 },
      gift: "herb-packet",
      bonus: null,
      caption: "满墙的小抽屉，每一个都写着名字。\n它认不得字，只记住了最苦的那个味道。",
      repeat: "阿芷给了它一小包东西，说「别偷吃」。"
    },
    hotpot: {
      name: "成渝辣子店",
      img: "assets/postcards/postcard-chengyu-hotpot-3x4.webp",
      req: "dried-chili",
      hint: "包里放一根干辣椒",
      weights: { "dried-chili": 4, carrot: 1 },
      gift: "chili-string",
      bonus: null,
      caption: "红汤滚起来的时候，整条街都在打喷嚏。\n它坐在凳脚边，等有人低头看见它。",
      repeat: "苏老板给它留了一碗不辣的白汤。"
    },
    pear: {
      name: "梨香园",
      img: "assets/postcards/postcard-lixiang-opera-garden-3x4.webp",
      req: "white-rose",
      hint: "包里放一朵白玫瑰",
      weights: { "white-rose": 4, blanket: 1 },
      gift: "zither-string",
      bonus: null,
      caption: "戏台空着，水袖挂在架子上。梨花落了一地。\n它在台口站了很久，像一个没来得及上场的演员。",
      repeat: "戏台上有人在排戏。它听了一会儿，尾巴跟着拍子动。"
    }
  };

  const RAIN_DAYS = new Set([5, 10]);
  const CLOUDY_DAYS = new Set([4, 8]);

  const PET_LINES = [
    "它抖了抖耳朵，假装什么都没发生。",
    "它把下巴搁在你的鞋面上。",
    "它闻了闻你的手，又闻了闻。",
    "它往你这边挪了一点。",
    "它把一只耳朵转向你。"
  ];

  const $ = (id) => document.getElementById(id);
  const stage = $("stage");
  const panel = $("panel");
  const overlay = $("overlay");
  const narration = $("narration");
  const rabbit = $("rabbit");
  const rabbitWrap = $("rabbitWrap");
  const gardenLayer = $("gardenLayer");

  const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

  let audioCtx = null;
  let toastTimer = null;
  let returnTimer = null;

  /* ---------------- state ---------------- */

  function defaultState() {
    return {
      version: 1,
      started: false,
      day: 1,
      phase: "morning",
      stock: { carrot: 2, "white-rose": 1, tuberose: 1, note: 1, blanket: 1, herb: 1, "dried-chili": 1 },
      bundle: [],
      album: [],
      shelf: [],
      flags: { baby: false, late: false, ending: false },
      trip: null,
      muted: false,
      tools: { weeds: [], ripe: [] },
      log: []
    };
  }

  function load() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (!data || data.version !== 1 || !data.started) return null;
      return Object.assign(defaultState(), data, {
        flags: Object.assign({ baby: false, late: false, ending: false }, data.flags || {})
      });
    } catch (e) {
      return null;
    }
  }

  function save() {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
  }

  let state = defaultState();

  /* ---------------- sound ---------------- */

  function ensureAudio() {
    if (audioCtx) return;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (Ctx) audioCtx = new Ctx();
  }

  function note(freq, start, dur, vol) {
    if (!audioCtx) return;
    const t0 = audioCtx.currentTime + start;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(vol, t0 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }

  function sfx(kind) {
    if (state.muted) return;
    ensureAudio();
    if (!audioCtx) return;
    if (audioCtx.state === "suspended") audioCtx.resume();
    if (kind === "tap") note(520, 0, 0.06, 0.035);
    if (kind === "select") note(660, 0, 0.07, 0.04);
    if (kind === "pick") { note(720, 0, 0.07, 0.04); note(960, 0.06, 0.1, 0.03); }
    if (kind === "depart") { note(392, 0, 0.16, 0.045); note(523, 0.14, 0.24, 0.04); }
    if (kind === "return") { note(523, 0, 0.18, 0.04); note(659, 0.12, 0.2, 0.035); note(784, 0.24, 0.34, 0.03); }
    if (kind === "error") note(190, 0, 0.12, 0.03);
  }

  /* ---------------- text ---------------- */

  function weatherOf(day) {
    if (RAIN_DAYS.has(day)) return "雨";
    if (CLOUDY_DAYS.has(day)) return "阴";
    return "晴";
  }

  function morningLine() {
    if (RAIN_DAYS.has(state.day)) return "下雨了。客人不肯出门，蹲在檐下看水洼。";
    const lines = {
      1: "第一天。客人在门口等着，包袱还是空的。",
      2: "三楼那扇窗昨晚亮到很晚。",
      3: "赤莲街的灯笼，今晚会亮。",
      4: "风从院墙外吹进来，带着一点烟火味。",
      6: "客人今天起得比平时早。",
      7: "架子上多了件东西，它看了很久。",
      8: "花又开了几朵。",
      9: "院里的钟走得很慢。",
      11: "最后几天了。客人好像知道。",
      12: "第十二天。它没有像往常那样催你。"
    };
    return lines[state.day] || "花园里有露水。客人在门口等你。";
  }

  function awayLine() {
    const lines = [
      "它走的时候，包袱在背上晃了一下。",
      "门口安静下来。菜地里有几棵草该拔了。",
      "日头慢慢移过院墙。",
      "风把晚香玉的味道吹过来，又吹走。"
    ];
    return rand(lines);
  }

  function nightLine() {
    const lines = [
      "三楼的灯还亮着。院子里只剩虫声。",
      "它睡在架子下面，耳朵偶尔动一下。",
      "远处有狗叫。然后什么都没有了。"
    ];
    return rand(lines);
  }

  /* ---------------- destination ---------------- */

  function chooseDestination() {
    if (state.day === 1) return "patch";
    if (state.day === 2 && state.bundle.includes("tuberose")) return "window";
    if (state.day === 3 && state.bundle.includes("note")) return "street";

    let best = [];
    let bestScore = -Infinity;
    for (const [id, d] of Object.entries(DESTS)) {
      if (d.req && !state.bundle.includes(d.req)) continue;
      let score = 0;
      for (const item of state.bundle) score += (d.weights[item] || 0);
      if (!state.album.includes(id)) score += 2;
      if (state.trip === id) score -= 1.5;
      if (id === "patch" && state.album.length >= 4) score -= 1;
      if (score > bestScore) { bestScore = score; best = [id]; }
      else if (score === bestScore) best.push(id);
    }
    if (!best.length) return "patch";
    return rand(best);
  }

  /* ---------------- garden tools ---------------- */

  const BG = { w: 864, h: 1536 };
  const WEED_SPOTS = [[0.345, 0.665], [0.715, 0.735], [0.888, 0.795]];
  const RIPE_SPOTS = { carrot: [0.845, 0.705], "white-rose": [0.185, 0.505] };

  function bgPoint(px, py) {
    const scene = $("scene").getBoundingClientRect();
    const scale = Math.max(scene.width / BG.w, scene.height / BG.h);
    const dw = BG.w * scale;
    const dh = BG.h * scale;
    const ox = (scene.width - dw) * 0.5;
    const oy = (scene.height - dh) * 0.46;
    return { x: ox + px * dw, y: oy + py * dh };
  }

  function placeGarden() {
    if (state.phase !== "away") return;
    for (const el of gardenLayer.querySelectorAll(".tool")) {
      const p = bgPoint(parseFloat(el.dataset.px), parseFloat(el.dataset.py));
      el.style.left = p.x + "px";
      el.style.top = p.y + "px";
    }
  }

  function spawnTools() {
    state.tools = { weeds: WEED_SPOTS.map((_, i) => i), ripe: ["carrot", "white-rose"] };
    gardenLayer.innerHTML = "";
    state.tools.weeds.forEach((i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "tool tool--weed";
      btn.dataset.px = WEED_SPOTS[i][0];
      btn.dataset.py = WEED_SPOTS[i][1];
      btn.dataset.weed = String(i);
      btn.setAttribute("aria-label", "拔掉杂草");
      btn.innerHTML = '<img src="assets/items/item-weed-clump.webp" alt="">';
      btn.addEventListener("click", onWeed);
      gardenLayer.appendChild(btn);
    });
    state.tools.ripe.forEach((item) => {
      const spot = RIPE_SPOTS[item];
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "tool tool--ripe";
      btn.dataset.px = spot[0];
      btn.dataset.py = spot[1];
      btn.dataset.ripe = item;
      btn.setAttribute("aria-label", "摘下" + ITEMS[item].name);
      btn.innerHTML = '<img src="' + ITEMS[item].icon + '" alt="">';
      btn.addEventListener("click", onRipe);
      gardenLayer.appendChild(btn);
    });
    placeGarden();
  }

  function onWeed(e) {
    const btn = e.currentTarget;
    if (btn.classList.contains("taken")) return;
    btn.classList.add("taken");
    sfx("tap");
    state.tools.weeds = state.tools.weeds.filter((i) => String(i) !== btn.dataset.weed);
    if (state.tools.weeds.length === 0) {
      const found = rand(["carrot", "carrot", "herb", "tuberose", "note"]);
      addStock(found, 1);
      toast("从土里翻出 1 份" + ITEMS[found].name);
      sfx("pick");
    }
    save();
    renderPanel();
  }

  function onRipe(e) {
    const btn = e.currentTarget;
    if (btn.classList.contains("taken")) return;
    btn.classList.add("taken");
    sfx("pick");
    const item = btn.dataset.ripe;
    state.tools.ripe = state.tools.ripe.filter((i) => i !== item);
    addStock(item, 1);
    toast("摘下 1 份" + ITEMS[item].name);
    save();
    renderPanel();
  }

  function addStock(item, n) {
    state.stock[item] = Math.min(9, (state.stock[item] || 0) + n);
  }

  function toast(msg) {
    const el = $("toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2000);
  }

  /* ---------------- render ---------------- */

  function setScene(phase) {
    stage.dataset.light =
      phase === "night" ? "night" :
      phase === "dusk" || phase === "late" ? "dusk" :
      phase === "rain" ? "rain" : "day";

    $("dayChip").textContent = "第 " + state.day + " 天";
    $("weather").textContent = weatherOf(state.day);

    gardenLayer.innerHTML = "";
    if (phase === "away") spawnTools();

    const sprite =
      phase === "night" ? "sleep" :
      (state.flags.baby && (phase === "morning" || phase === "rain" || phase === "late")) ? "baby" :
      "idle";
    const src = {
      idle: "assets/characters/character-guest-rabbit-idle-transparent-640.webp",
      depart: "assets/characters/character-guest-rabbit-depart-transparent-640.webp",
      sleep: "assets/characters/character-guest-rabbit-sleep-transparent-640.webp",
      baby: "assets/characters/character-guest-rabbit-with-baby-transparent-640.webp"
    }[sprite];
    if (rabbit.getAttribute("src") !== src) rabbit.setAttribute("src", src);

    rabbitWrap.classList.remove("is-out", "is-away", "is-entering", "is-home");
    if (phase === "away") rabbitWrap.classList.add("is-away");
    else if (phase === "dusk") {
      rabbitWrap.classList.add("is-entering");
      setTimeout(() => rabbitWrap.classList.remove("is-entering"), 1200);
    }
    rabbitWrap.style.pointerEvents = phase === "morning" || phase === "rain" || phase === "night" ? "auto" : "none";
  }

  function renderNarration() {
    const p = state.phase;
    if (p === "morning") narration.textContent = morningLine();
    else if (p === "rain") narration.textContent = "雨落在瓦上，声音很密。";
    else if (p === "away") narration.textContent = awayLine();
    else if (p === "dusk") narration.textContent = "门口有动静。";
    else if (p === "late") narration.textContent = "天黑了。它还没回来。";
    else narration.textContent = nightLine();
  }

  function renderPanel() {
    const p = state.phase;

    if (p === "morning") {
      const slots = [0, 1].map((i) => {
        const item = state.bundle[i];
        return item
          ? '<div class="slot is-filled"><img src="' + ITEMS[item].icon + '" alt=""></div>'
          : '<div class="slot"><span class="empty-dot"></span></div>';
      }).join("");
      const tray = Object.entries(ITEMS).map(([id, it]) => {
        const count = state.stock[id] || 0;
        const selected = state.bundle.includes(id);
        return '<button type="button" class="tray-item' + (selected ? " is-selected" : "") + (count === 0 ? " is-empty" : "") +
          '" data-item="' + id + '" ' + (count === 0 ? "disabled" : "") + '>' +
          '<img src="' + it.icon + '" alt="' + it.name + '">' +
          '<span class="nm">' + it.name + '</span>' +
          '<span class="ct">' + count + '</span>' +
          '</button>';
      }).join("");
      panel.innerHTML =
        '<p class="panel-kicker">挑两样，放进包袱</p>' +
        '<div class="slots">' + slots + '</div>' +
        '<div class="tray">' + tray + '</div>' +
        '<button class="btn" id="departBtn" type="button" ' + (state.bundle.length ? "" : "disabled") + '>' +
        (state.bundle.length ? "系好包袱，送它出门" : "先放点东西进去") + '</button>';
      panel.querySelectorAll(".tray-item").forEach((b) => b.addEventListener("click", onTray));
      $("departBtn").addEventListener("click", depart);
      return;
    }

    if (p === "rain") {
      panel.innerHTML =
        '<p class="panel-kicker">雨天 · 不出门</p>' +
        '<p class="panel-note">它把身子缩成一团，看着檐角滴下来的水。</p>' +
        '<button class="btn" id="rainBtn" type="button">陪它在檐下坐一会儿</button>';
      $("rainBtn").addEventListener("click", () => {
        sfx("tap");
        addStock("herb", 1);
        state.phase = "night";
        save();
        render();
      });
      return;
    }

    if (p === "away") {
      const weeds = state.tools.weeds.length;
      const ripe = state.tools.ripe.length;
      panel.innerHTML =
        '<p class="panel-kicker">白天 · 客人不在家</p>' +
        '<div class="counters"><span>杂草 <b>' + weeds + '</b></span><span>熟了 <b>' + ripe + '</b></span></div>' +
        '<p class="panel-note">' + (weeds ? "菜地里冒了草。点点它们。" : "菜地干净了。风穿过架子。") + '</p>' +
        '<button class="btn" id="duskBtn" type="button">日头偏西</button>';
      $("duskBtn").addEventListener("click", goDusk);
      return;
    }

    if (p === "late") {
      panel.innerHTML =
        '<p class="panel-note">门口的灯你留着。风把它吹得晃了一下。</p>' +
        '<button class="btn" id="waitBtn" type="button">再等一会儿</button>';
      $("waitBtn").addEventListener("click", () => {
        sfx("tap");
        state.phase = "dusk";
        save();
        render();
        clearTimeout(returnTimer);
        returnTimer = setTimeout(openReturnCard, 650);
      });
      return;
    }

    if (p === "dusk") {
      panel.innerHTML =
        '<p class="panel-kicker">傍晚 · 它回来了</p>' +
        '<p class="panel-note">包袱轻了，耳朵上沾着一片叶子。</p>';
      return;
    }

    panel.innerHTML =
      '<p class="panel-kicker">夜 · 圣拉姆特</p>' +
      '<p class="panel-note">它缩在花丛边上睡着了。你把灯留到很晚。</p>' +
      '<button class="btn" id="sleepBtn" type="button">睡觉</button>';
    $("sleepBtn").addEventListener("click", sleep);
  }

  function ensureMorningSupplies() {
    if (state.phase !== "morning") return [];
    const added = [];
    if ((state.stock.note || 0) < 1) { state.stock.note = 1; added.push("纸条"); }
    if ((state.stock["dried-chili"] || 0) < 1) { state.stock["dried-chili"] = 1; added.push("干辣椒"); }
    if (added.length) save();
    return added;
  }

  function render() {
    const added = ensureMorningSupplies();
    setScene(state.phase);
    renderNarration();
    renderPanel();
    if (state.phase === "away") placeGarden();
    if (added.length) {
      const msg = added.length === 2
        ? "桌上多了一张裁好的纸，厨房梁上又挂了一串干辣椒"
        : added[0] === "纸条"
          ? "桌上多了一张裁好的纸"
          : "厨房梁上又挂了一串干辣椒";
      setTimeout(() => toast(msg), 500);
    }
  }

  /* ---------------- actions ---------------- */

  function onTray(e) {
    const id = e.currentTarget.dataset.item;
    if ((state.stock[id] || 0) <= 0) return;
    const idx = state.bundle.indexOf(id);
    if (idx >= 0) {
      state.bundle.splice(idx, 1);
      sfx("tap");
    } else {
      if (state.bundle.length >= MAX_BUNDLE) { sfx("error"); toast("包袱只装得下两样"); return; }
      state.bundle.push(id);
      sfx("select");
    }
    save();
    renderPanel();
  }

  function depart() {
    if (!state.bundle.length) return;
    for (const id of state.bundle) {
      state.stock[id] = Math.max(0, (state.stock[id] || 0) - 1);
    }
    state.trip = chooseDestination();
    state.phase = "away";
    state.tools = { weeds: [], ripe: [] };
    save();
    sfx("depart");
    rabbitWrap.classList.add("is-out");
    narration.textContent = awayLine();
    panel.innerHTML = '<p class="panel-kicker">它出门了</p><p class="panel-note">包袱在背上晃了一下，门没关严。</p>';
    setTimeout(() => {
      render();
    }, 850);
  }

  function goDusk() {
    if (state.day === 9 && !state.flags.late) {
      state.flags.late = true;
      state.phase = "late";
      save();
      render();
      return;
    }
    state.phase = "dusk";
    save();
    render();
    clearTimeout(returnTimer);
    returnTimer = setTimeout(openReturnCard, 1200);
  }

  function openReturnCard() {
    if (state.phase !== "dusk") return;
    const id = state.trip || "patch";
    const d = DESTS[id];
    const first = !state.album.includes(id);
    let gift = null;
    let giftIsNew = false;

    if (first) {
      state.album.push(id);
      gift = d.gift;
    } else if (d.bonus && !state.shelf.includes(d.bonus)) {
      gift = d.bonus;
    }
    if (gift && !state.shelf.includes(gift)) {
      state.shelf.push(gift);
      giftIsNew = true;
    }
    if (id === "street" || id === "teahouse") addStock("note", 1);
    if (id === "window") addStock("blanket", 1);
    if (id === "hotpot") addStock("dried-chili", 1);
    if (id === "herbshop") addStock("herb", 1);

    state.phase = "dusk";
    save();
    sfx("return");

    const giftHtml = gift
      ? '<div class="gift"><img src="' + SOUVENIRS[gift].icon + '" alt=""><div><div class="g-nm">' + SOUVENIRS[gift].name + '</div></div><span class="g-tag">' + (giftIsNew ? "收进架子" : "带回来了") + '</span></div>'
      : '<p class="cap" style="opacity:.7">这次它什么也没带回来，只有一身草籽。</p>';

    openOverlay(
      '<div class="sheet postcard">' +
        '<div class="stamp"><span>圣拉姆特 · 明信片</span><span>第 ' + state.day + ' 天</span></div>' +
        '<div class="frame"><img src="' + d.img + '" alt="' + d.name + '的明信片"></div>' +
        '<h3>' + d.name + '</h3>' +
        '<p class="cap">' + (first ? d.caption : d.repeat).replace(/\n/g, "<br>") + '</p>' +
        giftHtml +
        '<button class="btn" id="closeCard" type="button">收好</button>' +
      '</div>',
      { locked: true }
    );
    $("closeCard").addEventListener("click", closeReturn);
  }

  function closeReturn() {
    closeOverlay();
    if (state.day === 6 && !state.flags.baby) {
      showBaby();
      return;
    }
    state.phase = "night";
    save();
    render();
  }

  function showBaby() {
    state.flags.baby = true;
    save();
    openOverlay(
      '<div class="sheet">' +
        '<div class="sheet-head"><h2>傍晚</h2><span class="sub">多了一个</span></div>' +
        '<div style="text-align:center;margin:2px 0 12px"><img src="assets/characters/character-guest-rabbit-with-baby-transparent-640.webp" alt="两只兔子" style="width:78%;max-width:230px"></div>' +
        '<p class="panel-note">它回来时，身后跟着一只更小的。<br>你才发现，包袱里那条旧毛毯不见了。</p>' +
        '<button class="btn" id="babyOk" type="button">蹲下来看看</button>' +
      '</div>',
      { locked: true }
    );
    $("babyOk").addEventListener("click", () => {
      sfx("select");
      closeOverlay();
      state.phase = "night";
      save();
      render();
    });
  }

  function sleep() {
    sfx("tap");
    if (state.day === 12 && !state.flags.ending) {
      showEnding();
      return;
    }
    nextDay();
  }

  function nextDay() {
    state.day += 1;
    const d = state.day;
    addStock("carrot", 1);
    if (d % 2 === 0) addStock("white-rose", 1);
    if (d % 3 === 0) addStock("tuberose", 1);
    if (d % 2 === 1) addStock("herb", 1);
    if (state.shelf.includes("lantern")) addStock("note", 1);
    if (state.shelf.includes("tea-bowl")) addStock("blanket", 1);
    if (state.shelf.includes("chili-string")) addStock("dried-chili", 1);
    state.bundle = [];
    state.trip = null;
    state.phase = RAIN_DAYS.has(d) ? "rain" : "morning";
    save();
    render();
  }

  function showEnding() {
    state.flags.ending = true;
    save();
    openOverlay(
      '<div class="sheet">' +
        '<div class="sheet-head"><h2>一封信</h2><span class="sub">压在茶碗下面</span></div>' +
        '<p class="letter">给看园子的人：\n\n客人今天没出门。它在我窗台上睡了一下午，把耳朵垂在窗沿外面。\n\n这院子里的花、菜，和一只不肯进屋的兔子，都交给你了。\n别担心它。它认得回来的路。<span class="sign">——荷穆勒夏</span></p>' +
        '<div class="season-end"><strong>第一季 · 完</strong><button class="btn" id="keepGoing" type="button">再住几天</button></div>' +
      '</div>',
      { locked: true }
    );
    $("keepGoing").addEventListener("click", () => {
      sfx("select");
      closeOverlay();
      nextDay();
    });
  }

  /* ---------------- overlays ---------------- */

  function openOverlay(html, opts) {
    const options = opts || {};
    overlay.innerHTML = html;
    overlay.classList.add("is-open");
    overlay.dataset.locked = options.locked ? "1" : "";
    overlay.querySelectorAll(".close-x").forEach((b) => b.addEventListener("click", closeOverlay));
  }

  function backdropClose(e) {
    if (e.target === overlay) closeOverlay();
  }

  function closeOverlay() {
    overlay.classList.remove("is-open", "is-title");
    overlay.innerHTML = "";
    overlay.dataset.locked = "";
  }

  function openAlbum() {
    sfx("tap");
    const cards = Object.entries(DESTS).map(([id, d]) => {
      const has = state.album.includes(id);
      if (!has) {
        return '<button class="album-card is-locked" type="button" disabled>' +
          '<span class="ph">？</span>' +
          '<span class="ac-name">未去过</span>' +
          (d.hint ? '<span class="lock-hint">' + d.hint + '</span>' : '<span class="lock-hint">它自己会走到</span>') +
          '</button>';
      }
      return '<button class="album-card" type="button" data-dest="' + id + '">' +
        '<img src="' + d.img + '" alt="' + d.name + '">' +
        '<span class="ac-name">' + d.name + '</span>' +
        '</button>';
    }).join("");

    openOverlay(
      '<div class="sheet">' +
        '<div class="sheet-head"><h2>明信片册</h2><span class="sub">' + state.album.length + ' / ' + Object.keys(DESTS).length + '</span><button class="close-x" type="button" aria-label="合上">×</button></div>' +
        '<div class="album-grid">' + cards + '</div>' +
        '<div style="margin-top:14px"><button class="btn btn--ghost btn--small" id="resetBtn" type="button">重新开始这一季</button></div>' +
      '</div>'
    );
    overlay.querySelectorAll(".album-card[data-dest]").forEach((b) => {
      b.addEventListener("click", () => showReadCard(b.dataset.dest));
    });
    $("resetBtn").addEventListener("click", confirmReset);
  }

  function showReadCard(id) {
    const d = DESTS[id];
    openOverlay(
      '<div class="sheet postcard">' +
        '<div class="stamp"><span>圣拉姆特 · 明信片</span><span>' + d.name + '</span></div>' +
        '<div class="frame"><img src="' + d.img + '" alt="' + d.name + '的明信片"></div>' +
        '<h3>' + d.name + '</h3>' +
        '<p class="cap">' + d.caption.replace(/\n/g, "<br>") + '</p>' +
        '<button class="btn" id="backAlbum" type="button">回到信册</button>' +
      '</div>'
    );
    $("backAlbum").addEventListener("click", openAlbum);
  }

  function openShelf() {
    sfx("tap");
    const cells = Object.entries(SOUVENIRS).map(([id, it]) => {
      const has = state.shelf.includes(id);
      return '<button class="shelf-item' + (has ? "" : " is-unknown") + '" type="button" data-item="' + id + '">' +
        '<img src="' + it.icon + '" alt="">' +
        '<span class="s-nm">' + (has ? it.name : "？？？") + '</span>' +
        '</button>';
    }).join("");

    openOverlay(
      '<div class="sheet">' +
        '<div class="sheet-head"><h2>架子</h2><span class="sub">' + state.shelf.length + ' / ' + Object.keys(SOUVENIRS).length + '</span><button class="close-x" type="button" aria-label="合上">×</button></div>' +
        '<div class="shelf-grid">' + cells + '</div>' +
        '<p class="panel-note" style="margin-top:12px;font-size:12px;opacity:.7">它带回来的东西都在这儿。</p>' +
      '</div>'
    );
    overlay.querySelectorAll(".shelf-item").forEach((b) => {
      b.addEventListener("click", () => {
        const id = b.dataset.item;
        if (!state.shelf.includes(id)) { sfx("error"); toast("还没带回来"); return; }
        showItem(id);
      });
    });
  }

  function showItem(id) {
    const it = SOUVENIRS[id];
    openOverlay(
      '<div class="sheet">' +
        '<div class="sheet-head"><h2>架子</h2><span class="sub">一件小东西</span></div>' +
        '<div class="detail"><img src="' + it.icon + '" alt=""><div><h3>' + it.name + '</h3><p>' + it.desc + '</p></div></div>' +
        '<button class="btn" id="backShelf" type="button">放回去</button>' +
      '</div>'
    );
    $("backShelf").addEventListener("click", openShelf);
  }

  function confirmReset() {
    openOverlay(
      '<div class="sheet">' +
        '<div class="sheet-head"><h2>重新开始</h2><span class="sub">这一季会被收起来</span></div>' +
        '<p class="panel-note">明信片和架子都会清空。<br>客人还在门口等着。</p>' +
        '<div class="btn-row">' +
          '<button class="btn btn--ghost" id="cancelReset" type="button">再想想</button>' +
          '<button class="btn" id="doReset" type="button">重新开始</button>' +
        '</div>' +
      '</div>',
      { locked: true }
    );
    $("cancelReset").addEventListener("click", openAlbum);
    $("doReset").addEventListener("click", () => {
      state = defaultState();
      state.started = true;
      save();
      closeOverlay();
      render();
      toast("第一季，重新开始");
    });
  }

  /* ---------------- title ---------------- */

  function showTitle(hasSave) {
    stage.dataset.light = "dusk";
    stage.classList.add("is-title");
    overlay.classList.add("is-title");
    narration.textContent = "";
    panel.innerHTML = "";
    $("dayChip").textContent = "圣拉姆特";
    $("weather").textContent = "";
    gardenLayer.innerHTML = "";
    rabbit.setAttribute("src", state.flags.baby ? "assets/characters/character-guest-rabbit-with-baby-transparent-640.webp" : "assets/characters/character-guest-rabbit-idle-transparent-640.webp");
    rabbitWrap.classList.remove("is-away", "is-out", "is-entering");
    rabbitWrap.style.pointerEvents = "none";

    openOverlay(
      '<div class="title-screen">' +
        '<p class="eyebrow">圣拉姆特 · 花园里的十二天</p>' +
        '<h1>客人今天<br>去哪了</h1>' +
        '<p class="sub">一只灰兔，一只小包袱。<br>它自己出门，自己回来。</p>' +
        '<div class="rules">每天给它包里放两样东西。<br>它走后，把菜地的草拔一拔。<br>傍晚，它会带回一张明信片。</div>' +
        '<button class="btn" id="startBtn" type="button">' + (hasSave ? "继续这一季" : "开始第一季") + '</button>' +
        (hasSave ? '<button class="btn btn--ghost" id="newBtn" type="button">重新开始</button>' : '') +
        '<p class="tiny">竖屏 · 一只手就能玩</p>' +
      '</div>',
      { locked: true }
    );

    $("startBtn").addEventListener("click", () => {
      sfx("select");
      if (!hasSave) {
        state = defaultState();
        state.started = true;
        save();
        state.phase = "morning";
      }
      closeOverlay();
      stage.classList.remove("is-title");
      render();
    });
    if (hasSave) {
      $("newBtn").addEventListener("click", () => {
        state = defaultState();
        state.started = true;
        save();
        closeOverlay();
        stage.classList.remove("is-title");
        state.phase = "morning";
        render();
      });
    }
  }

  /* ---------------- boot ---------------- */

  function boot() {
    const saved = load();
    if (saved) state = saved;
    const hasSave = !!saved;
    if (hasSave && state.phase !== "morning") {
      // Resume mid-flow safely: settle to a stable phase.
      if (state.phase === "away" || state.phase === "dusk" || state.phase === "late") {
        state.phase = "morning";
        state.bundle = [];
        state.trip = null;
      }
    }
    showTitle(hasSave);

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay && !overlay.dataset.locked) closeOverlay();
    });

    $("albumBtn").addEventListener("click", openAlbum);
    $("shelfBtn").addEventListener("click", openShelf);
    $("soundBtn").addEventListener("click", () => {
      state.muted = !state.muted;
      save();
      $("soundBtn").textContent = state.muted ? "静" : "声";
      if (!state.muted) sfx("tap");
      toast(state.muted ? "声音关上了" : "声音打开了");
    });
    $("soundBtn").textContent = state.muted ? "静" : "声";

    rabbitWrap.addEventListener("click", () => {
      const phase = state.phase;
      if (phase !== "morning" && phase !== "rain" && phase !== "night") return;
      if (rabbitWrap.classList.contains("is-away")) return;
      rabbitWrap.classList.remove("is-petted");
      void rabbitWrap.offsetWidth;
      rabbitWrap.classList.add("is-petted");
      setTimeout(() => rabbitWrap.classList.remove("is-petted"), 600);
      sfx("select");
      toast(rand(PET_LINES));
    });

    window.addEventListener("resize", () => {
      placeGarden();
      clearTimeout(toastTimer);
    }, { passive: true });
  }

  boot();
})();
