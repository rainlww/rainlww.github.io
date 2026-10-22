(() => {
'use strict';
const L = window.MINGRUO;
const $ = s => document.querySelector(s);
const rnd = Math.random;
const pick = a => Array.isArray(a) ? a[Math.floor(rnd() * a.length)] : a;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const fmt = n => Math.round(n).toLocaleString('zh-CN');

const A = {
  table: 'assets/prop-table-hotpot-copper-pot-stage.webp',
  stove: 'assets/prop-stove-wok-flame-upgrade-icon.webp',
  lantern: 'assets/prop-lantern-red-paper-stage.webp',
  base: 'assets/item-soup-base-tallow-stock-icon.webp',
  meat: 'assets/item-offal-tripe-duck-intestine-stock-icon.webp',
  beef: 'assets/item-beef-spicy-slices-menu-icon.webp',
  veg: 'assets/item-veg-platter-stock-icon.webp',
  plum: 'assets/item-plum-drink-jug-menu-icon.webp',
  danger: 'assets/item-danger-spicy-chili-jar-menu-icon.webp',
  note: 'assets/ui-mingruo-note-knife-voice-icon.webp',
  coins: 'assets/ui-coins-cash-string-hud-icon.webp',
  helper: 'assets/staff-kitchen-helper-cleaver-stage.webp',
  server: 'assets/staff-server-tray-stage.webp',
  custA: 'assets/customer-a-straw-hat-man-stage.webp',
  custB: 'assets/customer-b-lavender-fan-woman-stage.webp',
  yuanyang: 'assets/item-base-yuanyang-hotpot-menu-icon.webp',
  jiugong: 'assets/item-base-jiugong-ninegrid-menu-icon.webp',
  tengjiao: 'assets/item-base-tengjiao-green-pepper-menu-icon.webp',
  fanqie: 'assets/item-base-fanqie-tomato-menu-icon.webp',
  ciba: 'assets/item-snack-ciba-brown-sugar-menu-icon.webp',
  suxiao: 'assets/item-snack-suxiao-fried-pork-menu-icon.webp',
  bingfen: 'assets/item-snack-bingfen-ice-jelly-menu-icon.webp',
  tangyou: 'assets/item-snack-tangyou-sugar-balls-menu-icon.webp',
  bench: 'assets/upgrade-bench-waiting-queue-icon.webp',
  banquet: 'assets/upgrade-table-round-banquet-icon.webp',
  fire: 'assets/upgrade-stove-big-fire-icon.webp',
  upstairs: 'assets/upgrade-upstairs-private-room-icon.webp',
  tea: 'assets/upgrade-tea-free-waiting-icon.webp',
  train: 'assets/upgrade-knife-roll-staff-training-icon.webp',
  'sp-secretpot': 'assets/sp-secretpot.webp', 'sp-spicebox': 'assets/sp-spicebox.webp',
  'dim-hargow': 'assets/sp-hargow.webp', 'dim-xiaolong': 'assets/sp-xiaolong.webp', 'dim-cheungfun': 'assets/sp-cheungfun.webp',
  'dim-turnipcake': 'assets/sp-turnipcake.webp', 'dim-chickenfeet': 'assets/sp-chickenfeet.webp', 'dim-eggtart': 'assets/sp-eggtart.webp',
  'dim-shuangpinai': 'assets/sp-shuangpinai.webp', 'dim-redbean': 'assets/sp-redbean.webp', 'dim-jiuniang': 'assets/sp-jiuniang.webp',
  'dim-lotusrice': 'assets/sp-lotusrice.webp', 'dim-tarocake': 'assets/sp-tarocake.webp', 'dim-sesameball': 'assets/sp-sesameball.webp',
  'drink-puer': 'assets/sp-puer.webp', 'su-dimsumset': 'assets/sp-dimsumset.webp',
  'su-shopfront': 'assets/su-shopfront.webp', 'su-premium': 'assets/su-premium.webp', 'su-chef': 'assets/su-chef.webp',
  'su-plaque': 'assets/su-plaque.webp', 'su-banner': 'assets/su-banner.webp', 'su-crates': 'assets/su-crates.webp',
  'su-gatepass': 'assets/su-gatepass.webp', 'su-pricetag': 'assets/su-pricetag.webp', 'su-oils': 'assets/su-oils.webp',
  'su-tongs': 'assets/su-tongs.webp', 'su-letter': 'assets/su-letter.webp', 'su-tableset': 'assets/su-tableset.webp',
  'su-paste': 'assets/su-paste.webp', 'su-scroll': 'assets/su-scroll.webp', 'su-ladle': 'assets/su-ladle.webp', 'su-jade': 'assets/su-jade.webp',
  coldstore: 'assets/up-coldstore.webp', fame: 'assets/up-fame.webp', clerk: 'assets/up-clerk.webp',
  cushion: 'assets/up-cushion.webp', stockpot: 'assets/up-stockpot.webp', trolley: 'assets/up-trolley.webp',
  herbs: 'assets/up-herbs.webp', porter: 'assets/up-porter.webp',
  'meat-tripe': 'assets/item-offal-tripe-duck-intestine-stock-icon.webp',
  'meat-aorta': 'assets/ing-meat-aorta-huanghou.webp',
  'meat-omasum': 'assets/ing-meat-omasum-baixie.webp',
  'meat-blood': 'assets/ing-meat-duck-blood.webp',
  'meat-shrimp': 'assets/ing-meat-shrimp-paste.webp',
  'meat-ball': 'assets/ing-meat-meatballs.webp',
  'veg-shoot': 'assets/ing-veg-bamboo-shoot.webp',
  'veg-lotus': 'assets/ing-veg-lotus-root.webp',
  'veg-mushroom': 'assets/ing-veg-shiitake.webp',
  'veg-cowpea': 'assets/ing-veg-pickled-cowpea.webp',
  'side-rice': 'assets/side-rice.webp',
  'side-sauce': 'assets/side-sauce-tray.webp',
  'drink-barley': 'assets/drink-barley-tea.webp',
  'drink-ricewine': 'assets/drink-rice-wine.webp',
  'drink-jasmine': 'assets/drink-jasmine-tea.webp',
  'drink-soy': 'assets/drink-soy-milk.webp',
  'drink-mung': 'assets/drink-mung-bean.webp',
  'drink-plum': 'assets/item-plum-drink-jug-menu-icon.webp',
  'meat-beef': 'assets/meat-beef-fat.webp', 'meat-lamb': 'assets/meat-lamb.webp', 'meat-lambroll': 'assets/meat-lamb-roll.webp',
  'meat-lambbone': 'assets/meat-lamb-cartilage.webp', 'meat-squid': 'assets/meat-squid.webp', 'meat-duckint': 'assets/meat-duck-intestine.webp',
  'meat-quail': 'assets/meat-quail-egg.webp', 'meat-fish': 'assets/meat-fish-slice.webp',
  'veg-enoki': 'assets/veg-enoki.webp', 'veg-seafoodmush': 'assets/veg-seafood-mushroom.webp', 'veg-kingoyster': 'assets/veg-king-oyster.webp',
  'veg-oyster': 'assets/veg-oyster-mushroom.webp', 'veg-crabmush': 'assets/veg-crab-mushroom.webp', 'veg-bamboof': 'assets/veg-bamboo-fungus.webp',
  'veg-woodear': 'assets/veg-wood-ear.webp', 'veg-kelp': 'assets/veg-kelp-knot.webp', 'veg-tofu': 'assets/veg-tofu.webp',
  'veg-tofuskin': 'assets/veg-tofu-skin.webp', 'veg-tofustick': 'assets/staple-tofu-stick.webp', 'veg-fishtofu': 'assets/staple-fish-tofu.webp',
  'veg-wintermelon': 'assets/veg-winter-melon.webp', 'veg-yam': 'assets/veg-yam.webp', 'veg-cabbage': 'assets/veg-baby-cabbage.webp',
  'veg-potato': 'assets/veg-potato.webp', 'veg-radish': 'assets/veg-white-radish.webp', 'veg-lettuce': 'assets/veg-lettuce.webp',
  'veg-bokchoy': 'assets/veg-bok-choy.webp',
  'staple-rice': 'assets/side-rice.webp', 'staple-noodle': 'assets/staple-noodle.webp', 'staple-widenoodle': 'assets/staple-wide-noodle.webp',
  'staple-vermicelli': 'assets/staple-vermicelli.webp', 'staple-ricecake': 'assets/staple-rice-cake.webp', 'staple-gluten': 'assets/staple-fried-gluten.webp',
  regLaozhou: 'assets/reg-laozhou-accountant-abacus-stage.webp',
  regAqin: 'assets/reg-aqin-flower-seller-stage.webp',
  regChen: 'assets/reg-chen-carpenter-apron-stage.webp',
  regWang: 'assets/reg-wang-grandmother-stick-stage.webp',
  regXiaojin: 'assets/reg-xiaojin-courier-sash-stage.webp',
  regLiu: 'assets/reg-liu-scholar-book-stage.webp',

  cVendor: 'assets/cust-vendor-boy-riceballs-stage.webp',
  cVegGranny: 'assets/cust-veg-granny-basket-stage.webp',
  cLabourer: 'assets/cust-labourer-straw-hat-stage.webp',
  cWaiter: 'assets/cust-waiter-towel-stage.webp',
  cMother: 'assets/cust-mother-baby-sling-stage.webp',
  cMerchant: 'assets/cust-merchant-green-robe-stage.webp',
  cGirl: 'assets/cust-girl-red-jacket-stage.webp',
  cOldScholar: 'assets/cust-scholar-old-fan-stage.webp',
  cTownswoman: 'assets/cust-townswoman-basket-stage.webp'
};

const CFG = {
  nightDur: 28, peakWin: [10, 20], firstVisit: 7, gap: [7, 14],
  tableSlots: [[38, 68], [62, 68], [86, 68], [28, 93], [52, 93], [76, 93]],
  queueSlots: [[4, 99], [9.5, 99], [15, 99], [4, 93.5], [9.5, 93.5], [15, 93.5], [4, 88], [9.5, 88]],
  helperSlots: [[50, 51], [74, 51]],
  serverHomes: [[41, 84], [64, 84], [90, 84]],
  stoveSlots: [[66, 46.5], [70.2, 46.5], [74.4, 46.5]],
  lanternSlots: [[34.5, -1], [50, -1], [65.5, -1]],
  stairs: [40.5, 47], bench: [14, 104], tea: [16, 41],
  exit: [1, 106]
};
const MAX = { tables: 6, stove: 3, lanterns: 3, helpers: 2, servers: 3 };
// 赤莲街的日子：每十二天一轮，日子落在哪一天就过什么节
const OCCASIONS = {
  liyuan: { label: '梨香园开箱', sub: '一票难求的戏今晚开箱，看戏的人先来涮锅', arr: 1.45, pat: 0.78, tick: 1.2, stage: true },
  clinic: { label: '寒草庐义诊', sub: '林清落从早忙到天黑，来的人点得清淡', arr: 0.85, pat: 1.15, tick: 1.0, veg: 6 },
  rain: { label: '雨天', sub: '街上没什么人，可坐下来的都不急着走', arr: 0.55, pat: 1.4, tick: 1.0, snack: 1.7 },
  lantern: { label: '福禄湖放灯', sub: '湖边灯火，散场的人一拨拨往店里涌', arr: 1.3, pat: 1.05, tick: 1.05, rep: 1.4 },
  sufamily: { label: '苏家规矩日', sub: '苏家的人过来坐坐。今晚跑一桌，比平时难交代', arr: 1.0, pat: 1.0, tick: 1.0, strict: 2 }
};
const OCC_DAY = { 3: 'liyuan', 5: 'clinic', 6: 'rain', 9: 'lantern', 11: 'sufamily' };
const occasion = (d = S.day) => OCC_DAY[((d - 1) % 12) + 1] || null;
const occ = () => OCCASIONS[occasion()] || {};
const COST = {
  table: n => 80 * n - 80,
  stove: lv => [0, 0, 260, 480][lv],
  lantern: lv => [0, 100, 180, 280][lv],
  helper: 80, server: 70,
  stock: { base: { qty: 5, price: 40 }, meat: { qty: 5, price: 45 }, veg: { qty: 5, price: 20 } },
  menu: { beef: 180, plum: 120, danger: 260 }
};
const WAGE = { helper: 40, server: 35 };
const BASES = [
  { k: 'red', label: '牛油红汤', cost: 0, price: 0, desc: '本店的命根子。' },
  { k: 'yuanyang', label: '鸳鸯锅', cost: 120, price: 6, mild: true, desc: '一半红汤、一半菌汤。不吃辣的人也坐得下；第 36 天起老客会点。' },
  { k: 'jiugong', label: '九宫格', cost: 180, price: 9, desc: '老重庆的吃法。格子多，客人点得也讲究，每桌多收钱。' },
  { k: 'tengjiao', label: '藤椒锅', cost: 220, price: 10, desc: '麻得清亮，赤莲街的年轻人认这个。' },
  { k: 'secret', label: '明若的私家秘制锅', cost: 600, price: 22, secret: true, icon: 'sp-secretpot', desc: '明若亲手炒的方子，一天只出几锅。要口碑到 55 才肯拿出来。' },
  { k: 'fanqie', label: '番茄红油锅', cost: 200, price: 8, desc: '酸甜打底，最后再浇一勺红油——明若的折中法子。' }
];
// 每种锅底单独备料：w = 客人点它的分量，buy = 五份进价
const POTS = [
  { k: 'red', label: '牛油锅底', icon: 'base', w: 5, buy: 40 },
  { k: 'yuanyang', label: '鸳鸯锅', icon: 'yuanyang', w: 2, buy: 45 },
  { k: 'jiugong', label: '九宫格', icon: 'jiugong', w: 2, buy: 50 },
  { k: 'tengjiao', label: '藤椒锅', icon: 'tengjiao', w: 2, buy: 55 },
  { k: 'fanqie', label: '番茄红油锅', icon: 'fanqie', w: 2, buy: 45 },
  { k: 'secret', label: '明若的私家秘制锅', icon: 'sp-secretpot', w: 1.2, buy: 80 },
  { k: 'danger', label: '危辣锅底', icon: 'danger', w: 1, buy: 70 }
];
// 涮菜：荤、素分开点，客人按自己那桌的规矩挑
const MEATS = [
  { k: 'tripe', label: '毛肚', price: 14, buy: 45, w: 2.2, desc: '七上八下，脆的那一口。' },
  { k: 'aorta', label: '黄喉', price: 13, buy: 42, w: 1.2, desc: '猪黄喉，烫到卷起来就捞。' },
  { k: 'omasum', label: '百叶', price: 12, buy: 40, w: 1.0, desc: '牛百叶，涮两下就熟。' },
  { k: 'beef', label: '肥牛', price: 15, buy: 48, w: 1.9, desc: '薄切，白脂花得漂亮。' },
  { k: 'lamb', label: '羊肉', price: 16, buy: 52, w: 1.4, desc: '薄片，骚香。' },
  { k: 'lambroll', label: '羊肉卷', price: 15, buy: 48, w: 1.3, desc: '一卷一卷立着下锅。' },
  { k: 'lambbone', label: '高钙羊肉', price: 18, buy: 58, w: 0.6, desc: '带一小条软骨，嚼着香。' },
  { k: 'squid', label: '火箭鱿鱼', price: 17, buy: 55, w: 0.5, desc: '整只的，卷起来就熟。' },
  { k: 'duckint', label: '鸭肠', price: 14, buy: 45, w: 1.1, desc: '冰镇着，烫十秒。' },
  { k: 'quail', label: '鹌鹑蛋', price: 8, buy: 26, w: 0.8, desc: '一小篮，浮在红汤里。' },
  { k: 'fish', label: '鱼片', price: 13, buy: 42, w: 0.9, desc: '白身鱼，嫩。' },
  { k: 'blood', label: '鸭血', price: 9, buy: 30, w: 1.1, desc: '嫩，滑，红汤里滚一圈。' },
  { k: 'shrimp', label: '虾滑', price: 16, buy: 55, w: 0.8, desc: '现打的，挤成小团下锅。' },
  { k: 'ball', label: '丸子', price: 10, buy: 32, w: 1.0, desc: '牛肉丸、鱼丸混着来。' }
];
const VEGS = [
  { k: 'shoot', label: '笋尖', price: 9, buy: 26, w: 1.2, desc: '春笋尖，清口。' },
  { k: 'lotus', label: '藕片', price: 7, buy: 20, w: 1.0, desc: '切得薄，煮久了也不散。' },
  { k: 'mushroom', label: '香菇', price: 8, buy: 22, w: 1.5, desc: '厚伞的，吸汤。' },
  { k: 'enoki', label: '金针菇', price: 6, buy: 18, w: 1.5, desc: '一把一把，吸满红油。' },
  { k: 'seafoodmush', label: '海鲜菇', price: 7, buy: 20, w: 1.0, desc: '细长，脆。' },
  { k: 'kingoyster', label: '杏鲍菇', price: 8, buy: 22, w: 1.1, desc: '厚片，煮出肉味。' },
  { k: 'oyster', label: '平菇', price: 6, buy: 18, w: 0.9, desc: '散开的灰伞。' },
  { k: 'crabmush', label: '蟹味菇', price: 7, buy: 20, w: 0.8, desc: '小头褐帽，一把。' },
  { k: 'bamboof', label: '竹荪', price: 12, buy: 36, w: 0.6, desc: '白纱网兜，吸汤最凶。' },
  { k: 'woodear', label: '木耳', price: 6, buy: 18, w: 0.9, desc: '脆，咯吱响。' },
  { k: 'kelp', label: '海带结', price: 5, buy: 15, w: 1.0, desc: '打成一个结，咸鲜。' },
  { k: 'cowpea', label: '泡豇豆', price: 6, buy: 16, w: 0.7, desc: '明若自家坛子里泡的，酸脆。' },
  { k: 'tofu', label: '豆腐', price: 5, buy: 15, w: 0.9, desc: '老豆腐，扛煮。' },
  { k: 'tofuskin', label: '豆皮', price: 6, buy: 18, w: 0.8, desc: '一层层揭下来的。' },
  { k: 'tofustick', label: '腐竹', price: 6, buy: 18, w: 0.8, desc: '泡开了再下锅。' },
  { k: 'fishtofu', label: '鱼豆腐', price: 7, buy: 20, w: 0.8, desc: '金黄的方块，弹牙。' },
  { k: 'wintermelon', label: '冬瓜', price: 5, buy: 15, w: 0.8, desc: '透绿，清甜。' },
  { k: 'yam', label: '山药', price: 6, buy: 18, w: 0.7, desc: '雪白一片，滑。' },
  { k: 'cabbage', label: '娃娃菜', price: 5, buy: 15, w: 1.0, desc: '嫩黄的小棵。' },
  { k: 'potato', label: '土豆片', price: 5, buy: 15, w: 1.0, desc: '切厚点，煮到粉。' },
  { k: 'radish', label: '白萝卜', price: 4, buy: 12, w: 0.8, desc: '透亮，越煮越甜。' },
  { k: 'lettuce', label: '生菜', price: 4, buy: 12, w: 0.9, desc: '一烫就好。' },
  { k: 'bokchoy', label: '小油菜', price: 4, buy: 12, w: 0.9, desc: '绿杆子，脆。' }
];
// 主食：面、粉、年糕、油面筋
const STAPLES = [
  { k: 'rice', label: '米饭', price: 3, buy: 8, w: 2.0, desc: '红汤泡饭，赤莲街的吃法。' },
  { k: 'noodle', label: '面条', price: 5, buy: 14, w: 1.3, desc: '细面，最后下。' },
  { k: 'widenoodle', label: '宽粉', price: 6, buy: 16, w: 1.0, desc: '灰白的宽粉，滑溜溜。' },
  { k: 'vermicelli', label: '粉丝', price: 5, buy: 14, w: 0.8, desc: '透亮，一烫就软。' },
  { k: 'ricecake', label: '年糕', price: 6, buy: 16, w: 0.7, desc: '白片片，糯。' },
  { k: 'gluten', label: '油面筋', price: 6, buy: 16, w: 0.7, desc: '金黄的空心球，吸满汤。' },
  { k: 'sauce', label: '小料台', price: 4, buy: 10, desc: '麻酱、辣油、蒜末。点一次管一晚。' }
];
// 饮品：冷饮与热饮，客人自己挑
// 下午才做的点心：只在前半夜卖，卖完就没了
const DIMSUM = [
  { k: 'hargow', label: '虾饺', price: 12, buy: 30, w: 1.4, desc: '水晶皮，一笼四只。' },
  { k: 'xiaolong', label: '小笼包', price: 11, buy: 28, w: 1.3, desc: '皮薄，先咬个小口。' },
  { k: 'cheungfun', label: '肠粉', price: 9, buy: 24, w: 1.1, desc: '米浆蒸的，淋一点豉油。' },
  { k: 'turnipcake', label: '萝卜糕', price: 8, buy: 22, w: 1.0, desc: '煎到两面金黄。' },
  { k: 'chickenfeet', label: '豉汁凤爪', price: 10, buy: 26, w: 1.0, desc: '蒸得脱骨，一吮就下来。' },
  { k: 'eggtart', label: '蛋挞', price: 7, buy: 18, w: 0.9, desc: '酥皮，趁热。' },
  { k: 'shuangpinai', label: '双皮奶', price: 8, buy: 20, w: 0.8, desc: '奶皮厚，甜的。' },
  { k: 'redbean', label: '红豆沙', price: 6, buy: 16, w: 0.8, desc: '熬到起沙。' },
  { k: 'jiuniang', label: '酒酿圆子', price: 8, buy: 20, w: 0.9, desc: '桂花一撒，甜汤里浮着小圆子。' },
  { k: 'lotusrice', label: '荷叶糯米鸡', price: 13, buy: 32, w: 1.1, desc: '荷叶包着蒸，拆开一股清香。' },
  { k: 'tarocake', label: '芋头糕', price: 8, buy: 20, w: 0.9, desc: '芋头切丁，煎到边角脆。' },
  { k: 'sesameball', label: '煎堆', price: 7, buy: 18, w: 0.8, desc: '芝麻裹满，咬开空心的。' }
];
const DRINKS = [
  { k: 'barley', label: '大麦茶', price: 5, buy: 12, temp: 'hot', desc: '热的，解腻。' },
  { k: 'ricewine', label: '米酒', price: 12, buy: 22, temp: 'hot', desc: '温热的一小壶，两杯。' },
  { k: 'jasmine', label: '花茶', price: 8, buy: 16, temp: 'hot', desc: '茉莉香，一壶一盅。' },
  { k: 'soy', label: '豆浆', price: 6, buy: 14, temp: 'hot', desc: '热的，甜口。' },
  { k: 'mung', label: '绿豆沙', price: 10, buy: 18, temp: 'cold', desc: '冰的，压辣。' },
  { k: 'plum', label: '酸梅汤', price: 8, buy: 14, temp: 'cold', desc: '冰镇的，门口等位的人最需要。' },
  { k: 'puer', label: '老普洱', price: 9, buy: 16, temp: 'hot', desc: '陈茶，配点心最合适。' }
];
const SNACKS = [
  { k: 'ciba', label: '红糖糍粑', cost: 90, price: 6, rep: 0.2, desc: '外脆里糯，趁热吃。' },
  { k: 'suxiao', label: '软炸小酥肉', cost: 120, price: 9, rep: 0.3, desc: '客人等锅的时候先垫一口，脾气都好些。' },
  { k: 'bingfen', label: '红糖冰粉', cost: 110, price: 8, patience: 0.12, desc: '一口下去，辣劲就压住了。客人更耐等。' },
  { k: 'tangyou', label: '糖油果子', cost: 80, price: 5, rep: 0.2, desc: '甜口的小东西，小孩子最爱。' }
];
const UPG = {
  coldstore: { max: 2, cost: [600, 1500] },
  fame: { max: 2, cost: [800, 2200] },
  clerk: { max: 2, cost: [900, 2000] },
  cushion: { max: 2, cost: [400, 1100] },
  stockpot: { max: 1, cost: [700] },
  trolley: { max: 2, cost: [650, 1600] },
  herbs: { max: 2, cost: [500, 1300] },
  porter: { max: 2, cost: [450, 1200] },
  upstairs: { max: 2, cost: [1200, 2600] },
  tableTier: { max: 3, cost: [0, 600, 1400] },
  fireTier: { max: 3, cost: [0, 700, 1600] },
  bench: { max: 2, cost: [300, 700] },
  tea: { max: 1, cost: [260] },
  train: { max: 2, cost: [500, 1200] }
};
const UP_SLOTS = [[37, 43], [44, 43], [37, 37], [44, 37], [31, 50], [26, 56]];
// 苏家门路：用苏家认可换，认可不够再拿钱补；每样只换一次
const SU = [
  { k: 'annex', icon: 'su-shopfront', name: '盘下隔壁铺面', su: 40, cash: 6000,
    desc: '隔壁那间关了半年的铺子。盘下来打通，再加两个雅座——但养护也跟着涨。' },
  { k: 'plaque', icon: 'su-plaque', name: '苏家题匾', su: 28, cash: 2200,
    desc: '让苏有盛亲题一块匾挂在门头。招牌一响，来的人多两成。' },
  { k: 'chef', icon: 'su-chef', name: '苏家借人', su: 18, cash: 1200,
    desc: '苏家的老厨来带三天。出锅快三成，工钱只多一点点。' },
  { k: 'premium', icon: 'su-premium', name: '苏家批货', su: 16, cash: 900,
    desc: '走苏家的路子进好货：每样涮菜都值钱一点，货也少坏一些。' },
  { k: 'oils', icon: 'su-oils', name: '老油子', su: 12, cash: 700, desc: '苏家窖里存的老油，锅底更香，每桌多收一点。' },
  { k: 'paste', icon: 'su-paste', name: '秘制辣酱', su: 10, cash: 500, desc: '小料台上添一罐，客人调得更起劲，口碑涨得快。' },
  { k: 'gatepass', icon: 'su-gatepass', name: '城门路引', su: 14, cash: 800, desc: '进货的城门不用排队，菜更新鲜，价也压得下来。' },
  { k: 'crates', icon: 'su-crates', name: '成批进货', su: 9, cash: 400, desc: '一次进一大车，单价再降一成。' },
  { k: 'pricetag', icon: 'su-pricetag', name: '苏家定价', su: 11, cash: 600, desc: '照着苏家的行情定价，每桌多收三文，客人也不觉得贵。' },
  { k: 'tableset', icon: 'su-tableset', name: '好桌好凳', su: 8, cash: 400, desc: '苏家木匠做的一套桌椅，客人坐得舒服些。' },
  { k: 'banner', icon: 'su-banner', name: '门头挂幡', su: 6, cash: 300, desc: '一面红幡挂在门口，风一吹，半条街都看见。' },
  { k: 'letter', icon: 'su-letter', name: '苏家引荐', su: 13, cash: 900, desc: '苏家写封信，引荐青蓝书屋的客人过来。来客里多了些读书人。' },
  { k: 'scroll', icon: 'su-scroll', name: '墙上挂画', su: 4, cash: 200, desc: '挂一张山水，店里体面些，客人也更耐等。' },
  { k: 'tong', icon: 'su-tongs', name: '铁夹铁桶', su: 7, cash: 260, desc: '后厨的夹子和炭桶，出锅更快一点。' },
  { k: 'ladle', icon: 'su-ladle', name: '好勺好笊篱', su: 5, cash: 200, desc: '趁手的东西省力气，跑堂上菜更快。' },
  { k: 'jade', icon: 'su-jade', name: '苏家玉佩', su: 20, cash: 0, desc: '苏家给的信物。往后每次视察，苏家都另眼相看。' }
];
const suDone = k => !!(S.suBought && S.suBought[k]);
const suLack = it => Math.max(0, it.su - S.su);
const suCost = it => Math.round(it.cash * suLack(it) / it.su);
const PRICE = { base: 30, beef: 14, danger: 60 };
const DANGER_REP = 40;
const FRIENDS = ['林清落', '俞朝鸿', '阿芷', '索尔薇格', '荷穆勒夏', '祝长卿'];
// 结伴来的：更少见。key 用“甲+乙”，event/line 单独写
const PAIRS = [
  { k: 'hexia+samuel', members: ['荷穆勒夏', '塞缪尔'], w: 0.35 },
  { k: 'ispela+beran', members: ['伊斯派菈', '贝兰斯坦'], w: 0.8 }
];
const ALL_FRIEND_KEYS = [...FRIENDS, ...PAIRS.map(p => p.k)];
const CROWD = ['custA', 'custB', 'cVendor', 'cVegGranny', 'cLabourer', 'cWaiter', 'cMother', 'cMerchant', 'cGirl', 'cOldScholar', 'cTownswoman', 'regLaozhou', 'regAqin', 'regChen', 'regWang', 'regXiaojin', 'regLiu'];
const crowdArt = () => A[pick(CROWD)];
const SAVE_KEY = 'chengyu-lazi-shop-v1';

/* ---------------- state ---------------- */
// 开局只按第一晚的客流备料：两桌、约六桌客
function starterDishes(pool, total) {
  const wsum = pool.reduce((a, x) => a + (x.w || 1), 0);
  const raw = pool.map(x => total * (x.w || 1) / wsum);
  const base = raw.map(v => Math.floor(v));
  let rem = total - base.reduce((a, b) => a + b, 0);
  const order = raw.map((v, i) => ({ i, f: v - Math.floor(v) })).sort((a, b) => b.f - a.f);
  for (let k = 0; k < rem; k++) base[order[k % order.length].i]++;
  const out = {};
  pool.forEach((x, i) => { out[x.k] = base[i]; });
  return out;
}
function newState() {
  return {
    day: 1, money: 300, rep: 10, tables: 2, stove: 1, lanterns: 0, helpers: 0, servers: 0,
    drinks: { barley: false, ricewine: false, jasmine: false, soy: false, mung: false, plum: false, puer: false },
    stock: { pot: { red: 7 }, ing: Object.assign(
      starterDishes(MEATS, 10),        // 头一晚两桌，够用就行
      starterDishes(VEGS, 8),
      starterDishes(STAPLES.filter(x => x.k !== 'sauce'), 2)
    )},
    menu: { beef: false, plum: false, danger: false, base: { red: true }, snack: {} },
    tableTier: 1, fireTier: 1, upstairs: 0, bench: 0, tea: 0, train: 0, suToken: 0,
    coldstore: 0, fame: 0, clerk: 0, cushion: 0, stockpot: 0, trolley: 0, herbs: 0, porter: 0,
    annex: 0, premium: 0, oils: 0, paste: 0, gatepass: 0, crates: 0, pricetag: 0, tableset: 0, banner: 0, letter: 0, scroll: 0, tong: 0, ladle: 0, jade: 0, suBought: {},
    suChef: 0, suChefUntil: 0, plaque: 0,
    sauce: false, foldIng: true,
    mode: 'daily', friendsSeen: [], bailouts: 0, totalIncome: 0, totalServed: 0,
    su: 0, nextVisit: 7, warnings: 0, inspections: 0, friendNext: 2, dangerSince: 0, danger21: false, pendingFriend: '',
    roundIncome: 0, roundServed: 0, roundStartDay: 1, lastGrade: '', noticed: 0, wageLevel: 0, raiseAsked: 0,
    phase: 'closed', ended: false
  };
}
function load() {
  try {
    const s = JSON.parse(localStorage.getItem(SAVE_KEY) || 'null');
    if (s && typeof s.day === 'number' && s.stock && s.menu) {
      const st = Object.assign(newState(), s);
      const n = newState();
      st.menu = Object.assign({}, n.menu, st.menu || {});
      st.menu.base = Object.assign({ red: true }, (st.menu && st.menu.base) || {});
      st.menu.snack = Object.assign({}, (st.menu && st.menu.snack) || {});
    delete st.regulars;
      if (!st.stock.pot) {                       // 旧存档：共用锅底 → 牛油锅底；已上架的锅底送 5 份起步料
        st.stock.pot = { red: typeof st.stock.base === 'number' ? st.stock.base : 6 };
        for (const k of Object.keys(st.menu.base)) if (k !== 'red' && st.menu.base[k]) st.stock.pot[k] = 5;
        if (st.menu.danger) st.stock.pot.danger = 3;
        delete st.stock.base;
      }
      if (!st.stock.ing) {                       // 旧存档：荤/素 → 具体的几样涮菜
        const m = st.stock.meat || 0, v = st.stock.veg || 0;
        st.stock.ing = { tripe: m, aorta: m, omasum: m, blood: m, shrimp: 0, ball: m, shoot: v, lotus: v, mushroom: v, cowpea: v };
        delete st.stock.meat; delete st.stock.veg;
      }
      // 找回过买过的水：老的 unlocks、老的整箱库存、老的酸梅汤菜单，都算已上架
      st.drinks = Object.assign({}, st.drinks || {});
      if (st.stock && st.stock.drink) { for (const k of Object.keys(st.stock.drink)) if (st.stock.drink[k] > 0) st.drinks[k] = true; delete st.stock.drink; }
      if (st.menu && st.menu.plum) st.drinks.plum = true;
      for (const k of ['barley', 'ricewine', 'jasmine', 'soy', 'mung', 'plum', 'puer']) if (st.drinks[k] === undefined) st.drinks[k] = false;
      if (st.stock.dim) { for (const k of Object.keys(st.stock.dim)) if (st.stock.dim[k] > 0) st.menu.snack[k] = true; delete st.stock.dim; }
      if (st.sauce === undefined) st.sauce = false;
      if (st.ended && st.ended !== 'broke') st.ended = false;
      if (!st.nextVisit || st.nextVisit < st.day) st.nextVisit = st.day + 7;
      if (!st.friendNext) st.friendNext = st.day + 1;
      if (!st.pendingFriend) st.pendingFriend = '';
      if (!st.dangerSince) st.dangerSince = 0;
      return st;
    }
  } catch (e) { /* ignore */ }
  return null;
}
function save() { try { localStorage.setItem(SAVE_KEY, JSON.stringify(S)); } catch (e) { /* ignore */ } }
let S = load() || newState();
let N = null;            // night state
let tab = 'fix';
let speed = 1;

/* ---------------- voice ---------------- */
const voiceEl = $('#voice'), voiceText = $('#voiceText'), voiceWho = $('#voiceWho');
function say(text, who) {
  voiceWho.textContent = who || (S.phase === 'night' ? '明若 · 后厨门帘后' : '明若 · 柜台上的字条');
  voiceText.textContent = text;
  voiceEl.classList.remove('pop'); void voiceEl.offsetWidth; voiceEl.classList.add('pop');
}
function sayNight(text, prio) {
  if (!N) return;
  if (prio || N.t - N.lastSay > 3.2) { N.lastSay = N.t; say(text); }
}

/* ---------------- stage ---------------- */
const stage = $('#stage'), layer = $('#layer');
let tableEls = [], serverEls = [];
function setPos(el, x, y) { el.style.left = x + '%'; el.style.top = y + '%'; el.style.zIndex = Math.round(y * 10) + 100; }
function sprite(src, cls, x, y, w) {
  const el = document.createElement('div');
  el.className = 'spr ' + cls;
  el.innerHTML = `<img src="${src}" alt="" draggable="false">`;
  el.style.width = w + '%';
  setPos(el, x, y);
  layer.appendChild(el);
  return el;
}
// actors are sized by height, so different-aspect portraits stand the same height
function actor(src, cls, x, y, h) {
  const el = document.createElement('div');
  el.className = 'spr actor ' + cls;
  el.innerHTML = `<img src="${src}" alt="" draggable="false">`;
  el.style.height = h + '%';
  setPos(el, x, y);
  layer.appendChild(el);
  return el;
}
function renderShop() {
  layer.innerHTML = '';
  const tsrc = S.tableTier >= 3 ? A.banquet : A.table;
  tableEls = CFG.tableSlots.slice(0, S.tables).map(([x, y]) => {
    const el = sprite(tsrc, 'table tier' + S.tableTier, x, y, S.tableTier >= 3 ? 15.5 : 15);
    el.insertAdjacentHTML('beforeend', `<div class="tbar"><i></i></div><img class="tdanger" src="${A.danger}" alt="">`);
    return el;
  });
  if (S.annex) { const [ax, ay] = CFG.stairs; const a = sprite(A['su-shopfront'], 'stairs', ax - 9, ay + 6, 7); a.insertAdjacentHTML('beforeend', `<b class="uptag">隔壁铺面 · ${2 * S.annex} 桌</b>`); }
  if (S.upstairs) {
    const [sx, sy] = CFG.stairs;
    const st = sprite(A.upstairs, 'stairs', sx, sy, 7.5);
    st.insertAdjacentHTML('beforeend', `<b class="uptag">楼上 ${2 * S.upstairs} 桌</b>`);
    for (let k = 0; k < 2 * S.upstairs + 2 * S.annex; k++) {
      const [x, y] = UP_SLOTS[k];
      const el = document.createElement('div');
      el.className = 'spr table up';
      el.innerHTML = '<div class="tbar"><i></i></div><img class="tdanger" src="' + A.danger + '" alt="">';
      el.style.width = '6%';
      setPos(el, x, y);
      layer.appendChild(el);
      tableEls.push(el);
    }
  }
  if (S.bench) { const [bx, by] = CFG.bench; sprite(A.bench, 'bench', bx, by, 9 + 2 * S.bench); }
  if (S.tea) { const [tx2, ty2] = CFG.tea; sprite(A.tea, 'tea', tx2, ty2, 5); }
  if (S.phase !== 'night' && S.tables < MAX.tables) {
    const [x, y] = CFG.tableSlots[S.tables];
    sprite(tsrc, 'ghost', x, y, 15);
  }
  for (let i = 0; i < S.lanterns; i++) {
    const [x, y] = CFG.lanternSlots[i];
    const el = sprite(A.lantern, 'hang', x, y, 5.6);
    el.style.animationDelay = (-i * 0.9) + 's';
    el.style.zIndex = 50;
  }
  for (let i = 0; i < S.stove; i++) { const [x, y] = CFG.stoveSlots[i]; sprite(S.fireTier >= 2 ? A.fire : A.stove, 'stove', x, y, S.fireTier >= 2 ? 4.4 : 4.6); }
  for (let i = 0; i < S.helpers; i++) { const [x, y] = CFG.helperSlots[i]; actor(A.helper, 'staff', x, y, 15); }
  serverEls = [];
  for (let i = 0; i < S.servers; i++) {
    const [x, y] = CFG.serverHomes[i];
    const el = actor(A.server, 'staff', x, y, 15);
    el.querySelector('img').style.animationDelay = (-i * 0.7) + 's';
    serverEls.push(el);
  }
  $('#warm').style.setProperty('--warm', (0.05 + 0.09 * S.lanterns).toFixed(2));
  stage.classList.toggle('closed', S.phase !== 'night');
}
function floatText(x, y, text, cls) {
  const el = document.createElement('div');
  el.className = 'float ' + (cls || '');
  el.textContent = text;
  el.style.left = x + '%'; el.style.top = y + '%';
  layer.appendChild(el);
  setTimeout(() => el.remove(), 1300);
}
let toastTimer = 0;
function toast(title, text, ms) {
  const t = $('#toast');
  t.innerHTML = `<b>${title}</b>${text}`;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), ms || 5200);
}

