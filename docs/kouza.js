/* NEXORA講座：チェック＋クリアボタン（LIFF） */
(function () {
  var LIFF_ID = '2012700328-ixoZeXYW';
  var OA = '@982rpclz';
  var m = location.pathname.match(/step(\d)-(win|mac)\.html/);
  var ma = location.pathname.match(/\/a(\d)\.html/);
  var isRules = /\/rules\.html/.test(location.pathname);
  if (!m && !ma && !isRules) return;
  var n, os, osName, MSG, KEY, LBL;
  if (m) { n = +m[1]; os = m[2]; osName = os === 'win' ? 'Windows' : 'Mac'; MSG = '✅ STEP' + n + 'クリア' + (os === 'mac' ? '！' : ''); KEY = 'nx_s' + n + os; LBL = 'STEP' + n; }
  else if (ma) { n = +ma[1]; os = ''; osName = ''; MSG = '✅ 応用' + n + 'クリア'; KEY = 'nx_a' + n; LBL = '応用' + n; }
  else { n = 0; os = ''; osName = ''; MSG = ''; KEY = 'nx_rules'; LBL = 'ルール'; }
  /* 表示名：STEP5〜8は応用1〜4、応用1〜4は応用5〜8 */
  var NM = {s1:'STEP1',s2:'STEP2',s3:'STEP3',s4:'STEP4',s5:'応用1',s6:'応用2',s7:'応用3',s8:'応用4',a1:'応用5',a2:'応用6',a3:'応用7',a4:'応用8'};
  var ID = m ? 's' + n : (ma ? 'a' + n : '');
  if (NM[ID]) { LBL = NM[ID]; MSG = '✅ ' + LBL + 'クリア' + (os === 'mac' ? '！' : ''); }

  /* 前のSTEPをクリアしていないと開かない（応用編はSTEP4のあと好きな順） */
  (function () {
    if (!ID || ID === 's1') return;
    var pv = (ID[0] === 's' && n <= 4) ? 's' + (n - 1) : 's4';
    function cl(k) { var a = []; try { a = JSON.parse(localStorage.getItem(k) || '[]'); } catch (e) {} return a.length > 0 && a.every(function (x) { return x; }); }
    var ok = cl('nx_' + pv + 'win') || cl('nx_' + pv + 'mac');
    try { if (localStorage.getItem('nx_ok_' + ID)) ok = true; } catch (e) {}
    if (ok) return;
    var so = os; try { so = so || localStorage.getItem('nx_os') || 'win'; } catch (e) { so = so || 'win'; }
    var ph = 'step' + pv.slice(1) + '-' + so + '.html', pn = NM[pv];
    var l = document.createElement('div');
    l.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(5,5,8,.96);display:flex;align-items:center;justify-content:center;padding:24px;font-family:inherit';
    l.innerHTML = '<div style="max-width:340px;width:100%;text-align:center;color:#fff;background:#141012;border:2px solid #ff8a24;border-radius:20px;padding:26px 20px;box-shadow:0 0 30px rgba(255,138,36,.35)">' +
      '<div style="font-size:44px">🔒</div><b style="display:block;font-size:19px;margin:6px 0 10px">' + LBL + ' はまだ開いていません</b>' +
      '<p style="font-size:14.5px;color:#ddd;line-height:1.7;margin:0 0 18px">先に「' + pn + '」を終わらせてね。' + (pv === 's4' ? '<br>応用編は、STEP4までクリアすると好きな順に進められます。' : '') + '</p>' +
      '<a href="' + ph + '" style="display:block;background:linear-gradient(135deg,#ffb04a,#ff5a00);color:#fff;font-weight:900;font-size:17px;text-decoration:none;border-radius:14px;padding:15px;box-shadow:0 0 20px rgba(255,106,0,.55)">▶ ' + pn + ' をひらく</a>' +
      '<a href="index.html" style="display:block;margin-top:14px;color:#ffb066;font-size:14px;font-weight:800">講座トップにもどる</a>' +
      '<u id="nxlk" style="display:block;margin-top:18px;color:#777;font-size:12px;cursor:pointer">別のスマホ・パソコンでもう終わらせた人はこちら</u></div>';
    document.body.appendChild(l); document.documentElement.style.overflow = 'hidden';
    document.getElementById('nxlk').onclick = function () { try { localStorage.setItem('nx_ok_' + ID, '1'); } catch (e) {} l.remove(); document.documentElement.style.overflow = ''; };
  })();
  /* パソコンの種類をおぼえて、応用1〜4は自分のパソコン用ページへ */
  try {
    if (m && n <= 4) localStorage.setItem('nx_os', os);
    var sv = localStorage.getItem('nx_os');
    if (m && n >= 5 && sv && sv !== os && !/[?&]os=keep/.test(location.search)) { location.replace('step' + n + '-' + sv + '.html'); return; }
  } catch (e) {}


  /* 使うサイトのリンク（上に並べる）＋本文のサイト名をリンクに */
  var LK = {"s1": [["Python", "https://www.python.org/downloads/"], ["VS Code", "https://code.visualstudio.com/download"], ["GitHub登録", "https://github.com/signup"], ["Claude", "https://claude.ai/new"]], "s2": [["Claude 新しいチャット", "https://claude.ai/new"]], "s3": [["Claude 新しいチャット", "https://claude.ai/new"]], "s4": [["Claude プロジェクト", "https://claude.ai/projects"]], "s5": [["Meta for Developers", "https://developers.facebook.com/apps"], ["GitHub 新規作成", "https://github.com/new"], ["ntfy", "https://ntfy.sh/"]], "s6": [["Facebookページ作成", "https://www.facebook.com/pages/create"], ["Meta for Developers", "https://developers.facebook.com/apps"], ["GitHub 新規作成", "https://github.com/new"]], "s7": [["Claude 新しいチャット", "https://claude.ai/new"]], "s8": [["Ollama", "https://ollama.com/download"], ["VOICEVOX", "https://voicevox.hiroshiba.jp/"], ["Claude Code", "https://code.claude.com"]], "a1": [["楽天アフィリエイト", "https://affiliate.rakuten.co.jp/"], ["楽天ROOM", "https://room.rakuten.co.jp/"]], "a2": [["CapCut", "https://www.capcut.com/"]], "a3": [["Canva", "https://www.canva.com/"]], "a4": [["Claude プロジェクト", "https://claude.ai/projects"]]};
  var lkey = m ? 's' + n : (ma ? 'a' + n : 'rules');
  var lst = document.createElement('style');
  lst.textContent = '.chips{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin:14px 0 4px}.chips span{font-size:12px;color:#a89a8c}.chips a{font-size:13px;font-weight:800;color:#ffb066;text-decoration:none;border:1px solid #5a3415;border-radius:99px;padding:6px 11px;background:#15110d}a.k.lk{text-decoration:underline;text-underline-offset:3px}a.k.lk::after{content:" ↗";font-size:.85em}';
  document.head.appendChild(lst);
  if (false && LK[lkey]) {  /* 使うサイトの列は表示しない（本文の文字にリンクあり） */
    var ch = document.createElement('div'); ch.className = 'chips';
    ch.innerHTML = '<span>このSTEPで使うサイト：</span>' + LK[lkey].map(function (l) { return '<a href="' + l[1] + '" target="_blank" rel="noopener">' + l[0] + ' ↗</a>'; }).join('');
    var ht = document.querySelector('.ht'); if (ht) ht.appendChild(ch);
  }
  (function () {
    var ht = document.querySelector('.ht'); if (!ht || isRules) return;
    var r = document.createElement('div'); r.className = 'chips';
    r.innerHTML = '<a href="rules.html" style="border-color:#ff8a24">📕 はじめに読むルール（いつでも）</a>' + (m && n >= 5 ? '<a href="step' + n + '-' + (os === 'win' ? 'mac' : 'win') + '.html?os=keep">💻 ' + (os === 'win' ? 'Mac' : 'Windows') + 'の人はこちら</a>' : '');
    ht.appendChild(r);
    if (m && n === 5) {
      var nb = document.createElement('div');
      nb.style.cssText = 'margin:12px 0 0;padding:12px 14px;border-radius:12px;border:1.5px solid #ff8a24;background:#1d140b;color:#ffcf99;font-size:14px;line-height:1.6';
      nb.innerHTML = '📕 <b>投稿を始める前に</b>、<a href="rules.html" style="color:#ffb066;font-weight:800">はじめに読むルール</a>の最後のクイズ5問を確認してね（著作権・#PR・うそを書かない）';
      ht.appendChild(nb);
    }
  })();
  [].forEach.call(document.querySelectorAll('span.k'), function (e) {
    var t = (e.textContent || '').trim();
    if (!/^[a-z0-9-]+(\.[a-z0-9-]+)+(\/[A-Za-z0-9._\/-]*)?$/.test(t)) return;
    if (/\.(py|csv|mp4|mov|txt|json|yml|yaml|srt|md|png|jpg|html|js)$/i.test(t) || t[0] === '.') return;
    var a = document.createElement('a'); a.className = 'k lk'; a.href = 'https://' + (t === 'claude.ai' ? 'claude.ai/new' : t); a.target = '_blank'; a.rel = 'noopener'; a.textContent = t;
    e.replaceWith(a);
  });

  var css = document.createElement('style');
  css.textContent =
    '.ck{display:flex;align-items:center;justify-content:center;gap:10px;margin:12px 0 4px;padding:13px;border-radius:14px;border:2px dashed #ff8a24;color:#ffb066;font-weight:900;font-size:16px;background:rgba(255,138,36,.06);cursor:pointer;user-select:none;-webkit-tap-highlight-color:transparent}' +
    '.ck i{width:24px;height:24px;border-radius:7px;border:2.5px solid #ff8a24;display:inline-block;font-style:normal;line-height:20px;text-align:center}' +
    '.ck.on{border-style:solid;background:#ff7a12;color:#fff;border-color:#ff7a12;box-shadow:0 0 18px rgba(255,122,18,.55)}' +
    '.ck.on i{background:#fff;border-color:#fff;color:#ff6a00}' +
    '.fin{margin:26px 0 30px;padding:20px 16px;border-radius:20px;text-align:center;border:2px solid #333;background:#111}' +
    '.fin .t{font-size:15px;color:#aaa;font-weight:700;margin-bottom:12px}' +
    '.fin .b{display:block;width:100%;border:0;padding:18px;border-radius:16px;font-size:19px;font-weight:900;background:#333;color:#777;font-family:inherit}' +
    '.fin.on{border-color:#ff8a24;box-shadow:0 0 30px rgba(255,138,36,.45);background:linear-gradient(180deg,#1d0f05,#0b0705)}' +
    '.fin.on .t{color:#ffcf99}' +
    '.fin.on .b{background:linear-gradient(135deg,#ffb04a,#ff5a00);color:#fff;box-shadow:0 0 24px rgba(255,106,0,.7);cursor:pointer}' +
    '.fin .s{margin-top:10px;font-size:13px;color:#ffb066;min-height:1em}';
  document.head.appendChild(css);

  var saved = [];
  try { saved = JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) {}

  var secs = [].slice.call(document.querySelectorAll('.sec'));
  var total = secs.length;
  var fin = document.createElement('div');
  fin.className = 'fin';
  var goal = document.querySelector('.goal');
  if (goal) goal.replaceWith(fin); else secs[total - 1].after(fin);

  function done() { return secs.filter(function (s) { return s.classList.contains('done'); }).length; }
  function save() {
    var a = secs.map(function (s) { return s.classList.contains('done') ? 1 : 0; });
    try { localStorage.setItem(KEY, JSON.stringify(a)); } catch (e) {}
  }
  function render() {
    var d = done(), all = d >= total;
    var pc = document.getElementById('pc2'); if (pc) pc.textContent = '✓ ' + d + ' / ' + total;
    var pb = document.getElementById('pb2'); if (pb) pb.style.width = (d / total * 100) + '%';
    fin.className = 'fin' + (all ? ' on' : '');
    fin.innerHTML = all
      ? (isRules ? '<div class="t">🎉 ルールを確認できました！</div><button class="b" id="clr">講座にもどる ▶</button><div class="s" id="st"></div>' : '<div class="t">🎉 ぜんぶチェックできました！</div><button class="b" id="clr">' + LBL + ' クリア！ LINEに送る ▶</button><div class="s" id="st"></div>')
      : '<div class="t">ぜんぶチェックすると、ここにボタンが出ます（あと' + (total - d) + 'つ）</div><span class="b">🔒 ' + LBL + ' クリア</span>';
    if (all) document.getElementById('clr').onclick = isRules ? function () { if (window.liff && ready && liff.isInClient()) liff.closeWindow(); else history.back(); } : send;
  }
  secs.forEach(function (s, i) {
    var c = document.createElement('div');
    c.className = 'ck';
    function paint() {
      var on = s.classList.contains('done');
      c.classList.toggle('on', on);
      c.innerHTML = on ? '<i>✓</i>できた！' : '<i></i>ここまでできたらタップ';
    }
    if (saved[i]) s.classList.add('done');
    paint();
    c.onclick = function () { s.classList.toggle('done'); paint(); save(); render(); };
    s.appendChild(c);
  });
  // スクロールで数字を書きかえる元の処理を、見えないダミーに向ける
  ['pc', 'pb'].forEach(function (id) {
    var e = document.getElementById(id); if (!e) return;
    e.id = id + '2';
    var d = document.createElement('i'); d.id = id; d.style.display = 'none'; document.body.appendChild(d);
  });
  render();

  var ready = false;
  function send() {
    var st = document.getElementById('st'), b = document.getElementById('clr');
    b.disabled = true; st.textContent = '送っています…';
    talk(MSG, function () { st.textContent = '送りました！LINEにもどります'; }, function () { b.disabled = false; });
  }
  function talk(text, ok, ng) {
    if (window.liff && ready && liff.isInClient()) {
      liff.sendMessages([{ type: 'text', text: text }]).then(function () {
        if (ok) ok();
        setTimeout(function () { liff.closeWindow(); }, 600);
      }).catch(function () { if (ng) ng(); fallback(text); });
    } else { fallback(text); }
  }
  function fallback(text) {
    location.href = 'https://line.me/R/oaMessage/' + encodeURIComponent(OA) + '/?' + encodeURIComponent(text);
  }

  /* 🆘 困ったボタン（右下に浮かぶ）＋下から出る選択肢 */
  var sc = document.createElement('style');
  sc.textContent =
    '.sos{position:fixed;right:16px;bottom:calc(18px + env(safe-area-inset-bottom));z-index:50;background:#e5322d;color:#fff;border:3px solid #fff;border-radius:40px;padding:12px 18px;font-weight:900;font-size:16px;font-family:inherit;box-shadow:0 0 18px rgba(229,50,45,.6);-webkit-tap-highlight-color:transparent}' +
    '.sosbg{position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:60;display:none}' +
    '.sossh{position:fixed;left:0;right:0;bottom:0;z-index:61;background:#1d1d22;border-radius:22px 22px 0 0;border-top:3px solid #e5322d;padding:18px 16px calc(20px + env(safe-area-inset-bottom));transform:translateY(105%);transition:transform .25s}' +
    '.sossh.on{transform:none}.sosbg.on{display:block}' +
    '.sossh .t{font-weight:900;font-size:18px;color:#fff;margin-bottom:4px}.sossh .u{font-size:13px;color:#aaa;margin-bottom:10px}' +
    '.sossh button{display:block;width:100%;text-align:left;background:#2a2a30;color:#fff;border:0;border-radius:12px;padding:15px 14px;margin:8px 0;font-size:16px;font-weight:700;font-family:inherit}' +
    '.sossh .x{background:none;color:#888;text-align:center;font-size:14px;margin-top:4px}';
  document.head.appendChild(sc);
  var sb = document.createElement('button'); sb.className = 'sos'; sb.textContent = '🆘 困った';
  var bg = document.createElement('div'); bg.className = 'sosbg';
  var sh = document.createElement('div'); sh.className = 'sossh';
  var tg = '（' + LBL + '）';
  sh.innerHTML = '<div class="t">🆘 どうしましたか？</div><div class="u">選ぶとLINEにそのまま送られます</div>' +
    '<button data-m="🆘 Claudeに聞きたい' + tg + '">💬 Claudeに聞きたい（聞き方の文）</button>' +
    '<button data-m="🆘 担当に相談したい' + tg + '">🙋 担当に相談したい</button>' +
    '<button class="x">とじる</button>';
  function op(v) { sh.classList.toggle('on', v); bg.classList.toggle('on', v); }
  sb.onclick = function () { op(true); };
  bg.onclick = function () { op(false); };
  sh.onclick = function (e) {
    var b = e.target.closest('button'); if (!b) return;
    if (!b.dataset.m) return op(false);
    b.textContent = '送っています…';
    talk(b.dataset.m);
  };
  document.body.appendChild(bg); document.body.appendChild(sh); document.body.appendChild(sb);
  var fs = document.createElement('style'); fs.textContent = '.fin{margin-bottom:90px}'; document.head.appendChild(fs);

  var sdk = document.createElement('script');
  sdk.src = 'https://static.line-scdn.net/liff/edge/2/sdk.js';
  sdk.onload = function () {
    liff.init({ liffId: LIFF_ID }).then(function () { ready = true; }).catch(function () {});
  };
  document.head.appendChild(sdk);
})();

