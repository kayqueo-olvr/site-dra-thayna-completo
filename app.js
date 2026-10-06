const config = window.SITE_CONFIG;
const treatments = [
  [
    'Clareamento Dental',
    'Um protocolo pensado para conquistar um sorriso mais claro preservando a saúde e a estrutura dos seus dentes.',
    'Conhecer o clareamento',
    'clareamento-dental',
  ],
  [
    'Facetas em Resina',
    'Forma, proporção e harmonia planejadas para transformar o sorriso sem perder naturalidade.',
    'Conhecer as facetas',
    'facetas-em-resina',
  ],
  [
    'Toxina Botulínica',
    'Suavização estratégica das linhas de expressão preservando movimento, leveza e naturalidade.',
    'Saiba mais',
    'toxina-botulinica',
  ],
  [
    'Preenchimento Labial',
    'Contorno, hidratação e proporção respeitando as características naturais dos seus lábios.',
    'Saiba mais',
    'preenchimento-labial',
  ],
  [
    'Bioestimuladores de Colágeno',
    'Estímulo gradual de colágeno para melhorar firmeza, qualidade e sustentação da pele.',
    'Saiba mais',
    'bioestimulador',
  ],
  [
    'Tratamentos para a pele',
    'Protocolos personalizados para estimular regeneração, colágeno e melhorar a qualidade da pele.',
    'Saiba mais',
    'tratamentos-para-pele',
  ],
];
function element(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.textContent = text;
  return el;
}
function showNotice(text) {
  document.querySelector('#notice-text').textContent = text;
  document.querySelector('#notice-dialog').showModal();
}
function WhatsAppCTA() {
  const number = config.WHATSAPP_NUMBER.replace(/\D/g, '');
  if (!/^\d{10,15}$/.test(number)) {
    showNotice(
      'O WhatsApp de agendamento será disponibilizado em breve. O número oficial ainda precisa ser configurado.',
    );
    return;
  }
  window.open(
    'https://wa.me/' +
      number +
      '?text=' +
      encodeURIComponent(
        'Olá, Dra. Thayna! Conheci seu trabalho pelo site e gostaria de saber mais sobre a avaliação.',
      ),
    '_blank',
    'noopener,noreferrer',
  );
}
function TreatmentCard(item, index) {
  const card = element('article', 'treatment-card');
  card.dataset.futureRoute = '/' + item[3];
  card.append(
    element('span', '', String(index + 1).padStart(2, '0') + ' / CUIDADO PERSONALIZADO'),
    element('h3', '', item[0]),
    element('p', '', item[1]),
  );
  const button = element('button', 'text-link', item[2] + ' ↗');
  button.onclick = () => {
    document.querySelector('#dialog-title').textContent = item[0];
    document.querySelector('#dialog-text').textContent =
      item[1] +
      ' A indicação e as possibilidades de tratamento são definidas após avaliação individualizada.';
    document.querySelector('#detail-dialog').showModal();
  };
  card.append(button);
  return card;
}
treatments.forEach((item, i) =>
  document.querySelector('#treatment-grid').append(TreatmentCard(item, i)),
);
function FAQ(question, answer) {
  const detail = element('details');
  detail.append(element('summary', '', question), element('p', '', answer));
  return detail;
}
const faqs = [
  [
    'Como funciona a primeira consulta?',
    'A primeira consulta é dedicada à avaliação, diagnóstico e planejamento individualizado do seu caso.',
  ],
  [
    'Já posso realizar um procedimento no primeiro atendimento?',
    'Isso dependerá da avaliação e do procedimento indicado. A prioridade é garantir que exista uma indicação segura e adequada para você.',
  ],
  [
    'Os tratamentos são personalizados?',
    'Sim. Cada planejamento considera características faciais, dentais, expectativas e necessidades individuais.',
  ],
  [
    'Onde fica o consultório?',
    'O consultório está localizado em Santana, São Paulo, na Rua Alfredo Pujol, 545 — Sala 53.',
  ],
  [
    'Como faço para agendar?',
    'O agendamento pode ser realizado diretamente pelo WhatsApp através dos botões disponíveis no site, assim que o número oficial estiver disponível.',
  ],
];
faqs.forEach((item) => document.querySelector('#faq').append(FAQ(...item)));
function BeforeAfter(key, index) {
  const card = element('article'),
    pair = config.photos[key];
  if (pair.image) {
    const box = element('a', 'clinical-photo');
    box.href = pair.image;
    box.target = '_blank';
    box.rel = 'noopener noreferrer';
    box.setAttribute('aria-label', 'Abrir fotografia completa: ' + pair.caption);
    const image = element('img');
    image.src = pair.image;
    image.alt = pair.alt;
    image.loading = 'lazy';
    image.decoding = 'async';
    box.append(image);
    card.append(box);
  } else if (pair.before && pair.after) {
    const box = element('div', 'before-after');
    const after = element('img');
    after.src = pair.after;
    after.alt = 'Depois do tratamento — caso ' + index;
    after.loading = 'lazy';
    const before = element('img', 'before-image');
    before.src = pair.before;
    before.alt = 'Antes do tratamento — caso ' + index;
    before.loading = 'lazy';
    const range = element('input');
    range.type = 'range';
    range.min = 0;
    range.max = 100;
    range.value = 50;
    range.setAttribute('aria-label', 'Comparar antes e depois do caso ' + index);
    range.oninput = () => (before.style.clipPath = 'inset(0 ' + (100 - range.value) + '% 0 0)');
    const labels = element('div', 'compare-labels');
    labels.append(element('span', '', 'Antes'), element('span', '', 'Depois'));
    box.append(after, before, labels, range);
    card.append(box);
  } else {
    const box = element('div', 'result-placeholder');
    box.append(
      element('span', '', 'Cada história é única.'),
      element('small', '', 'REGISTROS REAIS · EM BREVE'),
    );
    card.append(box);
  }
  card.append(
    element('p', 'result-label', pair.caption || 'Caso ' + index + ' · registros em breve'),
  );
  return card;
}
for (let i = 1; i <= 3; i++)
  document.querySelector('#results-grid').append(BeforeAfter('BEFORE_AFTER_0' + i, i));