/* ---------------- hud ---------------- */
let lastMoney = S.money;
function renderHUD() {
  const toVisit = S.nextVisit - S.day;
  $('#hudDay').textContent = `第 ${S.day} 天`;
  $('#hudVisit').innerHTML = toVisit <= 0 ? '<b class="due">苏有盛今晚来</b>' : `视察还有 <b class="${toVisit <= 2 ? 'soon' : ''}">${toVisit}</b> 天`;
  $('#hudSu').textContent = Math.round(S.su);
  $('#hudSuFill').style.width = clamp(S.su, 0, 100) + '%';
  $('#hudMoney').textContent = fmt(S.money);
  $('#hudRep').textContent = Math.round(S.rep);
  $('#hudRepFill').style.width = clamp(S.rep, 0, 100) + '%';
  if (S.money !== lastMoney) {
    const m = $('.hud-money'); m.classList.remove('bump'); void m.offsetWidth; m.classList.add('bump');
    lastMoney = S.money;
  }
}

/* ---------------- economy helpers ---------------- */
function lambda(t, mode, st) {
  st = st || S;
  let l = 0.22 * (1 + 0.18 * st.lanterns) * (1 + st.rep / 60) * (0.7 + 0.15 * st.tables) * (mode === 'peak' ? 1.4 : 0.8) * (occ().arr || 1) * (S.buzz === S.day ? 1.1 : 1) * (1 + 0.08 * (st.fame || 0)) * (1 + 0.2 * (st.banner || 0)) * (1 + 0.2 * (st.plaque || 0));
  if (mode === 'peak' && t >= CFG.peakWin[0] && t < CFG.peakWin[1]) l *= 1.6;
  return l;
}
function forecast(mode) {
  let sum = 0;
  for (let t = 0; t < CFG.nightDur; t += 0.5) sum += lambda(t, mode) * 0.5;
  return sum;
}
const totalTables = () => S.tables + 2 * S.upstairs + 2 * S.annex;
const slotOf = i => i < S.tables ? CFG.tableSlots[i] : UP_SLOTS[i - S.tables];
const isUp = i => i >= S.tables && i < S.tables + 2 * S.upstairs;
const isAnnex = i => i >= S.tables + 2 * S.upstairs;
const stoveCap = () => S.stove + (S.fireTier >= 3 ? 1 : 0);
const bases = () => BASES.filter(b => S.menu.base[b.k]);
const potOn = k => k === 'red' || (k === 'danger' ? !!S.menu.danger : !!S.menu.base[k]);
const pots = () => POTS.filter(x => potOn(x.k));
const potOf = k => POTS.find(x => x.k === k);
const potStock = k => S.stock.pot[k] || 0;
const potTotal = () => pots().reduce((a, x) => a + potStock(x.k), 0);
const potShare = k => potOf(k).w / pots().reduce((a, x) => a + x.w, 0);
const potPrice = k => Math.round(potOf(k).buy * priceMult());
const potExtra = k => k === 'danger' ? PRICE.danger : k === 'red' ? 0 : BASES.find(b => b.k === k).price;
const tonight = () => forecast(S.day === S.nextVisit ? 'peak' : S.mode);
const potNeed = k => Math.ceil(tonight() * potShare(k));
const potsShort = () => pots().filter(x => potStock(x.k) < potNeed(x.k));
function pickPot() {
  const on = pots(); let r = rnd() * on.reduce((a, x) => a + x.w, 0);
  for (const x of on) { r -= x.w; if (r <= 0) return x; }
  return on[0];
}
const snacks = () => SNACKS.filter(x => S.menu.snack[x.k]);
const variety = st => 1 + 0.02 * (BASES.filter(b => b.k !== 'red' && st.menu.base && st.menu.base[b.k]).length) + (st.menu.base && st.menu.base.yuanyang ? 0.03 : 0);
const cookTime = () => Math.max(0.35, 3.2 / (1 + 0.45 * (S.helpers + (suChefOn() ? 1 : 0)) * (1 + 0.25 * S.train) + 0.15 * S.tong) * Math.pow(0.82, S.fireTier - 1));
const eatTime = () => Math.max(0.6, 6.5 * (1 - 0.15 * Math.min(S.servers * (1 + 0.25 * S.train), 5)) * Math.pow(0.9, S.trolley + 0.5 * S.ladle));
const queueCap = () => 3 + S.servers + S.bench;
const snackPatience = () => 1 + (S.menu.snack.bingfen ? 0.12 : 0) + (S.sauce ? 0.05 : 0);
const snackRep = () => (S.menu.snack.ciba ? 0.2 : 0) + (S.menu.snack.suxiao ? 0.3 : 0) + (S.menu.snack.tangyou ? 0.2 : 0);
/* ---------------- pressure: rent, wage raises, picky regulars ---------------- */
const era = (d = S.day) => Math.floor((d - 1) / 7);               // 房东每七天涨一次
const wageStep = () => S.wageLevel || 0;                           // 伙计每十天来谈一次涨工钱
const raiseDue = (d = S.day) => d > 1 && (d - 1) % 10 === 0;
// 铺子是苏家自己的，不用交房租；只有日常养护：越老的房子越贵，桌子越多也越贵
const rentFor = (d, tables, up = 0) => Math.round((12 + 18 * era(d)) * (1 + 0.3 * Math.max(0, tables - 2) + 0.15 * (up || 0)));

