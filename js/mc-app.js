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
    // 检查是否已存在
    var exists = list.some(function(item) { return item.tutorialId === tutorial.id; });
    if (exists) {
      showToast('该教程已在待建清单中', 'warning');
      return;
    }
    list.push({
      id: Date.now().toString(36) + Math.random().toString(36).substr(2, 4),
      tutorialId: tutorial.id,
      name: tutorial.name,
      category: tutorial.category,
      icon: tutorial.icon,
      addedAt: Date.now(),
      completed: false
    });
    saveTodolist(currentUser, list);
    showToast('已加入待建清单！', '');
  }

  function toggleTodoComplete(todoId) {
    if (!currentUser) return;
    var list = getTodolist(currentUser);
    var item = list.find(function(i) { return i.id === todoId; });
    if (item) {
      item.completed = !item.completed;
      saveTodolist(currentUser, list);
      renderTodolist();
    }
  }

  function removeFromTodolist(todoId) {
    if (!currentUser) return;
    var list = getTodolist(currentUser);
    list = list.filter(function(i) { return i.id !== todoId; });
    saveTodolist(currentUser, list);
    renderTodolist();
    showToast('已从清单中移除', '');
  }

  function renderTodolist() {
    $('#sub-home').classList.remove('active');
    $('#sub-search').classList.remove('active');
    $('#sub-detail').classList.remove('active');
    $('#sub-todolist').classList.add('active');

    if (!currentUser) return;
    var list = getTodolist(currentUser);

    var html = '<h2 class="section-title">📋 我的待建清单</h2>';

    if (list.length === 0) {
      html += '' +
        '<div class="todolist-empty">' +
          '<div class="empty-icon">📦</div>' +
          '<h3>还没有添加任何项目</h3>' +
          '<p>去首页浏览教程，把想建造的机器和建筑加入清单吧！</p>' +
          '<button class="mc-btn gold" id="btn-goto-home">🏠 去首页看看</button>' +
        '</div>';
      $('#todolist-content').innerHTML = html;
      var gotoBtn = $('#btn-goto-home');
      if (gotoBtn) {
        gotoBtn.addEventListener('click', function() { navigateTo('home'); });
      }
      return;
    }

    var pending = list.filter(function(i) { return !i.completed; });
    var completed = list.filter(function(i) { return i.completed; });

    html += '<p style="margin-bottom:16px;color:#bbb;">共 <span class="highlight">' + list.length + '</span> 项，已完成 <span class="highlight">' + completed.length + '</span> 项</p>';

    if (pending.length > 0) {
      html += '<h3 style="font-family:var(--font-pixel);font-size:10px;color:#ddd;margin-bottom:10px;">🔲 待建造 (' + pending.length + ')</h3>';
      pending.forEach(function(item) {
        html += renderTodoItem(item);
      });
    }

    if (completed.length > 0) {
      html += '<h3 style="font-family:var(--font-pixel);font-size:10px;color:#ddd;margin:16px 0 10px;">✅ 已完成 (' + completed.length + ')</h3>';
      completed.forEach(function(item) {
        html += renderTodoItem(item);
      });
    }

    html += '<div style="margin-top:16px;text-align:center;">' +
      '<button class="mc-btn red small" id="btn-clear-completed" style="' + (completed.length === 0 ? 'display:none;' : '') + '">🗑️ 清除已完成项目</button>' +
      '</div>';

    $('#todolist-content').innerHTML = html;

    // 绑定事件
    $$('.todo-check').forEach(function(check) {
      check.addEventListener('click', function() {
        var todoId = this.getAttribute('data-todo-id');
        toggleTodoComplete(todoId);
      });
    });
    $$('.todo-remove').forEach(function(btn) {
      btn.addEventListener('click', async function() {
        var todoId = this.getAttribute('data-todo-id');
        var ok = await confirmDialog('确定要移除这个项目吗？');
        if (ok) removeFromTodolist(todoId);
      });
    });
    $$('.todo-name').forEach(function(name) {
      name.addEventListener('click', function() {
        var tutorialId = this.getAttribute('data-tutorial-id');
        var tutorial = MC_DATA.findById(tutorialId);
        if (tutorial) {
          navigateTo('detail', tutorial);
        }
      });
    });
    var clearBtn = $('#btn-clear-completed');
    if (clearBtn) {
      clearBtn.addEventListener('click', async function() {
        var ok = await confirmDialog('确定要清除所有已完成的项目吗？');
        if (ok && currentUser) {
          var list = getTodolist(currentUser);
          list = list.filter(function(i) { return !i.completed; });
          saveTodolist(currentUser, list);
          renderTodolist();
          showToast('已清除完成项目', '');
        }
      });
    }
  }

  function renderTodoItem(item) {
    var catLabel = item.category === 'machine' ? '机器' : '建筑';
    return '' +
      '<div class="todo-item' + (item.completed ? ' completed' : '') + '">' +
        '<div class="todo-check" data-todo-id="' + item.id + '">' +
          (item.completed ? '✓' : '') +
        '</div>' +
        '<div class="todo-info">' +
          '<div class="todo-name" data-tutorial-id="' + item.tutorialId + '">' + item.icon + ' ' + escapeHtml(item.name) + '</div>' +
          '<div class="todo-meta">' +
            '<span class="mc-badge ' + item.category + '">' + catLabel + '</span>' +
            ' · 添加于 ' + formatDate(item.addedAt) +
          '</div>' +
        '</div>' +
        '<button class="todo-remove" data-todo-id="' + item.id + '" title="移除">✕</button>' +
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