/* ✏️ カスタマイズ枠：入力すると頼み文が自動で変わる */
(function () {
  var st = document.createElement('style');
  st.textContent =
    '.mk{margin-top:12px;background:#15110d;border:1.5px solid #ff8a24;border-radius:14px;padding:12px}' +
    '.mk .mkh{font-weight:900;color:#ffb066;font-size:14.5px;margin-bottom:2px}' +
    '.mk .mks{font-size:12.5px;color:#bbb;margin-bottom:8px}' +
    '.mk label{display:block;margin:8px 0}' +
    '.mk label span{display:block;font-size:12.5px;color:#ddd;font-weight:700;margin-bottom:3px}' +
    '.mk input,.mk select,.mk textarea{width:100%;box-sizing:border-box;background:#0b0b0d;color:#fff;border:1.5px solid #555;border-radius:9px;padding:9px 10px;font-size:15px;font-family:inherit}' +
    '.mk textarea{min-height:64px;resize:vertical}' +
    '.mk input:focus,.mk select:focus,.mk textarea:focus{outline:none;border-color:#ff8a24}' +
    '.mk .mkp{margin-top:12px;font-size:12.5px;color:#ffb066;font-weight:800}' +
    '.mk .copy{margin-top:6px}';
  document.head.appendChild(st);
  function run(mk) {
    var tpl = mk.getAttribute('data-tpl'), out = mk.querySelector('.mko');
    var ins = [].slice.call(mk.querySelectorAll('[data-k]'));
    function upd() {
      var t = tpl;
      ins.forEach(function (i) { var v = (i.value || '').trim() || i.getAttribute('placeholder') || ''; t = t.split('{' + i.getAttribute('data-k') + '}').join(v); });
      out.textContent = t;
    }
    ins.forEach(function (i) { i.addEventListener('input', upd); i.addEventListener('change', upd); });
    upd();
  }
  function go() { [].forEach.call(document.querySelectorAll('.mk'), run); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go); else go();
})();