const rent = () => rentFor(S.day, S.tables, S.upstairs);
const wageMult = () => 1 + 0.2 * wageStep();
const market = (d = S.day) => Math.floor((d - 1) / 10);            // 赤莲街的工钱市价
const hireCost = k => Math.round(COST[k] * (1 + 0.2 * market()));
const priceMult = () => (1 + 0.12 * era()) * priceAdj();
const spoilRatio = () => Math.max(0.2, 0.5 - 0.15 * S.coldstore);
const cushionPat = () => 1 + 0.18 * S.cushion;
const herbsPat = () => 1 + 0.08 * S.herbs;
const herbsRep = () => 1 + 0.12 * S.herbs;
const flatTicket = () => 2 * S.cushion + 3 * S.stockpot + 3 * S.pricetag;
const suChefOn = () => S.suChef && S.suChefUntil >= S.day;
const priceAdj = () => 1 - 0.10 * S.porter - 0.10 * S.crates - 0.05 * S.gatepass;
const spoilAdj = () => spoilRatio() * (1 - 0.10 * S.premium - 0.05 * S.gatepass);
const tickAdj = () => (1 + 0.03 * S.premium + 0.04 * S.oils);
const stockPrice = k => Math.round(COST.stock[k].price * priceMult());
const MENU = { meats: MEATS, vegs: VEGS, drinks: DRINKS, staples: STAPLES };
const findMenu = k => [...MEATS, ...VEGS, ...DRINKS, ...STAPLES, ...SNACKS].find(x => x.k === k);
const ingStock = k => (S.stock.ing || {})[k] || 0;
const isMush = x => /mush|enoki|kingoyster|oyster|woodear|bamboof/.test(x.k);
const GROUPS = {
  meat: { label: '荤菜', pool: () => MEATS, icon: 'meat-tripe', note: '一桌常点两三盘肉', rate: 7 },
  veg: { label: '素菜', pool: () => VEGS.filter(x => !isMush(x)), icon: 'veg-shoot', note: '一桌一两样时蔬，菌菇另算', rate: 4 },
  mush: { label: '菌菇', pool: () => VEGS.filter(isMush), icon: 'veg-mushroom', note: '六成的桌会点一样', rate: 5 },
  staple: { label: '主食', pool: () => STAPLES.filter(x => x.k !== 'sauce'), icon: 'staple-rice', note: '半数的桌会要一份', rate: 3 }
};
// 一晚需要多少份（按预计来客 × 每桌点它的份数）
function groupNeed(g) {
  const tables = tonight();
  const per = g === 'meat' ? 1.7 : g === 'veg' ? 1.4 : g === 'mush' ? 0.55 : 0.5;
  const bookish = S.letter ? 1.08 : 1;
  return Math.ceil(tables * per * bookish);
}
function groupStock(g) {
  return GROUPS[g].pool().reduce((a, x) => a + ingStock(x.k), 0);
}
const catOf = x => MEATS.includes(x) ? 'meat' : STAPLES.includes(x) ? 'staple' : (isMush(x) ? 'mush' : 'veg');
const weightSum = g => GROUPS[g].pool().reduce((a, x) => a + (x.w || 1), 0);
// 把这一组的总需求精确分到每一样：最大余数法，保证加起来正好等于总数
function itemNeeds(g) {
  const total = groupNeed(g), pool = GROUPS[g].pool(), W = weightSum(g);
  const raw = pool.map(x => total * (x.w || 1) / W);
  const base = raw.map(v => Math.floor(v));
  let rem = total - base.reduce((a, b) => a + b, 0);
  const order = raw.map((v, i) => ({ i, frac: v - Math.floor(v) })).sort((a, b) => b.frac - a.frac);
  for (let k = 0; k < rem; k++) base[order[k % order.length].i]++;
  return pool.map((x, i) => ({ x, need: base[i] }));
}
const needCache = {};
const itemNeed = x => {
  const g = catOf(x);
  const list = needCache[g] || (needCache[g] = itemNeeds(g));
  const hit = list.find(o => o.x.k === x.k);
  return hit ? hit.need : 0;
};
const groupShort = g => (needCache[g] || (needCache[g] = itemNeeds(g)))
  .reduce((a, o) => a + Math.max(0, o.need - ingStock(o.x.k)), 0);
