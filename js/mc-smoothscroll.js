/* ============================================================
   EN - 原生平滑滚动 + 像素动画增强
   ============================================================ */

(function() {
  'use strict';

  /* ---- CSS 平滑滚动 ---- */
  document.documentElement.style.scrollBehavior = 'smooth';

  /* ---- 滚动进度 CSS 变量 (供背景 canvas 使用) ---- */
  function updateScrollVars() {
    var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    var progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    document.documentElement.style.setProperty('--scroll-progress', progress.toFixed(4));
    document.documentElement.style.setProperty('--scroll-y', Math.round(window.scrollY));
  }

  var scrollTicking = false;
  window.addEventListener('scroll', function() {
    if (!scrollTicking) {
      requestAnimationFrame(function() {
        updateScrollVars();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });
  updateScrollVars();

  /* ---- 平滑锚点滚动 (兼容回退) ---- */
  window.smoothScrollTo = function(targetEl, offset) {
    offset = offset || 0;
    if (typeof targetEl === 'string') targetEl = document.querySelector(targetEl);
    if (!targetEl) return;
    try {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (offset) window.scrollBy({ top: offset, behavior: 'smooth' });
    } catch(e) {
      // 回退
      var rect = targetEl.getBoundingClientRect();
      window.scrollTo({ top: window.scrollY + rect.top - offset, behavior: 'smooth' });
    }
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
    questComplete: function() {
      var ctx = getAudioCtx();
      if (!ctx) return;
      var t = ctx.currentTime;
      var notes = [523.3, 659.3, 784.0, 1046.5];
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

})();
