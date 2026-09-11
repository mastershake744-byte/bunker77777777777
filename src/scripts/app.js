(function () {
  'use strict';

  // ====================================================================
  //   ЕДИНЫЙ СКРИПТ САЙТА — app.js
  //   Содержит: тему, меню, каталог, калькулятор, товары, заказ
  //   Подключается в scripts.php одним <script>
  // ====================================================================

  // ====================== КОНСТАНТЫ ======================
  var THEME_KEY = 'teplodom-theme';

  // ====================== ТЕМА ======================
  function initTheme() {
    var body = document.body;
    var lightBtn = document.getElementById('lightTheme');
    var darkBtn = document.getElementById('darkTheme');
    var toggleBtn = document.getElementById('themeToggle');
    var mainBody = document.getElementById('mainBody') || body;
    var heroGif = document.getElementById('heroGif');

    function applyTheme(theme, save) {
      body.classList.remove('light-mode', 'dark-mode');
      if (mainBody && mainBody !== body) {
        mainBody.classList.remove('light-mode', 'dark-mode');
      }
      body.classList.add(theme === 'light' ? 'light-mode' : 'dark-mode');
      if (mainBody && mainBody !== body) {
        mainBody.classList.add(theme === 'light' ? 'light-mode' : 'dark-mode');
      }

      if (save !== false) {
        localStorage.setItem(THEME_KEY, theme);
      }

      // Кнопки светлая/тёмная в хедере
      if (lightBtn) lightBtn.classList.toggle('is-active', theme === 'light');
      if (darkBtn) darkBtn.classList.toggle('is-active', theme === 'dark');

      // Плавающая кнопка (catalog-page.js)
      if (toggleBtn) {
        toggleBtn.textContent = theme === 'light' ? '\u{1F31E} Светлая' : '\u{1F313} Тёмная';
      }

      // GIF для страницы котла
      if (heroGif) {
        if (theme === 'light') {
          heroGif.src = '/gif/white.gif';
        } else {
          heroGif.src = '/gif/green.gif';
        }
      }
    }

    var saved = localStorage.getItem(THEME_KEY) || 'light';
    applyTheme(saved, false);

    if (lightBtn) {
      lightBtn.addEventListener('click', function () { applyTheme('light'); });
    }
    if (darkBtn) {
      darkBtn.addEventListener('click', function () { applyTheme('dark'); });
    }
    if (toggleBtn) {
      toggleBtn.addEventListener('click', function () {
        var isLight = body.classList.contains('light-mode');
        applyTheme(isLight ? 'dark' : 'light');
      });
    }
  }

  // ====================== МОБИЛЬНОЕ МЕНЮ ======================
  function initMobileMenu() {
    var mobileBtn = document.getElementById('mobileMenuButton');
    var mobileBtnAlt = document.getElementById('mobileMenuToggle');
    var nav = document.getElementById('headerNav');
    var catalogToggle = document.getElementById('catalogToggle');
    var headerCatalog = document.getElementById('headerCatalog');

    var btn = mobileBtn || mobileBtnAlt;
    if (!btn || !nav) return;

    btn.addEventListener('click', function (e) {
      if (e.stopPropagation) e.stopPropagation();
      var opened = nav.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', opened ? 'true' : 'false');
    });

    // Закрыть меню при клике вне
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.site-header')) {
        nav.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
        if (headerCatalog) {
          headerCatalog.classList.remove('is-open');
          if (catalogToggle) catalogToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });

    // Закрыть по ссылке
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (link === catalogToggle) return;
        nav.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
        if (headerCatalog) {
          headerCatalog.classList.remove('is-open');
          if (catalogToggle) catalogToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Dropdown каталога
    if (catalogToggle && headerCatalog) {
      catalogToggle.addEventListener('click', function (event) {
        event.preventDefault();
        var opened = headerCatalog.classList.toggle('is-open');
        catalogToggle.setAttribute('aria-expanded', opened ? 'true' : 'false');
      });
    }
  }

  // ====================== КАТАЛОГ — ПРОСТОЙ (catalog.js) ======================
  function initSimpleCatalog() {
    // Функция-заглушка: каталог теперь статический
  }

  // ====================== КАТАЛОГ — РАСШИРЕННЫЙ (catalog-page.js) ======================
  function initFullCatalog() {
    var container = document.getElementById('productsContainer');
    var countEl = document.getElementById('count');
    var applyBtn = document.getElementById('applyFilter');
    var sortEl = document.getElementById('sortType');
    var resetBtn = document.getElementById('resetFilter');
    if (!container) return;

    var products = [
      { name: 'Vulkan Eko 15', power: 15, area: 140, eff: 90, price: 45900, fuel: 'Дрова, уголь', stock: true, tag: 'ЛУЧШИЙ ВЫБОР', volume: 500 },
      { name: 'Zota Bulat 20', power: 20, area: 200, eff: 88, price: 52900, fuel: 'Дрова, уголь', stock: true, tag: 'ХИТ ПРОДАЖ', volume: 500 },
      { name: 'Теплодар Куппер ПРО 22', power: 22, area: 220, eff: 87, price: 61900, fuel: 'Дрова, уголь', stock: true, volume: 500 },
      { name: 'Kentatsu ELEGANT-03 25', power: 25, area: 250, eff: 86, price: 69900, fuel: 'Уголь', stock: true, volume: 500 },
      { name: 'Stropuva Mini S8', power: 8, area: 80, eff: 82, price: 39900, fuel: 'Дрова', stock: true, tag: 'НОВИНКА', volume: 400 },
      { name: 'Теплодар Куппер Практик 16', power: 16, area: 160, eff: 86, price: 48900, fuel: 'Дрова, уголь', stock: true, volume: 500 },
      { name: 'ZOTA Тополь-М 20', power: 20, area: 180, eff: 87, price: 51900, fuel: 'Уголь', stock: true, volume: 500 },
      { name: 'Kentatsu MAXI 30', power: 30, area: 300, eff: 84, price: 78900, fuel: 'Уголь', stock: true, volume: 600 },
      { name: 'Vulkan Eko 25', power: 25, area: 250, eff: 91, price: 71900, fuel: 'Дрова, уголь', stock: true, volume: 500 },
      { name: 'Теплодар Куппер ПРО 28', power: 28, area: 280, eff: 88, price: 75900, fuel: 'Дрова', stock: false, volume: 600 },
      { name: 'Zota Bulat 15', power: 15, area: 150, eff: 89, price: 46900, fuel: 'Дрова, уголь', stock: true, volume: 500 },
      { name: 'Stropuva S10', power: 10, area: 100, eff: 85, price: 42900, fuel: 'Дрова', stock: true, volume: 400 },
      { name: 'Kentatsu ELEGANT-03 20', power: 20, area: 200, eff: 86, price: 59900, fuel: 'Уголь', stock: true, volume: 500 },
      { name: 'Vulkan Eko 30', power: 30, area: 300, eff: 90, price: 79900, fuel: 'Дрова, уголь', stock: false, volume: 600 },
      { name: 'Теплодар Куппер Эксперт 18', power: 18, area: 180, eff: 88, price: 54900, fuel: 'Дрова, уголь', stock: true, volume: 500 },
      { name: 'Zota Тополь-М 25', power: 25, area: 250, eff: 87, price: 64900, fuel: 'Уголь', stock: true, volume: 500 }
    ];

    function updateVolumeTrack() {
      var minVol = document.getElementById('minVolume');
      var maxVol = document.getElementById('maxVolume');
      var range = document.querySelector('.dual-range');
      if (!minVol || !maxVol || !range) return;
      var minP = ((Number(minVol.value) - 300) / 1700) * 100;
      var maxP = ((Number(maxVol.value) - 300) / 1700) * 100;
      range.style.setProperty('--range-start', minP + '%');
      range.style.setProperty('--range-end', maxP + '%');
    }

    function renderCard(p) {
      return '<article class="product"><div class="product-top' +
        (p.tag ? '"><span class="tag ' + (p.tag.includes('ХИТ') || p.tag.includes('НОВ') ? 'orange' : '') + '">' + p.tag + '</span>' : '') +
        '<div class="real-product-image"><img src="https://xn--90ahqccr2a8a0eya.xn--p1ai/public/images/product/vulkan/f.png" alt="Твердотопливный котёл"></div></div>' +
        '<div class="product-body"><h3 class="product-title">' + p.name + '</h3>' +
        '<div class="product-meta">' + p.power + ' кВт • до ' + p.area + ' м² • бункер ' + p.volume + ' л • ' + p.fuel + '</div>' +
        '<div class="match"><span>Соответствие параметрам</span><b>' + p.eff + '%</b></div>' +
        '<div class="progress-line"><span style="width:' + p.eff + '%"></span></div>' +
        '<div class="specs"><div class="spec"><strong>' + p.power + '</strong><small>кВт</small></div>' +
        '<div class="spec"><strong>' + p.area + '</strong><small>м²</small></div>' +
        '<div class="spec"><strong>' + p.eff + '%</strong><small>КПД</small></div></div>' +
        '<div class="price">' + p.price.toLocaleString('ru-RU') + ' ₽</div>' +
        '<div class="stock">' + (p.stock ? '● В наличии' : '● Под заказ') + '</div>' +
        '<div class="product-actions"><button class="details" onclick="location=\'/product.php\'">Подробнее →</button><button class="buy" onclick="alert(\'Товар добавлен в заявку\')">В заявку</button></div></div></article>';
    }

    function render() {
      var minP = Number(document.getElementById('minPower').value) || 10;
      var maxP = Number(document.getElementById('maxPower').value) || 100;
      var minA = Number(document.getElementById('minArea').value) || 50;
      var maxA = Number(document.getElementById('maxArea').value) || 1000;
      var fuel = document.getElementById('fuelType').value;
      var minV = Number(document.getElementById('minVolume').value);
      var maxV = Number(document.getElementById('maxVolume').value);

      var filtered = products.filter(function (p) {
        return p.power >= minP && p.power <= maxP &&
          p.area >= minA && p.area <= maxA &&
          p.volume >= minV && p.volume <= maxV &&
          (fuel === 'all' || p.fuel.indexOf(fuel) !== -1);
      });

      var sort = sortEl ? sortEl.value : '';
      if (sort === 'priceAsc') filtered.sort(function (a, b) { return a.price - b.price; });
      if (sort === 'priceDesc') filtered.sort(function (a, b) { return b.price - a.price; });
      if (sort === 'power') filtered.sort(function (a, b) { return a.power - b.power; });

      if (countEl) countEl.textContent = filtered.length + ' моделей';
      container.innerHTML = filtered.length
        ? filtered.map(renderCard).join('')
        : '<div style="grid-column:1/-1;padding:45px;text-align:center;background:var(--surface);border:1px solid var(--border);border-radius:16px;">По заданным параметрам ничего не найдено. Попробуйте изменить фильтр.</div>';

      var pv = document.getElementById('powerValue');
      var av = document.getElementById('areaValue');
      var vv = document.getElementById('volumeValue');
      if (pv) pv.textContent = minP + '–' + maxP;
      if (av) av.textContent = minA + '–' + maxA;
      if (vv) vv.textContent = minV + '–' + maxV;
      updateVolumeTrack();
    }

    if (applyBtn) applyBtn.addEventListener('click', render);
    if (sortEl) sortEl.addEventListener('change', render);

    ['fuelType', 'minVolume', 'maxVolume'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener('input', render);
    });

    var minVol = document.getElementById('minVolume');
    var maxVol = document.getElementById('maxVolume');
    if (minVol) {
      minVol.addEventListener('input', function () {
        if (+minVol.value > +maxVol.value) maxVol.value = minVol.value;
        render();
      });
    }
    if (maxVol) {
      maxVol.addEventListener('input', function () {
        if (+maxVol.value < +minVol.value) minVol.value = maxVol.value;
        render();
      });
    }

    // Кнопки-спиннеры
    document.querySelectorAll('.spinner button').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var targetId = this.dataset.target;
        var input = document.getElementById(targetId);
        if (!input) return;
        var step = parseInt(input.getAttribute('step')) || 1;
        var min = parseInt(input.getAttribute('min'));
        var max = parseInt(input.getAttribute('max'));
        var val = parseInt(input.value) || 0;
        if (this.dataset.dir === '1') {
          val = Math.min(val + step, max);
        } else {
          val = Math.max(val - step, min);
        }
        input.value = val;
        render();
      });
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        var el = document.getElementById('minPower');
        if (el) el.value = 10;
        el = document.getElementById('maxPower');
        if (el) el.value = 20;
        el = document.getElementById('minArea');
        if (el) el.value = 100;
        el = document.getElementById('maxArea');
        if (el) el.value = 200;
        el = document.getElementById('fuelType');
        if (el) el.value = 'all';
        el = document.getElementById('minVolume');
        if (el) el.value = 300;
        el = document.getElementById('maxVolume');
        if (el) el.value = 2000;
        render();
      });
    }

    render();
  }

  // ====================== КАЛЬКУЛЯТОР ПЕЛЛЕТ (calc.js) ======================
  function initCalculator() {
    var tabs = document.querySelectorAll('.calc-tab');
    var mode = document.getElementById('calcMode');
    if (!tabs.length && !mode) return;

    var LHV = 5.0;
    var BOILER_EFF = 0.86;
    var U_HEAT = 0.055;
    var INSULATION = { bad: 45, normal: 30, good: 20 };

    var els = {
      tabs: tabs,
      mode: mode,
      area: document.getElementById('calcArea'),
      height: document.getElementById('calcHeight'),
      insulation: document.getElementById('calcInsulation'),
      months: document.getElementById('calcMonths'),
      price: document.getElementById('calcPrice'),
      tons: document.getElementById('calcTons'),
      tonsPrice: document.getElementById('calcTonsPrice'),
      massResult: document.getElementById('calcMass'),
      priceResult: document.getElementById('calcPriceResult'),
      bagsResult: document.getElementById('calcBags'),
      powerResult: document.getElementById('calcPower'),
      energyResult: document.getElementById('calcEnergy')
    };

    var houseBlock = document.getElementById('calcHouse');
    var tonnageBlock = document.getElementById('calcTonnage');

    function currentMode() {
      return els.mode ? els.mode.value : 'house';
    }

    function calcPower(area, height, insulationKey) {
      return (area * (height || 2.7) * INSULATION[insulationKey]) / 1000;
    }

    function calcMass(power, months) {
      return (power * months * 30 * 24 * U_HEAT) / (LHV * BOILER_EFF);
    }

    function fmt(num) {
      return Math.round(num).toLocaleString('ru-RU');
    }

    function renderHouse() {
      if (!els.area || !els.massResult) return;
      var area = parseFloat(els.area.value) || 0;
      var height = parseFloat(els.height.value) || 2.7;
      var insKey = els.insulation ? els.insulation.value : 'normal';
      var months = parseFloat(els.months.value) || 7;
      var pricePerTon = parseFloat(els.price.value) || 0;
      var power = calcPower(area, height, insKey);
      var mass = calcMass(power, months);
      if (els.powerResult) els.powerResult.textContent = power.toFixed(1) + ' кВт';
      if (els.energyResult) els.energyResult.textContent = fmt(power * months * 30 * 24 * U_HEAT) + ' кВт·ч';
      if (els.massResult) els.massResult.textContent = fmt(mass) + ' кг';
      if (els.bagsResult) els.bagsResult.textContent = fmt(mass / 15) + ' шт';
      if (els.priceResult) els.priceResult.innerHTML = pricePerTon > 0 ? fmt(mass * pricePerTon / 1000) + ' <small>₽ за сезон</small>' : '—';
    }

    function renderTonnage() {
      if (!els.tons || !els.massResult) return;
      var tons = parseFloat(els.tons.value) || 0;
      var pricePerTon = parseFloat(els.tonsPrice.value) || 0;
      var mass = tons * 1000;
      if (els.powerResult) els.powerResult.textContent = '—';
      if (els.energyResult) els.energyResult.textContent = fmt(mass * LHV * BOILER_EFF) + ' кВт·ч';
      if (els.massResult) els.massResult.textContent = fmt(mass) + ' кг';
      if (els.bagsResult) els.bagsResult.textContent = fmt(mass / 15) + ' шт';
      if (els.priceResult) els.priceResult.innerHTML = pricePerTon > 0 ? fmt(tons * pricePerTon) + ' <small>₽</small>' : '—';
    }

    function render() {
      if (currentMode() === 'tonnage') {
        renderTonnage();
      } else {
        renderHouse();
      }
    }

    function setMode(m) {
      if (els.mode) els.mode.value = m;
      els.tabs.forEach(function (t) {
        var active = t.dataset.mode === m;
        t.classList.toggle('active', active);
        t.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      if (houseBlock) houseBlock.style.display = m === 'house' ? '' : 'none';
      if (tonnageBlock) tonnageBlock.style.display = m === 'tonnage' ? '' : 'none';
      render();
    }

    els.tabs.forEach(function (tab) {
      tab.addEventListener('click', function () { setMode(tab.dataset.mode); });
    });

    var submitHouse = document.getElementById('calcSubmitHouse');
    var submitTonnage = document.getElementById('calcSubmitTonnage');
    if (submitHouse) submitHouse.addEventListener('click', render);
    if (submitTonnage) submitTonnage.addEventListener('click', render);

    function bindRange(id, outId, suffix) {
      var input = document.getElementById(id);
      var out = document.getElementById(outId);
      if (!input || !out) return;
      input.addEventListener('input', function () {
        out.textContent = input.value + (suffix || '');
        render();
      });
      out.textContent = input.value + (suffix || '');
    }

    bindRange('calcArea', 'calcAreaVal', ' м²');
    bindRange('calcMonths', 'calcMonthsVal', ' мес.');
    bindRange('calcPrice', 'calcPriceVal', ' ₽/т');

    if (els.height) els.height.addEventListener('change', render);
    if (els.insulation) els.insulation.addEventListener('change', render);
    if (els.tons) els.tons.addEventListener('input', render);
    if (els.tonsPrice) els.tonsPrice.addEventListener('input', render);

    render();
  }

  // ====================== ФИЛЬТР ТАБЛИЦЫ КОТЛА (boiler-scripts.js) ======================
  function initBoilerTable() {
    var toggle = document.getElementById('toggleSwitch');
    if (!toggle) return;
    var options = toggle.querySelectorAll('.toggle-option');
    var rows = document.querySelectorAll('#partsTable tbody tr');
    if (!rows.length) return;
    var mainIds = new Set(['1', '2', '3', '7', '9']);
    var currentVal = 'all';

    function filterTable(mode) {
      rows.forEach(function (row) {
        var id = row.getAttribute('data-id');
        if (mode === 'all') {
          row.style.display = '';
        } else if (mode === 'short') {
          row.style.display = mainIds.has(id) ? '' : 'none';
        }
      });
    }

    toggle.addEventListener('click', function (e) {
      var target = e.target.closest('.toggle-option');
      if (!target) return;
      var value = target.dataset.value;
      if (value === currentVal) return;
      options.forEach(function (opt) { opt.classList.toggle('active', opt.dataset.value === value); });
      toggle.classList.toggle('shifted', value === 'short');
      currentVal = value;
      filterTable(value);
    });

    // По умолчанию показываем основные элементы (1, 2, 3, 7, 9)
    options.forEach(function (opt) { opt.classList.toggle('active', opt.dataset.value === 'short'); });
    toggle.classList.add('shifted');
    currentVal = 'short';
    filterTable('short');
  }

  // ====================== ПРОДУКТ — ВКЛАДКИ И ЗУМ ======================
  window.openProductTab = function (event, tabId) {
    document.querySelectorAll('.product-tab-btn').forEach(function (b) {
      var active = b === event.currentTarget;
      b.classList.toggle('active', active);
      b.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    document.querySelectorAll('.product-tab-content').forEach(function (c) {
      c.classList.toggle('active', c.id === tabId);
    });
  };

  window.openProductZoom = function () {
    var img = document.getElementById('productMainImage');
    var zoom = document.getElementById('zoomImage');
    var modal = document.getElementById('productZoom');
    if (img && zoom && modal) {
      zoom.src = img.src;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeProductZoom = function () {
    var modal = document.getElementById('productZoom');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  // ====================== МОДАЛКА ЗАКАЗА ======================
  window.openOrderModal = function () {
    var modal = document.getElementById('orderModal');
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    var form = document.getElementById('orderForm');
    var success = document.getElementById('orderSuccess');
    var error = document.getElementById('phoneError');
    if (form) form.classList.remove('hidden');
    if (success) success.classList.remove('visible');
    if (error) error.classList.remove('visible');
    var phone = document.getElementById('orderPhone');
    if (phone) phone.classList.remove('error');
    var frm = document.getElementById('orderForm');
    if (frm) frm.reset();
    var started = document.getElementById('orderFormStarted');
    if (started) started.value = Math.floor(Date.now() / 1000);
  };

  window.closeOrderModal = function () {
    var modal = document.getElementById('orderModal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  window.submitOrder = function (e) {
    e.preventDefault();
    var form = document.getElementById('orderForm');
    var success = document.getElementById('orderSuccess');
    if (!form || !success) return;

    var hp = document.getElementById('orderWebsite');
    if (hp && hp.value.trim() !== '') return;

    var startedEl = document.getElementById('orderFormStarted');
    var started = startedEl ? parseInt(startedEl.value, 10) : 0;
    if (started > 0 && (Math.floor(Date.now() / 1000) - started) < 3) return;

    var phoneInput = document.getElementById('orderPhone');
    var nameInput = document.getElementById('orderName');
    var errorEl = document.getElementById('phoneError');
    if (!phoneInput || !errorEl) return;

    var phone = phoneInput.value.trim();
    var name = nameInput ? nameInput.value.trim() : '';
    var digits = phone.replace(/\D/g, '');

    if (digits.length === 0 || !/^[78]/.test(digits)) {
      errorEl.textContent = 'Номер должен начинаться с 7 или 8';
      errorEl.classList.add('visible');
      phoneInput.classList.add('error');
      phoneInput.focus();
      return;
    }

    var normalized = digits;
    if (normalized.startsWith('8')) normalized = '7' + normalized.slice(1);
    if (normalized.length < 10) {
      errorEl.textContent = 'Введите номер полностью (10–11 цифр)';
      errorEl.classList.add('visible');
      phoneInput.classList.add('error');
      phoneInput.focus();
      return;
    }

    errorEl.classList.remove('visible');
    phoneInput.classList.remove('error');

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/order.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
      form.classList.add('hidden');
      success.classList.add('visible');
    };
    xhr.send('name=' + encodeURIComponent(name) + '&phone=' + encodeURIComponent('+' + normalized) + '&product=VULKAN Eko Max 133 кВт');
  };

  // ====================== DOMContentLoaded — ИНИЦИАЛИЗАЦИЯ ======================
  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    initMobileMenu();
    initSimpleCatalog();
    initFullCatalog();
    initCalculator();
    initBoilerTable();

    // Закрытие модалок по клику на фон
    var zoomEl = document.getElementById('productZoom');
    if (zoomEl) {
      zoomEl.addEventListener('click', function (e) {
        if (e.target === e.currentTarget) closeProductZoom();
      });
    }
    var orderModal = document.getElementById('orderModal');
    if (orderModal) {
      orderModal.addEventListener('click', function (e) {
        if (e.target === this) closeOrderModal();
      });
    }

    // Кнопки "Заказать" с #order
    document.querySelectorAll('.product-btn-primary[href="#order"], a[href="#order"]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        openOrderModal();
      });
    });
  });

  // Закрытие модалок по Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeProductZoom();
      closeOrderModal();
    }
  });
})();