/* NEXORA アニメーション：ふわっと表示・ロボットふわふわ・次のボタンが光る（動きを減らす設定の人は止める） */
(function () {
  try {
    if (window.__nxAnim) return; window.__nxAnim = 1;
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    var st = document.createElement('style');
    st.textContent =
      '@keyframes nxFloat{0%,100%{transform:translateY(0) scale(1.04)}50%{transform:translateY(-6px) scale(1.04)}}' +
      '@keyframes nxGlow{0%,100%{box-shadow:0 0 10px rgba(255,122,18,.35)}50%{box-shadow:0 0 26px rgba(255,122,18,.85),0 0 46px rgba(255,90,0,.35)}}' +
      '.nx-in{opacity:0;transform:translateY(22px);transition:opacity .6s ease,transform .6s ease}.nx-in.nx-on{opacity:1;transform:none}' +
      '.hero:has(>img){overflow:hidden;position:relative}.nx-float{animation:nxFloat 4.5s ease-in-out infinite}' +
      '.nx-fx{position:absolute;inset:0;pointer-events:none;z-index:1;overflow:hidden;mix-blend-mode:screen}' +
      '.nx-fx i{position:absolute;bottom:-6px;width:4px;height:4px;border-radius:50%;background:#ffb347;box-shadow:0 0 8px 2px rgba(255,150,40,.9);opacity:0;animation:nxRise linear infinite}' +
      '.nx-fx i.s{width:2px;height:2px;box-shadow:0 0 5px 1px rgba(255,190,90,.9)}' +
      '.nx-fx b{position:absolute;top:-20%;bottom:-20%;width:38%;left:-50%;background:linear-gradient(100deg,transparent,rgba(255,210,150,.16),transparent);transform:skewX(-18deg);animation:nxShine 7s ease-in-out infinite}' +
      '.nx-fx em{position:absolute;left:12%;top:8%;width:55%;height:80%;border-radius:50%;background:radial-gradient(closest-side,rgba(255,130,30,.22),transparent);animation:nxPulse 3.6s ease-in-out infinite}' +
      '@keyframes nxRise{0%{transform:translateY(0);opacity:0}12%{opacity:1}80%{opacity:.8}100%{transform:translateY(-190px) translateX(14px);opacity:0}}' +
      '@keyframes nxShine{0%,55%{left:-50%}85%,100%{left:120%}}' +
      '@keyframes nxPulse{0%,100%{opacity:.35;transform:scale(.96)}50%{opacity:1;transform:scale(1.04)}}' +
      '.go,.nextb,.fin.on .b,.nx-glow{animation:nxGlow 2.2s ease-in-out infinite}' +
      '@media (prefers-reduced-motion:reduce){.nx-in{opacity:1;transform:none;transition:none}.nx-fx{display:none}.nx-float,.go,.nextb,.fin.on .b,.nx-glow{animation:none}}';
    document.head.appendChild(st);
    function fx() {
      [].forEach.call(document.querySelectorAll('.hero'), function (h) {
        if (h.querySelector('.nx-fx') || !h.querySelector(':scope>img')) return;
        var d = document.createElement('div'); d.className = 'nx-fx'; var html = '<em></em><b></b>';
        for (var k = 0; k < 16; k++) {
          var l = (Math.random() * 96).toFixed(1), du = (4 + Math.random() * 4).toFixed(1), de = (-Math.random() * 8).toFixed(1), b0 = (Math.random() * 45).toFixed(0);
          html += '<i class="' + (k % 3 ? 's' : '') + '" style="left:' + l + '%;bottom:' + b0 + '%;animation-duration:' + du + 's;animation-delay:' + de + 's"></i>';
        }
        d.innerHTML = html; h.appendChild(d);
      });
    }
    if (!reduce) { if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fx); else fx(); }
    if (reduce || !('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('nx-on'); io.unobserve(e.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    function scan() {
      [].forEach.call(document.querySelectorAll('.sec,.card,.it,.next,.prog,.goal,.fin,.help,.col1,.can,.row-ok,.row-now,.row-lock,.row-done'), function (el) {
        if (el.classList.contains('nx-in') || el.closest('.pg:not(.on)')) return;
        var r = el.getBoundingClientRect();
        el.classList.add('nx-in');
        if (r.top < innerHeight) { requestAnimationFrame(function () { el.classList.add('nx-on'); }); } else io.observe(el);
      });
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scan); else scan();
    window.nxAnimScan = scan;
    document.addEventListener('click', function () { setTimeout(scan, 60); }, true);
  } catch (e) {}
})();
/* 数字とメーターが伸びる：nxCount(要素, 目標, 終わったら) */
function nxCount(el, to, step) {
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !to) { step && step(to, 1); return; }
  var t0 = null, d = 1100;
  function f(t) { if (!t0) t0 = t; var p = Math.min(1, (t - t0) / d), e = 1 - Math.pow(1 - p, 3); step && step(Math.round(to * e), e); if (p < 1) requestAnimationFrame(f); }
  requestAnimationFrame(f);
}
