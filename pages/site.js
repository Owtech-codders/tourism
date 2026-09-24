document.addEventListener('DOMContentLoaded', () => {
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
