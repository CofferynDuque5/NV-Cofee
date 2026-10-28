// Interacciones visuales mínimas (sin backend).
(function () {
  // Filtros del menú
  document.querySelectorAll('.chip[data-filter]').forEach(function (chip) {
    chip.addEventListener('click', function () {
      var f = chip.dataset.filter;
      document.querySelectorAll('.chip[data-filter]').forEach(function (c) {
        c.setAttribute('aria-pressed', c === chip ? 'true' : 'false');
      });
      document.querySelectorAll('.menu-cat').forEach(function (cat) {
        cat.hidden = f !== 'todo' && cat.dataset.cat !== f;
      });
    });
  });

  // Formularios de maqueta: muestran una confirmación de ejemplo
  [['form-reserva', 'aviso-reserva'], ['form-contacto', 'aviso-contacto']].forEach(function (p) {
    var form = document.getElementById(p[0]);
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var aviso = document.getElementById(p[1]);
      aviso.hidden = false;
      aviso.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    });
  });

  // Vista previa de una sola página: navega entre secciones con #inicio, #menu, etc.
  var pages = document.querySelectorAll('[data-page]');
  if (pages.length > 1) {
    var show = function () {
      var id = (location.hash || '#inicio').slice(1);
      if (!document.querySelector('[data-page="' + id + '"]')) id = 'inicio';
      pages.forEach(function (pg) { pg.hidden = pg.dataset.page !== id; });
      document.querySelectorAll('[data-nav]').forEach(function (a) {
        if (a.dataset.nav === id) a.setAttribute('aria-current', 'page');
        else a.removeAttribute('aria-current');
      });
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', show);
    show();
  }
})();