const lackOf = x => Math.max(0, itemNeed(x) - ingStock(x.k));
const groupRate = g => Math.round(GROUPS[g].rate * priceMult());
function groupBuyCost(g) {
  return groupShort(g) * groupRate(g);
}
// 一次进 n 份，按各样的缺口分下去
function groupBuy(g, n = 5) {
  const pool = GROUPS[g].pool();
  let left = n;
  while (left > 0) {
    const need = pool.map(x => ({ x, lack: lackOf(x) })).sort((a, b) => b.lack - a.lack)[0];
    const target = need && need.lack > 0 ? need.x : pool[left % pool.length];
    S.stock.ing[target.k] = ingStock(target.k) + 1; left--;
  }
}
const drStock = k => (S.drinks && S.drinks[k]) ? 1 : 0;   // 水：买一次就上架
const ingPrice = x => Math.round(x.buy * priceMult());
const dimPrice = x => Math.round(x.buy * priceMult());
const drinkPrice = x => Math.round(x.buy * priceMult());
const meatOn = () => MEATS;
const vegOn = () => VEGS;
const wageOf = k => Math.round(WAGE[k] * wageMult());
const wages = () => Math.round((S.helpers * wageOf('helper') + S.servers * wageOf('server')) * (1 - 0.10 * S.clerk));
const clerkWaste = () => 1 - 0.08 * S.clerk;   // 账房按存量下单，少进错货
const upkeep = () => rent() + wages();
const pickiness = () => Math.min(0.35, 0.012 * (S.day - 1));       // 客人越来越没耐心
const patience = () => 7 * (1 + 0.2 * S.servers) * (S.menu.plum ? 1.25 : 1) * (1 - pickiness()) * snackPatience() * (1 + 0.2 * S.tea) * (occ().pat || 1) * cushionPat() * herbsPat() * (1 + 0.1 * S.tableset) * (1 + 0.08 * S.scroll);
const TASTES = [
  { k: 'side', from: 8, label: '荤素都得有' },
  { k: 'beef', from: 15, label: '要有麻辣牛肉' },
  { k: 'plum', from: 22, label: '要有酸梅汤' },
  { k: 'danger', from: 29, label: '有人想吃危辣' },
  { k: 'yuanyang', from: 36, label: '要有鸳鸯锅' },
  { k: 'snack', from: 43, label: '要有小吃' }
];
const tastes = () => TASTES.filter(t => S.day >= t.from);
const anyMeat = () => MEATS.some(x => ingStock(x.k) > 0);
const anyVeg = () => VEGS.some(x => ingStock(x.k) > 0);
const anyDrink = () => DRINKS.some(x => S.drinks[x.k]);
const tasteMet = t => t.k === 'side' ? (anyMeat() && anyVeg())
  : t.k === 'snack' ? Object.keys(S.menu.snack || {}).length > 0
  : t.k === 'yuanyang' ? !!S.menu.base.yuanyang
  : !!S.menu[t.k];

