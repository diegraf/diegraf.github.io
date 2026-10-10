(function () {
  var imgs = Array.prototype.slice.call(document.querySelectorAll('[data-zoom] img'));
  if (!imgs.length) return;
  var lb = document.createElement('div');
  lb.id = 'lb';
  lb.innerHTML = '<button class="x">&times;</button><button class="p">&lsaquo;</button><img alt=""><button class="n">&rsaquo;</button><small></small>';
  document.body.appendChild(lb);
  var im = lb.querySelector('img'), cnt = lb.querySelector('small'), i = 0;
  function show() { im.src = imgs[i].src; cnt.textContent = (i + 1) + ' / ' + imgs.length; }
  function open(n) { i = n; show(); lb.classList.add('on'); }
  function close() { lb.classList.remove('on'); }
  function go(d) { i = (i + d + imgs.length) % imgs.length; show(); }
  imgs.forEach(function (el, n) { el.parentNode.addEventListener('click', function () { open(n); }); });
  lb.querySelector('.x').onclick = close;
  lb.querySelector('.p').onclick = function (e) { e.stopPropagation(); go(-1); };
  lb.querySelector('.n').onclick = function (e) { e.stopPropagation(); go(1); };
  lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('on')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') go(1);
    if (e.key === 'ArrowLeft') go(-1);
  });
})();

// videoaulas: player grande; as miniaturas trocam o vídeo dele (o YouTube só carrega ao clicar)
(function () {
  var tela = document.querySelector('.vtela');
  if (!tela) return;
  function tocar(id, titulo) {
    var f = document.createElement('iframe');
    f.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
    f.title = titulo;
    f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    f.allowFullscreen = true;
    tela.innerHTML = '';
    tela.appendChild(f);
  }
  var capa = tela.querySelector('.vplay');
  capa.addEventListener('click', function () { tocar(capa.dataset.id, capa.getAttribute('aria-label')); });
  document.querySelectorAll('.vitem').forEach(function (b) {
    b.addEventListener('click', function () {
      document.querySelectorAll('.vitem.on').forEach(function (x) { x.classList.remove('on'); });
      b.classList.add('on');
      document.getElementById('v-rot').textContent = b.dataset.rot;
      document.getElementById('v-tit').textContent = b.dataset.tit;
      document.getElementById('v-desc').textContent = b.dataset.desc;
      tocar(b.dataset.id, b.dataset.tit);
      var r = tela.getBoundingClientRect();
      if (r.top < 70 || r.bottom > innerHeight) tela.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });
})();

// link vindo de outra página (index.html#videoaulas): rola até a seção depois que a página carrega
window.addEventListener('load', function () {
  if (!location.hash) return;
  var alvo = document.querySelector(location.hash);
  if (alvo) setTimeout(function () { alvo.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 150);
});
