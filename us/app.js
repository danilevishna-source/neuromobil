(() => {
  const copy = {
    ru: {
      brand: 'НЕЙРОМОБИЛЬ', tagline: 'ИДЕИ. НЕЙРОСЕТИ. ТВОРЧЕСТВО.', intro: 'Твой маршрут в мир нейро.',
      hero: 'Из идеи — в историю', image: 'Фирменный мятный кабриолет НЕЙРОМОБИЛЬ',
      heading: 'ВЫБЕРИ СВОЙ МАРШРУТ', routes: 'Обучение, контент на заказ и портфолио',
      date: 'СТАРТ 28 СЕНТЯБРЯ', course: 'Интенсив по созданию нейро-контента с телефона',
      courseDescription: '10 дней. Только телефон. Доступ навсегда. Жми чтобы зарегистрироваться', notice: '',
      content: 'Контент на заказ', contentDescription: 'Мультфильмы, реализм, фентези - оживим твою историю в любом жанре',
      portfolio: 'Портфолио', portfolioDescription: 'Истории, которые уже случились',
      contact: 'СВЯЗАТЬСЯ', whatsapp: 'Написать в WhatsApp', telegram: 'Написать в Telegram',
      footer: 'БОЛЬШИЕ ИДЕИ НАЧИНАЮТСЯ С ТЕБЯ', language: 'Выбор языка',
      description: 'НЕЙРОМОБИЛЬ: интенсив по созданию нейро-контента с телефона, контент на заказ и портфолио. Старт интенсива — 28 сентября.'
    },
    en: {
      brand: 'NEUROMOBIL', tagline: 'IDEAS. AI. CREATIVITY.', intro: 'Your route into the world of AI.',
      hero: 'From an idea to a story', image: 'NEUROMOBIL’s signature mint convertible',
      heading: 'LET’S CREATE YOUR STORY', routes: 'Custom content, portfolio and training',
      date: 'STARTS SEPTEMBER 28', course: 'Create AI content on your phone',
      courseDescription: '10 days. Just your phone. Lifetime access. Tap to sign up.',
      notice: 'Intensive course taught in Russian only',
      content: 'Content made for you', contentDescription: 'Animation, realism, fantasy — we bring your story to life in any genre.',
      portfolio: 'Our portfolio', portfolioDescription: 'Explore the stories we’ve brought to life',
      contact: 'GET IN TOUCH', whatsapp: 'Message us on WhatsApp', telegram: 'Message us on Telegram',
      footer: 'GREAT IDEAS START WITH YOU', language: 'Choose language',
      description: 'NEUROMOBIL: custom AI content, animation, realistic and fantasy videos. Explore our portfolio and bring your story to life.'
    },
    es: {
      brand: 'NEUROMOBIL', tagline: 'IDEAS. IA. CREATIVIDAD.', intro: 'Tu ruta al mundo de la IA.',
      hero: 'De una idea a una historia', image: 'El emblemático descapotable verde menta de NEUROMOBIL',
      heading: 'CREEMOS TU HISTORIA', routes: 'Contenido a medida, portafolio y formación',
      date: 'INICIO: 28 DE SEPTIEMBRE', course: 'Crea contenido con IA desde tu móvil',
      courseDescription: '10 días. Solo tu móvil. Acceso de por vida. Pulsa para inscribirte.',
      notice: 'Curso intensivo impartido solo en ruso',
      content: 'Contenido a medida', contentDescription: 'Animación, realismo, fantasía: damos vida a tu historia en cualquier género.',
      portfolio: 'Nuestro portafolio', portfolioDescription: 'Descubre las historias que hemos creado',
      contact: 'CONTACTO', whatsapp: 'Escríbenos por WhatsApp', telegram: 'Escríbenos por Telegram',
      footer: 'LAS GRANDES IDEAS EMPIEZAN CONTIGO', language: 'Elegir idioma',
      description: 'NEUROMOBIL: contenido con IA a medida, animación, vídeos realistas y de fantasía. Descubre nuestro portafolio y da vida a tu historia.'
    }
  };
  const select = (selector) => document.querySelector(selector);
  const setText = (selector, value) => { select(selector).textContent = value; };
  // Keep decorative icons while changing their adjacent text.
  const setLabel = (selector, value) => {
    const element = select(selector);
    element.lastChild.textContent = ` ${value}`;
  };
  const valid = (language) => Object.hasOwn(copy, language);
  function render(language) {
    const text = copy[language];
    document.documentElement.lang = language;
    document.title = `${text.brand} · ${text.intro}`;
    select('meta[name="description"]').content = text.description;
    setText('h1', text.brand);
    setLabel('.brand-line', text.tagline);
    setText('.intro', text.intro);
    setLabel('.hero-label', text.hero);
    select('.hero img').alt = text.image;
    setText('.routes .section-heading span', text.heading);
    select('.routes').setAttribute('aria-label', text.routes);
    setLabel('.tag', text.date);
    setText('#intensive .card-title', text.course);
    setText('#intensive .card-description', text.courseDescription);
    setText('.course-language', text.notice);
    select('.course-language').hidden = language === 'ru';
    setText('#content .card-title', text.content);
    setText('#content .card-description', text.contentDescription);
    setText('#portfolio .card-title', text.portfolio);
    setText('#portfolio .card-description', text.portfolioDescription);
    setText('.contacts .section-heading span', text.contact);
    select('.contacts').setAttribute('aria-label', text.contact);
    setText('.contact[href^="https://wa.me"] .card-title', text.whatsapp);
    setText('.contact[href^="https://t.me"] .card-title', text.telegram);
    setText('footer span:nth-child(2)', text.footer);
    select('.language-switch').setAttribute('aria-label', text.language);
    select('#intensive').classList.toggle('featured', language === 'ru');
    select('#intensive').classList.toggle('course-muted', language !== 'ru');
    select('#content').classList.toggle('content-featured', language !== 'ru');
    select('#portfolio').classList.toggle('portfolio-featured', language !== 'ru');
    const order = language === 'ru' ? ['intensive', 'content', 'portfolio'] : ['content', 'portfolio', 'intensive'];
    order.forEach(id => select('.routes').append(select(`#${id}`)));
    setText('.card-number', language === 'ru' ? '01' : '03');
    document.querySelectorAll('[data-language]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.language === language));
    });
  }
  function currentLanguage() {
    const query = new URL(location.href).searchParams.get('lang');
    if (valid(query)) return query;
    try {
      const saved = localStorage.getItem('neuromobil-us-language');
      if (valid(saved)) return saved;
    } catch { /* The page also works with storage disabled. */ }
    return 'ru';
  }
  document.querySelectorAll('[data-language]').forEach(button => {
    button.addEventListener('click', () => {
      const language = button.dataset.language;
      render(language);
      try { localStorage.setItem('neuromobil-us-language', language); } catch { /* Optional preference. */ }
      const url = new URL(location.href);
      url.searchParams.set('lang', language);
      try { history.replaceState(null, '', url); } catch { /* Local file preview. */ }
    });
  });
  render(currentLanguage());
  select('.language-switch').hidden = false;
  window.addEventListener('popstate', () => render(currentLanguage()));
})();
