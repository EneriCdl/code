/* ============================================================
   EN - Minecraft Pixel Art 滚动视差背景
   天空 → 草原 → 地下矿道 三段过渡
   ============================================================ */

(function() {
  'use strict';

  var canvas, ctx;
  var W, H;           // canvas 实际像素尺寸
  var PW = 64;        // 内部像素宽度 (低分辨率再放大，产生像素感)
  var PH;             // 内部像素高度，按比例计算
  var SCALE;          // 放大倍率
  var animFrame;
  var lastProgress = 0;

  /* ---- 颜色调色板 ---- */
  var C = {
    skyTop:    '#5b9dd9',
    skyMid:    '#7ec0e6',
    skyBot:    '#a8d8ea',
    sun:       '#ffe066',
    sunGlow:   '#fff4b0',
    cloud:     '#ffffff',
    cloudShade:'#d5e8f0',
    bird:      '#3a3a4a',
    grass1:    '#5da83d',
    grass2:    '#4a9430',
    grass3:    '#3d7a28',
    hill1:     '#6bb84d',
    hill2:     '#52993a',
    dirt1:     '#b0763e',
    dirt2:     '#8b5e3c',
    dirt3:     '#6b4226',
    stone1:    '#7b7b7b',
    stone2:    '#6b6b6b',
    stone3:    '#565656',
    coal:      '#3a3a3a',
    iron:      '#d4a878',
    gold:      '#f5cd3b',
    diamond:   '#4cc9f0',
    emerald:   '#3dcc5a',
    treeTrunk: '#8b6914',
    treeLeaf1: '#3d8b28',
    treeLeaf2: '#2d7a1e',
    flower1:   '#ff6b6b',
    flower2:   '#ffd93d',
    flower3:   '#ff922b',
    water:     '#3b7cdc',
    cowBody:   '#8b7355',
    cowSpot:   '#4a3728',
    sheepBody: '#e8e8e0',
    sheepFace: '#8b7355',
    pigBody:   '#f0b8a0',
  };

  /* ---- 初始化 ---- */
  function init() {
    canvas = document.getElementById('mc-bg-canvas');
    if (!canvas) {
      // canvas 还未渲染到 DOM，等一会儿再试
      setTimeout(init, 200);
      return;
    }
    ctx = canvas.getContext('2d');
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', onScroll, { passive: true });
    draw(0);
    loop();
  }

  function resize() {
    W = canvas.clientWidth || window.innerWidth;
    H = canvas.clientHeight || window.innerHeight;
    canvas.width = W;
    canvas.height = H;
    SCALE = Math.max(Math.floor(Math.min(W / PW, H / (PW * 0.75))), 2);
    PH = Math.floor(H / SCALE);
    ctx.imageSmoothingEnabled = false;
    draw(lastProgress);
  }

  /* ---- 滚动处理 ---- */
  function onScroll() {
    var docH = document.documentElement.scrollHeight - H;
    if (docH <= 0) docH = 1;
    var progress = Math.max(0, Math.min(1, window.scrollY / docH));
    lastProgress = progress;
    draw(progress);
  }

  function loop() {
    draw(lastProgress);
    animFrame = requestAnimationFrame(loop);
  }

  /* ---- 主绘制 ---- */
  function draw(progress) {
    if (!ctx) return;

    // 创建离屏像素画布
    var off = document.createElement('canvas');
    off.width = PW;
    off.height = PH;
    var o = off.getContext('2d');
    o.imageSmoothingEnabled = false;

    // 根据 progress 决定场景偏移
    // progress 0 = 纯天空, progress 0.5 = 草原, progress 1 = 地下
    var sceneOffset = progress * PH * 2.5; // 场景向下滚动的像素量

    drawSky(o, sceneOffset);
    drawPlains(o, sceneOffset);
    drawUnderground(o, sceneOffset);

    // 放大到 canvas 实际尺寸 (最近邻插值 → 像素感)
    ctx.clearRect(0, 0, W, H);
    ctx.drawImage(off, 0, 0, PW, PH, 0, 0, W, H);
  }

  /* ====== 天空层 ====== */
  function drawSky(o, offset) {
    var skyY = -offset; // 天空从顶部开始，随滚动上移

    // 天空渐变背景
    for (var y = 0; y < PH; y++) {
      var t = (y - skyY) / (PH * 0.9);
      t = Math.max(0, Math.min(1, t));
      var color;
      if (t < 0.35) {
        color = lerpColor(C.skyTop, C.skyMid, t / 0.35);
      } else if (t < 0.7) {
        color = lerpColor(C.skyMid, C.skyBot, (t - 0.35) / 0.35);
      } else {
        color = lerpColor(C.skyBot, C.grass1, (t - 0.7) / 0.3);
      }
      o.fillStyle = color;
      o.fillRect(0, y, PW, 1);
    }

    // 太阳 (右上角)
    var sunX = Math.floor(PW * 0.82);
    var sunBaseY = Math.floor(PH * 0.15);
    var sunY = sunBaseY - offset * 0.3; // 太阳缓慢移动

    if (sunY > -10 && sunY < PH + 10) {
      // 太阳光晕
      o.fillStyle = C.sunGlow;
      o.fillRect(sunX - 2, sunY - 2, 10, 10);
      o.fillRect(sunX - 1, sunY - 3, 8, 12);
      o.fillRect(sunX - 3, sunY - 1, 12, 8);
      // 太阳主体
      o.fillStyle = C.sun;
      o.fillRect(sunX, sunY, 6, 6);
      o.fillStyle = '#fff9c4';
      o.fillRect(sunX + 1, sunY + 1, 4, 4);
    }

    // 像素云朵
    var clouds = [
      { x: 5,  baseY: PH * 0.08, w: 6, h: 3 },
      { x: 28, baseY: PH * 0.12, w: 8, h: 4 },
      { x: 42, baseY: PH * 0.06, w: 5, h: 3 },
      { x: 15, baseY: PH * 0.18, w: 7, h: 3 },
      { x: 48, baseY: PH * 0.22, w: 9, h: 4 },
    ];

    clouds.forEach(function(c) {
      var cy = c.baseY - offset * 0.6;
      if (cy > -8 && cy < PH + 4) {
        drawPixelCloud(o, c.x, Math.floor(cy), c.w, c.h);
      }
    });

    // 像素飞鸟
    var birds = [
      { x: 10, baseY: PH * 0.04 },
      { x: 35, baseY: PH * 0.07 },
      { x: 52, baseY: PH * 0.03 },
      { x: 22, baseY: PH * 0.09 },
      { x: 45, baseY: PH * 0.05 },
    ];

    birds.forEach(function(b, i) {
      var by = b.baseY - offset * 0.8 + Math.sin(Date.now() / 2000 + i) * 2;
      if (by > -3 && by < PH + 3) {
        drawPixelBird(o, Math.floor(b.x), Math.floor(by), i % 3);
      }
    });
  }

  /* ====== 草原层 ====== */
  function drawPlains(o, offset) {
    var plainsBaseY = PH * 0.55;
    var plainsY = plainsBaseY - offset * 0.7;

    // 远山轮廓
    var hillY = plainsY + 2;
    if (hillY < PH && hillY > -15) {
      o.fillStyle = C.hill2;
      drawPixelHill(o, 0, Math.floor(hillY) + 6, PW);
      o.fillStyle = C.hill1;
      drawPixelHill(o, 8, Math.floor(hillY) + 3, PW - 16);
    }

    // 地面线
    var groundY = plainsY + 10;
    if (groundY < PH && groundY > -5) {
      // 草地表层
      var gy = Math.floor(groundY);
      o.fillStyle = C.grass1;
      o.fillRect(0, gy, PW, 3);
      o.fillStyle = C.grass2;
      o.fillRect(0, gy + 3, PW, 2);
      o.fillStyle = C.grass3;
      o.fillRect(0, gy + 5, PW, 1);
      // 泥土层
      o.fillStyle = C.dirt1;
      o.fillRect(0, gy + 6, PW, PH - gy - 6);
    }

    // 像素树
    var trees = [
      { x: 6,  baseY: plainsBaseY - 8 },
      { x: 20, baseY: plainsBaseY - 10 },
      { x: 38, baseY: plainsBaseY - 9 },
      { x: 50, baseY: plainsBaseY - 11 },
      { x: 58, baseY: plainsBaseY - 7 },
    ];

    trees.forEach(function(t) {
      var ty = t.baseY - offset * 0.7;
      if (ty > -14 && ty < PH + 14) {
        drawPixelTree(o, t.x, Math.floor(ty));
      }
    });

    // 像素动物
    var animals = [
      { x: 12, baseY: plainsBaseY + 1, type: 'cow' },
      { x: 30, baseY: plainsBaseY, type: 'sheep' },
      { x: 44, baseY: plainsBaseY + 2, type: 'pig' },
      { x: 55, baseY: plainsBaseY + 1, type: 'cow' },
    ];

    animals.forEach(function(a) {
      var ay = a.baseY - offset * 0.7;
      if (ay > -6 && ay < PH + 6) {
        drawPixelAnimal(o, a.x, Math.floor(ay), a.type);
      }
    });

    // 像素花
    var flowers = [
      { x: 4,  baseY: plainsBaseY + 4, color: C.flower1 },
      { x: 16, baseY: plainsBaseY + 5, color: C.flower2 },
      { x: 25, baseY: plainsBaseY + 4, color: C.flower3 },
      { x: 33, baseY: plainsBaseY + 5, color: C.flower1 },
      { x: 41, baseY: plainsBaseY + 4, color: C.flower2 },
      { x: 48, baseY: plainsBaseY + 5, color: C.flower3 },
      { x: 57, baseY: plainsBaseY + 4, color: C.flower1 },
    ];

    flowers.forEach(function(f) {
      var fy = f.baseY - offset * 0.7;
      if (fy > -4 && fy < PH + 4) {
        drawPixelFlower(o, f.x, Math.floor(fy), f.color);
      }
    });

    // 小池塘
    var pondX = Math.floor(PW * 0.62);
    var pondY = Math.floor(plainsBaseY + 4) - Math.floor(offset * 0.7);
    if (pondY > -4 && pondY < PH + 4) {
      drawPixelPond(o, pondX, pondY);
    }
  }

  /* ====== 地下层 ====== */
  function drawUnderground(o, offset) {
    var ugBaseY = PH * 1.15;
    var ugY = ugBaseY - offset * 0.7;

    // 地下起始于 viewport 可见范围
    var startY = Math.max(0, Math.floor(ugY));
    if (startY >= PH) return;

    // 草方块表层
    var topY = startY;
    var blockS = 4; // 每个方块的像素尺寸
    for (var bx = 0; bx < PW; bx += blockS) {
      var gy = topY;
      // 草方块顶部绿色
      o.fillStyle = (bx / blockS) % 3 === 0 ? C.grass2 : C.grass1;
      o.fillRect(bx, gy, blockS, 1);
      // 草方块泥土
      o.fillStyle = (bx / blockS) % 2 === 0 ? C.dirt1 : C.dirt2;
      o.fillRect(bx, gy + 1, blockS, blockS - 1);
    }

    // 泥土层 (2层方块)
    for (var row = 1; row <= 2; row++) {
      for (bx = 0; bx < PW; bx += blockS) {
        var dy = topY + row * blockS;
        if (dy >= PH) continue;
        o.fillStyle = (bx + row) % 3 === 0 ? C.dirt2 : (bx % 3 === 0 ? C.dirt1 : C.dirt3);
        o.fillRect(bx, dy, blockS, blockS);
        // 方块边框（像素感）
        o.fillStyle = 'rgba(0,0,0,0.15)';
        o.fillRect(bx, dy, blockS, 1);
        o.fillRect(bx, dy, 1, blockS);
      }
    }

    // 石头层 (剩余部分)
    var stoneStartY = topY + 3 * blockS;
    for (var sy = stoneStartY; sy < PH; sy += blockS) {
      for (bx = 0; bx < PW; bx += blockS) {
        var noise = (bx * 7 + sy * 13) % 5;
        if (noise === 0) {
          o.fillStyle = C.stone1;
        } else if (noise === 1) {
          o.fillStyle = C.stone2;
        } else {
          o.fillStyle = C.stone3;
        }
        o.fillRect(bx, sy, blockS, blockS);
        // 方块边框
        o.fillStyle = 'rgba(0,0,0,0.18)';
        o.fillRect(bx, sy, blockS, 1);
        o.fillRect(bx, sy, 1, blockS);
        o.fillStyle = 'rgba(255,255,255,0.05)';
        o.fillRect(bx, sy + blockS - 1, blockS, 1);
        o.fillRect(bx + blockS - 1, sy, 1, blockS);
      }
    }

    // 矿石斑点
    var ores = [
      { gx: 3,  gy: 5,  color: C.coal,    label: 'coal' },
      { gx: 10, gy: 8,  color: C.iron,    label: 'iron' },
      { gx: 7,  gy: 14, color: C.gold,    label: 'gold' },
      { gx: 13, gy: 6,  color: C.diamond, label: 'diamond' },
      { gx: 5,  gy: 18, color: C.emerald, label: 'emerald' },
      { gx: 11, gy: 11, color: C.coal,    label: 'coal2' },
      { gx: 2,  gy: 10, color: C.iron,    label: 'iron2' },
      { gx: 14, gy: 16, color: C.gold,    label: 'gold2' },
    ];

    var gridX = 0;
    var gridY = stoneStartY;
    ores.forEach(function(ore) {
      var ox = ore.gx * blockS;
      var oy = gridY + ore.gy * blockS / 2;
      if (oy >= -blockS && oy < PH) {
        drawOreVein(o, ox, Math.floor(oy), ore.color, blockS);
      }
    });

    // 小洞穴开口
    var caveX = Math.floor(PW * 0.3);
    var caveY = topY + 5 * blockS;
    if (caveY < PH && caveY > -blockS) {
      o.fillStyle = '#2a2a2a';
      o.fillRect(caveX, caveY, blockS * 2, blockS * 2);
      o.fillRect(caveX + 1, caveY + blockS * 2, blockS, blockS);
      o.fillStyle = '#1a1a1a';
      o.fillRect(caveX + 3, caveY + 1, blockS, blockS);
    }
  }

  /* ====== 像素绘制辅助 ====== */
  function drawPixelCloud(o, x, y, w, h) {
    // 云朵主体
    o.fillStyle = C.cloud;
    o.fillRect(x, y + 1, w, h);
    o.fillRect(x + 1, y, w - 2, h + 2);
    // 阴影
    o.fillStyle = C.cloudShade;
    o.fillRect(x, y + h, w, 1);
    o.fillRect(x + w - 1, y + 1, 1, h - 1);
  }

  function drawPixelBird(o, x, y, frame) {
    var wingUp = frame === 1;
    o.fillStyle = C.bird;
    if (wingUp) {
      o.fillRect(x, y + 1, 3, 1);
      o.fillRect(x + 1, y, 1, 1);
      o.fillRect(x + 2, y + 2, 1, 1);
    } else {
      o.fillRect(x, y, 3, 1);
      o.fillRect(x + 1, y + 1, 1, 1);
      o.fillRect(x + 1, y - 1, 1, 1);
    }
  }

  function drawPixelTree(o, x, y) {
    // 树干
    o.fillStyle = C.treeTrunk;
    o.fillRect(x + 1, y + 6, 2, 6);
    o.fillRect(x, y + 10, 4, 3);
    // 树冠
    o.fillStyle = C.treeLeaf1;
    o.fillRect(x - 2, y + 2, 8, 4);
    o.fillRect(x - 1, y, 6, 3);
    o.fillStyle = C.treeLeaf2;
    o.fillRect(x, y + 1, 4, 2);
    o.fillRect(x - 1, y + 4, 6, 1);
  }

  function drawPixelAnimal(o, x, y, type) {
    if (type === 'cow') {
      // 身体
      o.fillStyle = C.cowBody;
      o.fillRect(x, y + 2, 6, 3);
      o.fillRect(x + 1, y + 1, 4, 2);
      // 斑点
      o.fillStyle = C.cowSpot;
      o.fillRect(x + 2, y + 2, 2, 1);
      o.fillRect(x + 4, y + 3, 2, 1);
      // 头
      o.fillStyle = C.cowBody;
      o.fillRect(x + 5, y + 1, 3, 3);
      // 腿
      o.fillRect(x + 1, y + 5, 1, 2);
      o.fillRect(x + 4, y + 5, 1, 2);
    } else if (type === 'sheep') {
      // 蓬松身体
      o.fillStyle = C.sheepBody;
      o.fillRect(x, y + 1, 6, 4);
      o.fillRect(x - 1, y + 2, 8, 2);
      o.fillRect(x + 1, y, 4, 2);
      // 脸
      o.fillStyle = C.sheepFace;
      o.fillRect(x + 5, y + 2, 2, 2);
      o.fillStyle = '#333';
      o.fillRect(x + 6, y + 2, 1, 1);
      // 腿
      o.fillStyle = C.sheepFace;
      o.fillRect(x + 1, y + 5, 1, 2);
      o.fillRect(x + 3, y + 5, 1, 2);
    } else if (type === 'pig') {
      o.fillStyle = C.pigBody;
      o.fillRect(x, y + 2, 5, 3);
      o.fillRect(x + 1, y + 1, 3, 2);
      // 头
      o.fillRect(x + 4, y + 1, 3, 3);
      o.fillStyle = '#e89080';
      o.fillRect(x + 6, y + 1, 1, 1); // 鼻子
      // 腿
      o.fillStyle = C.pigBody;
      o.fillRect(x + 1, y + 5, 1, 1);
      o.fillRect(x + 3, y + 5, 1, 1);
    }
  }

  function drawPixelFlower(o, x, y, color) {
    // 茎
    o.fillStyle = C.grass3;
    o.fillRect(x + 1, y + 2, 1, 3);
    // 花瓣
    o.fillStyle = color;
    o.fillRect(x, y, 3, 2);
    o.fillRect(x + 1, y - 1, 1, 2);
    // 花心
    o.fillStyle = '#ffffaa';
    o.fillRect(x + 1, y, 1, 1);
  }

  function drawPixelPond(o, x, y) {
    o.fillStyle = C.water;
    o.fillRect(x, y, 6, 3);
    o.fillRect(x + 1, y - 1, 4, 1);
    // 水面高光
    o.fillStyle = 'rgba(255,255,255,0.25)';
    o.fillRect(x + 1, y, 2, 1);
    o.fillRect(x + 4, y + 1, 1, 1);
    // 荷叶
    o.fillStyle = '#4a9e3a';
    o.fillRect(x + 5, y - 1, 2, 1);
  }

  function drawPixelHill(o, startX, y, width) {
    // 绘制起伏的山丘轮廓
    var segW = Math.floor(width / 8);
    var heights = [];
    for (var i = 0; i < 8; i++) {
      heights.push(Math.floor(Math.sin(i * 0.8) * 6 + Math.sin(i * 1.5) * 3));
    }
    for (var cx = startX; cx < startX + width; cx++) {
      var sx = Math.floor((cx - startX) / segW);
      if (sx >= 8) sx = 7;
      var h = heights[sx] + Math.floor(Math.sin(cx * 0.3) * 2);
      o.fillRect(cx, y + h, 1, PH - y - h);
    }
  }

  function drawOreVein(o, x, y, color, s) {
    o.fillStyle = color;
    o.fillRect(x, y, s, s);
    o.fillRect(x + s, y, s, s);
    o.fillRect(x, y + s, s, s);
    // 脉纹纹理
    o.fillStyle = 'rgba(255,255,255,0.2)';
    o.fillRect(x + 1, y, 2, 1);
    o.fillStyle = 'rgba(0,0,0,0.2)';
    o.fillRect(x - 1, y + s, s + 4, 1);
  }

  /* ---- 颜色插值工具 ---- */
  function lerpColor(a, b, t) {
    t = Math.max(0, Math.min(1, t));
    var ra = parseInt(a.slice(1, 3), 16);
    var ga = parseInt(a.slice(3, 5), 16);
    var ba = parseInt(a.slice(5, 7), 16);
    var rb = parseInt(b.slice(1, 3), 16);
    var gb = parseInt(b.slice(3, 5), 16);
    var bb = parseInt(b.slice(5, 7), 16);
    var rr = Math.floor(ra + (rb - ra) * t);
    var gg = Math.floor(ga + (gb - ga) * t);
    var bb2 = Math.floor(ba + (bb - ba) * t);
    return '#' + [rr, gg, bb2].map(function(v) {
      return v.toString(16).padStart(2, '0');
    }).join('');
  }

  /* ---- 启动 ---- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
