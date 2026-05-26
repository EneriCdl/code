/* ============================================================
   MC工坊 - 建筑&机器教程数据
   ============================================================ */

const MC_DATA = {

  /** 所有教程条目 */
  tutorials: [
    // ==================== 生电机器 (Redstone Machines) ====================
    {
      id: "cobblestone-gen-1-21",
      name: "1.21.4 全自动刷石机",
      category: "machine",
      icon: "🪨",
      description: "适用于1.21.4版本的高效全自动刷石机，利用流动熔岩和水生成石头，配合活塞自动推出，每分钟可产数百个圆石。适合生存前期快速获取建筑材料。",
      materials: ["熔岩桶 ×2", "水桶 ×1", "活塞 ×4", "红石粉 ×12", "拉杆 ×1", "红石中继器 ×2", "圆石 ×32", "黑曜石 ×4"],
      difficulty: "easy",
      version: "1.21.4",
      bilibiliSearch: "我的世界 1.21 刷石机 教程",
      tags: ["刷石机", "1.21", "自动", "生电", "前期"],
      steps: [
        "在地底挖一个3×8的沟槽",
        "在沟槽两端分别放置熔岩和水",
        "在接触面安装活塞用于自动推出生成的石头",
        "布置红石电路连接拉杆作为开关",
        "使用中继器调整活塞推动节奏"
      ]
    },
    {
      id: "iron-farm-1-21",
      name: "1.21.4 刷铁机/铁傀儡农场",
      category: "machine",
      icon: "🦾",
      description: "1.21.4版本可用的高效刷铁机。利用村民和僵尸恐吓机制生成铁傀儡，全自动收集铁锭和虞美人。存活三个夜晚后即可建造，是生电玩家必备设施。",
      materials: ["床 ×3", "村民 ×3", "僵尸 ×1", "漏斗 ×4", "箱子 ×2", "玻璃 ×16", "台阶 ×20", "活板门 ×6", "熔岩 ×1", "命名牌 ×1"],
      difficulty: "medium",
      version: "1.21.4",
      bilibiliSearch: "我的世界 1.21 刷铁机 铁傀儡农场 教程",
      tags: ["刷铁机", "1.21", "铁傀儡", "生电", "必备"],
      steps: [
        "在离地面8格高的位置搭建3×3的平台",
        "放置3张床和3个村民",
        "在村民正上方封闭空间放置命名后的僵尸",
        "利用村民被恐吓后召唤铁傀儡的机制",
        "底部使用熔岩+漏斗收集铁锭"
      ]
    },
    {
      id: "villager-breeder-1-21",
      name: "1.21.4 村民繁殖机",
      category: "machine",
      icon: "👨‍🌾",
      description: "全自动村民繁殖机，为交易大厅和刷铁机提供充足村民。利用床位和食物机制让村民自动繁殖，简单高效，生存必备。",
      materials: ["床 ×4", "堆肥桶 ×1", "胡萝卜/马铃薯 ×16", "玻璃 ×8", "活板门 ×4", "铁轨 ×1", "矿车 ×1"],
      difficulty: "easy",
      version: "1.21.4",
      bilibiliSearch: "我的世界 1.21 村民繁殖机 教程",
      tags: ["村民", "繁殖", "1.21", "生电"],
      steps: [
        "搭建3×3的封闭空间",
        "放置4张床并确保村民能识别",
        "放入2个村民并投喂食物",
        "利用活板门让幼年村民掉出",
        "矿车收集幼年村民送入交易大厅"
      ]
    },
    {
      id: "auto-crop-farm",
      name: "1.21.4 全自动农场(小麦/胡萝卜/马铃薯)",
      category: "machine",
      icon: "🌾",
      description: "全自动农作物收割机，利用村民+矿车收集系统实现播种和收获的全自动化。可种植小麦、胡萝卜和马铃薯。",
      materials: ["村民(农民) ×1", "堆肥桶 ×1", "漏斗矿车 ×1", "铁轨 ×16", "红石比较器 ×1", "红石粉 ×8", "活塞 ×2", "水桶 ×1", "箱子 ×4"],
      difficulty: "medium",
      version: "1.21.4",
      bilibiliSearch: "我的世界 全自动农场 村民 教程 1.21",
      tags: ["农场", "自动", "食物", "生电", "1.21"],
      steps: [
        "开辟9×9的农田并锄地浇水",
        "在农田中央放置堆肥桶并指派农民村民",
        "布置漏斗矿车轨道系统在农田下方",
        "使用比较器检测堆肥桶信号触发收割",
        "收集系统将作物送入箱子"
      ]
    },
    {
      id: "mob-grinder-xp",
      name: "1.21.4 刷怪塔/经验塔",
      category: "machine",
      icon: "💀",
      description: "经典高空刷怪塔，利用刷怪机制在高空集中生成怪物并摔落至残血，方便击杀获取经验和掉落物。1.21.4版本优化了寻路AI。",
      materials: ["圆石 ×256", "活板门 ×32", "水桶 ×4", "漏斗 ×8", "箱子 ×4", "火把 ×16", "台阶 ×128"],
      difficulty: "medium",
      version: "1.21.4",
      bilibiliSearch: "我的世界 1.21 刷怪塔 经验塔 教程",
      tags: ["刷怪塔", "经验", "掉落物", "1.21"],
      steps: [
        "在Y=200以上搭建大型刷怪平台(建议23×23)",
        "铺设活板门引导怪物走向水道",
        "水道将怪物送入22格掉落通道",
        "底部收集区放半砖让怪物残血",
        "使用漏斗收集掉落物"
      ]
    },
    {
      id: "tree-farm-tnt",
      name: "1.21.4 TNT树场",
      category: "machine",
      icon: "🌲",
      description: "TNT复制树场，利用TNT复制机高效采集木材。适合后期大量需求木材的工程，每小时可产出数千原木。",
      materials: ["粘液块 ×16", "活塞 ×12", "红石块 ×2", "侦测器 ×4", "TNT ×1", "黑曜石 ×8", "珊瑚扇 ×1", "骨粉 ×64"],
      difficulty: "hard",
      version: "1.21.4",
      bilibiliSearch: "我的世界 TNT树场 教程 1.21",
      tags: ["树场", "TNT", "木材", "高级", "1.21"],
      steps: [
        "搭建TNT复制机的核心结构(粘液块+珊瑚扇)",
        "安装活塞推动原木的机械装置",
        "连接骨粉催熟系统",
        "设置TNT引爆收集区",
        "建造水流收集系统"
      ]
    },
    {
      id: "super-smelter",
      name: "1.21.4 熔炉组/超级熔炉",
      category: "machine",
      icon: "🔥",
      description: "32联超级熔炉阵列，利用漏斗矿车均匀分配燃料和待烧物品，一次可同时烧制32组物品，效率极高。",
      materials: ["熔炉 ×32", "漏斗 ×36", "漏斗矿车 ×1", "铁轨 ×20", "箱子 ×8", "拉杆 ×1", "红石比较器 ×1"],
      difficulty: "medium",
      version: "1.21.4",
      bilibiliSearch: "我的世界 超级熔炉 熔炉组 教程",
      tags: ["熔炉", "烧制", "阵列", "生电"],
      steps: [
        "搭建8×4的熔炉墙",
        "顶部和底部分别铺设漏斗用于输入燃料和待烧物",
        "使用漏斗矿车在后方轨道均匀分配物品",
        "前方使用漏斗收集成品",
        "连接拉杆控制开关"
      ]
    },
    {
      id: "piglin-farm",
      name: "1.21.4 猪人塔/金农场",
      category: "machine",
      icon: "🐷",
      description: "在地狱基岩上层建造的超大型猪人塔，利用猪灵被激怒后的仇恨机制大量生成并击杀，获取海量金粒和经验。",
      materials: ["岩浆块 ×128", "漏斗 ×16", "箱子 ×8", "活板门 ×64", "命名牌 ×2", "矿车 ×4", "铁轨 ×32", "黑曜石 ×10"],
      difficulty: "hard",
      version: "1.21.4",
      bilibiliSearch: "我的世界 猪人塔 金农场 1.21 教程",
      tags: ["猪人塔", "金", "地狱", "高级", "1.21"],
      steps: [
        "在地狱基岩上层(Y=252+)搭建23×23的刷怪平台",
        "中央放置命名后的猪灵作为仇恨目标",
        "铺设活板门引导猪灵走向掉落通道",
        "底部使用岩浆块造成伤害",
        "漏斗矿车收集系统"
      ]
    },
    {
      id: "guardian-farm",
      name: "1.21.4 守卫者农场",
      category: "machine",
      icon: "🐡",
      description: "利用海底神殿结构的守卫者农场，可高效获取海晶碎片、海晶砂砾和海晶灯，是建筑玩家的必备农场。",
      materials: ["灵魂沙 ×32", "水桶 ×16", "漏斗 ×12", "箱子 ×6", "栅栏门 ×20", "海绵 ×20", "TNT ×8"],
      difficulty: "hard",
      version: "1.21.4",
      bilibiliSearch: "我的世界 守卫者农场 海底神殿 教程 1.21",
      tags: ["守卫者", "海底神殿", "海晶", "高级", "1.21"],
      steps: [
        "找到海底神殿并排干内部水源",
        "在神殿上方搭建刷怪平台",
        "使用气泡柱(灵魂沙)将守卫者推送到处理区",
        "建造三叉戟击杀装置或摔落处理",
        "漏斗收集系统"
      ]
    },
    {
      id: "slime-farm",
      name: "1.21.4 史莱姆农场",
      category: "machine",
      icon: "🟢",
      description: "在史莱姆区块建造的高效史莱姆农场。粘液球是红石机械的核心材料，此农场为生电玩家必备。",
      materials: ["台阶 ×128", "火把 ×32", "漏斗 ×8", "箱子 ×4", "活板门 ×16", "铁傀儡 ×1", "岩浆块 ×16"],
      difficulty: "medium",
      version: "1.21.4",
      bilibiliSearch: "我的世界 史莱姆农场 slime chunk 教程 1.21",
      tags: ["史莱姆", "粘液球", "区块", "生电"],
      steps: [
        "使用Chunk Base找到史莱姆区块",
        "在Y=39以下挖掘多层刷怪平台",
        "每层铺设半砖防止其他怪物生成",
        "底部放置铁傀儡引诱大型史莱姆",
        "使用岩浆块处理小史莱姆"
      ]
    },
    {
      id: "honey-farm",
      name: "1.21.4 蜂蜜农场/养蜂机",
      category: "machine",
      icon: "🍯",
      description: "全自动蜂蜜和蜂巢收集机，利用侦测器检测蜂巢状态并自动用剪刀采集或用玻璃瓶装蜜。蜂蜜是制作铜块涂蜡的关键材料。",
      materials: ["蜂巢 ×4", "花朵 ×16", "侦测器 ×4", "发射器 ×4", "红石粉 ×8", "玻璃瓶 ×16", "剪刀 ×2", "漏斗 ×4"],
      difficulty: "easy",
      version: "1.21.4",
      bilibiliSearch: "我的世界 蜂蜜农场 自动 教程 1.21",
      tags: ["蜂蜜", "蜜蜂", "自动", "1.21"],
      steps: [
        "种植大量花朵并放置蜂巢",
        "在蜂巢后方安装侦测器",
        "侦测器检测蜂蜜等级触发发射器",
        "发射器使用玻璃瓶收集蜂蜜",
        "漏斗收集到箱子"
      ]
    },
    {
      id: "wool-farm",
      name: "1.21.4 全自动羊毛机",
      category: "machine",
      icon: "🐑",
      description: "利用侦测器观察草方块被羊吃掉触发发射器剪刀剪羊毛的设计，全自动16色羊毛生产。",
      materials: ["羊 ×16", "草方块 ×16", "侦测器 ×16", "发射器 ×16", "剪刀 ×16", "漏斗 ×20", "箱子 ×4", "矿车×1"],
      difficulty: "medium",
      version: "1.21.4",
      bilibiliSearch: "我的世界 自动羊毛机 剪羊毛 教程 1.21",
      tags: ["羊毛", "自动", "染色", "1.21"],
      steps: [
        "将16只不同颜色的羊分别关在1×1的栅栏中",
        "每只羊前方放置草方块",
        "在草方块旁安装侦测器检测草地变化",
        "侦测器触发发射器使用剪刀",
        "漏斗矿车收集下方羊毛"
      ]
    },
    {
      id: "bamboo-sugarcane-farm",
      name: "1.21.4 竹子/甘蔗全自动农场",
      category: "machine",
      icon: "🎋",
      description: "利用飞行器(观察者+活塞)的全自动竹子/甘蔗收割机，零骨粉消耗，纯红石驱动。",
      materials: ["侦测器 ×12", "活塞 ×8", "粘液块 ×4", "红石块 ×2", "漏斗 ×8", "箱子 ×4", "玻璃 ×16", "土/沙子 ×16"],
      difficulty: "medium",
      version: "1.21.4",
      bilibiliSearch: "我的世界 竹子机 甘蔗机 飞行器 教程 1.21",
      tags: ["竹子", "甘蔗", "飞行器", "自动", "1.21"],
      steps: [
        "种植一排竹子或甘蔗(最长16格)",
        "建造双方向飞行器(侦测器+活塞+粘液块)",
        "飞行器来回推动收割作物",
        "下方水流收集掉落的物品",
        "漏斗导入箱子"
      ]
    },
    {
      id: "raid-farm",
      name: "1.21.4 袭击农场/灾厄农场",
      category: "machine",
      icon: "⚔️",
      description: "利用不祥之兆触发袭击并高效击杀掠夺者、卫道士等灾厄村民的农场，大量产出绿宝石、不死图腾和鞍。",
      materials: ["村民 ×1", "床 ×1", "堆肥桶 ×1", "活板门 ×16", "玻璃 ×32", "漏斗 ×8", "箱子 ×4", "命名牌 ×1"],
      difficulty: "hard",
      version: "1.21.4",
      bilibiliSearch: "我的世界 袭击农场 raid farm 教程 1.21",
      tags: ["袭击", "绿宝石", "不死图腾", "高级", "1.21"],
      steps: [
        "在掠夺者前哨站附近找到合适位置",
        "搭建村民安全区(村民+床+工作方块)",
        "建造袭击怪物处理平台",
        "设计击杀收集区",
        "获取不祥之兆后触发袭击"
      ]
    },
    {
      id: "chicken-cooker",
      name: "1.21.4 全自动烤鸡机",
      category: "machine",
      icon: "🍗",
      description: "利用鸡蛋孵化+熔岩烤制的全自动熟鸡肉生产机。只需初始放入几只鸡，即可无限产出熟鸡肉和羽毛。",
      materials: ["鸡 ×4", "漏斗 ×6", "箱子 ×2", "发射器 ×2", "侦测器 ×1", "红石比较器 ×1", "熔岩 ×1", "活板门 ×2", "玻璃 ×8"],
      difficulty: "easy",
      version: "1.21.4",
      bilibiliSearch: "我的世界 烤鸡机 自动 教程 1.21",
      tags: ["烤鸡", "食物", "自动", "简单", "1.21"],
      steps: [
        "搭建3×3的封闭鸡舍",
        "放入鸡并收集鸡蛋通过漏斗进入发射器",
        "比较器检测发射器有物品时触发发射",
        "小鸡长大后接触熔岩被烤熟",
        "漏斗收集熟鸡肉"
      ]
    },
    {
      id: "creeper-farm",
      name: "1.21.4 苦力怕农场/火药塔",
      category: "machine",
      icon: "💣",
      description: "专门为收集火药建造的苦力怕农场，利用活板门限制生成高度只让苦力怕生成，配合猫恐吓机制集中苦力怕。",
      materials: ["活板门 ×64", "猫 ×2", "漏斗 ×10", "箱子 ×4", "地毯 ×32", "玻璃 ×16", "水桶 ×4"],
      difficulty: "medium",
      version: "1.21.4",
      bilibiliSearch: "我的世界 苦力怕农场 火药 教程 1.21",
      tags: ["苦力怕", "火药", "1.21", "生电"],
      steps: [
        "搭建多层刷怪平台，每层高度不超过2格",
        "使用活板门覆盖天花板限制骷髅/僵尸生成",
        "在平台周围放置猫恐吓苦力怕走向水道",
        "水道将苦力怕送入击杀区",
        "漏斗收集火药"
      ]
    },
    {
      id: "wither-skeleton-farm",
      name: "1.21.4 凋零骷髅农场",
      category: "machine",
      icon: "☠️",
      description: "在地狱堡垒建造的凋零骷髅农场，利用凋零玫瑰和猪灵蛮兵机制高效获取凋零骷髅头颅。",
      materials: ["凋零玫瑰 ×16", "活板门 ×32", "漏斗 ×8", "箱子 ×4", "半砖 ×128", "命名牌 ×2", "矿车 ×2"],
      difficulty: "hard",
      version: "1.21.4",
      bilibiliSearch: "我的世界 凋零骷髅农场 头颅 教程 1.21",
      tags: ["凋零骷髅", "头颅", "地狱", "高级"],
      steps: [
        "找到地狱堡垒并用半砖铺设刷怪平台",
        "在平台种植凋零玫瑰让凋零骷髅成为唯一生成怪",
        "铺设活板门引导凋零骷髅到掉落通道",
        "使用猪灵蛮兵或手动击杀",
        "收集凋零骷髅头颅"
      ]
    },
    {
      id: "enderman-farm",
      name: "1.21.4 末影人农场/小黑塔",
      category: "machine",
      icon: "👾",
      description: "在末地建造的末影人经验农场，经验获取效率最高的设计之一，几分钟即可从0级升到30级。",
      materials: ["半砖 ×64", "漏斗 ×8", "箱子 ×4", "末影螨 ×1", "命名牌 ×1", "矿车 ×1", "铁轨 ×4", "活板门 ×16"],
      difficulty: "medium",
      version: "1.21.4",
      bilibiliSearch: "我的世界 末影人农场 小黑塔 经验 教程 1.21",
      tags: ["末影人", "经验", "末地", "1.21"],
      steps: [
        "在末地距离主岛128格外建造平台",
        "使用命名后的末影螨引诱末影人",
        "引导末影人走向掉落通道",
        "底部使用半砖让末影人剩1血",
        "玩家在安全处击杀获取经验"
      ]
    },
    {
      id: "shulker-farm",
      name: "1.21.4 潜影贝农场",
      category: "machine",
      icon: "🐚",
      description: "全自动潜影贝农场，利用潜影贝被击中后会分裂的机制大量繁殖，获取潜影壳用于制作潜影盒。",
      materials: ["潜影贝 ×1", "铁轨 ×32", "矿车 ×4", "漏斗 ×8", "箱子 ×4", "活板门 ×16", "玻璃 ×20", "侦测器 ×8"],
      difficulty: "hard",
      version: "1.21.4",
      bilibiliSearch: "我的世界 潜影贝农场 潜影壳 shulker farm 教程 1.21",
      tags: ["潜影贝", "潜影壳", "高级", "1.21"],
      steps: [
        "将一只潜影贝从末地城运送到末地主岛",
        "搭建封闭空间让潜影贝互相射击",
        "利用潜影贝击中同类后分裂的机制",
        "矿车收集掉落的潜影贝",
        "自动击杀收集潜影壳"
      ]
    },
    {
      id: "concrete-factory",
      name: "1.21.4 混凝土工厂/粉末固化机",
      category: "machine",
      icon: "🎨",
      description: "全自动混凝土固化工厂，将混凝土粉末与水接触固化为混凝土并自动推出收集，为建筑项目提供海量彩色混凝土。",
      materials: ["侦测器 ×8", "活塞 ×16", "红石粉 ×20", "水桶 ×2", "漏斗 ×8", "箱子 ×6", "黑曜石 ×4"],
      difficulty: "medium",
      version: "1.21.4",
      bilibiliSearch: "我的世界 混凝土工厂 固化 自动 教程",
      tags: ["混凝土", "建筑", "自动", "生电"],
      steps: [
        "搭建活塞推出阵列(2×16)",
        "在推出位置的下方放置水",
        "使用侦测器检测混凝土粉末放置",
        "上方漏斗或手动放置混凝土粉末",
        "活塞推出固化的混凝土"
      ]
    },
    // ==================== 建筑教程 (Buildings) ====================
    {
      id: "survival-starter-house",
      name: "生存新手小屋 (10分钟速建)",
      category: "building",
      icon: "🏠",
      description: "适合生存第一天的紧凑型小屋，材料易获取，包含床、熔炉、工作台和箱子等基本设施。附带小型农场和照明设计。",
      materials: ["橡木原木 ×20", "橡木木板 ×48", "玻璃板 ×8", "圆石 ×16", "火把 ×8", "床 ×1", "门 ×1", "活板门 ×4"],
      difficulty: "easy",
      version: "1.21.4",
      bilibiliSearch: "我的世界 生存小屋 新手 建筑教程",
      tags: ["小屋", "生存", "简单", "新手", "建筑"],
      steps: [
        "选择平坦地形规划5×5的地基",
        "使用橡木原木搭建四角柱子",
        "木板填充墙壁，正面留出门的位置",
        "搭建三角形屋顶并用楼梯修饰",
        "内部布置床、熔炉、工作台和箱子"
      ]
    },
    {
      id: "modern-villa",
      name: "现代别墅 (带泳池)",
      category: "building",
      icon: "🏘️",
      description: "现代风格的豪华别墅教程，使用石英、白色混凝土和玻璃打造简约现代外观。附带游泳池和花园设计，适合中后期建造。",
      materials: ["石英块 ×128", "白色混凝土 ×96", "玻璃 ×64", "淡灰色混凝土 ×48", "深色橡木 ×32", "海晶灯 ×16", "水桶 ×8"],
      difficulty: "medium",
      version: "1.21.4",
      bilibiliSearch: "我的世界 现代别墅 建筑教程 石英",
      tags: ["现代", "别墅", "石英", "建筑", "中型"],
      steps: [
        "在平地上规划15×20的地基",
        "使用石英和白色混凝土搭建外墙",
        "大面积落地窗使用玻璃板",
        "平屋顶设计并添加天台花园",
        "后院建造游泳池和休息区"
      ]
    },
    {
      id: "medieval-castle",
      name: "中世纪城堡",
      category: "building",
      icon: "🏰",
      description: "宏伟的中世纪风格城堡，使用石砖、圆石和深色橡木打造。包含城墙、塔楼、主楼和护城河。适合长期生存存档的标志性建筑。",
      materials: ["石砖 ×512", "圆石 ×256", "深色橡木 ×128", "云杉木 ×96", "铁栅栏 ×32", "火把 ×64", "梯子 ×16", "橡木门 ×8"],
      difficulty: "hard",
      version: "1.21+",
      bilibiliSearch: "我的世界 中世纪城堡 建筑教程 详细",
      tags: ["城堡", "中世纪", "大型", "高级", "建筑"],
      steps: [
        "选择高地或平地规划城堡布局",
        "使用石砖建造外墙(高12格厚2格)",
        "四角搭建圆形塔楼，顶部锯齿状城垛",
        "内部建造主楼(王座厅、卧室、厨房)",
        "外部挖掘护城河并放水"
      ]
    },
    {
      id: "japanese-garden",
      name: "日式庭院/和风建筑",
      category: "building",
      icon: "⛩️",
      description: "精致的日式庭院建筑教程，包含鸟居、枯山水、茶室和鲤鱼池。使用深色橡木、砂岩和红色羊毛等材料。",
      materials: ["深色橡木 ×96", "砂岩 ×64", "红色羊毛 ×16", "云杉木活板门 ×32", "灯笼 ×16", "骨粉 ×20", "竹笋 ×16", "水桶 ×4", "荷叶 ×8"],
      difficulty: "medium",
      version: "1.21.4",
      bilibiliSearch: "我的世界 日式庭院 和风建筑 教程",
      tags: ["日式", "庭院", "和风", "建筑", "中型"],
      steps: [
        "规划庭院布局，确定茶室和庭园位置",
        "搭建鸟居门作为入口",
        "建造日式茶室(深色橡木+白色混凝土)",
        "铺设枯山水(沙砾+石头点缀)",
        "挖掘鲤鱼池并种植竹子"
      ]
    },
    {
      id: "underwater-base",
      name: "水下基地/海底城市",
      category: "building",
      icon: "🌊",
      description: "在海底建造的科幻风格水下基地，使用玻璃和混凝土构建透明穹顶。包含气闸门、水下农场和连接隧道。",
      materials: ["玻璃 ×192", "海晶灯 ×32", "淡蓝色混凝土 ×64", "石英块 ×48", "海晶石砖 ×32", "丛林木板 ×20", "活板门 ×16", "海绵 ×32"],
      difficulty: "hard",
      version: "1.21.4",
      bilibiliSearch: "我的世界 水下基地 海底 建筑教程 玻璃穹顶",
      tags: ["水下", "海底", "玻璃", "高级", "建筑"],
      steps: [
        "选择海底平坦区域用沙砾围出范围",
        "使用海绵排干内部水源",
        "建造玻璃穹顶作为主生活区",
        "搭建气闸门入口(利用门的防水特性)",
        "内部建造水下农场和储存区"
      ]
    },
    {
      id: "treehouse-village",
      name: "大型树屋/树顶村庄",
      category: "building",
      icon: "🌳",
      description: "在巨型橡木或丛林树上建造的树屋群落，通过吊桥连接多个树屋，包含居住区、农场和观景台。",
      materials: ["橡木原木 ×128", "橡木木板 ×192", "栅栏 ×64", "玻璃板 ×32", "藤蔓 ×32", "火把 ×48", "云杉木楼梯 ×32", "活板门 ×24", "泥土 ×16"],
      difficulty: "medium",
      version: "1.21.4",
      bilibiliSearch: "我的世界 树屋 树顶 村庄 建筑教程",
      tags: ["树屋", "自然", "村庄", "建筑", "中型"],
      steps: [
        "种植2×2的丛林树或找到大型橡木",
        "在树干中部搭建主平台",
        "延伸树枝并在枝头搭建小屋",
        "使用栅栏吊桥连接各个树屋",
        "添加藤蔓和灯笼装饰"
      ]
    },
    {
      id: "modern-city-apartment",
      name: "现代城市/公寓大楼",
      category: "building",
      icon: "🏙️",
      description: "现代城市风格的公寓大楼，包含底层商铺、住宅层和屋顶设施。适合在生存中打造一个小型城镇中心。",
      materials: ["白色混凝土 ×256", "灰色混凝土 ×128", "玻璃 ×128", "淡蓝色玻璃板 ×64", "平滑石台阶 ×96", "海晶灯 ×48", "铁块 ×16", "铁门 ×16"],
      difficulty: "hard",
      version: "1.21.4",
      bilibiliSearch: "我的世界 现代城市 公寓 建筑教程",
      tags: ["现代", "城市", "公寓", "高级", "建筑"],
      steps: [
        "规划建筑群布局和街道",
        "使用白色/灰色混凝土搭建各栋楼的外墙",
        "大面积使用玻璃幕墙",
        "每层楼内部隔出公寓单元",
        "底层设置商铺，屋顶添加花园"
      ]
    },
    {
      id: "farm-estate",
      name: "农场庄园/田园风大宅",
      category: "building",
      icon: "🏡",
      description: "温馨的美国乡村风格农场庄园，包含主宅、谷仓、马厩、农田和水车。大量使用橡木和红砖材料。",
      materials: ["橡木原木 ×96", "橡木木板 ×128", "红砖 ×96", "干草块 ×32", "云杉木栅栏 ×64", "玻璃板 ×24", "灯笼 ×20", "木门 ×8"],
      difficulty: "medium",
      version: "1.21.4",
      bilibiliSearch: "我的世界 农场庄园 田园 建筑教程",
      tags: ["农场", "庄园", "田园", "建筑", "中型"],
      steps: [
        "划定农场土地范围并用栅栏围起",
        "搭建主宅(二层，砖木结构，坡屋顶)",
        "建造谷仓存放干草块",
        "搭建马厩和动物围栏区",
        "开垦大型农田并建造水车装饰"
      ]
    },
    {
      id: "mountain-villa",
      name: "山顶别墅/悬崖豪宅",
      category: "building",
      icon: "⛰️",
      description: "利用险峻地形在山顶或悬崖边建造的豪宅，大面积玻璃落地窗尽览山下风光，通过栈道或水电梯上下山。",
      materials: ["圆石 ×128", "石砖 ×96", "玻璃 ×128", "深色橡木 ×64", "铁栅栏 ×32", "灯笼 ×24", "平滑石台阶 ×48", "云杉木活板门 ×32"],
      difficulty: "hard",
      version: "1.21.4",
      bilibiliSearch: "我的世界 山顶别墅 悬崖 建筑教程",
      tags: ["山顶", "悬崖", "现代", "高级", "建筑"],
      steps: [
        "寻找适合的山顶或悬崖地形",
        "平整山顶平台并用石砖加固",
        "悬挑结构延伸建筑面积",
        "大面积使用玻璃护栏和落地窗",
        "建造水电梯或栈道连接山下"
      ]
    },
    {
      id: "seaside-lighthouse",
      name: "海边灯塔+港口",
      category: "building",
      icon: "🔦",
      description: "经典的红白条纹灯塔和配套小型港口的建筑教程。灯塔内部设置旋转信标灯(使用红石灯)，港口可停泊小船。",
      materials: ["红色混凝土 ×80", "白色混凝土 ×80", "红石灯 ×4", "侦测器 ×4", "橡木木板 ×48", "圆石墙 ×32", "云杉木栅栏 ×24", "海晶灯 ×8"],
      difficulty: "medium",
      version: "1.21.4",
      bilibiliSearch: "我的世界 灯塔 港口 海边 建筑教程",
      tags: ["灯塔", "海边", "港口", "建筑", "中型"],
      steps: [
        "在海岸线选择突出的位置建造",
        "灯塔主体用红白混凝土交替搭建(高20格+)",
        "顶部使用红石灯+侦测器做旋转信标",
        "灯塔内部搭建螺旋楼梯",
        "旁建小型港口和木栈桥"
      ]
    },
    {
      id: "nether-base",
      name: "地狱基地/下界生存站",
      category: "building",
      icon: "👹",
      description: "在地狱(下界)建造的安全基地，使用抗爆材料(黑曜石/石砖)建造，包含传送门大厅、猪灵交易区和物品储存。",
      materials: ["黑曜石 ×48", "石砖 ×96", "深色橡木 ×32", "铁门 ×4", "金块 ×8", "箱子 ×16", "铁栅栏 ×24", "荧石 ×16", "绯红木板 ×32"],
      difficulty: "medium",
      version: "1.21.4",
      bilibiliSearch: "我的世界 地狱基地 下界 建筑教程",
      tags: ["地狱", "下界", "基地", "建筑", "中型"],
      steps: [
        "选择灵魂沙谷或绯红森林相对安全区域",
        "使用黑曜石和石砖搭建外墙(防恶魂火球)",
        "内部建造传送门大厅(多个传送门)",
        "设置猪灵交易区(金块为中心)",
        "搭建物品储存和合成区域"
      ]
    },
    {
      id: "fantasy-wizard-tower",
      name: "奇幻法师塔",
      category: "building",
      icon: "🧙",
      description: "奇幻风格的高塔建筑，悬浮结构和紫色魔法粒子效果。使用紫水晶、深色橡木和紫色玻璃营造神秘魔法氛围，附带附魔台室。",
      materials: ["深色橡木 ×96", "紫水晶块 ×32", "紫色玻璃 ×48", "石砖 ×64", "紫珀块 ×24", "末地烛 ×16", "书柜 ×32", "附魔台 ×1", "深色橡木栅栏 ×32"],
      difficulty: "medium",
      version: "1.21.4",
      bilibiliSearch: "我的世界 法师塔 奇幻 魔法 建筑教程",
      tags: ["奇幻", "法师塔", "魔法", "建筑", "中型"],
      steps: [
        "搭建圆形塔基(直径9格)",
        "使用石砖和深色橡木交替建造塔身",
        "在塔顶使用紫水晶和紫色玻璃打造魔法穹顶",
        "内部建造旋转楼梯和附魔室",
        "塔尖使用末地烛和紫珀块装饰"
      ]
    },
    {
      id: "asian-pagoda",
      name: "中式宝塔/楼阁",
      category: "building",
      icon: "🏯",
      description: "中式风格的宝塔建筑，多层檐角上翘，采用红色和金色为主色调，搭配石狮和庭院装饰。",
      materials: ["红色混凝土 ×96", "深色橡木 ×64", "金合欢木 ×32", "石砖台阶 ×64", "石英块 ×32", "红石灯 ×16", "云杉木栅栏 ×48", "末地烛 ×8"],
      difficulty: "hard",
      version: "1.21.4",
      bilibiliSearch: "我的世界 中式建筑 宝塔 中国风 教程",
      tags: ["中式", "宝塔", "中国风", "高级", "建筑"],
      steps: [
        "搭建八角形塔基(对角直径13格)",
        "每层使用红色混凝土为柱，深色橡木为檐",
        "利用台阶和半砖做出上翘的飞檐效果",
        "逐层内缩，共五到七层",
        "顶部金合欢木+末地烛装饰塔尖"
      ]
    },
    {
      id: "underground-bunker",
      name: "地下避难所/末日地堡",
      category: "building",
      icon: "🔒",
      description: "功能齐全的地下避难所，包含自动农场、畜养区、储存系统和水源净化设施。全封闭式设计，利用红石灯照明。",
      materials: ["石砖 ×192", "铁门 ×8", "红石灯 ×32", "铁活板门 ×4", "漏斗 ×16", "箱子 ×16", "活塞 ×8", "拉杆 ×16", "玻璃 ×32", "泥土 ×64"],
      difficulty: "medium",
      version: "1.21.4",
      bilibiliSearch: "我的世界 地下基地 避难所 建筑教程",
      tags: ["地下", "避难所", "功能", "建筑", "中型"],
      steps: [
        "挖掘地下大型空间(建议20×20×8)",
        "使用石砖铺设墙壁和地板",
        "红石灯分区照明",
        "划分功能区: 农场区、储存区、卧室、畜养区",
        "使用活塞门作为主入口"
      ]
    },
    {
      id: "floating-island",
      name: "空岛/天空之城",
      category: "building",
      icon: "☁️",
      description: "在天空中建造的浮空岛群落，利用泥土、草方块和水流打造空中绿洲。通过瀑布电梯或鞘翅在不同空岛间移动。",
      materials: ["泥土 ×256", "草方块 ×64", "圆石 ×128", "水桶 ×16", "橡木原木 ×48", "玻璃 ×64", "萤石 ×32", "云杉木活板门 ×32"],
      difficulty: "hard",
      version: "1.21.4",
      bilibiliSearch: "我的世界 空岛 天空之城 建筑教程",
      tags: ["空岛", "天空", "浮空", "高级", "建筑"],
      steps: [
        "在Y=150+高度先搭建一个中心平台",
        "用泥土和草方块建造岛屿主体",
        "在岛底添加圆石和矿石增加自然感",
        "建造连接各个浮空岛的桥梁",
        "利用水电梯或气泡柱连接地面"
      ]
    },
    // ==================== 更多生电机器 ====================
    {
      id: "auto-fisher",
      name: "1.21.4 全自动钓鱼机",
      category: "machine",
      icon: "🎣",
      description: "利用音符盒和绊线钩制作的全自动钓鱼机，挂机即可获得鱼、宝藏附魔书、弓等稀有物品。生存前期获取附魔书的最佳方式。",
      materials: ["绊线钩 ×1", "铁活板门 ×1", "音符盒 ×1", "水桶 ×1", "箱子 ×2", "漏斗 ×2", "栅栏 ×2"],
      difficulty: "easy",
      version: "1.21.4",
      bilibiliSearch: "我的世界 全自动钓鱼机 1.21 教程",
      tags: ["钓鱼", "挂机", "附魔", "1.21", "前期"],
      steps: [
        "放置音符盒作为右键触发点",
        "在音符盒上方放置铁活板门",
        "用绊线钩连接活板门",
        "下方放置水和漏斗收集系统",
        "持续右键挂机钓鱼"
      ]
    },
    {
      id: "kelp-farm",
      name: "1.21.4 海带农场/海带骨粉机",
      category: "machine",
      icon: "🌿",
      description: "海带烧制为海带干后可合成骨粉，此农场利用零刻催熟+侦测器收割机制大量生产海带，是骨粉生产线核心。",
      materials: ["侦测器 ×8", "活塞 ×6", "红石粉 ×12", "沙子 ×32", "水桶 ×4", "漏斗 ×6", "熔炉 ×4", "箱子 ×4"],
      difficulty: "medium",
      version: "1.21.4",
      bilibiliSearch: "我的世界 海带农场 骨粉机 教程 1.21",
      tags: ["海带", "骨粉", "自动", "1.21"],
      steps: [
        "在水下铺设沙子作为海带种植床",
        "上方安装侦测器检测海带生长",
        "侦测器触发活塞收割顶层海带",
        "水流收集掉落海带",
        "连接到熔炉组烧制为海带干并合成为骨粉"
      ]
    },
    {
      id: "basalt-generator",
      name: "1.21.4 玄武岩刷石机",
      category: "machine",
      icon: "🪨",
      description: "利用蓝冰、灵魂土和熔岩生成玄武岩的全自动农场，玄武岩是下界建筑的重要材料。",
      materials: ["蓝冰 ×4", "灵魂土 ×8", "熔岩桶 ×4", "活塞 ×8", "侦测器 ×4", "红石粉 ×8", "漏斗 ×4", "箱子 ×2"],
      difficulty: "medium",
      version: "1.21.4",
      bilibiliSearch: "我的世界 玄武岩 farm 教程 1.21",
      tags: ["玄武岩", "下界", "自动", "建筑"],
      steps: [
        "搭建蓝冰和灵魂土交替结构",
        "在蓝冰旁放置熔岩生成玄武岩",
        "侦测器检测方块生成触发活塞",
        "活塞推动收集玄武岩",
        "漏斗导入储存箱"
      ]
    },
    {
      id: "ice-farm",
      name: "1.21.4 冰场/蓝冰农场",
      category: "machine",
      icon: "🧊",
      description: "在寒冷群系建造的大型冰农场，利用水自动结冰+侦测器收割，大量产出冰、浮冰和蓝冰用于交通和建筑。",
      materials: ["水桶 ×32", "侦测器 ×16", "活塞 ×16", "红石粉 ×24", "萤石 ×8", "漏斗 ×10", "箱子 ×4"],
      difficulty: "hard",
      version: "1.21.4",
      bilibiliSearch: "我的世界 刷冰机 蓝冰 教程 1.21",
      tags: ["冰", "蓝冰", "寒冷", "高级"],
      steps: [
        "在雪山或冰刺群系选择建造位置",
        "铺设大面积1格深的水平台",
        "利用低温让水自动结冰",
        "侦测器检测后触发活塞收割",
        "连续的漏斗矿车收集系统"
      ]
    },
    {
      id: "auto-brewing",
      name: "1.21.4 全自动酿造站",
      category: "machine",
      icon: "🧪",
      description: "利用漏斗和红石的全自动药水酿造系统，可以批量生产力量药水、夜视药水等常用药水。适合后期战斗准备。",
      materials: ["酿造台 ×4", "漏斗 ×16", "红石比较器 ×4", "红石粉 ×12", "箱子 ×8", "发射器 ×4", "水瓶 ×12"],
      difficulty: "medium",
      version: "1.21.4",
      bilibiliSearch: "我的世界 自动酿造机 药水 教程",
      tags: ["药水", "酿造", "自动", "战斗"],
      steps: [
        "并排放置4个酿造台",
        "每个酿造台上方连接漏斗输入水瓶",
        "侧面漏斗输入酿造材料(地狱疣→主材料→火药等)",
        "比较器检测酿造进度触发收集",
        "下方漏斗收集成品药水到箱子"
      ]
    },
    // ==================== 更多建筑教程 ====================
    {
      id: "nether-portal-hub",
      name: "下界传送门大厅",
      category: "building",
      icon: "🌀",
      description: "连接主世界各个传送门的中转大厅，使用黑曜石和紫水晶打造的神秘风格枢纽站，包含多方向传送门和物品仓库。",
      materials: ["黑曜石 ×64", "紫水晶块 ×32", "深色橡木 ×48", "荧石 ×16", "紫珀块 ×20", "末地烛 ×12", "铁活板门 ×8", "箱子 ×16"],
      difficulty: "medium",
      version: "1.21.4",
      bilibiliSearch: "我的世界 下界传送门 大厅 建筑教程",
      tags: ["传送门", "下界", "枢纽", "建筑", "中型"],
      steps: [
        "在地下深处挖掘大型圆形大厅",
        "黑曜石铺设地板和墙面",
        "紫水晶装饰柱子和拱门",
        "墙壁上安置多个方向的传送门",
        "中央放置储物区和合成站"
      ]
    },
    {
      id: "clock-tower",
      name: "机械钟楼/红石时钟塔",
      category: "building",
      icon: "🕐",
      description: "带红石时钟显示功能的钟楼建筑，使用红石灯拼出数字时间显示，整点报时红石脉冲。城镇中心地标建筑。",
      materials: ["石砖 ×128", "深色橡木 ×64", "红石灯 ×32", "红石粉 ×48", "红石中继器 ×24", "侦测器 ×16", "阳光传感器 ×1", "铁块 ×8"],
      difficulty: "hard",
      version: "1.21.4",
      bilibiliSearch: "我的世界 时钟塔 红石钟楼 建筑教程",
      tags: ["钟楼", "红石", "时钟", "高级", "建筑"],
      steps: [
        "搭建钟楼主体(高约25格)",
        "顶部安装阳光传感器连接红石时钟电路",
        "用红石灯拼出4位数字时间显示面板",
        "添加整点报时脉冲和音符盒",
        "塔身用石砖和深色橡木交替装饰"
      ]
    },
    {
      id: "hanging-gardens",
      name: "巴比伦空中花园",
      category: "building",
      icon: "🌺",
      description: "层层叠叠的空中花园，模仿古代巴比伦奇观，每层种植不同植物和树木。利用水电梯连接各层，搭配瀑布装饰。",
      materials: ["石砖台阶 ×128", "草方块 ×96", "水桶 ×16", "树叶 ×64", "各色花朵 ×48", "藤蔓 ×32", "砂土 ×48", "橡木原木 ×32"],
      difficulty: "hard",
      version: "1.21.4",
      bilibiliSearch: "我的世界 空中花园 巴比伦 建筑教程",
      tags: ["花园", "空中", "古代", "高级", "建筑"],
      steps: [
        "构建阶梯式塔基(边长渐缩，共5层)",
        "每层铺设草方块和砂土混合",
        "种植不同高度的植物和树木",
        "从顶层引水做瀑布流经每层",
        "水电梯隐藏在中心柱子内"
      ]
    },
    {
      id: "railway-station",
      name: "铁路车站/矿车交通枢纽",
      category: "building",
      icon: "🚂",
      description: "大型铁路车站建筑，包含自动发车系统、多轨道分岔和乘客候车区。使用红石控制矿车路线，连接各重要地点。",
      materials: ["橡木木板 ×128", "圆石 ×96", "玻璃 ×48", "铁轨 ×64", "动力铁轨 ×32", "红石火把 ×16", "按钮 ×8", "橡木栅栏 ×32", "萤石 ×16"],
      difficulty: "medium",
      version: "1.21.4",
      bilibiliSearch: "我的世界 铁路车站 矿车 交通 建筑教程",
      tags: ["铁路", "车站", "矿车", "交通", "中型"],
      steps: [
        "搭建车站主体建筑(长20×宽12)",
        "铺设多条铁轨和动力铁轨",
        "设计红石岔道控制系统",
        "建造乘客候车区和票务区",
        "添加自动发车按钮和指示灯"
      ]
    },
    {
      id: "desert-temple",
      name: "沙漠神殿/埃及风格神庙",
      category: "building",
      icon: "🏛️",
      description: "埃及风格的沙漠神殿，使用沙石和陶瓦建造，包含方尖碑、柱廊和内部密室。搭配隐藏的红石机关和陷阱。",
      materials: ["沙石 ×192", "平滑沙石 ×96", "橙色陶瓦 ×64", "蓝色陶瓦 ×32", "金块 ×8", "TNT ×4", "石质压力板 ×4", "红石粉 ×16"],
      difficulty: "medium",
      version: "1.21.4",
      bilibiliSearch: "我的世界 沙漠神殿 埃及 建筑教程",
      tags: ["沙漠", "神殿", "埃及", "建筑", "中型"],
      steps: [
        "在沙漠中选择平坦地形规划地基",
        "使用沙石搭建外柱廊(高12格)",
        "建造三角形神庙主体",
        "内部设置红石陷阱和宝藏密室",
        "庙前建造两座方尖碑"
      ]
    },
    {
      id: "greenhouse",
      name: "玻璃温室/植物园",
      category: "building",
      icon: "🏵️",
      description: "全玻璃结构的温室建筑，适合在任何群系种植各类作物。优雅的维多利亚风格穹顶，内部设有自动灌溉系统和水池。",
      materials: ["玻璃 ×192", "铁块 ×16", "橡木原木 ×32", "水桶 ×4", "草方块 ×32", "堆肥桶 ×8", "灯笼 ×12", "铁活板门 ×8", "各色花 ×32"],
      difficulty: "easy",
      version: "1.21.4",
      bilibiliSearch: "我的世界 玻璃温室 植物园 建筑教程",
      tags: ["温室", "玻璃", "植物", "简单", "建筑"],
      steps: [
        "搭建铁框架(长15×宽10)",
        "玻璃覆盖所有墙面和屋顶(穹顶造型)",
        "内部铺设草方块和耕地",
        "安装自动灌溉水道系统",
        "种植各类作物和观赏植物"
      ]
    },
    {
      id: "pirate-cove",
      name: "海盗港湾/藏宝洞",
      category: "building",
      icon: "🏴‍☠️",
      description: "海盗主题的港湾建筑群，包含海盗船、码头、酒馆和隐藏在山崖中的藏宝洞。大量使用深色橡木和圆石。",
      materials: ["深色橡木 ×192", "圆石 ×128", "橡木栅栏 ×64", "白色羊毛 ×48", "灯笼 ×24", "箱子 ×16", "铁砧 ×1", "金块 ×4", "TNT ×8"],
      difficulty: "hard",
      version: "1.21.4",
      bilibiliSearch: "我的世界 海盗船 港湾 建筑教程",
      tags: ["海盗", "港湾", "船", "高级", "建筑"],
      steps: [
        "在海岸悬崖边选择合适地形",
        "在海上建造海盗船(长20格)",
        "沿岸搭建木质码头和栈道",
        "山崖内挖掘藏宝洞穴",
        "搭建海盗酒馆和仓库"
      ]
    },
    {
      id: "fantasy-dragon",
      name: "巨龙雕像/龙巢",
      category: "building",
      icon: "🐉",
      description: "巨型龙形雕像建筑，龙身可以作为内部空间使用，龙翼用各色羊毛拼出。适合作为生存存档的终极装饰建筑。",
      materials: ["黑色混凝土 ×128", "紫色混凝土 ×64", "红色羊毛 ×48", "橙色羊毛 ×32", "末地烛 ×16", "萤石 ×24", "黑曜石 ×32", "铁块 ×16"],
      difficulty: "hard",
      version: "1.21.4",
      bilibiliSearch: "我的世界 龙 雕像 建筑教程",
      tags: ["龙", "雕像", "巨型", "高级", "建筑"],
      steps: [
        "规划龙的身体曲线(长30格)",
        "使用黑色混凝土搭建龙身骨架",
        "紫色混凝土做龙鳞装饰",
        "红/橙色羊毛搭建翼展(展开20格宽)",
        "龙头安装末地烛做角和萤石做眼睛"
      ]
    },
    {
      id: "modern-kitchen",
      name: "现代厨房/全自动餐厅",
      category: "building",
      icon: "🍳",
      description: "精美的现代风格厨房，带全自动烤鸡机、自动酿造站和自动熔炉组的内置接入。美观与功能兼具。",
      materials: ["石英块 ×64", "白色混凝土 ×48", "海晶灯 ×16", "铁活板门 ×8", "物品展示框 ×12", "花盆 ×6", "炼药锅 ×2", "烟熏炉 ×4", "漏斗 ×8"],
      difficulty: "easy",
      version: "1.21.4",
      bilibiliSearch: "我的世界 现代厨房 室内设计 教程",
      tags: ["厨房", "现代", "室内", "简单", "建筑"],
      steps: [
        "规划厨房空间(约7×9)",
        "石英块铺设地板和台面",
        "安装烟熏炉和漏斗供料系统",
        "物品展示框展示食材",
        "海晶灯照明和植物点缀"
      ]
    }
  ],

  /** 材质包与光影资源 */
  resources: [
    {
      id: "stay-true",
      name: "Stay True",
      type: "resource-pack",
      icon: "🌟",
      description: "保留原版MC灵魂的轻量级材质包，不改变基础色调和风格，而是为每种方块添加连接纹理和随机变体。草方块、泥土、石头等方块不再单调重复，自然过渡效果极佳。低配友好、颜值在线。",
      version: "1.21.4",
      tags: ["材质包", "原版风格", "连接纹理", "低配友好", "作者推荐"],
      downloadUrl: "https://www.curseforge.com/minecraft/texture-packs/stay-true",
      downloadLabel: "CurseForge 下载",
      rating: "★4.9",
      featured: true,
      featuredLabel: "网页作者推荐"
    },
    {
      id: "faithful-32x",
      name: "Faithful 32x",
      type: "resource-pack",
      icon: "🎨",
      description: "最经典的默认风格高清材质包，32×32分辨率完美保留原版MC风格，画质提升明显且性能友好。MC圈装机率最高的材质包之一。",
      version: "1.21.4",
      tags: ["材质包", "默认风格", "高清", "经典"],
      downloadUrl: "https://www.curseforge.com/minecraft/texture-packs/faithful-32x",
      downloadLabel: "CurseForge 下载",
      rating: "★4.9"
    },
    {
      id: "misas-realistic",
      name: "Misa's Realistic",
      type: "resource-pack",
      icon: "🖼️",
      description: "写实风格材质包的代表作，细腻的纹理质感让MC世界焕然一新。方块表面细节丰富，光影搭配效果极佳，适合追求真实感的玩家。",
      version: "1.21.4",
      tags: ["材质包", "写实", "高清", "经典"],
      downloadUrl: "https://www.curseforge.com/minecraft/texture-packs/misas-realistic",
      downloadLabel: "CurseForge 下载",
      rating: "★4.7"
    },
    {
      id: "bare-bones",
      name: "Bare Bones",
      type: "resource-pack",
      icon: "🎯",
      description: "极简扁平化风格材质，色彩干净利落，完美复刻MC官方宣传片的视觉风格。低配机器也能流畅运行，颜值极高。",
      version: "1.21.4",
      tags: ["材质包", "扁平", "宣传片风格", "低配友好"],
      downloadUrl: "https://www.curseforge.com/minecraft/texture-packs/bare-bones",
      downloadLabel: "CurseForge 下载",
      rating: "★4.8"
    },
    {
      id: "compliance-64x",
      name: "Compliance 64x",
      type: "resource-pack",
      icon: "💎",
      description: "Faithful团队出品的64×64高清材质，细节更丰富。保留原版配色基调，方块纹理过渡自然，是Faithful爱好者的进阶之选。",
      version: "1.21.4",
      tags: ["材质包", "高清", "默认风格", "进阶"],
      downloadUrl: "https://www.curseforge.com/minecraft/texture-packs/compliance-64x",
      downloadLabel: "CurseForge 下载",
      rating: "★4.6"
    },
    {
      id: "rodrigos-8x8",
      name: "Rodrigo's 8x8",
      type: "resource-pack",
      icon: "🟫",
      description: "8×8超低分辨率像素材质，极简像素风。大幅降低显卡负担，适合集显或低配笔记本，同时获得独特的复古像素美感。",
      version: "1.21.4",
      tags: ["材质包", "像素", "低配", "复古"],
      downloadUrl: "https://www.curseforge.com/minecraft/texture-packs/rodrigos-8x8",
      downloadLabel: "CurseForge 下载",
      rating: "★4.5"
    },
    {
      id: "bsl-shaders",
      name: "BSL Shaders",
      type: "shader",
      icon: "☀️",
      description: "全球最受欢迎的光影包之一，光影效果均衡出色。柔和的光照、真实的水面反射、动态云朵和体积光，配置灵活可调，兼容性极强。",
      version: "1.21.4",
      tags: ["光影", "通用", "水反", "体积光"],
      downloadUrl: "https://www.curseforge.com/minecraft/customization/bsl-shaders",
      downloadLabel: "CurseForge 下载",
      rating: "★4.9"
    },
    {
      id: "complementary-shaders",
      name: "Complementary Shaders",
      type: "shader",
      icon: "🌈",
      description: "BSL的优化分支，光影效果更加细腻，色彩调教偏向温暖自然。内置多种预设方案，一键切换不同风格，对低配和中配设备都非常友好。",
      version: "1.21.4",
      tags: ["光影", "优化", "通用", "色彩"],
      downloadUrl: "https://www.curseforge.com/minecraft/customization/complementary-shaders",
      downloadLabel: "CurseForge 下载",
      rating: "★4.9"
    },
    {
      id: "sildurs-shaders",
      name: "Sildur's Shaders",
      type: "shader",
      icon: "🌅",
      description: "老牌光影包，提供从Low到Extreme多个版本。低配版集成显卡也能流畅运行，Extreme版拥有顶级画面表现。适合各种配置的玩家。",
      version: "1.21.4",
      tags: ["光影", "多版本", "通用", "老牌"],
      downloadUrl: "https://www.curseforge.com/minecraft/customization/sildurs-shaders",
      downloadLabel: "CurseForge 下载",
      rating: "★4.7"
    },
    {
      id: "seus-shaders",
      name: "SEUS (Sonic Ether)",
      type: "shader",
      icon: "⚡",
      description: "电影级画质光影，光线追踪效果惊艳。虽然对显卡要求较高，但画面效果在MC光影中属于天花板级别。适合高端显卡玩家。",
      version: "1.21.4",
      tags: ["光影", "光追", "高端", "电影级"],
      downloadUrl: "https://www.sonicether.com/seus/",
      downloadLabel: "官网下载",
      rating: "★4.8"
    },
    {
      id: "rethinking-voxels",
      name: "Rethinking Voxels",
      type: "shader",
      icon: "🔮",
      description: "基于Complementary的体素化光影革新，方块边缘发光效果独特。彩色光影穿透方块缝隙，营造出类似RTX的体素光照质感。",
      version: "1.21.4",
      tags: ["光影", "体素", "创新", "视觉效果"],
      downloadUrl: "https://www.curseforge.com/minecraft/customization/rethinking-voxels",
      downloadLabel: "CurseForge 下载",
      rating: "★4.6"
    },
    {
      id: "fresh-animations",
      name: "Fresh Animations",
      type: "resource-pack",
      icon: "🏃",
      description: "改变生物动画的全新材质包，让Minecraft所有生物的移动更加流畅自然。村民眨眼、怪物摇摆、生物眼神跟随——细节拉满的沉浸式体验。",
      version: "1.21.4",
      tags: ["材质包", "动画", "生物", "沉浸"],
      downloadUrl: "https://www.curseforge.com/minecraft/texture-packs/fresh-animations",
      downloadLabel: "CurseForge 下载",
      rating: "★4.8"
    },
    {
      id: "xksp-xekr",
      name: "XeKr 方纹淡彩",
      type: "resource-pack",
      icon: "🌸",
      description: "国内顶尖的原创材质包，独特的方纹淡彩风格将中国水墨美学融入像素方块。网格状纹理+柔和色彩，国风MC玩家的必装之选。",
      version: "1.21.4",
      tags: ["材质包", "国风", "中国", "原创"],
      downloadUrl: "https://www.curseforge.com/minecraft/texture-packs/xekr-square-texture",
      downloadLabel: "CurseForge 下载",
      rating: "★4.8"
    }
  ],

  /** 待建清单模板 */
  templates: {
    redstone: {
      name: "⚙️ 1.21.4 生电发展路线",
      description: "从零开始的标准生电流程，按顺序逐步解锁",
      items: [
        { name: "刷石机 — 获取基础建筑材料", category: "machine", icon: "🪨", difficulty: "easy" },
        { name: "刷铁机 — 铁锭自动化", category: "machine", icon: "🦾", difficulty: "medium" },
        { name: "刷怪塔 — 经验+掉落物(后期改火药塔)", category: "machine", icon: "💀", difficulty: "medium" },
        { name: "小黑塔 — 末地经验+末影珍珠", category: "machine", icon: "👾", difficulty: "medium" },
        { name: "凋零骷髅机 — 获取凋零头颅", category: "machine", icon: "☠️", difficulty: "hard" },
        { name: "杀凋机 — 自动化获取下界之星", category: "machine", icon: "⭐", difficulty: "hard" },
        { name: "珍珠炮 — 后期超远程传送网络", category: "machine", icon: "🔮", difficulty: "hard" }
      ]
    },
    building: {
      name: "🏛️ 建筑标准流程",
      description: "从选址到完工的完整建筑工序",
      items: [
        { name: "选址与地形平整", category: "building", icon: "🗺️", difficulty: "easy" },
        { name: "地基铺设与规划放线", category: "building", icon: "📐", difficulty: "easy" },
        { name: "主体框架与柱子搭建", category: "building", icon: "🏗️", difficulty: "medium" },
        { name: "墙体砌筑与门窗开洞", category: "building", icon: "🧱", difficulty: "medium" },
        { name: "屋顶建造与防水处理", category: "building", icon: "🏠", difficulty: "medium" },
        { name: "内饰装修与灯光布置", category: "building", icon: "💡", difficulty: "hard" },
        { name: "周围环境绿化与道路", category: "building", icon: "🌳", difficulty: "hard" }
      ]
    }
  },

  /** 根据ID查找资源 */
  findResourceById: function(id) {
    return this.resources.find(r => r.id === id);
  },

  /** 根据ID查找教程 */
  findById: function(id) {
    return this.tutorials.find(t => t.id === id);
  },

  /** 搜索教程+资源 */
  search: function(query, filters) {
    query = query.toLowerCase().trim();
    filters = filters || {};
    // 搜索教程
    var results = this.tutorials.filter(function(t) {
      if (filters.category && filters.category !== 'all' && filters.category !== 'resource' && t.category !== filters.category) return false;
      if (filters.difficulty && filters.difficulty !== 'all' && t.difficulty !== filters.difficulty) return false;
      if (filters.version && filters.version !== 'all') { if (!t.version.includes(filters.version)) return false; }
      if (query) {
        var st = (t.name + ' ' + t.tags.join(' ') + ' ' + t.description + ' ' + t.category + ' ' + t.version).toLowerCase();
        if (!st.includes(query)) return false;
      }
      return true;
    });
    // 搜索资源
    if (!filters.category || filters.category === 'all' || filters.category === 'resource') {
      var resResults = this.resources.filter(function(r) {
        if (query) {
          var st = (r.name + ' ' + r.tags.join(' ') + ' ' + r.description + ' ' + r.type + ' ' + r.version).toLowerCase();
          if (!st.includes(query)) return false;
        }
        return true;
      });
      results = results.concat(resResults);
    }
    return results;
  },

  /** 获取所有分类 */
  getCategories: function() {
    return [
      { value: 'all', label: '全部' },
      { value: 'machine', label: '⚙️ 生电机器' },
      { value: 'building', label: '🏗️ 建筑教程' },
      { value: 'resource', label: '🎨 材质光影' }
    ];
  },

  /** 获取所有难度 */
  getDifficulties: function() {
    return [
      { value: 'all', label: '全部难度' },
      { value: 'easy', label: '⭐ 简单' },
      { value: 'medium', label: '⭐⭐ 中等' },
      { value: 'hard', label: '⭐⭐⭐ 困难' }
    ];
  },

  /** 获取所有版本 */
  getVersions: function() {
    return [
      { value: 'all', label: '全部版本' },
      { value: '1.21.4', label: '1.21.4' },
      { value: '1.21', label: '1.21+' },
      { value: '1.20', label: '1.20' }
    ];
  },

  /** 获取热门推荐 */
  getFeatured: function() {
    return [
      this.findById('cobblestone-gen-1-21'),
      this.findById('iron-farm-1-21'),
      this.findById('survival-starter-house'),
      this.findById('mob-grinder-xp'),
      this.findById('modern-villa'),
      this.findById('villager-breeder-1-21')
    ].filter(Boolean);
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MC_DATA;
}
