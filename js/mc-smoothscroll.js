/* ============================================================
   EN - 丝滑滚动引擎 + 像素动画增强
   ============================================================ */

(function() {
  'use strict';

  /* ---- 全局平滑滚动 (Lenis-style) ---- */
  var scrollY = 0;
  var targetY = 0;
  var velY = 0;
  var rafId = null;
  var ease = 0.075; // 惯性系数 (越小越丝滑但越"重")

  function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

  function updateScroll() {
    // 计算当前滚动位置 → 目标位置的插值
    var dy = targetY - scrollY;
    // 当差异极小时直接吸附
    if (Math.abs(dy) < 0.08) {
      scrollY = targetY;
      velY = 0;
    } else {
      velY += dy * ease * 1.5;
      velY *= 0.86;
      scrollY += velY;
      // 过冲保护
      if ((velY > 0 && scrollY > targetY) || (velY < 0 && scrollY < targetY)) {
        scrollY = targetY;
        velY = 0;
      }
    }

    // 应用到 DOM
    window.scrollTo(0, Math.round(scrollY));

    // 更新 CSS 变量供其他模块使用
    var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    var progress = maxScroll > 0 ? scrollY / maxScroll : 0;
    document.documentElement.style.setProperty('--scroll-progress', progress.toFixed(4));
    document.documentElement.style.setProperty('--scroll-y', Math.round(scrollY));

    rafId = requestAnimationFrame(updateScroll);
  }

  function onWheel(e) {
    // 仅在主内容区启用平滑滚动
    var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    targetY = clamp(targetY + e.deltaY * 1.2, 0, Math.max(0, maxScroll));
  }

  function onTouchStart(e) {
    if (e.touches.length === 1) {
      this._touchY = e.touches[0].clientY;
      this._touchTargetY = targetY;
      this._touchVelY = velY;
      velY = 0; // 触摸时停止惯性
    }
  }

  function onTouchMove(e) {
    if (e.touches.length === 1 && this._touchY !== undefined) {
      var dy = this._touchY - e.touches[0].clientY;
      var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      targetY = clamp(this._touchTargetY + dy, 0, Math.max(0, maxScroll));
      scrollY = targetY; // 触摸时直接跟随
    }
  }

  function onTouchEnd(e) {
    this._touchY = undefined;
  }

  function onKeyDown(e) {
    // 键盘导航也走平滑
    var step = 80;
    var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (e.key === 'ArrowDown' || e.key === 'j') {
      e.preventDefault();
      targetY = clamp(targetY + step, 0, Math.max(0, maxScroll));
    } else if (e.key === 'ArrowUp' || e.key === 'k') {
      e.preventDefault();
      targetY = clamp(targetY - step, 0, Math.max(0, maxScroll));
    } else if (e.key === 'Home') {
      e.preventDefault();
      targetY = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      targetY = Math.max(0, maxScroll);
    }
  }

  function start() {
    targetY = window.scrollY;
    scrollY = targetY;
    velY = 0;

    // 禁用原生滚动，改用手动控制
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.height = '100%';
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100%';

    // 创建一个滚动代理容器维持页面高度
    var proxy = document.createElement('div');
    proxy.id = 'scroll-proxy';
    proxy.style.cssText = 'position:absolute;top:0;left:0;width:1px;pointer-events:none;visibility:hidden;';
    document.body.appendChild(proxy);

    function updateProxyHeight() {
      var h = document.documentElement.scrollHeight;
      proxy.style.height = h + 'px';
      document.documentElement.style.minHeight = h + 'px';
    }
    updateProxyHeight();
    // 监听内容变化
    var ro = new ResizeObserver(updateProxyHeight);
    ro.observe(document.body);

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('keydown', onKeyDown, { passive: false });

    updateScroll();
  }

  /* ---- 平滑锚点滚动 ---- */
  window.smoothScrollTo = function(targetEl, offset) {
    offset = offset || 0;
    if (typeof targetEl === 'string') targetEl = document.querySelector(targetEl);
    if (!targetEl) return;
    var rect = targetEl.getBoundingClientRect();
    var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    // 直接从当前 scrollY 计算
    targetY = clamp(scrollY + rect.top - offset, 0, Math.max(0, maxScroll));
  };

  /* ---- 像素震动动画 ---- */
  window.pixelShake = function(el, intensity, duration) {
    intensity = intensity || 3;
    duration = duration || 200;
    if (typeof el === 'string') el = document.querySelector(el);
    if (!el) return;
    var start = performance.now();
    var orig = el.style.transform || '';
    function tick(now) {
      var elapsed = now - start;
      if (elapsed > duration) {
        el.style.transform = orig;
        return;
      }
      var decay = 1 - elapsed / duration;
      var dx = (Math.random() - 0.5) * intensity * decay * 2;
      var dy = (Math.random() - 0.5) * intensity * decay * 2;
      el.style.transform = orig + ' translate(' + Math.round(dx) + 'px,' + Math.round(dy) + 'px)';
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  };

  /* ---- 像素弹出动画 ---- */
  window.pixelPop = function(el, scale, duration) {
    scale = scale || 1.15;
    duration = duration || 300;
    if (typeof el === 'string') el = document.querySelector(el);
    if (!el) return;
    el.style.transition = 'transform ' + (duration / 1000) + 's cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    el.style.transform = 'scale(' + scale + ')';
    setTimeout(function() {
      el.style.transform = 'scale(1)';
    }, duration * 0.6);
    setTimeout(function() {
      el.style.transition = '';
    }, duration + 50);
  };

  /* ---- 粒子爆发 ---- */
  window.pixelBurst = function(x, y, count, color) {
    count = count || 12;
    color = color || '#ffd700';
    var container = document.getElementById('particle-layer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'particle-layer';
      container.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;';
      document.body.appendChild(container);
    }
    for (var i = 0; i < count; i++) {
      var p = document.createElement('div');
      var size = Math.random() * 6 + 3;
      var angle = Math.random() * Math.PI * 2;
      var dist = Math.random() * 60 + 30;
      var dur = Math.random() * 400 + 400;
      p.style.cssText = [
        'position:absolute',
        'left:' + x + 'px',
        'top:' + y + 'px',
        'width:' + size + 'px',
        'height:' + size + 'px',
        'background:' + color,
        'box-shadow: 0 0 ' + (size * 2) + 'px ' + color,
        'pointer-events:none',
        'transition: all ' + (dur / 1000) + 's cubic-bezier(0,0.7,0.3,1)',
        'opacity:1',
        'image-rendering:pixelated'
      ].join(';');
      container.appendChild(p);
      requestAnimationFrame(function() {
        p.style.transform = 'translate(' + (Math.cos(angle) * dist) + 'px,' + (Math.sin(angle) * dist - 30) + 'px) scale(0)';
        p.style.opacity = '0';
      });
      setTimeout(function() { if (p.parentNode) p.remove(); }, dur + 50);
    }
  };

  /* ---- 音效引擎 (Web Audio API) ---- */
  var audioCtx = null;
  function getAudioCtx() {
    if (!audioCtx) {
      try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e) {}
    }
    return audioCtx;
  }

  window.playSfx = {
    /** 任务完成音效 (类似MC经验球拾取) */
    questComplete: function() {
      var ctx = getAudioCtx();
      if (!ctx) return;
      var t = ctx.currentTime;
      var notes = [523.3, 659.3, 784.0, 1046.5]; // C5 E5 G5 C6
      notes.forEach(function(freq, i) {
        var o = ctx.createOscillator();
        var g = ctx.createGain();
        o.type = 'square';
        o.frequency.value = freq;
        g.gain.setValueAtTime(0, t + i * 0.1);
        g.gain.linearRampToValueAtTime(0.15, t + i * 0.1 + 0.03);
        g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.1 + 0.25);
        o.connect(g); g.connect(ctx.destination);
        o.start(t + i * 0.1); o.stop(t + i * 0.1 + 0.25);
      });
    },
    /** 添加任务音效 (低沉短促) */
    questAdd: function() {
      var ctx = getAudioCtx();
      if (!ctx) return;
      var t = ctx.currentTime;
      var o = ctx.createOscillator();
      var g = ctx.createGain();
      o.type = 'triangle';
      o.frequency.setValueAtTime(440, t);
      o.frequency.linearRampToValueAtTime(660, t + 0.1);
      g.gain.setValueAtTime(0.12, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
      o.connect(g); g.connect(ctx.destination);
      o.start(t); o.stop(t + 0.15);
    },
    /** 点击音效 */
    click: function() {
      var ctx = getAudioCtx();
      if (!ctx) return;
      var t = ctx.currentTime;
      var o = ctx.createOscillator();
      var g = ctx.createGain();
      o.type = 'square';
      o.frequency.value = 800;
      g.gain.setValueAtTime(0.06, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
      o.connect(g); g.connect(ctx.destination);
      o.start(t); o.stop(t + 0.04);
    },
    /** 错误/删除音效 */
    error: function() {
      var ctx = getAudioCtx();
      if (!ctx) return;
      var t = ctx.currentTime;
      var o = ctx.createOscillator();
      var g = ctx.createGain();
      o.type = 'sawtooth';
      o.frequency.setValueAtTime(200, t);
      o.frequency.linearRampToValueAtTime(100, t + 0.15);
      g.gain.setValueAtTime(0.1, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
      o.connect(g); g.connect(ctx.destination);
      o.start(t); o.stop(t + 0.2);
    }
  };

  /* ---- 启动平滑滚动 (桌面端) ---- */
  var isMobile = /Android|iPhone|iPad|iPod|webOS/i.test(navigator.userAgent);
  if (!isMobile) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', start);
    } else {
      start();
    }
  } else {
    // 移动端使用原生滚动但添加 CSS 平滑
    document.documentElement.style.scrollBehavior = 'smooth';
    // 仍然暴露 smoothScrollTo
    window.smoothScrollTo = function(targetEl, offset) {
      offset = offset || 0;
      if (typeof targetEl === 'string') targetEl = document.querySelector(targetEl);
      if (!targetEl) return;
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (offset) window.scrollBy(0, offset);
    };
  }

})();
