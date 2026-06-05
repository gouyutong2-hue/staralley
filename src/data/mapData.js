import { T } from './tiles.js';

// ============================================
// 雁栖湖校区 — 瓦片地数据生成器
// 基于真实校园布局：西区 / G110 / 东区 / 雁栖湖
// ============================================

export const MAP_W = 80;
export const MAP_H = 50;

// ---- 工具函数 ----
function rect(map, x, y, w, h, tile) {
  for (let dy = 0; dy < h; dy++)
    for (let dx = 0; dx < w; dx++)
      if (y + dy >= 0 && y + dy < MAP_H && x + dx >= 0 && x + dx < MAP_W)
        map[y + dy][x + dx] = tile;
}

function hroad(map, x1, x2, y, tile = T.ROAD) { rect(map, x1, y, x2 - x1, 2, tile); }
function vroad(map, x, y1, y2, tile = T.ROAD) { rect(map, x, y1, 2, y2 - y1, tile); }

function border(map, x, y, w, h, tile) {
  // 只在矩形边缘画一圈
  for (let dx = 0; dx < w; dx++) {
    map[y][x + dx] = tile;
    map[y + h - 1][x + dx] = tile;
  }
  for (let dy = 0; dy < h; dy++) {
    map[y + dy][x] = tile;
    map[y + dy][x + w - 1] = tile;
  }
}

