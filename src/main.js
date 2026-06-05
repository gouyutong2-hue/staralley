import Phaser from 'phaser';
import { BootScene } from './scenes/BootScene.js';
import { MapScene } from './scenes/MapScene.js';

// ============================================
// 阶段 1：瓦片地图系统
// 星露谷风格的雁栖湖校区瓦片地图
// ============================================

const config = {
  type: Phaser.AUTO,
  width: 960,
  height: 640,
  backgroundColor: '#000000',
  parent: document.body,
  pixelArt: true,            // 像素风格，关闭抗锯齿
  roundPixels: true,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [BootScene, MapScene],
};

new Phaser.Game(config);
