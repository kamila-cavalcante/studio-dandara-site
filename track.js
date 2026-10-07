/* Studio Dandara — rastreamento de cliques (GA4 + GTM + Meta Pixel) */
(function () {
  'use strict';

  function send(name, params) {
    // GTM / dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event: name }, params));
    // GA4 direto
    if (typeof window.gtag === 'function') window.gtag('event', name, params);
    // Meta Pixel
    if (typeof window.fbq === 'function') window.fbq('trackCustom', name, params);
  }

  // Clique em qualquer CTA marcado com data-cta
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-cta]');
    if (!el) return;
    var href = el.getAttribute('href') || '';
    var canal = href.indexOf('wa.me') > -1 ? 'whatsapp'
              : href.indexOf('trinks') > -1 ? 'agendamento_online'
              : href.indexOf('instagram') > -1 ? 'instagram'
              : href.indexOf('facebook') > -1 ? 'facebook'
              : href.indexOf('maps') > -1 ? 'rotas' : 'outro';
    send('clique_contato', {
      canal: canal,
      local: el.getAttribute('data-cta'),
      texto: (el.textContent || '').trim().slice(0, 60)
    });
    if (canal === 'whatsapp' && typeof window.fbq === 'function') window.fbq('track', 'Contact');
  }, { capture: true });

  // Profundidade de rolagem (25/50/75/100)
  var marcos = [25, 50, 75, 100], vistos = {};
  window.addEventListener('scroll', function () {
    var h = document.documentElement;
    var pct = Math.round(((h.scrollTop + window.innerHeight) / h.scrollHeight) * 100);
    marcos.forEach(function (m) {
      if (pct >= m && !vistos[m]) { vistos[m] = true; send('rolagem', { porcentagem: m }); }
    });
  }, { passive: true });

  // Seções vistas
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { send('secao_vista', { secao: en.target.id }); io.unobserve(en.target); }
      });
    }, { threshold: 0.5 });
    ['servicos', 'resultados', 'duvidas', 'visita'].forEach(function (id) {
      var s = document.getElementById(id); if (s) io.observe(s);
    });
  }

  // Abertura de pergunta frequente
  document.querySelectorAll('.faq details').forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) send('faq_aberta', { pergunta: d.querySelector('summary').textContent.trim() });
    });
  });

  // Tempo de permanência qualificado (30s)
  setTimeout(function () { send('visita_engajada', { segundos: 30 }); }, 30000);
})();
