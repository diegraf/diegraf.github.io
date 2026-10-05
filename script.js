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