/* ---------------- closed panel ---------------- */
const body = $('#panelBody');
function costBtn(act, cost, opts) {
  opts = opts || {};
  if (opts.done) return `<button class="btn done" disabled>${opts.done}</button>`;
  if (opts.max) return `<button class="btn" disabled>满了</button>`;
  if (opts.lock) return `<button class="btn" disabled>${opts.lock}</button>`;
  const dis = S.money < cost ? 'data-poor="1"' : '';
  return `<button class="btn" data-act="${act}" ${dis}>${opts.label || '购置'}<small>${cost} 文</small></button>`;
}
function item(icon, name, sub, desc, btn, cls) {
  return `<div class="item ${cls || ''}"><img src="${icon}" alt=""><div><h3>${name}<small>${sub}</small></h3><p>${desc}</p></div>${btn}</div>`;
}
function upItem(key, icon, name, levels, desc) {
  const u = UPG[key], lv = S[key];
  const top = lv >= u.max;
  const now = levels[lv] || '';
  const next = levels[lv + 1] || '';
  return item(icon, name, `${now}${top ? '' : ' → ' + next}`, desc, costBtn('up-' + key, u.cost[lv], { max: top, label: '升级' }));
}
function renderClosed() {
  for (const k of Object.keys(needCache)) delete needCache[k];
  const tabs = `<div class="tabs">
    <button data-tab="fix" class="${tab === 'fix' ? 'on' : ''}">修缮店面</button>
    <button data-tab="stock" class="${tab === 'stock' ? 'on' : ''}">购进菜品</button>
    <button data-tab="hire" class="${tab === 'hire' ? 'on' : ''}">雇人手</button>
    <button data-tab="su" class="${tab === 'su' ? 'on' : ''}">苏家门路</button>
    </div>`;
  let list = '';
  if (tab === 'fix') {
    list += item(A.table, '桌位', `${S.tables} / ${MAX.tables} 张`, '多一张桌，多接一桌客人。店面越大，来的人越多。',
      costBtn('table', COST.table(S.tables + 1), { max: S.tables >= MAX.tables, label: '加一桌' }));
    list += item(A.stove, '灶台', `${S.stove} / ${MAX.stove} 口`, '后厨能同时出锅的数量 +1。客人坐下不用干等锅。',
      costBtn('stove', COST.stove(S.stove + 1), { max: S.stove >= MAX.stove, label: '添灶' }));
    list += item(A.lantern, '门灯', `${S.lanterns} / ${MAX.lanterns} 盏`, '赤莲街没有午夜。灯挂得越亮，夜里揽的客越多（+18%）。',
      costBtn('lantern', COST.lantern(S.lanterns + 1), { max: S.lanterns >= MAX.lanterns, label: '挂灯' }));
    list += `<div class="sec">升级</div>`;
    list += upItem('coldstore', A.coldstore, '冰窖', ['没有', '一间', '两间'], `涮菜隔夜只坏 ${Math.round(spoilRatio() * 100)}%。每升一级少坏一成半。`);
    list += upItem('fame', A.fame, '招牌', ['旧匾', '重新描金', '苏家题字'], '招牌越亮，来的人越多（每级 +8%）。');
    list += upItem('cushion', A.cushion, '坐垫', ['硬板凳', '棉垫', '厚褥'], '客人坐得住（耐心 +18%），每桌多收 2 文。');
    list += upItem('stockpot', A.stockpot, '大汤锅', ['一口小锅', '大汤锅'], '汤一直续着：每桌 15% 不耗锅料，每桌再多 3 文。');
    list += upItem('trolley', A.trolley, '传菜架', ['手端', '两层', '三层'], '一次端得多，翻台快（每级上菜快一成）。');
    list += upItem('herbs', A.herbs, '后院药草', ['荒着', '种上了', '成片'], '明若的药草茶：口碑涨得快（+12%），客人也更耐等。');
    list += upItem('upstairs', A.upstairs, '二楼包间', ['没开', '两间', '四间'], '楼上多开两桌（最多四桌）。门口再挤，也有地方坐。楼上的养护会贵一点。');
    list += upItem('tableTier', A.banquet, '桌面', ['', '方桌', '八仙桌', '红木圆桌'], '桌子越讲究，客人点得越多：每升一级，每桌多收一成。');
    list += upItem('fireTier', A.fire, '火力', ['', '柴火灶', '铜锅灶', '猛火灶'], '火旺锅开得快，每升一级出锅快近两成；升到猛火灶，后厨多一口锅。');
    list += upItem('bench', A.bench, '候位长凳', ['没有', '一条', '两条'], '门口能多等一位客人，客满时少跑几桌。');
    list += upItem('tea', A.tea, '免费茶水', ['没有', '有'], '等位的客人有口热茶，耐心多两成。');
    list += `<p class="note">修缮会让两种营业都来更多客人——也更忙。铺子是苏家自己的，不交房租，只有养护：现在每夜 <b>${rent()}</b> 文${S.tables < MAX.tables ? `，多一张桌要 <b>${rentFor(S.day, S.tables + 1, S.upstairs)}</b> 文` : ''}。</p>`;
  } else if (tab === 'stock') {
    const dLock = !S.menu.danger && S.rep < DANGER_REP;
    list += `<div class="sec">锅底 · 各备各的料，客人点哪种扣哪种</div>`;
    const potCard = (x, desc) => {
      const n = potStock(x.k), need = potNeed(x.k);
      return item(A[x.icon], x.label, `库存 <b class="${n < need ? 'lowstk' : ''}">${n}</b> · 今晚约要 ${need}`, desc,
        costBtn('pot-' + x.k, potPrice(x.k), { label: '+5 份' }), n < need ? 'short' : '');
    };
    list += potCard(potOf('red'), '本店的命根子，点的人最多。不会坏。');
    for (const b of BASES.filter(x => x.k !== 'red')) {
      if (S.menu.base[b.k]) list += potCard(potOf(b.k), `${b.desc} 每桌 +${b.price} 文。`);
      else list += item(A[b.icon || b.k], b.label, `每桌 +${b.price} 文`, b.desc, costBtn('base-' + b.k, b.cost, { label: '上架' }));
    }
    if (S.menu.danger) list += potCard(potOf('danger'), `点的人少，一锅 +${PRICE.danger} 文、口碑大涨。……也许会有那个人来。`);
    else list += item(A.danger, '危辣锅底', '隐藏辣度', dLock ? `口碑到 ${DANGER_REP} 才敢挂。全大陆只有一个人敢点。` : `偶有客人点，一锅 +${PRICE.danger} 文、口碑大涨。……也许会有那个人来。`,
      costBtn('menu-danger', COST.menu.danger, { lock: dLock ? `口碑 ${DANGER_REP}` : '', label: '挂上' }), dLock ? 'locked' : '');
    list += item(A.beef, '麻辣牛肉', S.menu.beef ? '已上架' : '明若的腌料方子', S.menu.beef ? `客人会加一盘，每桌再 +${PRICE.beef} 文。` : `上了以后，客人会加一盘。每桌 +${PRICE.beef} 文。`,
      costBtn('menu-beef', COST.menu.beef, { done: S.menu.beef ? '已上架' : '', label: '上架' }));
    list += `<p class="note">客人点的锅没备料，会将就换一种，但脸色不好看；所有锅底都断了，客人坐下也只能走。</p>`;
    const fold = S.foldIng !== false;
    list += `<div class="sec">备菜 · 按大类备，缺多少补多少</div>`;
    for (const g of ['meat', 'veg', 'mush', 'staple']) {
      const G = GROUPS[g], have = groupStock(g), need = groupNeed(g), lack = groupShort(g);
      const perFive = groupRate(g) * 5;
      const steps = Math.max(0, Math.ceil(lack / 5));
      const perFill = steps * perFive;
      list += `<div class="grp ${have < need ? 'short' : ''}">
        <img src="${A[G.icon]}" alt="">
        <div class="gmain">
          <h3>${G.label}<small>${G.note}</small></h3>
          <p>库存 <b class="${have < need ? 'lowstk' : ''}">${have}</b> 份 · 今晚约要 <b>${need}</b> 份${lack ? ` · 还差 ${lack} 份` : ' · 够了'}</p>
        </div>
        <div class="gbtns">
          <button class="btn" data-act="grp-${g}" ${S.money < perFive ? 'data-poor="1"' : ''}>进 5 份<small>${perFive} 文</small></button>
          ${need > have ? `<button class="btn alt2" data-act="grpfill-${g}" ${S.money < perFill ? 'data-poor="1"' : ''}>一键补齐<small>${perFill} 文</small></button>` : ''}

        </div>
      </div>`;
    }
    list += item(A['side-sauce'], '小料台', S.sauce ? '已开' : '', S.sauce ? '麻酱、辣油、蒜末摆出来，客人自己去调。等位的人更有耐心。' : `开一晚 ${STAPLES.find(x => x.k === 'sauce').price} 文起。客人自己调，等位也更耐等。`,
      S.sauce ? '<button class="btn done" disabled>已开</button>' : costBtn('menu-sauce', STAPLES.find(x => x.k === 'sauce').price, { label: '开张' }));
    list += `<div class="sec">热饮 · 买一次就上架，往后一直有</div>`;
    for (const x of DRINKS.filter(d => d.temp === 'hot')) {
      const on = !!S.drinks[x.k];
      list += item(A['drink-' + x.k], x.label, on ? `已上架 · 每壶 +${x.price} 文` : `上一壶 +${x.price} 文`, x.desc,
        costBtn('drink-' + x.k, drinkPrice(x), { done: on ? '已上架' : '', label: '上架' }));
    }
    list += `<div class="sec">冷饮 · 冰的，同样买一次就上架</div>`;
    for (const x of DRINKS.filter(d => d.temp === 'cold')) {
      const on = !!S.drinks[x.k];
      list += item(A['drink-' + x.k], x.label, on ? `已上架 · 每份 +${x.price} 文` : `上一份 +${x.price} 文`, x.desc,
        costBtn('drink-' + x.k, drinkPrice(x), { done: on ? '已上架' : '', label: '上架' }));
    }
    list += `<div class="sec">点心小吃 · 买一次就上架，往后一直有（点心只在前半夜卖）</div>`;
    for (const x of [...SNACKS, ...DIMSUM]) {
      const on = !!S.menu.snack[x.k];
      const isDim = DIMSUM.includes(x);
      list += item(A[isDim ? 'dim-' + x.k : x.k], x.label, on ? `已上架 · 每份 +${x.price} 文` : `一份 +${x.price} 文`, x.desc,
        costBtn('snack-' + x.k, x.cost || x.buy, { done: on ? '已上架' : '', label: '上架' }));
    }
  } else if (tab === 'su') {
    list += `<div class="sec">苏家门路 · 用苏家认可换，认可不够就拿钱补</div>
      <div class="sucap">苏家认可 <b>${Math.round(S.su)}</b> · 每换一样扣掉它要的认可</div>`;
    for (const it of SU) {
      const done = suDone(it.k), lack = suLack(it), cost = suCost(it), poor = S.money < cost;
      list += item(A[it.icon], it.name,
        done ? '已经换到了' : `需要苏家认可 ${it.su}${lack ? ` · 还差 ${lack}（补 ${cost} 文）` : ''}`,
        it.desc,
        done ? '<button class="btn done" disabled>已得</button>'
          : `<button class="btn" data-act="su-${it.k}" ${poor && lack ? 'data-poor="1"' : ''}>换<small>${lack ? cost + ' 文' : '认可够'}</small></button>`,
        done ? 'locked' : '');
    }
  } else {
    list += item(A.helper, '帮厨', `${S.helpers} / ${MAX.helpers} 人`, `出锅更快。工钱 ${wageOf('helper')} 文 / 夜。`,
      costBtn('helper', hireCost('helper'), { max: S.helpers >= MAX.helpers, label: '雇一个' }));
    list += item(A.server, '跑堂', `${S.servers} / ${MAX.servers} 人`, `翻台更快，门口能多等一位客人。工钱 ${wageOf('server')} 文 / 夜。`,
      costBtn('server', hireCost('server'), { max: S.servers >= MAX.servers, label: '雇一个' }));
    list += upItem('train', A.train, '带教', ['没教过', '教过一轮', '老手'], '明若亲自带伙计：帮厨出锅、跑堂翻台都快一截。人越多越值。');
    list += upItem('clerk', A.clerk, '账房先生', ['自己记', '请一个', '两个'], '坐柜台后头打算盘：工钱少一成，账目也清爽——明若省心。');
    list += upItem('porter', A.porter, '挑夫', ['自己去', '有挑夫', '两个挑夫'], '跑菜市的人：进货便宜（每级 −10%）。');
    list += `<p class="note">每夜打烊结工钱：合计 <b>${wages()}</b> 文。伙计每十天会要求涨一次工钱${wageStep() ? `（已涨 ${wageStep()} 回）` : ''}；新雇的人按赤莲街市价给，市价一涨，老伙计也得跟着涨。人多了场面也大，别雇了养不起。</p>`;
  }
  const isVisit = S.day === S.nextVisit;
  const fd = forecast('daily'), fp = forecast('peak');
  const exp = isVisit ? fp : (S.mode === 'peak' ? fp : fd);
  const shortPots = potsShort();
  const shortIng = MEATS.filter(x => ingStock(x.k) <= 0).length + VEGS.filter(x => ingStock(x.k) <= 0).length;
  const short = potTotal() < Math.round(exp) || shortPots.length > 0;
  const o = occasion();
  const occBar = o ? `<div class="occbar ${o}"><b>今日 · ${OCCASIONS[o].label}</b><span>${OCCASIONS[o].sub}</span></div>` : '';
  const dock = `<div class="dock">
    ${occBar}
    <div class="modes">
      ${isVisit ? `<div class="forced"><b>苏有盛今晚来看店</b><span>这一晚没得选——只能开高峰，扛得住才算数。</span></div>` : `
      <button class="mode daily ${S.mode === 'daily' ? 'on' : ''}" data-mode="daily"><b>慢火日常</b><span>客人少些，口碑涨得快。老朋友会来串门。</span></button>
      <button class="mode peak ${S.mode === 'peak' ? 'on' : ''}" data-mode="peak"><b>今夜高峰</b><span>客流更凶，高峰段收益翻倍；人忙口碑涨得慢。</span></button>`}
    </div>
    <div class="forecast"><span>预计来客 ≈ <b>${Math.round(exp)}</b> 桌</span><span class="${short ? 'warn' : ''}">锅料共 ${potTotal()} 份${shortPots.length ? ` · ${shortPots.map(x => x.label).join('、')}不够` : potTotal() < Math.round(exp) ? ` · 不够，至少备 ${Math.round(exp)} 份` : ''}</span><span class="${shortIng ? 'warn' : ''}">${(() => { const lack = ['meat','veg','mush'].reduce((a, g) => a + groupShort(g), 0); return lack ? `涮菜还差 ${lack} 份` : '涮菜够'; })()}</span><span>每夜开销 ${upkeep()} 文</span><button class="ledger" id="btnAudit">收店交账</button></div>
    ${tastes().length ? `<div class="tastes"><b>老客口味</b>${tastes().map(t => `<span class="${tasteMet(t) ? 'ok' : 'miss'}">${t.label}${tasteMet(t) ? '' : ' · 缺'}</span>`).join('')}</div>` : ''}
    <button class="open" id="btnOpen">开 张</button>
  </div>`;
  body.innerHTML = tabs + `<div class="list" id="list">${list}</div>` + dock;
}
body.addEventListener('click', e => {
  const t = e.target.closest('button');
  if (!t) return;
  if (t.dataset.tab) { tab = t.dataset.tab; renderClosed(); return; }
  if (t.dataset.mode) { S.mode = t.dataset.mode; save(); renderClosed(); say(pick(L.open[S.mode === 'peak' ? 'peak' : 'daily'])); return; }
  if (t.id === 'btnOpen') { openShop(); return; }
  if (t.id === 'btnAudit') { closeBooks(); return; }
  if (t.dataset.act) { buy(t.dataset.act); return; }
  if (t.dataset.speed) { speed = +t.dataset.speed; document.querySelectorAll('.speed button').forEach(b => b.classList.toggle('on', +b.dataset.speed === speed)); }
});

