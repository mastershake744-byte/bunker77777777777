export default function Header() {
  return (
    <>
      {/* БАННЕР */}
      <div className="promo-banner">
        <span>+7 351-220-80-88</span>
        <span>8 982 324-95-25</span>
        <span className="divider"></span>
        <a href="mailto:kotli@teplo-en.ru">kotli@teplo-en.ru</a>
      </div>

      <header className="site-header">
        <div className="header-inner">
          <div className="header-top-row">
            <div className="header-left-section">
              <div className="header-logo-wrapper">
                <a href="#" className="header-logo">
                  <span className="header-logo-icon">
                    <svg viewBox="0 0 120 120" fill="none">
                      <path d="M15 55L60 15L105 55V98C105 102 102 105 98 105H22C18 105 15 102 15 98V55Z" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M22 55V35H35V48" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M35 60H85C95 60 100 67 100 75" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
                      <path d="M45 78H75" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
                      <path d="M60 78V103" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
                      <path d="M52 103V112M60 103V112M68 103V112" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                    </svg>
                  </span>
                  <span>ТеплоЭнергетика</span>
                </a>
              </div>
            </div>

            {/* ПОИСК */}
            <div className="header-search">
              <form className="header__search--form" action="/catalog" method="GET">
                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <input className="header__search--input" placeholder="Поиск товаров" type="text" name="search_query" defaultValue="" />
                  <button className="header-search-btn" aria-label="search button" type="submit">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M15.6952 14.4991L11.7663 10.5588C12.7765 9.4008 13.33 7.94381 13.33 6.42703C13.33 2.88322 10.34 0 6.66499 0C2.98997 0 0 2.88322 0 6.42703C0 9.97085 2.98997 12.8541 6.66499 12.8541C8.04464 12.8541 9.35938 12.4528 10.4834 11.6911L14.4422 15.6613C14.6076 15.827 14.8302 15.9184 15.0687 15.9184C15.2944 15.9184 15.5086 15.8354 15.6711 15.6845C16.0166 15.364 16.0276 14.8325 15.6952 14.4991ZM6.66499 1.67662C9.38141 1.67662 11.5913 3.8076 11.5913 6.42703C11.5913 9.04647 9.38141 11.1775 6.66499 11.1775C3.94857 11.1775 1.73869 9.04647 1.73869 6.42703C1.73869 3.8076 3.94857 1.67662 6.66499 1.67662Z" fill="currentColor" />
                    </svg>
                    <span>Найти</span>
                  </button>
                </div>
              </form>
            </div>

            {/* BUTTON */}
            <div className="header-actions">
              <div className="theme-switcher" aria-label="Выбор темы">
                <button className="theme-choice" id="lightTheme" type="button" aria-label="Светлая тема">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                  </svg>
                  Светлая
                </button>
                <button className="theme-choice" id="darkTheme" type="button" aria-label="Тёмная тема">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5 8.5 8.5 0 1 0 20.5 14.5Z" />
                  </svg>
                  Тёмная
                </button>
              </div>

              <button className="mobile-menu-button" id="mobileMenuButton" type="button" aria-label="Открыть меню" aria-expanded="false">
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>

          {/* MENU */}
          <nav className="header-nav" id="headerNav">
            <div className="header-catalog" id="headerCatalog">
              <a href="/catalog" className="active" id="catalogToggle" aria-haspopup="true" aria-expanded="false">Каталог</a>
              <div className="header-submenu">
                <a href="#">Вулкан</a>
                <a href="#">Ротекс</a>
                <a href="#">Газовый</a>
              </div>
            </div>
            <a href="/kalkulator/">Калькулятор топлива</a>
            <a href="/delivery/">Конфигуратор</a>
            <a href="#">Статьи</a>
            <a href="/rekvizity/">Реквизиты</a>
            <a href="/adress">Адрес</a>
          </nav>
        </div>
      </header>
    </>
  );
}