/* NEXORA講座：スマホとパソコンの進み具合をそろえる
   LINEでログインしていれば、開いたときに読み込み、チェックのたびに保存する。 */
(function () {
  if (window.nxSync) return;
  var API = 'https://script.google.com/macros/s/AKfycbxOW333dnjNRBwgaA5tfYlCBuHk7FGs2BbI1lt6JHLcbVtYh0x12CzqupkbvTxewyhb/exec';
  var RE = /^nx_(s[1-8](win|mac)|a[1-9]|rules)$/;
  var busy = false, again = false, tm = null;

  function local() {
    var o = {};
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (!RE.test(k)) continue;
        var a = JSON.parse(localStorage.getItem(k) || '[]');
        if (Array.isArray(a)) o[k] = a.map(function (x) { return x ? 1 : 0; });
      }
    } catch (e) {}
    return o;
  }
  /* サーバーの記録を手元に入れる。変わったら true */
  function apply(d) {
    var ch = false;
    Object.keys(d || {}).forEach(function (k) {
      if (!RE.test(k)) return;
      var cur = [];
      try { cur = JSON.parse(localStorage.getItem(k) || '[]'); } catch (e) {}
      var s = d[k], n = Math.max(cur.length, s.length), r = [];
      for (var i = 0; i < n; i++) r.push(cur[i] || s[i] ? 1 : 0);
      var was = JSON.stringify(cur.map(function (x) { return x ? 1 : 0; }));
      if (JSON.stringify(r) !== was) { try { localStorage.setItem(k, JSON.stringify(r)); ch = true; } catch (e) {} }
    });
    return ch;
  }
  function token() {
    try { if (window.liff && liff.isLoggedIn && liff.isLoggedIn()) return liff.getAccessToken(); } catch (e) {}
    return null;
  }
  function post() {
    var t = token();
    if (!t || API.indexOf('__') === 0) return Promise.resolve(null);
    return fetch(API, { method: 'POST', body: JSON.stringify({ token: t, data: local() }) })
      .then(function (r) { return r.json(); })
      .then(function (j) { return j && j.ok ? j.data : null; })
      .catch(function () { return null; });
  }
  function reloadOnce() {
    try {
      var last = +sessionStorage.getItem('nx_sync_rl') || 0;
      if (Date.now() - last < 15000) return;
      sessionStorage.setItem('nx_sync_rl', String(Date.now()));
    } catch (e) { return; }
    location.reload();
  }
  function push() {
    if (busy) { again = true; return; }
    busy = true;
    post().then(function (d) {
      busy = false;
      if (d) apply(d);
      if (again) { again = false; push(); }
    });
  }
  function bar() {
    try { if (+localStorage.getItem('nx_lb_off') > Date.now()) return; } catch (e) {}
    var b = document.createElement('div');
    b.style.cssText = 'position:fixed;left:10px;right:10px;top:10px;z-index:10001;background:#06c755;color:#fff;border-radius:14px;padding:11px 12px;display:flex;gap:10px;align-items:center;font-size:13.5px;font-weight:700;box-shadow:0 4px 18px rgba(0,0,0,.45);font-family:inherit';
    b.innerHTML = '<span style="flex:1;line-height:1.5">📱 LINEでログインすると、スマホと進み具合がそろいます</span>' +
      '<button style="background:#fff;color:#06c755;border:0;border-radius:10px;padding:9px 12px;font-weight:900;font-size:14px;font-family:inherit;white-space:nowrap">ログイン</button>' +
      '<button aria-label="とじる" style="background:none;border:0;color:#fff;font-size:20px;padding:0 4px">×</button>';
    var bs = b.querySelectorAll('button');
    bs[0].onclick = function () { try { liff.login({ redirectUri: location.href }); } catch (e) {} };
    bs[1].onclick = function () { try { localStorage.setItem('nx_lb_off', String(Date.now() + 3 * 864e5)); } catch (e) {} b.remove(); };
    document.body.appendChild(b);
  }
  function start() {
    try {
      if (!liff.isInClient() && !liff.isLoggedIn()) { bar(); return; }
    } catch (e) { return; }
    post().then(function (d) { if (d && apply(d)) reloadOnce(); });
  }
  window.nxSync = { push: function () { clearTimeout(tm); tm = setTimeout(push, 800); }, local: local, apply: apply };
  var n = 0;
  (function wait() {
    if (window.liff && liff.ready) { liff.ready.then(start).catch(function () {}); return; }
    if (++n < 100) setTimeout(wait, 100);
  })();
})();
