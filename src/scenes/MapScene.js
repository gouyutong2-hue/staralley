import Phaser from 'phaser';
import { TILE_SIZE } from '../data/tiles.js';
import { MAP_W, MAP_H, generateMapData } from '../data/mapData.js';

/**
 * MapScene — 显示雁栖湖校园瓦片地图
 */
export class MapScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MapScene' });
  }

  create() {
    const mapW = MAP_W * TILE_SIZE;   // 2560
    const mapH = MAP_H * TILE_SIZE;   // 1600

    // 1. 生成地图数据
    const data = generateMapData();

    // 2. 创建 Tilemap
    const map = this.make.tilemap({
      data,
      tileWidth: TILE_SIZE,
      tileHeight: TILE_SIZE,
    });

    // 3. 加载瓦片集 (纹理由 BootScene 通过 createCanvas 生成)
    const tileset = map.addTilesetImage('tileset', 'tileset', TILE_SIZE, TILE_SIZE, 0, 0);

    if (!tileset) {
      // fallback: 纹理可能未生成成功
      this.add.text(400, 300, '❌ 瓦片集加载失败\n请刷新页面', {
        fontSize: '24px', color: '#ff4444', align: 'center',
      }).setOrigin(0.5);
      return;
    }

    // 4. 创建图层
    const layer = map.createLayer(0, tileset, 0, 0);

    // 5. 摄像机设置 — 缩放到刚好看到整个地图
    const cam = this.cameras.main;
    cam.setBounds(0, 0, mapW, mapH);
    cam.centerOn(mapW / 2, mapH / 2);

    // 自动缩放以适应窗口
    const zoomX = this.scale.width / mapW;
    const zoomY = this.scale.height / mapH;
    const zoom = Math.min(zoomX, zoomY);   // 取较小值，保证全图可见
    cam.setZoom(zoom);

    // 6. 左上角标注
    this.add.text(4, 4, '🦆 雁栖湖校区 · 星露谷风格', {
      fontSize: '12px',
      fontFamily: 'monospace',
      color: '#ffffff',
      backgroundColor: 'rgba(0,0,0,0.6)',
      padding: { x: 4, y: 2 },
    }).setScrollFactor(0).setDepth(100);

    // 7. 图例
    const legendX = this.scale.width - 140;
    this.add.text(legendX, 4,
      '🏠 建筑  🛣️ 道路\n🌳 树木  🌸 花坛\n🌊 雁栖湖  🌉 国科大桥', {
      fontSize: '10px',
      fontFamily: 'monospace',
      color: '#ffffff',
      backgroundColor: 'rgba(0,0,0,0.6)',
      padding: { x: 4, y: 2 },
      lineSpacing: 2,
    }).setScrollFactor(0).setDepth(100);

    console.log(`✅ 地图已加载: ${MAP_W}×${MAP_H} 瓦片, 缩放 ${(zoom * 100).toFixed(1)}%`);
  }
}