// ---- 主入口 ----
export function generateMapData() {
  // 初始化全草地
  const map = Array.from({ length: MAP_H }, () =>
    Array.from({ length: MAP_W }, () => T.GRASS)
  );

  // 随机草地斑点 (让草地看起来自然)
  for (let y = 0; y < MAP_H; y++)
    for (let x = 0; x < MAP_W; x++)
      if ((x * 7 + y * 13) % 11 === 0) map[y][x] = T.GRASS_ALT;

  // ========================
  //  雁栖湖 (左上)
  // ========================
  rect(map, 1, 1, 28, 8, T.WATER);
  rect(map, 1, 1, 2, 8, T.SHORE);         // 西岸边
  rect(map, 27, 1, 2, 8, T.SHORE);         // 东岸边
  rect(map, 1, 8, 28, 1, T.SHORE);         // 南岸边
  rect(map, 12, 4, 6, 3, T.WATER_DARK);    // 深水区

  // ========================
  //  G110 京加路 (南北贯穿)
  // ========================
  vroad(map, 37, 0, MAP_H, T.ROAD);        // 主路 2 格宽
  rect(map, 39, 0, 1, MAP_H, T.PATH);      // 路边隔离带

  // ========================
  //  国科大桥 (横跨 G110)
  // ========================
  rect(map, 36, 18, 6, 3, T.BRIDGE);

  // ========================
  //  西区 (x:1-36)
  // ========================

  // -- 礼仪广场 --
  rect(map, 10, 11, 10, 5, T.PLAZA);

  // -- 图书馆 (西区核心) --
  rect(map, 11, 14, 8, 5, T.BUILDING);
  rect(map, 12, 14, 6, 1, T.BUILDING_ROOF);

  // -- 国际会议中心 --
  rect(map, 22, 14, 6, 4, T.BUILDING);
  rect(map, 23, 14, 4, 1, T.BUILDING_ROOF);

  // -- 西区教学楼 --
  rect(map, 3, 14, 6, 4, T.BUILDING);
  rect(map, 4, 14, 4, 1, T.BUILDING_ROOF);

  // -- 一食堂 --
  rect(map, 13, 23, 5, 4, T.BUILDING);
  rect(map, 14, 23, 3, 1, T.BUILDING_ROOF);

  // -- 二食堂 --
  rect(map, 21, 23, 5, 4, T.BUILDING);
  rect(map, 22, 23, 3, 1, T.BUILDING_ROOF);

  // -- 校医院 --
  rect(map, 3, 34, 5, 4, T.BUILDING);
  border(map, 3, 34, 5, 4, T.BUILDING_ROOF);

  // -- 邮局 --
  rect(map, 10, 34, 3, 3, T.BUILDING);

  // -- 西区宿舍楼群 --
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      rect(map, 25 + col * 5, 33 + row * 5, 4, 3, T.BUILDING);
      rect(map, 26 + col * 5, 33 + row * 5, 2, 1, T.BUILDING_ROOF);
    }
  }

  // -- 绿野公园 --
  rect(map, 4, 24, 8, 8, T.GRASS);
  rect(map, 5, 25, 3, 3, T.GARDEN);
  rect(map, 9, 26, 2, 2, T.TREE);
  rect(map, 5, 29, 2, 2, T.TREE);
  rect(map, 8, 30, 3, 3, T.GARDEN);

  // -- 西区道路系统 --
  hroad(map, 1, 36, 9, T.PATH);            // 湖北岸小路
  hroad(map, 1, 36, 20, T.ROAD);           // 西区主横路
  hroad(map, 1, 36, 30, T.ROAD);           // 西区次横路
  vroad(map, 20, 9, 36, T.ROAD);           // 西区主纵路
  hroad(map, 1, 36, 40, T.PATH);           // 南边界小路

  // ========================
  //  东区 (x:40-79)
  // ========================

  // -- 东区礼仪广场 --
  rect(map, 43, 11, 8, 4, T.PLAZA);

  // -- 体育馆 --
  rect(map, 45, 13, 8, 5, T.BUILDING);
  rect(map, 46, 13, 6, 1, T.BUILDING_ROOF);

  // -- 游泳馆 --
  rect(map, 56, 12, 5, 4, T.BUILDING);
  rect(map, 57, 12, 3, 1, T.BUILDING_ROOF);

  // -- 学生礼堂 --
  rect(map, 43, 20, 7, 5, T.BUILDING);
  rect(map, 44, 20, 5, 1, T.BUILDING_ROOF);

  // -- 三食堂 --
  rect(map, 42, 27, 5, 4, T.BUILDING);
  rect(map, 43, 27, 3, 1, T.BUILDING_ROOF);

  // -- 四食堂 --
  rect(map, 50, 27, 5, 4, T.BUILDING);
  rect(map, 51, 27, 3, 1, T.BUILDING_ROOF);

  // -- SDC 教学楼 (学园三) --
  rect(map, 60, 10, 8, 5, T.BUILDING);
  rect(map, 61, 10, 6, 1, T.BUILDING_ROOF);

  // -- 东区实验楼 --
  rect(map, 63, 18, 6, 4, T.BUILDING);
  rect(map, 64, 18, 4, 1, T.BUILDING_ROOF);

  // -- 东区宿舍楼群 --
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      rect(map, 44 + col * 6, 35 + row * 4, 5, 3, T.BUILDING);
      rect(map, 45 + col * 6, 35 + row * 4, 3, 1, T.BUILDING_ROOF);
    }
  }

  // -- 龙山 (东南角绿地/小丘) --
  rect(map, 60, 35, 16, 12, T.GRASS);
  for (let i = 0; i < 15; i++) {
    const tx = 62 + (i * 7) % 13;
    const ty = 37 + (i * 5) % 9;
    rect(map, tx, ty, 2, 2, T.TREE);
  }
  rect(map, 63, 38, 2, 2, T.GARDEN);
  rect(map, 70, 40, 2, 2, T.GARDEN);

  // -- 东区道路系统 --
  hroad(map, 40, 79, 6, T.PATH);           // 北边界小路
  hroad(map, 40, 79, 9, T.ROAD);           // 东区主横路上
  hroad(map, 40, 79, 18, T.ROAD);          // 东区主横路中
  vroad(map, 54, 6, 35, T.ROAD);           // 东区主纵路
  hroad(map, 40, 79, 26, T.ROAD);          // 东区次横路
  hroad(map, 40, 79, 34, T.ROAD);          // 食堂前路

  // ========================
  //  校园周边绿化 & 树木
  // ========================
  // 湖边树
  for (let x = 2; x < 35; x += 3) {
    if (map[9][x] === T.GRASS || map[9][x] === T.GRASS_ALT) rect(map, x, 9, 1, 1, T.TREE);
  }

  // 路边树
  for (let y = 1; y < MAP_H - 1; y += 3) {
    if (map[y][36] !== T.ROAD && map[y][36] !== T.BRIDGE) rect(map, 36, y, 1, 1, T.TREE);
    if (map[y][40] !== T.ROAD) rect(map, 40, y, 1, 1, T.TREE);
  }

  // 龙山周边树
  rect(map, 59, 34, 18, 1, T.TREE);
  rect(map, 59, 35, 1, 12, T.TREE);

  // 散落树木（校园景观）
  for (let i = 0; i < 30; i++) {
    const tx = ((i * 17 + 3) % (MAP_W - 2)) + 1;
    const ty = ((i * 11 + 5) % (MAP_H - 2)) + 1;
    if (map[ty][tx] === T.GRASS || map[ty][tx] === T.GRASS_ALT) {
      map[ty][tx] = T.TREE;
    }
  }

  // 散落花坛
  for (let i = 0; i < 12; i++) {
    const gx = ((i * 19 + 7) % (MAP_W - 3)) + 1;
    const gy = ((i * 13 + 8) % (MAP_H - 3)) + 1;
    if (map[gy][gx] === T.GRASS || map[gy][gx] === T.GRASS_ALT) {
      rect(map, gx, gy, 2, 2, T.GARDEN);
    }
  }

  return map;
}
