import Phaser from 'phaser';
import { TILE_SIZE, TILE_TYPES, tileColorMap } from '../data/tiles.js';

/**
 * BootScene — 用 Canvas 生成瓦片精灵图，兼容 Phaser Tilemap API
 */
export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  create() {
    const S = TILE_SIZE;
    const count = TILE_TYPES.length;
    const sheetW = count * S;

    // ---- 用 Phaser 的 CanvasTexture 画瓦片条 ----
    const canvas = this.textures.createCanvas('tileset', sheetW, S);
    const ctx = canvas.getContext();

    TILE_TYPES.forEach((tile, i) => {
      this.drawTileCtx(ctx, tile, i * S, 0);
    });

    canvas.refresh();

    // 跳转到地图场景
    this.scene.start('MapScene');
  }

  drawTileCtx(ctx, tile, ox, oy) {
    const S = TILE_SIZE;
    const c = tileColorMap[tile.key];

    // 底色
    ctx.fillStyle = '#' + c.fill.toString(16).padStart(6, '0');
    ctx.fillRect(ox, oy, S, S);

    // -- 细节纹理 --

    // 草地随机浅点
    if (tile.key === 'GRASS') {
      for (let p = 0; p < 6; p++) {
        const px = ox + 3 + ((p * 7 + 3) % 26);
        const py = oy + 3 + ((p * 11 + 5) % 26);
        ctx.fillStyle = '#5daa3a';
        ctx.fillRect(px, py, 2, 2);
      }
    }

    if (tile.key === 'GRASS_ALT') {
      for (let p = 0; p < 6; p++) {
        const px = ox + 2 + ((p * 13 + 4) % 27);
        const py = oy + 2 + ((p * 7 + 6) % 27);
        ctx.fillStyle = '#3f8020';
        ctx.fillRect(px, py, 3, 2);
      }
    }

    // 水面波纹
    if (tile.key === 'WATER') {
      ctx.fillStyle = '#4499cc';
      ctx.fillRect(ox + 4, oy + 7, 24, 2);
      ctx.fillRect(ox + 6, oy + 15, 20, 2);
      ctx.fillRect(ox + 4, oy + 23, 22, 2);
    }
    if (tile.key === 'WATER_DARK') {
      ctx.fillStyle = '#2277aa';
      ctx.fillRect(ox + 5, oy + 9, 20, 2);
      ctx.fillRect(ox + 8, oy + 18, 14, 2);
    }

    // 道路虚线
    if (tile.key === 'ROAD') {
      ctx.fillStyle = '#666666';
      ctx.fillRect(ox + 14, oy + 5, 3, 3);
      ctx.fillRect(ox + 14, oy + 15, 3, 3);
      ctx.fillRect(ox + 14, oy + 24, 3, 3);
    }

    // 人行道纹理
    if (tile.key === 'PATH') {
      ctx.fillStyle = '#c8b898';
      ctx.fillRect(ox + 8, oy + 15, 16, 2);
    }

    // 建筑窗户
    if (tile.key === 'BUILDING') {
      ctx.fillStyle = '#ffeedd';
      ctx.fillRect(ox + 5, oy + 5, 7, 5);
      ctx.fillRect(ox + 20, oy + 5, 7, 5);
      ctx.fillRect(ox + 5, oy + 21, 7, 5);
      ctx.fillRect(ox + 20, oy + 21, 7, 5);
    }

    // 屋顶斜线
    if (tile.key === 'BUILDING_ROOF') {
      ctx.fillStyle = '#882222';
      ctx.fillRect(ox + 2, oy + 14, 28, 3);
      ctx.fillRect(ox + 2, oy + 25, 28, 3);
    }

    // 木桥横条
    if (tile.key === 'BRIDGE') {
      for (let r = 0; r < 5; r++) {
        ctx.fillStyle = r % 2 === 0 ? '#a08060' : '#907050';
        ctx.fillRect(ox, oy + r * 7, S, 3);
      }
    }

    // 树木
    if (tile.key === 'TREE') {
      ctx.fillStyle = '#2d5a1e';
      ctx.beginPath();
      ctx.arc(ox + 16, oy + 14, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#5a3a1a';
      ctx.fillRect(ox + 14, oy + 20, 4, 10);
    }

    // 花坛彩色
    if (tile.key === 'GARDEN') {
      const colors = ['#ff6688', '#ffaa44', '#ffdd44', '#ff4444', '#ff8866'];
      colors.forEach((col, j) => {
        ctx.fillStyle = col;
        ctx.fillRect(ox + 3 + j * 5, oy + 12, 4, 4);
        ctx.fillRect(ox + 5 + j * 5, oy + 14, 4, 4);
      });
    }

    // 广场砖缝
    if (tile.key === 'PLAZA') {
      ctx.fillStyle = '#d5ccbb';
      ctx.fillRect(ox + 15, oy, 2, S);
      ctx.fillRect(ox, oy + 15, S, 2);
    }

    // 湖岸沙滩点
    if (tile.key === 'SHORE') {
      for (let i = 0; i < 10; i++) {
        ctx.fillStyle = '#d8ccb0';
        const px = ox + 2 + ((i * 11 + 3) % 27);
        const py = oy + 2 + ((i * 13 + 4) % 27);
        ctx.fillRect(px, py, 3, 2);
      }
    }

    // ---- 像素边框 (星露谷标志性风格) ----
    ctx.fillStyle = '#000000';
    ctx.fillRect(ox, oy, S, 1);             // top
    ctx.fillRect(ox, oy + S - 1, S, 1);     // bottom
    ctx.fillRect(ox, oy, 1, S);             // left
    ctx.fillRect(ox + S - 1, oy, 1, S);     // right
  }
}
