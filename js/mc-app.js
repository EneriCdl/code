/* ============================================================
   MC工坊 - 主应用逻辑
   Auth / Routing / Todolist / Search / Render
   ============================================================ */

(function() {
  'use strict';

  /* ========== 工具函数 ========== */
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  /** SHA-256 哈希 (用于密码存储)。若 crypto.subtle 不可用则回退到简单哈希 */
  async function sha256(message) {
    try {
      var msgBuffer = new TextEncoder().encode(message);
      var hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
      var hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(function(b) { return b.toString(16).padStart(2, '0'); }).join('');
    } catch(e) {
      // 回退：简单但足以防止明文存储的哈希
      var hash = 0;
      for (var i = 0; i < message.length; i++) {
        var chr = message.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0;
      }
      return 'fb_' + Math.abs(hash).toString(16) + '_' + message.length.toString(16);
    }
  }

  /** Toast 通知 */
  function showToast(msg, type) {
    const existing = $('.mc-toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = 'mc-toast';
    if (type === 'error') toast.style.background = '#8b3030';
    if (type === 'warning') toast.style.background = '#8b6b30';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(function() { if (toast.parentNode) toast.remove(); }, 2600);
  }

  /** 确认弹窗 - 简版 */
  function confirmDialog(msg) {
    return new Promise(function(resolve) {
      if (window.confirm(msg)) { resolve(true); } else { resolve(false); }
    });
  }

  /* ========== 用户管理 ========== */
  const STORAGE_KEY_USERS = 'mc_workshop_users';
  const STORAGE_KEY_SESSION = 'mc_workshop_session';
  const STORAGE_KEY_TODOLIST_PREFIX = 'mc_workshop_todolist_';
  const STORAGE_KEY_XP_PREFIX = 'mc_workshop_xp_';

  function getUsers() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY_USERS)) || {}; }
    catch(e) { return {}; }
  }

  function saveUsers(users) {
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
  }

  function getSession() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY_SESSION)); }
    catch(e) { return null; }
  }

  function setSession(username) {
    localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify({ username: username, loginAt: Date.now() }));
  }

  function clearSession() {
    localStorage.removeItem(STORAGE_KEY_SESSION);
  }

  function getTodolistKey(username) {
    return STORAGE_KEY_TODOLIST_PREFIX + username;
  }

  function getTodolist(username) {
    try { return JSON.parse(localStorage.getItem(getTodolistKey(username))) || []; }
    catch(e) { return []; }
  }

  function saveTodolist(username, list) {
    localStorage.setItem(getTodolistKey(username), JSON.stringify(list));
  }

  function getXPKey(username) { return STORAGE_KEY_XP_PREFIX + username; }
  function getUserXP(username) {
    try { return JSON.parse(localStorage.getItem(getXPKey(username))) || { xp: 0, level: 1, totalCompleted: 0 }; }
    catch(e) { return { xp: 0, level: 1, totalCompleted: 0 }; }
  }
  function saveUserXP(username, data) {
    localStorage.setItem(getXPKey(username), JSON.stringify(data));
  }
  function xpForLevel(lv) { return lv * 30; }
  function addXP(xpGain) {
    if (!currentUser) return;
    var data = getUserXP(currentUser);
    data.xp += xpGain;
    data.totalCompleted++;
    var needed = xpForLevel(data.level);
    var leveled = false;
    while (data.xp >= needed) {
      data.xp -= needed;
      data.level++;
      needed = xpForLevel(data.level);
      leveled = true;
    }
    saveUserXP(currentUser, data);
    return { data: data, leveled: leveled };
  }
  function getXpProgress(data) {
    var needed = xpForLevel(data.level);
    return { current: data.xp, needed: needed, pct: Math.min(100, Math.round(data.xp / needed * 100)) };
  }

  /* ========== 当前用户状态 ========== */
  let currentUser = null;

  /* ========== 当前视图状态 ========== */
  let currentSubView = 'home';
  let previousSubView = 'home';
  let currentSearchQuery = '';
  let currentFilters = { category: 'all', difficulty: 'all', version: 'all' };

  /* ========== 页面初始化 ========== */
  function init() {
    // 检查是否有登录会话
    var session = getSession();
    if (session && session.username) {
      var users = getUsers();
      if (users[session.username]) {
        currentUser = session.username;
        showMainView();
        return;
      }
    }
    showLoginView();
  }

  /* ========== 视图切换 (登录 ↔ 主界面) ========== */
  function showLoginView() {
    $('#view-login').classList.add('active');
    $('#view-main').classList.remove('active');
    $('#login-username').value = '';
    $('#login-password').value = '';
    $('#login-password2').value = '';
    $('#login-error').textContent = '';
    $('#register-fields').style.display = 'none';
    $('#login-submit').textContent = '登 录';
    window._loginMode = 'login';
  }

  function showMainView() {
    $('#view-login').classList.remove('active');
    $('#view-main').classList.add('active');
    $('#nav-username').textContent = currentUser;
    navigateTo('home');
  }

  /* ========== 登录/注册逻辑 ========== */
  $('#login-submit').addEventListener('click', async function() {
    var username = $('#login-username').value.trim();
    var password = $('#login-password').value;
    var mode = window._loginMode || 'login';

    if (!username || !password) {
      $('#login-error').textContent = '请填写账号和密码';
      return;
    }
    if (username.length < 2 || username.length > 16) {
      $('#login-error').textContent = '账号长度为 2-16 个字符';
      return;
    }
    if (password.length < 4) {
      $('#login-error').textContent = '密码至少 4 位';
      return;
    }

    var users = getUsers();

    if (mode === 'register') {
      var password2 = $('#login-password2').value;
      if (password !== password2) {
        $('#login-error').textContent = '两次密码不一致';
        return;
      }
      if (users[username]) {
        $('#login-error').textContent = '该账号已存在，请直接登录';
        return;
      }
      // 注册
      var hash = await sha256(password);
      users[username] = { passwordHash: hash, createdAt: Date.now() };
      saveUsers(users);
      setSession(username);
      currentUser = username;
      showToast('注册成功！欢迎来到 MC工坊', '');
      showMainView();
    } else {
      // 登录
      if (!users[username]) {
        $('#login-error').textContent = '账号不存在，请先注册';
        return;
      }
      var hash = await sha256(password);
      if (users[username].passwordHash !== hash) {
        $('#login-error').textContent = '密码错误';
        return;
      }
      setSession(username);
      currentUser = username;
      showToast('登录成功！欢迎回来，' + username, '');
      showMainView();
    }
  });

  $('#login-switch').addEventListener('click', function(e) {
    e.preventDefault();
    var mode = window._loginMode || 'login';
    if (mode === 'login') {
      window._loginMode = 'register';
      $('#register-fields').style.display = 'block';
      $('#login-submit').textContent = '注 册';
      $('#login-switch').textContent = '已有账号？点此登录';
      $('#login-error').textContent = '';
    } else {
      window._loginMode = 'login';
      $('#register-fields').style.display = 'none';
      $('#login-submit').textContent = '登 录';
      $('#login-switch').textContent = '还没有账号？点此注册';
      $('#login-error').textContent = '';
    }
  });

  // 回车提交
  $('#login-password').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') $('#login-submit').click();
  });
  $('#login-password2').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') $('#login-submit').click();
  });

  /* ========== 退出登录 ========== */
  $('#nav-logout').addEventListener('click', function() {
    clearSession();
    currentUser = null;
    showToast('已退出登录', '');
    showLoginView();
  });

  /* ========== 导航切换 ========== */
  $('#nav-home').addEventListener('click', function() { navigateTo('home'); });
  $('#nav-search').addEventListener('click', function() { navigateTo('search'); });
  $('#nav-todolist').addEventListener('click', function() { navigateTo('todolist'); });

  /* ========== 首页英雄区搜索按钮 ========== */
  var heroSearchBtn = $('#btn-hero-search');
  if (heroSearchBtn) {
    heroSearchBtn.addEventListener('click', function() { navigateTo('search'); });
  }

  function navigateTo(view, data) {
    if (view !== 'detail') previousSubView = view;
    currentSubView = view;
    // 更新导航高亮
    $$('.nav-link').forEach(function(link) { link.classList.remove('active'); });
    var navMap = { home: 'nav-home', search: 'nav-search', todolist: 'nav-todolist' };
    if (navMap[view]) $('#' + navMap[view]).classList.add('active');

    // 隐藏所有子视图
    $$('.sub-view').forEach(function(v) { v.classList.remove('active'); });

    switch(view) {
      case 'home': renderHome(); break;
      case 'search': renderSearch(); break;
      case 'detail': renderDetail(data); break;
      case 'todolist': renderTodolist(); break;
    }
  }

  /* ========== 首页渲染 ========== */
  function renderHome() {
    $('#sub-home').classList.add('active');
    $('#sub-search').classList.remove('active');
    $('#sub-detail').classList.remove('active');
    $('#sub-todolist').classList.remove('active');

    var featured = MC_DATA.getFeatured();
    var featuredHtml = '';
    featured.forEach(function(t) {
      featuredHtml += renderCard(t);
    });
    $('#home-featured-grid').innerHTML = featuredHtml;

    var machines = MC_DATA.tutorials.filter(function(t) { return t.category === 'machine'; });
    var machineHtml = '';
    machines.forEach(function(t) {
      machineHtml += renderCard(t);
    });
    $('#home-machines-grid').innerHTML = machineHtml;

    var buildings = MC_DATA.tutorials.filter(function(t) { return t.category === 'building'; });
    var buildingHtml = '';
    buildings.forEach(function(t) {
      buildingHtml += renderCard(t);
    });
    $('#home-buildings-grid').innerHTML = buildingHtml;

    // 绑定卡片点击
    bindCardClicks();
  }

  function renderCard(t) {
    var diffLabel = t.difficulty === 'easy' ? '简单' : t.difficulty === 'medium' ? '中等' : '困难';
    var catLabel = t.category === 'machine' ? '机器' : '建筑';
    return '' +
      '<div class="mc-card grass-accent" data-id="' + t.id + '">' +
        '<div class="card-header">' +
          '<div class="card-icon">' + t.icon + '</div>' +
          '<div>' +
            '<div class="card-title">' + escapeHtml(t.name) + '</div>' +
            '<div style="display:flex;gap:4px;flex-wrap:wrap;">' +
              '<span class="mc-badge ' + t.category + '">' + catLabel + '</span>' +
              '<span class="mc-badge ' + t.difficulty + '">' + diffLabel + '</span>' +
              '<span class="mc-badge version">' + t.version + '</span>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="card-body">' +
          '<p class="card-desc">' + escapeHtml(t.description.substring(0, 60)) + '...</p>' +
        '</div>' +
      '</div>';
  }

  function bindCardClicks() {
    $$('.mc-card[data-id]').forEach(function(card) {
      card.addEventListener('click', function() {
        var id = this.getAttribute('data-id');
        var tutorial = MC_DATA.findById(id);
        if (tutorial) {
          navigateTo('detail', tutorial);
        }
      });
    });
  }

  /* ========== 搜索页渲染 ========== */
  function renderSearch() {
    $('#sub-home').classList.remove('active');
    $('#sub-search').classList.add('active');
    $('#sub-detail').classList.remove('active');
    $('#sub-todolist').classList.remove('active');

    $('#search-input').value = currentSearchQuery;
    renderFilters();
    performSearch();
  }

  function renderFilters() {
    var catHtml = '';
    MC_DATA.getCategories().forEach(function(c) {
      catHtml += '<span class="filter-chip' + (currentFilters.category === c.value ? ' active' : '') + '" data-filter="category" data-value="' + c.value + '">' + c.label + '</span>';
    });
    $('#filter-categories').innerHTML = catHtml;

    var diffHtml = '';
    MC_DATA.getDifficulties().forEach(function(d) {
      diffHtml += '<span class="filter-chip' + (currentFilters.difficulty === d.value ? ' active' : '') + '" data-filter="difficulty" data-value="' + d.value + '">' + d.label + '</span>';
    });
    $('#filter-difficulties').innerHTML = diffHtml;

    // 绑定筛选点击
    $$('.filter-chip[data-filter]').forEach(function(chip) {
      chip.addEventListener('click', function() {
        var filterType = this.getAttribute('data-filter');
        var filterVal = this.getAttribute('data-value');
        currentFilters[filterType] = filterVal;
        renderFilters();
        performSearch();
      });
    });
  }

  function performSearch() {
    currentSearchQuery = $('#search-input').value;
    var results = MC_DATA.search(currentSearchQuery, currentFilters);
    var html = '';
    if (results.length === 0) {
      html = '' +
        '<div class="todolist-empty" style="margin-top:20px;">' +
          '<div class="empty-icon">🔍</div>' +
          '<h3>没有找到匹配的教程</h3>' +
          '<p>试试其他关键词，比如「刷石机」「城堡」「1.21」</p>' +
        '</div>';
    } else {
      html += '<p style="margin-bottom:12px;color:#bbb;">找到 <span class="highlight">' + results.length + '</span> 个结果</p>';
      html += '<div class="card-grid">';
      results.forEach(function(t) {
        html += renderCard(t);
      });
      html += '</div>';
    }
    $('#search-results').innerHTML = html;
    bindCardClicks();
  }

  $('#search-input').addEventListener('input', function() {
    performSearch();
  });

  $('#search-btn').addEventListener('click', function() {
    performSearch();
  });

  $('#search-input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') performSearch();
  });

  /* ========== 详情页渲染 ========== */
  function renderDetail(tutorial) {
    $('#sub-home').classList.remove('active');
    $('#sub-search').classList.remove('active');
    $('#sub-detail').classList.add('active');
    $('#sub-todolist').classList.remove('active');

    if (!tutorial) {
      navigateTo('home');
      return;
    }

    var diffLabel = tutorial.difficulty === 'easy' ? '简单' : tutorial.difficulty === 'medium' ? '中等' : '困难';
    var catLabel = tutorial.category === 'machine' ? '机器' : '建筑';

    // 材料列表
    var materialsHtml = '';
    tutorial.materials.forEach(function(m) {
      materialsHtml += '<li>' + escapeHtml(m) + '</li>';
    });

    // 建造步骤
    var stepsHtml = '';
    if (tutorial.steps && tutorial.steps.length > 0) {
      stepsHtml += '<div class="detail-section"><h3>📋 建造步骤</h3><ol style="padding-left:20px;line-height:2.2;font-size:15px;color:#e0e0e0;">';
      tutorial.steps.forEach(function(s, i) {
        stepsHtml += '<li>' + escapeHtml(s) + '</li>';
      });
      stepsHtml += '</ol></div>';
    }

    // B站链接
    var bilibiliUrl = 'https://search.bilibili.com/all?keyword=' + encodeURIComponent(tutorial.bilibiliSearch);

    var html = '' +
      '<button class="mc-btn back-btn" id="btn-back"><span style="font-size:18px;">◀</span> 返回</button>' +
      '<div class="detail-hero">' +
        '<div class="detail-icon">' + tutorial.icon + '</div>' +
        '<h2>' + escapeHtml(tutorial.name) + '</h2>' +
        '<div class="detail-meta">' +
          '<span class="mc-badge ' + tutorial.category + '">' + catLabel + '</span>' +
          '<span class="mc-badge ' + tutorial.difficulty + '">' + diffLabel + '</span>' +
          '<span class="mc-badge version">' + tutorial.version + '</span>' +
        '</div>' +
      '</div>' +
      '<div class="detail-section">' +
        '<h3>📝 介绍</h3>' +
        '<p>' + escapeHtml(tutorial.description) + '</p>' +
      '</div>' +
      '<div class="detail-section">' +
        '<h3>🧱 所需材料</h3>' +
        '<ul class="materials-list">' + materialsHtml + '</ul>' +
      '</div>' +
      stepsHtml +
      '<div class="detail-actions">' +
        '<a href="' + bilibiliUrl + '" target="_blank" rel="noopener" class="mc-btn blue large" style="text-decoration:none;">' +
          '📺 在B站搜索教程' +
        '</a>' +
        '<button class="mc-btn green large" id="btn-add-todo" data-tutorial-id="' + tutorial.id + '">' +
          '📋 加入我的待建清单' +
        '</button>' +
      '</div>';

    $('#detail-content').innerHTML = html;

    $('#btn-back').addEventListener('click', function() {
      navigateTo(previousSubView);
    });

    $('#btn-add-todo').addEventListener('click', function() {
      addToTodolist(tutorial);
    });
  }

  /* ========== Todolist 管理 ========== */
  function addToTodolist(tutorial) {
    if (!currentUser) return;
    var list = getTodolist(currentUser);
    var exists = list.some(function(item) { return item.tutorialId === tutorial.id; });
    if (exists) {
      showToast('该教程已在任务清单中', 'warning');
      return;
    }
    list.push({
      id: Date.now().toString(36) + Math.random().toString(36).substr(2, 4),
      tutorialId: tutorial.id,
      name: tutorial.name,
      category: tutorial.category,
      icon: tutorial.icon,
      difficulty: tutorial.difficulty,
      addedAt: Date.now(),
      completed: false
    });
    saveTodolist(currentUser, list);
    try { window.playSfx.questAdd(); } catch(e) {}
    showToast('➕ 已加入任务日志！', '');
  }

  function toggleTodoComplete(todoId, checkboxEl) {
    if (!currentUser) return;
    var list = getTodolist(currentUser);
    var item = list.find(function(i) { return i.id === todoId; });
    if (!item) return;
    var wasCompleted = item.completed;
    item.completed = !item.completed;
    saveTodolist(currentUser, list);

    if (!wasCompleted && item.completed) {
      // 完成任务：加XP
      var xpMap = { easy: 10, medium: 25, hard: 50 };
      var xpGain = xpMap[item.difficulty] || 15;
      var result = addXP(xpGain);

      try { window.playSfx.questComplete(); } catch(e) {}

      // 粒子爆发
      if (checkboxEl) {
        var rect = checkboxEl.getBoundingClientRect();
        try { window.pixelBurst(rect.left + rect.width/2, rect.top + rect.height/2, 14, '#ffd700'); } catch(e) {}
        try { window.pixelShake(checkboxEl.closest('.quest-card'), 2, 200); } catch(e) {}
      }
      var xpInfo = getXpProgress(result.data);
      showToast('✅ 任务完成！ +' + xpGain + ' XP (Lv.' + result.data.level + ' ' + xpInfo.current + '/' + xpInfo.needed + ')', '');

      if (result.leveled) {
        setTimeout(function() {
          showToast('🌟 升级！达到 Lv.' + result.data.level + '！', '');
          try { window.playSfx.questComplete(); } catch(e) {}
        }, 600);
      }
    } else if (wasCompleted && !item.completed) {
      try { window.playSfx.click(); } catch(e) {}
    }
    renderTodolist();
  }

  function removeFromTodolist(todoId) {
    if (!currentUser) return;
    var list = getTodolist(currentUser);
    list = list.filter(function(i) { return i.id !== todoId; });
    saveTodolist(currentUser, list);
    try { window.playSfx.error(); } catch(e) {}
    renderTodolist();
    showToast('🗑️ 任务已移除', '');
  }

  function renderTodolist() {
    $('#sub-home').classList.remove('active');
    $('#sub-search').classList.remove('active');
    $('#sub-detail').classList.remove('active');
    $('#sub-todolist').classList.add('active');

    if (!currentUser) return;
    var list = getTodolist(currentUser);
    var xpData = getUserXP(currentUser);
    var xpProg = getXpProgress(xpData);

    var pending = list.filter(function(i) { return !i.completed; });
    var completed = list.filter(function(i) { return i.completed; });

    var html = '<div class="quest-log">';

    html += '' +
      '<div class="quest-xp-bar-wrap">' +
        '<div class="quest-xp-icon">⚔️</div>' +
        '<div class="quest-xp-info">' +
          '<div class="quest-xp-label"><span>冒险等级</span><span>' + xpProg.current + ' / ' + xpProg.needed + ' XP</span></div>' +
          '<div class="quest-xp-bar-outer"><div class="quest-xp-bar-inner" style="width:' + xpProg.pct + '%;"></div></div>' +
        '</div>' +
        '<div class="quest-xp-level"><span class="lv-num">Lv.' + xpData.level + '</span></div>' +
      '</div>';

    html += '' +
      '<div class="quest-stats">' +
        '<div class="quest-stat-card"><div class="quest-stat-val gold">' + pending.length + '</div><div class="quest-stat-lbl">📋 进行中</div></div>' +
        '<div class="quest-stat-card"><div class="quest-stat-val green">' + completed.length + '</div><div class="quest-stat-lbl">✅ 已完成</div></div>' +
        '<div class="quest-stat-card"><div class="quest-stat-val blue">' + (xpData.totalCompleted || 0) + '</div><div class="quest-stat-lbl">🏆 总计</div></div>' +
        '<div class="quest-stat-card"><div class="quest-stat-val">' + list.length + '</div><div class="quest-stat-lbl">📦 全部</div></div>' +
      '</div>';

    if (list.length === 0) {
      html += '' +
        '<div class="quest-empty">' +
          '<div class="empty-icon">📜</div>' +
          '<h3>任务日志为空</h3>' +
          '<p>前往首页浏览教程，将你想建造的项目加入任务日志吧！</p>' +
          '<button class="mc-btn gold" id="btn-goto-home">🏠 浏览教程</button>' +
        '</div>';
    } else {
      if (pending.length > 0) {
        html += '<div class="quest-group-title">📋 进行中的任务 <span class="quest-group-count">' + pending.length + ' 项</span></div>';
        pending.forEach(function(item) { html += renderQuestCard(item); });
      }
      if (completed.length > 0) {
        html += '<div class="quest-group-title">✅ 已完成的任务 <span class="quest-group-count">' + completed.length + ' 项</span></div>';
        completed.forEach(function(item) { html += renderQuestCard(item); });
        html += '<div style="text-align:center;margin-top:16px;"><button class="mc-btn red small" id="btn-clear-completed">🗑️ 清除已完成任务</button></div>';
      }
    }
    html += '</div>';
    $('#todolist-content').innerHTML = html;

    if (list.length === 0) {
      var gotoBtn = $('#btn-goto-home');
      if (gotoBtn) gotoBtn.addEventListener('click', function() { navigateTo('home'); });
      return;
    }

    $$('.quest-checkbox').forEach(function(check) {
      check.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleTodoComplete(this.getAttribute('data-todo-id'), this);
      });
    });
    $$('.quest-card').forEach(function(card) {
      card.addEventListener('click', function() {
        var t = MC_DATA.findById(this.getAttribute('data-tutorial-id'));
        if (t) navigateTo('detail', t);
      });
    });
    $$('.quest-delete').forEach(function(btn) {
      btn.addEventListener('click', async function(e) {
        e.stopPropagation();
        if (await confirmDialog('确定要放弃这个任务吗？')) removeFromTodolist(this.getAttribute('data-todo-id'));
      });
    });
    var clearBtn = $('#btn-clear-completed');
    if (clearBtn) {
      clearBtn.addEventListener('click', async function() {
        if (await confirmDialog('确定要清除所有已完成的任务吗？') && currentUser) {
          var lst = getTodolist(currentUser).filter(function(i) { return !i.completed; });
          saveTodolist(currentUser, lst);
          renderTodolist();
          showToast('已清除完成的任务', '');
        }
      });
    }
  }

  function renderQuestCard(item) {
    var diffEmoji = item.difficulty === 'easy' ? '⭐' : item.difficulty === 'medium' ? '⭐✨' : '⭐💀';
    var catLabel = item.category === 'machine' ? '生电机器' : '建筑教程';
    return '' +
      '<div class="quest-card' + (item.completed ? ' completed' : '') + '" data-tutorial-id="' + item.tutorialId + '">' +
        '<div class="quest-bookmark"></div>' +
        '<div class="quest-checkbox' + (item.completed ? ' checked' : '') + '" data-todo-id="' + item.id + '">' + (item.completed ? '✓' : '') + '</div>' +
        '<div class="quest-info">' +
          '<div class="quest-name">' + item.icon + ' ' + escapeHtml(item.name) + '</div>' +
          '<div class="quest-meta-row">' +
            '<span class="mc-badge ' + item.category + '">' + catLabel + '</span>' +
            '<span class="quest-difficulty-indicator">' + diffEmoji + '</span>' +
            '<span class="quest-date">' + formatDate(item.addedAt) + '</span>' +
          '</div>' +
        '</div>' +
        '<button class="quest-delete" data-todo-id="' + item.id + '">✕</button>' +
      '</div>';
  }

  /* ========== 工具函数 ========== */
  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function formatDate(ts) {
    var d = new Date(ts);
    return d.getFullYear() + '-' +
      String(d.getMonth() + 1).padStart(2, '0') + '-' +
      String(d.getDate()).padStart(2, '0');
  }

  /* ========== 启动 ========== */
  init();

})();
