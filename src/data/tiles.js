// ============================================
// 瓦片定义 — 星露谷风格像素调色板
// ============================================

export const TILE_SIZE = 32;

// 瓦片类型列表（顺序 = 精灵图水平位置 = tilemap 中的 gid-1）
export const TILE_TYPES = [
  { key: 'GRASS',        gid: 1  },  // 草地
  { key: 'GRASS_ALT',    gid: 2  },  // 草地（深色条纹）
  { key: 'ROAD',         gid: 3  },  // 道路 / 京加路
  { key: 'PATH',         gid: 4  },  // 人行道 / 小径
  { key: 'WATER',        gid: 5  },  // 雁栖湖水面
  { key: 'WATER_DARK',   gid: 6  },  // 深水区
  { key: 'BUILDING',     gid: 7  },  // 建筑主体（红墙）
  { key: 'BUILDING_ROOF',gid: 8  },  // 建筑屋顶
  { key: 'PLAZA',        gid: 9  },  // 广场 / 硬地
  { key: 'BRIDGE',       gid: 10 },  // 国科大桥
  { key: 'SHORE',        gid: 11 },  // 湖岸沙滩
  { key: 'TREE',         gid: 12 },  // 树木
  { key: 'GARDEN',       gid: 13 },  // 花园 / 花坛
];

// 方便引用
export const T = {};
TILE_TYPES.forEach(t => { T[t.key] = t.gid; });

// 瓦片颜色（填充色）
export const tileColorMap = {
  GRASS:          { fill: 0x4a8c2a },
  GRASS_ALT:      { fill: 0x3f7a22 },
  ROAD:           { fill: 0x555555 },
  PATH:           { fill: 0xb8a888 },
  WATER:          { fill: 0x3388cc },
  WATER_DARK:     { fill: 0x226699 },
  BUILDING:       { fill: 0xbb5544, window: 0xffeecc },
  BUILDING_ROOF:  { fill: 0x993333 },
  PLAZA:          { fill: 0xccbbaa },
  BRIDGE:         { fill: 0x9b7a5a },
  SHORE:          { fill: 0xe8dcc8 },
  TREE:           { fill: 0x2d5a1e },
  GARDEN:         { fill: 0x3a7a2a },
};