function spend(cost) {
  if (S.money < cost) { say(pick(L.deny.money)); return false; }
  S.money -= cost; return true;
}
function buy(act) {
  const scroll = ($('#list') || {}).scrollTop || 0;
  let line = null;
  switch (act) {
    case 'table':
      if (S.tables >= MAX.tables) return say(L.deny.max);
      if (!spend(COST.table(S.tables + 1))) return;
      line = L.buy.table[Math.min(S.tables - 2, L.buy.table.length - 1)]; S.tables++; break;
    case 'stove':
      if (S.stove >= MAX.stove) return say(L.deny.max);
      if (!spend(COST.stove(S.stove + 1))) return;
      line = L.buy.stove[S.stove - 1]; S.stove++; break;
    case 'lantern':
      if (S.lanterns >= MAX.lanterns) return say(L.deny.max);
      if (!spend(COST.lantern(S.lanterns + 1))) return;
      line = L.buy.lantern[S.lanterns]; S.lanterns++; break;
    case 'buy-base': act = 'pot-red';
      // falls through
    case 'buy-meat': case 'buy-veg': {
      if (act === 'pot-red') { if (!spend(potPrice('red'))) return; S.stock.pot.red = potStock('red') + 5; line = pick(L.buy.base); break; }
      break;
    }
    case 'menu-beef': if (S.menu.beef || !spend(COST.menu.beef)) return; S.menu.beef = true; line = L.buy.beef; break;
    case 'menu-plum': if (S.menu.plum || !spend(COST.menu.plum)) return; S.menu.plum = true; line = L.buy.plum; break;
    case 'menu-danger':
      if (S.menu.danger) return;
      if (S.rep < DANGER_REP) return say(L.deny.dangerRep);
      if (!spend(COST.menu.danger)) return;
      S.menu.danger = true; S.dangerSince = S.day; S.pendingFriend = '荷穆勒夏'; line = L.buy.danger; break;
    default:
      if (act.startsWith('su-')) {
        const it = SU.find(x => x.k === act.slice(3));
        if (!it || suDone(it.k)) return;
        const lack = suLack(it), cost = suCost(it);
        if (lack && !spend(cost)) return;
        S.su = clamp(S.su - Math.min(it.su, S.su), 0, 100);
        S.suBought[it.k] = true;
        if (it.k === 'annex') S.annex = 1;
        else if (it.k === 'chef') { S.suChef = 1; S.suChefUntil = S.day + 3; }
        else S[it.k] = 1;
        save(); renderShop(); renderHUD(); renderClosed();
        say(pick(L.suGet[it.k] || L.suGet.default));
        return;
      }
      if (act.startsWith('grpfill-')) {
        const g = act.slice(8);
        const steps = Math.ceil(groupShort(g) / 5);
        if (!steps) return;
        if (!spend(groupRate(g) * 5 * steps)) return;
        groupBuy(g, 5 * steps);
        line = pick(L.buy.fill).replace('{n}', 5 * steps).replace('{g}', GROUPS[g].label);
      } else if (act.startsWith('grp-')) {
        const g = act.slice(4);
        if (!spend(groupRate(g) * 5)) return;
        groupBuy(g, 5);
        line = pick(L.buy.group).replace('{n}', '5').replace('{g}', GROUPS[g].label);
      } else if (act.startsWith('ing-')) {
        const k = act.slice(4);
        if (k === 'rice') { if (!spend(Math.round(8 * priceMult()))) return; S.stock.ing.rice = ingStock('rice') + 10; line = pick(L.buy.rice); }
        else {
          const x = findMenu(k); if (!x) return;
          if (!spend(ingPrice(x))) return;
          S.stock.ing[k] = ingStock(k) + 5; line = pick(L.buy[x.k] || L.buy.meat);
        }
      } else if (act.startsWith('drink-')) {
        const k = act.slice(6), x = findMenu(k); if (!x || S.drinks[k]) return;
        if (!spend(drinkPrice(x))) return;
        S.drinks[k] = true; line = pick(L.buy[k] || L.buy.plumDrink);
      } else if (act === 'menu-sauce') {
        if (S.sauce || !spend(STAPLES.find(x => x.k === 'sauce').price)) return;
        S.sauce = true; line = L.menuNew.sauce;
      } else if (act.startsWith('pot-')) {
        const x = potOf(act.slice(4));
        if (!x || !potOn(x.k) || !spend(potPrice(x.k))) return;
        S.stock.pot[x.k] = potStock(x.k) + 5; line = pick(L.potBuy[x.k] || L.buy.base);
      } else if (act.startsWith('up-')) {
        const key = act.slice(3), u = UPG[key];
        if (!u || S[key] >= u.max) return say(L.deny.max);
        if (!spend(u.cost[S[key]])) return;
        S[key]++; line = pick(L.upgrade[key]);
      } else if (act.startsWith('base-')) {
        const b = BASES.find(x => x.k === act.slice(5));
        if (!b || S.menu.base[b.k]) return;
        if (b.secret && S.rep < 55) { say(L.deny.secret); return; }
        if (!spend(b.cost)) return;
        S.menu.base[b.k] = true; S.stock.pot[b.k] = potStock(b.k); line = L.menuNew[b.k] + ' ……料你自己进，别让客人点了没有。';
        if (b.secret) S.pendingFriend = 'hexia+samuel';
      } else if (act.startsWith('snack-')) {
        const k = act.slice(6);
        const x = [...SNACKS, ...DIMSUM].find(y => y.k === k);
        if (!x || S.menu.snack[k] || !spend(x.cost || x.buy)) return;
        S.menu.snack[k] = true; line = L.menuNew[k] || L.buy.dim;
      }
      break;
    case 'helper':
      if (S.helpers >= MAX.helpers) return say(L.deny.max);
      if (!spend(hireCost('helper'))) return;
      line = L.buy.helper[Math.min(S.helpers, 1)]; S.helpers++;
      if (wageStep() < market()) { S.wageLevel = market(); line = pick(L.pressure.marketRate); }
      break;
    case 'server':
      if (S.servers >= MAX.servers) return say(L.deny.max);
      if (!spend(hireCost('server'))) return;
      line = L.buy.server[Math.min(S.servers, 1)]; S.servers++;
      if (wageStep() < market()) { S.wageLevel = market(); line = pick(L.pressure.marketRate); }
      break;
  }
  if (line) say(line);
  save(); renderShop(); renderHUD(); renderClosed();
  const l = $('#list'); if (l) l.scrollTop = scroll;
}

/* ---------------- night ---------------- */
// 老朋友：一次只来一位，隔一两天到六天来一次，谁的规矩都一样
function chooseFriend(pool) {
  if (S.mode !== 'daily') return null;      // 老朋友只在慢火日常来
  return pick(pool || friendPool().list);
}
const friendGap = () => 1 + Math.floor(rnd() * 3);            // 老朋友隔一到三天来一位
const friendFallback = () => 2;                                   // 最多隔两天，第三天一定来
function friendPool() {
  const unseen = FRIENDS.filter(f => !S.friendsSeen.includes(f));
  return { list: unseen.length ? unseen : FRIENDS, first: unseen.length > 0 };
}
// 今晚选谁：单人来访为主，结伴的是小概率；第一次来的人优先
function pickFriend() {
  const unseenSingles = FRIENDS.filter(f => !S.friendsSeen.includes(f));
  if (unseenSingles.length) return { key: pick(unseenSingles), first: true };
  const all = [...FRIENDS.map(k => ({ k, w: 1 })), ...PAIRS.filter(p => S.menu.danger).map(p => ({ k: p.k, w: p.w }))];
  const pool = all.filter(x => !(S.friendLast && x.k === S.friendLast));   // 同一个人不会接连来
  if (!pool.length) return { key: pick(all).k, first: false };
  let r = rnd() * pool.reduce((a, x) => a + x.w, 0);
  for (const x of pool) { r -= x.w; if (r <= 0) return { key: x.k, first: false }; }
  return { key: pick(FRIENDS), first: false };
}
const friendDef = k => L.friends[k] || L.pairs[k] || null;
const expRand = l => -Math.log(1 - rnd()) / Math.max(l, 0.001);

function openShop() {
  if (potTotal() <= 0) { say(L.deny.noBase); return; }
  if (S.day === S.nextVisit) S.mode = 'peak';
  S.phase = 'night';
  N = {
    t: 0, mode: S.mode, parties: [], queue: [], busy: new Array(totalTables()).fill(null), snacks: 0,
    served: 0, lost: 0, lostFull: 0, lostWait: 0, lostClose: 0, noBase: 0, noSide: 0, danger: 0, picky: 0, swapped: 0,
    income: 0, peakBonus: 0, repStart: S.rep, moneyStart: S.money, stockStart: Object.assign({}, S.stock),
    friend: null, friendAt: 5 + rnd() * 20, friendFired: false,
    lastSay: -10, inPeak: false, closing: false, finished: false, serverTick: 0, id: 0,
    occ: occasion(), starServed: false,

  };
  N.nextArr = 0.6 + expRand(lambda(0, N.mode));
  // 今晚的特殊来客：老朋友，最多一位
  if (S.pendingFriend) {
    N.friend = S.pendingFriend; N.friendFirst = false; N.friendAt = 8 + rnd() * 7; S.pendingFriend = '';
    S.friendNext = S.day + 2;
  } else if (S.friendDue) {
    if (S.mode === 'daily') {
      if (S.forceFriend) { N.friend = S.forceFriend; N.friendFirst = false; N.forceFriend = null; N.friendAt = 8 + rnd() * 8; }
      else if (S.forcedPair) { N.friend = S.forcedPair; N.friendFirst = false; N.friendAt = 8 + rnd() * 8; S.forcedPair = null; }
      else { const who = pickFriend(); N.friend = who.key; N.friendFirst = who.first; N.friendAt = 7 + rnd() * 12; }
    }
  }
  S.friendDue = false;
  renderShop(); renderNight(); renderHUD();
  say(pick(L.open[N.mode === 'peak' ? 'peak' : 'daily']));
  last = performance.now();
  requestAnimationFrame(frame);
}
function renderNight() {
  const pk = N.mode === 'peak'
    ? `<div class="pk" style="left:${CFG.peakWin[0] / CFG.nightDur * 100}%;width:${(CFG.peakWin[1] - CFG.peakWin[0]) / CFG.nightDur * 100}%"></div>` : '';
  body.innerHTML = `<div class="night">
    ${N.occ ? `<div class="occbar ${N.occ} tight"><b>${OCCASIONS[N.occ].label}</b><span>${OCCASIONS[N.occ].sub}</span></div>` : ''}
    <div class="clock"><div class="clock-top"><span>${N.mode === 'peak' ? '今夜高峰' : '慢火日常'} · 营业中</span><span id="nClock">酉时</span></div>
      <div class="track">${pk}<div class="fill" id="nFill"></div><div class="pos" id="nPos"></div></div></div>
    <div class="stats">
      <div class="stat"><b id="nServed">0</b><span>接待（桌）</span></div>
      <div class="stat bad"><b id="nLost">0</b><span>跑掉（桌）</span></div>
      <div class="stat"><b id="nIncome">0</b><span>流水（文）</span></div>
    </div>
    <div class="stocks">
      ${pots().map(x => `<div class="stk" data-pot="${x.k}" title="${x.label}"><img src="${A[x.icon]}" alt=""><span>0</span></div>`).join('')}
      <div class="stk" id="kMeat" title="荤菜合计"><img src="${A['meat-tripe']}" alt=""><span>0</span></div>
      <div class="stk" id="kVeg" title="素菜合计"><img src="${A['veg-shoot']}" alt=""><span>0</span></div>
      <div class="stk" id="kDrink" title="饮品合计"><img src="${A['drink-plum']}" alt=""><span>0</span></div>
    </div>
    <div class="speed"><button data-speed="1" class="${speed === 1 ? 'on' : ''}">正常</button><button data-speed="2" class="${speed === 2 ? 'on' : ''}">快进 ×2</button></div>
    <p class="note">客人自己上门。桌、灶、人手、库存都在打烊时备好——营业时你只能看着，和听明若喊。打烊时还在门口排队的客人会白跑一趟。</p>
  </div>`;
  updateNight();
}
const HOURS = ['酉时', '戌时', '亥时', '子时（赤莲街无午夜）', '丑时', '打烊'];
function updateNight() {
  const p = clamp(N.t / CFG.nightDur, 0, 1);
  const set = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };
  set('nClock', HOURS[Math.min(HOURS.length - 1, Math.floor(p * (HOURS.length - 1)))]);
  const pos = $('#nPos'), fill = $('#nFill');
  if (pos) pos.style.left = `calc(${p * 100}% - 2px)`;
  if (fill) fill.style.width = p * 100 + '%';
  set('nServed', N.served); set('nLost', N.lost); set('nIncome', fmt(N.income));
  document.querySelectorAll('.stk[data-pot]').forEach(e => {
    const n = potStock(e.dataset.pot);
    e.querySelector('span').textContent = n;
    e.classList.toggle('empty', n <= 0);
  });
  const sums = [['kMeat', MEATS.reduce((a, x) => a + ingStock(x.k), 0)],
                ['kVeg', VEGS.reduce((a, x) => a + ingStock(x.k), 0)],
                ['kDrink', DRINKS.filter(x => S.drinks[x.k]).length]];
  sums.forEach(([id, n]) => { const e = document.getElementById(id); if (!e) return; e.querySelector('span').textContent = n; e.classList.toggle('empty', n <= 0); });
}