function ImageGallery() {
  const captions = [
    'Desde a chegada, você é recebida com calma.',
    'Um café. Uma pausa. Um momento seu.',
    'Tudo pensado nos mínimos detalhes para te atender.',
    'Aqui, você não espera apenas uma consulta. Você começa uma experiência.',
  ];
  captions.forEach((caption, i) => {
    const box = element('div', 'office-photo photo');
    box.dataset.photo = 'PHOTO_CONSULTORIO_0' + (i + 1);
    box.dataset.alt = caption;
    box.append(
      element('h3', '', caption),
      element('span', 'photo-label', box.dataset.photo + ' · FOTOGRAFIA REAL'),
    );
    document.querySelector('#office-gallery').append(box);
  });
}
ImageGallery();
document.querySelectorAll('[data-photo]').forEach((box) => {
  const src = config.photos[box.dataset.photo];
  if (typeof src === 'string' && src) {
    const image = element('img');
    image.src = src;
    image.alt = box.dataset.alt;
    image.loading = box.dataset.photo === 'PHOTO_HERO' ? 'eager' : 'lazy';
    image.decoding = 'async';
    if (image.loading === 'eager') image.fetchPriority = 'high';
    box.prepend(image);
    box.classList.add('has-image');
  }
});
function Testimonial(review) {
  const quote = element('blockquote', 'testimonial');
  const stars = element('span', 'review-stars', '★★★★★');
  stars.setAttribute('aria-label', '5 de 5 estrelas');
  const source = element('a', 'review-source', 'Avaliação no Google ↗');
  source.href = config.GOOGLE_REVIEWS_URL;
  source.target = '_blank';
  source.rel = 'noopener noreferrer';
  quote.append(stars, element('p', '', review.text), element('cite', '', review.name), source);
  return quote;
}
if (config.testimonials.length) {
  const container = document.querySelector('#testimonials');
  container.replaceChildren(...config.testimonials.map(Testimonial));
}
document
  .querySelectorAll('[data-wa]')
  .forEach((button) => button.addEventListener('click', WhatsAppCTA));
document.querySelectorAll('dialog').forEach((dialog) => {
  dialog.querySelector('.dialog-close').onclick = () => dialog.close();
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) {
      const rect = dialog.getBoundingClientRect();
      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      )
        dialog.close();
    }
  });
});
document.querySelector('.dialog-dismiss').onclick = () =>
  document.querySelector('#notice-dialog').close();
document
  .querySelectorAll('#detail-dialog [data-wa]')
  .forEach((button) =>
    button.addEventListener('click', () => document.querySelector('#detail-dialog').close()),
  );
const menu = document.querySelector('.menu-toggle'),
  nav = document.querySelector('#nav');
function closeMenu() {
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Abrir menu');
}
menu.onclick = () => {
  const opened = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(opened));
  menu.setAttribute('aria-label', opened ? 'Fechar menu' : 'Abrir menu');
};
nav.querySelectorAll('a').forEach((a) => (a.onclick = closeMenu));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});
function configuredLink(value, missing) {
  if (/^https:\/\//.test(value)) {
    window.open(value, '_blank', 'noopener,noreferrer');
  } else showNotice(missing);
}
document.querySelector('#instagram-link').onclick = () =>
  configuredLink(
    config.INSTAGRAM_URL,
    'O perfil oficial do Instagram será disponibilizado em breve.',
  );
document.querySelector('#reviews-link').onclick = () =>
  configuredLink(
    config.GOOGLE_REVIEWS_URL,
    'As avaliações reais serão disponibilizadas após a configuração do perfil oficial no Google.',
  );
document.querySelector('#cro').textContent = 'CRO-SP: ' + config.CRO_SP;
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal');
          observer.unobserve(entry.target);
        }
      }),
    { threshold: 0.07 },
  );
  document.querySelectorAll('.section').forEach((section) => observer.observe(section));
}
