document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const navigation = header?.querySelector('nav');

  if (header && navigation) {
    const headerBar = navigation.parentElement;
    const menuButton = document.createElement('button');
    menuButton.type = 'button';
    menuButton.className = 'site-menu-toggle';
    menuButton.setAttribute('aria-controls', 'site-navigation');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation menu');
    menuButton.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i><span>Menu</span>';

    navigation.id = 'site-navigation';
    navigation.className = 'site-dropdown';
    headerBar?.classList.add('site-header-bar');
    headerBar?.insertBefore(menuButton, navigation);

    const setMenuState = (isOpen) => {
      navigation.classList.toggle('is-open', isOpen);
      menuButton.classList.toggle('is-open', isOpen);
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', `${isOpen ? 'Close' : 'Open'} navigation menu`);
      menuButton.querySelector('i').className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    };

    menuButton.addEventListener('click', () => setMenuState(!navigation.classList.contains('is-open')));
    navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenuState(false)));
    document.addEventListener('click', (event) => {
      if (!header.contains(event.target)) setMenuState(false);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        setMenuState(false);
        menuButton.focus();
      }
    });

    const menuStyles = document.createElement('style');
    menuStyles.textContent = `
      .site-header-bar { position: relative; }
      .site-menu-toggle { display: inline-flex; align-items: center; gap: .55rem; border: 1px solid rgba(3, 37, 23, .18); border-radius: .25rem; background: #032517; color: #fff; padding: .65rem .85rem; font: 700 .72rem/1 Plus Jakarta Sans, sans-serif; letter-spacing: .08em; text-transform: uppercase; cursor: pointer; transition: background .2s, color .2s, transform .2s; }
      .site-menu-toggle:hover, .site-menu-toggle:focus-visible { background: #845400; outline: 3px solid rgba(132, 84, 0, .22); outline-offset: 2px; }
      .site-menu-toggle i { font-size: 1rem; width: 1rem; text-align: center; }
      .site-dropdown { display: none; position: absolute; top: calc(100% + .75rem); right: 0; z-index: 60; width: min(23rem, calc(100vw - 2rem)); padding: .5rem; background: #fcf9f1; border-top: 4px solid #845400; box-shadow: 0 18px 42px rgba(3, 37, 23, .22); }
      .site-dropdown.is-open { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .2rem; animation: menuReveal .2s ease-out both; }
      .site-dropdown a { display: flex; align-items: center; min-height: 2.75rem; padding: .65rem .75rem; border-left: 3px solid transparent; border-radius: .1rem; color: #424843; font: 600 .78rem/1.25 Plus Jakarta Sans, sans-serif; text-decoration: none; transition: background .2s, border-color .2s, color .2s; }
      .site-dropdown a:hover, .site-dropdown a:focus-visible { border-left-color: #845400; background: #ebe8e0; color: #032517; outline: none; }
      .site-dropdown a[aria-current="page"] { border-left-color: #845400; background: #e5e2da; color: #032517; }
      @keyframes menuReveal { from { opacity: 0; transform: translateY(-.4rem); } to { opacity: 1; transform: translateY(0); } }
      @media (max-width: 639px) { .site-menu-toggle span { display: none; } .site-menu-toggle { padding: .72rem .8rem; } .site-dropdown { right: -.5rem; } .site-dropdown.is-open { grid-template-columns: 1fr; } }
    `;
    document.head.appendChild(menuStyles);
  }

  const planner = document.getElementById('hero-planner-form');
  document.querySelector('[aria-label="Search Expeditions"]')?.addEventListener('click', () => {
    planner?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  const translations = {
    Home: 'Mwanzo', Safaris: 'Safari', Destinations: 'Maeneo',
    'Cultural Tourism': 'Utalii wa Utamaduni', 'Mountain Trekking': 'Matembezi ya Mlima',
    Leisure: 'Mapumziko', 'Plan Your Trip': 'Panga Safari Yako', 'About Us': 'Kuhusu Sisi',
    Contact: 'Wasiliana', 'Plan Your Adventure': 'Panga Safari'
  };
  const languageButtons = [...document.querySelectorAll('header button')]
    .filter(button => ['EN', 'SW'].includes(button.textContent.trim()));
  const setLanguage = (language) => {
    document.documentElement.lang = language === 'sw' ? 'sw' : 'en';
    document.querySelectorAll('header a').forEach(link => {
      const original = link.dataset.english || link.textContent.trim();
      link.dataset.english = original;
      if (language === 'sw' && translations[original]) link.textContent = translations[original];
      else link.textContent = original;
    });
    languageButtons.forEach(button => {
      const active = button.textContent.trim().toLowerCase() === language;
      button.classList.toggle('bg-surface', active);
      button.classList.toggle('font-bold', active);
      button.classList.toggle('text-primary', active);
    });
    localStorage.setItem('run-africa-language', language);
  };
  languageButtons.forEach(button => button.addEventListener('click', () => setLanguage(button.textContent.trim().toLowerCase())));
  if (languageButtons.length) setLanguage(localStorage.getItem('run-africa-language') || 'en');
});