function spawn() {
  const freeTable = N.busy.indexOf(null) >= 0;
  if (!freeTable && N.queue.length >= queueCap()) {
    N.lost++; N.lostFull++; S.rep = clamp(S.rep - 1.5 * (occ().strict || 1), 0, 100);
    floatText(8, 72, '客满，走了', 'bad');
    sayNight(pick(L.full));
    return;
  }
  const p = { id: ++N.id, state: 'queue', t0: N.t, table: -1 };
  const flip = rnd() < 0.4, sz = 0.94 + rnd() * 0.12;
  p.el = actor(crowdArt(), 'cust', CFG.exit[0], CFG.exit[1], 15 * sz);
  p.el.querySelector('img').style.transform = flip ? 'scaleX(-1)' : '';
  N.parties.push(p); N.queue.push(p);
  requestAnimationFrame(() => layoutQueue());
}
function layoutQueue() {
  N.queue.forEach((p, i) => { const s = CFG.queueSlots[Math.min(i, CFG.queueSlots.length - 1)]; setPos(p.el, s[0], s[1]); });
}
function removeParty(p, angry) {
  p.state = 'gone';
  if (angry) p.el.classList.add('angry');
  p.el.classList.remove('seated');
  setTimeout(() => { setPos(p.el, CFG.exit[0], CFG.exit[1]); p.el.classList.add('leaving'); }, angry ? 450 : 50);
  setTimeout(() => p.el.remove(), 1400);
  N.parties = N.parties.filter(q => q !== p);
}
function freeTable(p) {
  if (p.table >= 0) {
    N.busy[p.table] = null;
    const te = tableEls[p.table];
    te.classList.remove('busy', 'wait', 'cook', 'eat', 'danger');
    te.querySelector('.tbar i').style.width = '0';
  }
}
function seat() {
  while (N.queue.length) {
    const i = N.busy.indexOf(null);
    if (i < 0) break;
    const p = N.queue.shift();
    const [tx, ty] = slotOf(i);
    const want = pickPot();
    let got = potStock(want.k) > 0 ? want : null;
    if (!got) {
      got = potStock('red') > 0 ? potOf('red') : pots().find(x => potStock(x.k) > 0) || null;
      if (got) {
        N.swapped++; S.rep = clamp(S.rep - 0.4, 0, 100);
        floatText(tx, ty - 18, `没${want.label}`, 'bad');
        sayNight(pick(L.swap).replace('{want}', want.label).replace('{got}', got.label));
      }
    }
    if (!got) {
      N.lost++; N.noBase++; S.rep = clamp(S.rep - 2 * (occ().strict || 1), 0, 100);
      floatText(tx, ty - 18, '没锅底！', 'bad');
      sayNight(pick(L.noBase), true);
      removeParty(p, true);
      continue;
    }
    if (!(S.stockpot && rnd() < 0.15)) S.stock.pot[got.k]--;
    let ticket = PRICE.base + potExtra(got.k) + flatTicket() + (p.reg ? 15 : 0);
    p.base = got.k;
    // 一桌点三到五样：荤、菌菇、时蔬，有时加主食
    const wantDishes = () => {
      const pickSome = (pool, n) => { const out = []; const avail = pool.filter(x => ingStock(x.k) > 0); for (let i = 0; i < n; i++) { if (avail.length) out.push(avail.splice(Math.floor(rnd() * avail.length), 1)[0]); } return out; };
      const mush = VEGS.filter(v => /mush|enoki|kingoyster|oyster|woodear|bamboof/.test(v.k));
      const vegs = VEGS.filter(v => !mush.includes(v));
      const meats = 1 + (rnd() < 0.7 ? 1 : 0) + (rnd() < 0.35 ? 1 : 0);       // 一桌常点两三盘肉
      const mushN = rnd() < 0.6 ? 1 : 0;
      const vegN = 1 + (rnd() < 0.55 ? 1 : 0);
      const stapleN = rnd() < 0.5 ? 1 : 0;
      const dishes = [...pickSome(MEATS, meats), ...pickSome(mush, mushN), ...pickSome(vegs, vegN), ...pickSome(STAPLES.filter(x => x.k !== 'sauce'), stapleN)];
      return dishes;
      return dishes;
    };
    const dishes = wantDishes();
    if (!dishes.length) { N.noSide++; ticket = Math.round(ticket * 0.7); }
    p.dishes = [];
    for (const d of dishes) { S.stock.ing[d.k]--; ticket += d.price; p.dishes.push(d.label); }
    const gotMeat = dishes.some(d => MEATS.includes(d)), gotVeg = dishes.some(d => VEGS.includes(d));
    if (S.menu.beef && gotMeat) ticket += PRICE.beef;
    // 再加一壶水
    const dr = rnd() < 0.55 ? pick(DRINKS.filter(d => S.drinks[d.k])) : null;
    if (dr) { ticket += dr.price; p.drink = dr.label; }
    if (S.sauce) ticket += 2;
    ticket += (occ().veg || 0) * (gotVeg ? 1 : 0);
    ticket = Math.round(ticket * (occ().tick || 1) * tickAdj());
    for (const sn of SNACKS) if (S.menu.snack[sn.k] && rnd() < 0.35 * (occ().snack || 1)) { ticket += sn.price; N.snacks++; }
    if (N.t < CFG.nightDur * 0.45) {
      for (const d of DIMSUM) if (S.menu.snack[d.k] && rnd() < 0.4) { ticket += d.price; N.dimSum = (N.dimSum || 0) + 1; }
    }
    ticket = Math.round(ticket * (1 + 0.1 * (S.tableTier - 1)));
    if (!gotMeat || !gotVeg) { N.noSide++; S.rep = clamp(S.rep - (S.day >= 8 ? 1.2 : 0.5), 0, 100); sayNight(pick(L.noSide)); }
    const unmet = tastes().filter(t => t.k !== 'side' && !tasteMet(t)).length;
    if (unmet) { N.picky++; ticket = Math.round(ticket * (1 - 0.1 * unmet)); S.rep = clamp(S.rep - 0.6 * unmet, 0, 100); if (rnd() < 0.3) sayNight(pick(L.pressure.complain)); }
    p.danger = got.k === 'danger';
    if (p.danger) sayNight(pick(L.danger), true);
    p.ticket = ticket; p.table = i; p.state = 'wait'; p.tw = N.t;
    N.busy[i] = p;
    const te = tableEls[i];
    te.classList.add('busy', 'wait'); te.classList.toggle('danger', !!p.danger);
    if (isUp(i)) {
      const [sx, sy] = CFG.stairs;
      setPos(p.el, sx, sy); p.el.classList.add('upstairs');
    } else {
      setPos(p.el, tx - 8.2, ty - 1);
      p.el.style.zIndex = Math.round(ty * 10) + 99;
      p.el.classList.add('seated');
    }
  }
  layoutQueue();
}
function addCompanion() {
  const q = { id: ++N.id, state: 'queue', t0: N.t, pat: patience(), table: -1 };
  q.el = actor(crowdArt(), 'cust', CFG.exit[0], CFG.exit[1], 15);
  q.el.querySelector('img').style.transform = rnd() < 0.5 ? 'scaleX(-1)' : '';
  N.parties.push(q); N.queue.push(q); layoutQueue();
}
function pay(p, atClose) {
  const peak = !atClose && N.inPeak;
  const amt = p.ticket * (peak ? 2 : 1);
  N.income += amt; if (peak) N.peakBonus += p.ticket;
  S.money += amt; S.totalIncome += amt;
  N.served++; S.totalServed++;
  let gain = (N.mode === 'peak' ? 0.5 : 1.3) + (p.danger ? 2 : 0) + snackRep();
  gain *= (occ().rep || 1) * herbsRep() * (1 + 0.1 * S.paste);
  S.rep = clamp(S.rep + gain, 0, 100);
  if (p.danger) N.danger++;
  const [tx, ty] = slotOf(p.table);
  floatText(tx, ty - 20, peak ? `+${amt} ×2` : `+${amt}`, peak ? 'peak' : '');
  if (!atClose && rnd() < 0.18) sayNight(pick(L.served));
  freeTable(p); removeParty(p, false);
}

let last = 0;
function frame(now) {
  if (!N || N.finished) return;
  let dt = Math.min(0.1, (now - last) / 1000) * speed;
  last = now;
  while (dt > 0 && !N.finished) { const d = Math.min(dt, 0.05); step(d); dt -= d; }
  renderHUD(); updateNight();
  if (!N.finished) requestAnimationFrame(frame);
}
function step(dt) {
  N.t += dt;
  const t = N.t;
  // peak window
  if (N.mode === 'peak') {
    const inPk = t >= CFG.peakWin[0] && t < CFG.peakWin[1];
    if (inPk !== N.inPeak) {
      N.inPeak = inPk; stage.classList.toggle('peak', inPk);
      sayNight(pick(inPk ? L.peakStart : L.peakEnd), true);
    }
  }
  // friend
  if (N.friend && !N.friendFired && t >= N.friendAt) {
    N.friendFired = true;
    const f = friendDef(N.friend);
    S.rep = clamp(S.rep + (f.effect.rep || 0), 0, 100);
    S.money += f.effect.money || 0;
    if (f.effect.base) S.stock.pot.red = potStock('red') + f.effect.base;
    if (N.friend === '荷穆勒夏' || N.friend === 'hexia+samuel') { const k = potStock('danger') > 0 ? 'danger' : 'red'; if (potStock(k) > 0) S.stock.pot[k]--; }
    N.clearPot = N.friend === '塞缪尔' || N.friend === 'hexia+samuel';   // 副院长只吃清水锅
    if (!S.friendsSeen.includes(N.friend)) S.friendsSeen.push(N.friend);
    S.friendLast = N.friend;
    if (N.friend === 'hexia+samuel') S.danger21 = true;
    S.friendNext = S.day + friendGap();
    N.friendTitle = f.title || N.friend;
    toast(N.friend === 'hexia+samuel' ? '两个人都来了' : N.friend === 'ispela+beran' ? '一前一后进门' : N.friend === '荷穆勒夏' ? '有人点了危辣' : `${N.friendFirst ? '新面孔' : '老朋友'}来了 · ${N.friend}`, f.event, 7000);
    sayNight(N.friend === 'hexia+samuel' ? '……院长和副院长？两个一起来，是出什么事了。'
      : N.friend === 'ispela+beran' ? '伊斯派菈和贝兰斯坦？你们俩怎么一块儿来了。'
      : N.friend === '荷穆勒夏' ? '……是她。你去，端危辣。什么都别问。'
      : N.friend === '祝长卿' ? '……梨香园的祝长卿？她怎么来了。去，把好桌子留出来。'
      : `门口有人喊你——是${N.friend}。招呼好了！`, true);
  }
  // arrivals
  if (t < CFG.nightDur) {
    while (t >= N.nextArr && N.nextArr < CFG.nightDur) {
      spawn(); seat();
      N.nextArr += expRand(lambda(N.nextArr, N.mode));
    }
  }
  // queue patience
  const pat = patience();
  for (const p of N.queue.slice()) {
    if (t - p.t0 > pat) {
      N.queue.splice(N.queue.indexOf(p), 1);
      N.lost++; N.lostWait++;
      S.rep = clamp(S.rep - 2, 0, 100);
      floatText(p.el.style.left ? parseFloat(p.el.style.left) : 8, 70, '等不及了', 'bad');
      sayNight(pick(L.lost));
      removeParty(p, true);
      layoutQueue();
    }
  }
  seat();
  // kitchen
  let cooking = N.parties.filter(p => p.state === 'cook').length;
  const waiting = N.parties.filter(p => p.state === 'wait').sort((a, b) => a.tw - b.tw);
  for (const p of waiting) {
    if (cooking >= stoveCap()) break;
    p.state = 'cook'; p.ts = t; p.te = t + cookTime(); cooking++;
    const te = tableEls[p.table]; te.classList.remove('wait'); te.classList.add('cook');
  }
  for (const p of N.parties.slice()) {
    if (p.table < 0) continue;
    const bar = tableEls[p.table].querySelector('.tbar i');
    if (p.state === 'cook') {
      bar.style.width = clamp((t - p.ts) / (p.te - p.ts), 0, 1) * 100 + '%';
      if (t >= p.te) {
        p.state = 'eat'; p.ts = t; p.te = t + eatTime();
        const te = tableEls[p.table]; te.classList.remove('cook'); te.classList.add('eat');
      }
    } else if (p.state === 'eat') {
      bar.style.width = clamp((t - p.ts) / (p.te - p.ts), 0, 1) * 100 + '%';
      if (t >= p.te) pay(p, false);
    } else if (p.state === 'wait') {
      bar.style.width = '100%';
    }
  }
  // servers wander to busy tables
  N.serverTick -= dt;
  if (N.serverTick <= 0) {
    N.serverTick = 1.6;
    const occ = N.busy.map((p, i) => p ? i : -1).filter(i => i >= 0 && !isUp(i));
    serverEls.forEach((el, i) => {
      if (occ.length && rnd() < 0.75) {
        const [tx, ty] = slotOf(pick(occ));
        setPos(el, Math.min(96, tx + 8.6), ty - 0.5);
      } else { const [x, y] = CFG.serverHomes[i]; setPos(el, x, y); }
    });
  }
  // close
  if (t >= CFG.nightDur && !N.closing) {
    N.closing = true;
    stage.classList.remove('peak'); N.inPeak = false;
    for (const p of N.queue.slice()) { N.lost++; N.lostClose++; S.rep = clamp(S.rep - 0.5, 0, 100); removeParty(p, false); }
    N.queue = [];
    for (const p of N.parties.slice()) if (p.table >= 0) pay(p, true);
    say(pick(L.closeNight));
    setTimeout(settle, 1500);
    N.finished = true;
  }
}

