import Phaser from 'phaser';

// ============================================
// 阶段 0：最简可行画布
// 灰色背景 + "雁栖湖星露谷" 文字，确认引擎正常工作
// ============================================

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#2d2d2d',
  parent: document.body,
  scene: {
    create,
  },
};

function create() {
  // 在画布中央显示一段文字
  this.add.text(400, 280, '🎮 雁栖湖 · 星露谷', {
    fontSize: '28px',
    fontFamily: 'Arial, sans-serif',
    color: '#ffffff',
  }).setOrigin(0.5);

  this.add.text(400, 330, 'Phaser 3 引擎已就绪 ✓', {
    fontSize: '16px',
    fontFamily: 'Arial, sans-serif',
    color: '#aaaaaa',
  }).setOrigin(0.5);

  this.add.text(400, 370, '阶段 0 — 环境搭建完成', {
    fontSize: '14px',
    fontFamily: 'Arial, sans-serif',
    color: '#888888',
  }).setOrigin(0.5);
}

// 启动游戏
new Phaser.Game(config);