/* ---------------- settlement ---------------- */
const modal = $('#modal'), mcard = $('#modalCard');
function showModal(html) { mcard.innerHTML = html; modal.hidden = false; mcard.scrollTop = 0; }
function hideModal() { modal.hidden = true; }
function settle() {
  const w = wages();
  const r = rent();
  S.money -= w + r;
  const drift = S.day >= 8 ? +(S.rep * 0.03).toFixed(1) : 0;   // 老客嘴刁：不常来点新花样，口碑会慢慢淡
  S.rep = clamp(S.rep - drift, 0, 100);
  let spoilIng = 0;
  for (const x of [...MEATS, ...VEGS, ...STAPLES.filter(v => v.k !== 'sauce')]) {
    const n = ingStock(x.k), half = Math.ceil(n * spoilAdj() * clerkWaste());
    S.stock.ing[x.k] = n - half; spoilIng += half;
  }
  const repD = S.rep - N.repStart;
  const net = S.money - N.moneyStart;
  const total = N.served + N.lost;
  let grade;
  if (net < 0) grade = 'loss';
  else if (N.lost === 0 && N.served >= 4) grade = 'great';
  else if (total && N.lost / total < 0.25) grade = 'good';
  else grade = 'rough';
  let comment = pick(L.settle[grade]);
  let bail = '';
  let broke = false;
  if (S.money < 0) {
    S.bailouts++;
    if (S.bailouts >= 2) broke = true;
    else { S.money = 60; bail = `<div class="said"><img src="${A.note}" alt=""><p><small>明若 · 字条</small>${L.bailout}</p></div>`; }
  }
  const f = N.friendFired ? N.friend : null;
  const fdef = f ? friendDef(f) : null;
  const friendHtml = f && fdef ? `<div class="friend${f === '祝长卿' ? ' star' : ''}"><b>今夜来客 · ${fdef.title || f}</b><br>${fdef.event}</div>
    <div class="said"><img src="${A.note}" alt=""><p><small>明若 · 说起${fdef.title || f}</small>${fdef.line}</p></div>` : '';
  const day = S.day;
  const isVisit = day === S.nextVisit;
  let visitHtml = '';
  let visitNote = '';
  if (isVisit) {
    const vi = L.visit;
    const arrived = N.served + N.lost;
    const pickRate = arrived ? N.served / arrived : 0;
    const vgrade = net < 0 ? 'loss' : pickRate >= 0.7 ? 'great' : pickRate >= 0.5 ? 'good' : pickRate >= 0.3 ? 'rough' : 'loss';
    const g = vi.grades[vgrade];
    const gt = vi.titles[vgrade], gx = vi.text[vgrade], gm = vi.mingruo[vgrade];
    S.su = clamp(S.su + g.su + (S.jade ? 3 : 0), 0, 100);
    S.money += g.bonus;
    S.inspections++;
    visitHtml = `<div class="visit-card grade-${vgrade}"><b>苏有盛来看店 · ${gt}</b>${gx}<span>接待 ${N.served} / 来客 ${arrived} · 苏家认可 +${g.su} · 赏钱 +${g.bonus} 文</span></div>
      <div class="said"><img src="${A.note}" alt=""><p><small>明若 · 视察之后</small>${pick(gm)}</p></div>`;
    const gap = CFG.gap[0] + Math.floor(rnd() * (CFG.gap[1] - CFG.gap[0] + 1));
    S.nextVisit = day + gap;
    visitNote = `下次视察：第 ${S.nextVisit} 天`;
  }
  const milestone = !isVisit && day % 30 === 0;
  S.phase = 'closed';
  if (isVisit) S.mode = 'daily';      // 视察夜强制高峰，过了就回到自己选的节奏
  S.day++;
  S.roundIncome += Math.max(0, net);
  S.roundServed += N.served;
  if (broke) S.ended = 'broke';
  else if (isVisit && S.inspections >= 3 && S.su >= 80) S.ended = 'best';
  else if (milestone) S.ended = 'milestone';
  if (S.ended) { S.lastGrade = grade; S.finalSu = S.su; }
  save();
  const rows = [
    ['接待', `${N.served} 桌`],
    ['跑掉', `${N.lost} 桌${N.lost ? `（客满 ${N.lostFull} · 等不及 ${N.lostWait} · 断锅底 ${N.noBase} · 打烊 ${N.lostClose}）` : ''}`],
    N.danger ? ['危辣', `${N.danger} 锅`] : null,
    N.clearPot ? ['清水锅', '单开一锅 · 副院长不吃辣'] : null,
    N.snacks ? ['小吃', `卖出 ${N.snacks} 份`] : null,
    N.dimSum ? ['下午点心', `卖出 ${N.dimSum} 份`] : null,
    N.swapped ? ['换锅', `${N.swapped} 桌（想吃的锅没备料，将就了）`] : null,

    N.noSide ? ['缺菜', `${N.noSide} 样没备上（那桌少收了钱）`] : null,
    ['流水', `<span class="pos">+${fmt(N.income)}</span>${N.peakBonus ? `（高峰多赚 ${fmt(N.peakBonus)}）` : ''}`],
    fdef && fdef.effect.money ? [`${fdef.title || f}付的`, `<span class="pos">+${fdef.effect.money}</span>`] : null,
    ['养护', `<span class="neg">−${r}</span>`],
    ['工钱', w ? `<span class="neg">−${w}</span>${wageStep() ? `（已涨 ${wageStep()} 回）` : ''}` : '0'],
    N.picky ? ['老客嫌弃', `${N.picky} 桌（菜单跟不上，少收了钱）`] : null,
    drift ? ['老客嘴刁', `口碑 −${drift}`] : null,
    ['损耗', spoilIng ? `涮菜 −${spoilIng} 份（隔夜，坏一半）` : '无'],
    ['口碑', `<span class="${repD >= 0 ? 'pos' : 'neg'}">${repD >= 0 ? '+' : ''}${repD.toFixed(1)}</span> → ${Math.round(S.rep)}`]
  ].filter(Boolean).map(([a, b]) => `<div class="row"><span>${a}</span><span>${b}</span></div>`).join('');
  const btn = broke ? `<button class="btn" id="mNext">……</button>`
    : S.ended === 'best' ? `<button class="btn" id="mNext">苏家认下了这家店</button>`
    : S.ended === 'milestone' ? `<button class="btn" id="mNext">开店满三十天</button>`
    : `<button class="btn" id="mNext">回柜台 · 第 ${day + 1} 天</button>`;
  const sub = isVisit ? '苏有盛视察夜 · 强制高峰' : (N.mode === 'peak' ? '今夜高峰' : '慢火日常') + (N.occ ? ' · ' + OCCASIONS[N.occ].label : '');
  showModal(`<h2>第 ${day} 天 · 打烊<small>${sub}</small></h2>
    <div class="rows">${rows}<div class="row total"><span>今日净收</span><span class="${net >= 0 ? 'pos' : 'neg'}">${net >= 0 ? '+' : ''}${fmt(net)} 文</span></div></div>
    ${visitHtml}
    ${friendHtml}
    <div class="said"><img src="${A.note}" alt=""><p><small>明若 · 打烊点评</small>${comment}</p></div>
    ${bail}
    ${visitNote ? `<p class="nextvisit">${visitNote}</p>` : ''}
    <div class="mbtns">${btn}</div>`);
  $('#mNext').onclick = () => {
    if (S.ended === 'broke') return showEnding('broke');
    if (S.ended === 'best') { S.ended = false; return showEnding('best'); }
    if (S.ended === 'milestone') { S.ended = false; return showEnding('milestone'); }
    hideModal(); N = null; startDay();
  };
  renderHUD();
}
function showEnding(kind) {
  const e = L.endings[kind];
  const friends = S.friendsSeen.length ? S.friendsSeen.join('、') : '还没有';
  const sub = kind === 'broke' ? '结局' : kind === 'milestone' ? '开店三十天' : '苏家的认可';
  const keep = kind === 'broke' ? '' : `<button class="btn alt" id="mContinue">继续开着</button>`;
  showModal(`<h2>${e.title}<small>${sub}</small></h2>
    <p class="ending-text">${e.text}</p>
    <div class="said"><img src="${A.note}" alt=""><p><small>明若</small>${e.line}</p></div>
    <div class="rows">
      <div class="row"><span>累计流水</span><span>${fmt(S.totalIncome)} 文</span></div>
      <div class="row"><span>累计接待</span><span>${S.totalServed} 桌</span></div>
      <div class="row"><span>最终口碑</span><span>${Math.round(S.rep)}</span></div>
      <div class="row"><span>店面</span><span>${S.tables} 桌${S.upstairs ? ` + 楼上 ${2 * S.upstairs} 桌` : ''}${S.annex ? ' + 隔壁 2 桌' : ''} · ${S.stove} 灶 · ${S.lanterns} 灯 · ${S.helpers + S.servers} 个伙计 · ${bases().length} 种锅底</span></div>
      <div class="row"><span>开张天数</span><span>${S.day} 天</span></div>
      <div class="row"><span>苏有盛来过</span><span>${S.inspections} 次</span></div>
      <div class="row"><span>苏家认可</span><span>${Math.round(S.su)}</span></div>
      <div class="row"><span>来过的老朋友</span><span>${friends}</span></div>
    </div>
    <div class="mbtns">${keep}<button class="btn" id="mRestart">重新开店</button></div>`);
  $('#mRestart').onclick = () => { hideModal(); resetGame(); };
  const c = $('#mContinue');
  if (c) c.onclick = () => { S.ended = false; save(); hideModal(); N = null; startDay(); };
}

function closeBooks() {
  if (S.phase === 'night') return;
  showModal(`<h2>今晚就把账交上去？<small>开张 ${S.day} 天</small></h2>
    <p class="ending-text">交账以后，这家店就交到苏有盛手上，你会看到从头到现在的总账。</p>
    <div class="rows">
      <div class="row"><span>累计流水</span><span>${fmt(S.totalIncome)} 文</span></div>
      <div class="row"><span>累计接待</span><span>${S.totalServed} 桌</span></div>
      <div class="row"><span>口碑</span><span>${Math.round(S.rep)}</span></div>
      <div class="row"><span>苏家认可</span><span>${Math.round(S.su)}</span></div>
    </div>
    <div class="mbtns"><button class="btn alt" id="mNo">再开几天</button><button class="btn" id="mYes">交账</button></div>`);
  $('#mNo').onclick = hideModal;
  $('#mYes').onclick = () => {
    hideModal();
    showEnding(S.su >= 50 || S.rep >= 60 ? 'best' : S.su >= 25 || S.rep >= 35 ? 'good' : 'weak');
  };
}

/* ---------------- flow ---------------- */
function askRaise() {
  const now = wages();
  const next = S.helpers * Math.round(WAGE.helper * (1 + 0.2 * (wageStep() + 1))) + S.servers * Math.round(WAGE.server * (1 + 0.2 * (wageStep() + 1)));
  const who = S.servers >= S.helpers ? 'server' : 'helper';
  const name = who === 'server' ? '跑堂' : '帮厨';
  showModal(`<h2>伙计来谈工钱<small>又干满十天了</small></h2>
    <p class="ending-text">后厨和堂前的几个伙计一块儿站在柜台前，领头的是${name}。说赤莲街别家都涨了，想每人每夜多拿两成。</p>
    <div class="rows">
      <div class="row"><span>现在工钱</span><span>${now} 文 / 夜</span></div>
      <div class="row"><span>涨了以后</span><span class="neg">${next} 文 / 夜</span></div>
    </div>
    <div class="said"><img src="${A.note}" alt=""><p><small>明若 · 字条</small>${pick(L.pressure.wageAsk)}</p></div>
    <div class="mbtns"><button class="btn alt" id="rNo">不涨</button><button class="btn" id="rYes">涨</button></div>`);
  $('#rYes').onclick = () => { S.wageLevel = wageStep() + 1; save(); hideModal(); renderHUD(); renderClosed(); say(pick(L.pressure.wageYes)); };
  $('#rNo').onclick = () => {
    if (who === 'server') S.servers--; else S.helpers--;
    save(); hideModal(); renderShop(); renderHUD(); renderClosed();
    say(pick(L.pressure.wageNo).replace('{who}', name));
  };
}
function dayChanges() {
  const d = S.day, out = [];
  if (d > 1 && era(d) > era(d - 1)) {
    const add = rentFor(d, S.tables, S.upstairs) - rentFor(d - 1, S.tables, S.upstairs);
    out.push({ short: `养护涨了：每夜 ${rentFor(d, S.tables, S.upstairs)} 文（+${add}）；进货也贵了一成`, line: pick(L.pressure.rent).replace('{d}', add) });
  }
  for (const t of TASTES) if (t.from === d) out.push({ short: `老客口味变刁：${t.label}`, line: L.pressure.taste[t.k] });
  return out;
}

function startDay() {
  S.phase = 'closed';
  stage.classList.remove('peak');
  renderShop(); renderHUD(); renderClosed();
  if (S.menu.danger && S.dangerSince && !S.danger21 && S.day >= S.dangerSince + 20) { S.friendDue = true; S.forcedPair = 'hexia+samuel'; }
  if ((S.friendNext || 0) <= S.day) S.friendDue = true;
  if (S.friendNext && S.day - S.friendNext >= 2) S.friendDue = true;
  if (raiseDue() && S.raiseAsked !== S.day && S.helpers + S.servers > 0) { S.raiseAsked = S.day; save(); askRaise(); }
  const toVisit = S.nextVisit - S.day;
  const changes = dayChanges();
  if (changes.length && S.noticed !== S.day) {
    S.noticed = S.day; save();
    toast('今天起', changes.map(c => c.short).join('<br>'), 7000);
  }
  const oc = occasion();
  if (oc) say(pick(L.ocDay[oc] || L.visit.warn));
  else if (toVisit === 0) say(L.visit.eve);
  else if (changes.length && toVisit !== 1) say(changes[0].line);
  else if (toVisit === 1) { S.warnings++; save(); say(pick(L.visit.warn)); }
  else say(S.day <= 7 ? L.dayStart[Math.max(1, S.day)] : pick(L.dayStartLater));
}
function resetGame() {
  S = newState(); save(); N = null; tab = 'fix';
  lastMoney = S.money;
  showTitle(true);
}
$('#btnReset').onclick = () => {
  if (S.phase === 'night') return;
  showModal(`<h2>重新开店？</h2><p class="ending-text">账本、店面、伙计都会清空，从第一天擦桌子开始。</p>
    <div class="mbtns"><button class="btn alt" id="mNo">算了</button><button class="btn" id="mYes">重开</button></div>`);
  $('#mNo').onclick = hideModal;
  $('#mYes').onclick = () => { hideModal(); resetGame(); };
};

const title = $('#title');
function showTitle(fresh) {
  title.hidden = false;
  const btns = $('#titleBtns'), it = $('#introText');
  const resumable = !fresh && load() && !S.ended && (S.day > 1 || S.tables > 2 || S.money !== 300);
  if (resumable) {
    it.textContent = `账本翻到第 ${S.day} 天。柜台上压着明若的字条，钱匣子里有 ${fmt(S.money)} 文——视察还有 ${Math.max(0, S.nextVisit - S.day)} 天。`;
    btns.innerHTML = `<button class="btn alt" id="tNew">重新开店</button><button class="btn" id="tGo">回到柜台</button>`;
    $('#tGo').onclick = () => { title.hidden = true; startDay(); };
    $('#tNew').onclick = () => { S = newState(); save(); showTitle(true); };
    return;
  }
  if (S.ended === 'broke') { S = newState(); save(); }
  let i = 0;
  it.textContent = L.intro[0];
  btns.innerHTML = `<button class="btn" id="tNext">接着听</button>`;
  $('#tNext').onclick = () => {
    i++;
    if (i < L.intro.length) {
      it.textContent = L.intro[i];
      if (i === L.intro.length - 1) $('#tNext').textContent = '接下这家店';
    } else { title.hidden = true; startDay(); }
  };
}

renderShop(); renderHUD(); renderClosed();
showTitle(false);

// debug/QA hook (no UI)
window.__shop = { get S() { return S; }, get N() { return N; }, setSpeed: v => { speed = v; } };
})();
