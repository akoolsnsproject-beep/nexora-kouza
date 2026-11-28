/* ✏️ このSTEPの設定：共通3つ（前のページから引きつぎ）＋ページ専用。頼み文に自動で入れる */
var NXC = [['do', 'やりたいこと', '🎯', ['AIで時短を発信', '占い・スピリチュアル', '美容・スキンケア', '子育て', '副業・お金'], '例：子育てママ向けに、AIで家事を時短する方法を発信'],
           ['who', '届けたい人', '👥', ['忙しい20〜30代の女性', '子育て中のママ', '副業を始めたい会社員', '50代からのチャレンジ'], '例：0〜6歳の子どもがいる、忙しいママ'],
           ['chara', 'キャラ・口調', '🎭', ['明るくて親しみやすい先輩', 'ていねいでやさしい先生', '元気な友だち', '落ち着いた大人'], '例：明るくて親しみやすい先輩']];
var NXF = {
  s3: [['topic', '練習したいお題', '📝', ['投稿文', '商品の紹介文', 'あいさつ文', 'ブログの見出し']]],
  s4: [['goal', '目標', '🏁', ['月3万円', '月10万円', 'フォロワー1000人']], ['sns', '使うSNS', '📱', ['Threads', 'Instagram', 'TikTok', 'YouTube'], 1]],
  s5: [['time', '投稿する時間', '⏰', ['朝7時', '昼12時', '夜21時']], ['num', '作る本数', '🔢', ['30本', '60本']]],
  s6: [['form', '投稿の形', '🖼', ['画像1枚', 'カルーセル（数枚）', 'リール動画']], ['time', '投稿する時間', '⏰', ['朝7時', '昼12時', '夜21時']]],
  s7: [['len', '動画の長さ', '⏱', ['15秒', '30秒', '60秒']], ['where', '出す場所', '📱', ['Instagramリール', 'TikTok', 'YouTubeショート'], 1]],
  s8: [['job', '手伝ってほしいこと', '💼', ['今日やることの整理', '投稿ネタ出し', '英会話の練習', '勉強の質問']]],
  a1: [['genre', '紹介する商品のジャンル', '🛒', ['時短家電', '子ども用品', 'コスメ', '食品', '本']], ['num', '紹介する数', '📦', ['5個', '10個', '20個']]],
  a2: [['theme', '動画のテーマ', '🎬', ['朝の時短ルーティン', 'おすすめ商品の紹介', 'やってみた']], ['cap', '字幕の雰囲気', '🔤', ['大きく読みやすく', 'かわいく', 'シンプル']]],
  a3: [['look', '色・雰囲気', '🎨', ['やさしいパステル', '黒×オレンジ', '白でシンプル', 'ポップでカラフル']], ['num', '作る枚数', '🔢', ['5枚', '10枚', '20枚']]],
  a4: [['goal', '目標', '🏁', ['月3万円', '月10万円', 'フォロワー1000人']], ['dept', '最初に作る部署', '🏢', ['SNS部', '動画部', '画像部']]],
  a5: []
};
var NX_PID = '', nxMeUse = false, nxMeS4 = false;
function nxJ(k) { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch (e) { return null; } }
function nxMeShared() { var o = nxJ('nx_me'); return o && o.v ? o.v : {}; }
function nxMePage() { var o = NX_PID ? nxJ('nx_mp_' + NX_PID) : null; return o && o.v ? o.v : {}; }
function nxMeGet() {
  var s = nxMeShared(), p = nxMePage(), r = {};
  NXC.forEach(function (c) { r[c[0]] = (p[c[0]] != null && p[c[0]] !== '') ? p[c[0]] : (s[c[0]] || ''); });
  (NXF[NX_PID] || []).forEach(function (f) { r[f[0]] = p[f[0]] || ''; });
  return r;
}
function nxMeOn() { var v = nxMeGet(); return Object.keys(v).some(function (k) { return (v[k] || '').trim(); }); }
function nxMeFill(t) {
  if (!nxMeOn()) return t;
  var v = nxMeGet(), d = v.do || '', c = v.chara || '';
  var R = [['□朝の時短□', d], ['□今日のテーマ□', d], ['□AIで時短する方法□', d], ['□自分のジャンルや目的□', d], ['□短く、ていねい□', c], ['□やさしくて前向き□', c],
           ['□AIの使い方を短い動画で発信して、フォロワーを増やす□', d + (v.goal ? '（目標：' + v.goal + '）' : '')]];
  R.forEach(function (r) { if (r[1]) t = t.split(r[0]).join(r[1]); });
  return t;
}
function nxMeHead(s4) {
  if (!nxMeOn()) return '';
  var v = nxMeGet(), h = '【このSTEPの設定】\n';
  NXC.concat(NXF[NX_PID] || []).forEach(function (x) { if ((v[x[0]] || '').trim()) h += x[1] + '：' + v[x[0]].trim() + '\n'; });
  return h + (s4 ? '（この設定も CLAUDE.md に書いておいてください）\n\n' : '（このあとの□のところや例は、この設定に合わせて考えてください）\n\n');
}
function nxMeWrap(t) { return nxMeUse ? nxMeHead(nxMeS4) + nxMeFill(t) : t; }
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
  var NM = {s1:'STEP1',s2:'STEP2',s3:'STEP3',s4:'STEP4',s5:'応用1',s6:'応用2',s7:'応用3',s8:'応用4',a1:'応用5',a2:'応用6',a3:'応用7',a4:'応用8',a5:'応用9'};
  var ID = m ? 's' + n : (ma ? 'a' + n : '');

  /* 🔍 応用編：もっと深掘りしたいときは Claude にどんどん聞こう */
  (function () {
    if (!(ID && (ID[0] === 'a' || (ID[0] === 's' && n >= 5)))) return;
    function put() {
      var g = document.querySelector('.fin') || document.querySelector('.goal'); if (!g || document.getElementById('deep')) return;
      var pro = /\/p\//.test(location.pathname);
      var h = document.querySelector('h1'), tt = h ? h.textContent.replace(/\s+/g, '') : LBL;
      var who = pro ? 'Claude Code（または Claude のチャット）' : 'Claude';
      var qs = [
        '「' + tt + '」について、もっとくわしく知りたいです。初心者にも分かるように、次にやるとよいことを3つ、手順つきで教えてください。',
        '「' + tt + '」を、私の場合（□自分のジャンルや目的□）に合わせるなら、どこをどう変えればいいですか？',
        '「' + tt + '」でうまくいっている人は、どんな工夫をしていますか？私がまねできることを5つ教えてください。'
      ];
      var st = document.createElement('style');
      st.textContent = '#deep{margin:18px 0 8px;padding:16px 14px;border-radius:16px;background:linear-gradient(135deg,#0f1a2a,#0b1220);border:2px solid #3b82f6;box-shadow:0 0 18px rgba(59,130,246,.25)}' +
        '#deep h3{margin:0;font-size:17px;color:#9cc3ff;display:flex;align-items:center;justify-content:space-between;cursor:pointer;-webkit-tap-highlight-color:transparent}#deep h3 em{font-style:normal;font-size:12px;font-weight:800;background:#1e3a66;color:#cfe0ff;border-radius:99px;padding:4px 10px}#deep .db{display:none;margin-top:10px}#deep.op .db{display:block}#deep h3:after{content:""}#deep p{margin:0 0 10px;font-size:13.5px;line-height:1.7;color:#dbe7ff}' +
        '#deep .dl{font-size:12.5px;font-weight:800;color:#9cc3ff;margin:10px 0 4px}#deep .copy{margin-top:6px}';
      document.head.appendChild(st);
      var d = document.createElement('div'); d.id = 'deep';
      d.innerHTML = '<h3>🔍 もっと深掘りしたいときは<em>タップで開く ▼</em></h3><div class="db">' +
        '<p>ここに書いてあるのは<b>はじめの一歩</b>です。「もっとくわしく知りたい」「自分の場合はどうする？」と思ったら、<b>' + who + 'にどんどん聞いていこう</b>。<br>' +
        '何回聞いてもOK。分からない言葉が出てきたら「それってどういう意味？」と聞き返せば、やさしく教えてくれます。</p>' +
        '<div class="dl">聞き方の例（□は自分のことに書きかえてね）</div>' +
        qs.map(function (q) { return '<div class="copy"><button onclick="cp(this)">コピー</button><span>' + q.replace(/[&<>]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]; }) + '</span></div>'; }).join('') + '</div>';
      d.querySelector('h3').onclick = function () { var o = d.classList.toggle('op'); this.querySelector('em').textContent = o ? 'とじる ▲' : 'タップで開く ▼'; };
      g.parentNode.insertBefore(d, g);
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', put); else put();
  })();

  /* 🆘 うまくいかないとき：タップで開く */
  (function () {
    function go() {
      [].forEach.call(document.querySelectorAll('.help'), function (h) {
        var t = h.querySelector('h3'); if (!t || h.getAttribute('data-fold')) return; h.setAttribute('data-fold', '1');
        var body = document.createElement('div'); body.className = 'hb';
        while (t.nextSibling) body.appendChild(t.nextSibling);
        h.appendChild(body);
        var em = document.createElement('em'); em.textContent = 'タップで開く ▼'; t.appendChild(em);
        t.onclick = function () { var o = h.classList.toggle('op'); em.textContent = o ? 'とじる ▲' : 'タップで開く ▼'; };
      });
      var st = document.createElement('style');
      st.textContent = '.help h3{display:flex;align-items:center;justify-content:space-between;gap:8px;cursor:pointer;margin:0;-webkit-tap-highlight-color:transparent}' +
        '.help h3 em{font-style:normal;font-size:12px;font-weight:800;background:#3a1414;color:#ffd0d0;border-radius:99px;padding:4px 10px;white-space:nowrap}' +
        '.help .hb{display:none;margin-top:8px}.help.op .hb{display:block}';
      document.head.appendChild(st);
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go); else go();
  })();
  /* ✏️ このSTEPの設定（ページのいちばん上） */
  (function () {
    if (!(ID && (ID[0] === 'a' || (ID[0] === 's' && n >= 3)))) return;
    NX_PID = ID; nxMeUse = true; nxMeS4 = ID === 's4';
    function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
    function go() {
      var st = document.createElement('style');
      st.textContent = '.nxs{margin:12px 0 4px;background:#15110d;border:2px solid #ff8a24;border-radius:14px;padding:12px;box-shadow:0 0 16px rgba(255,138,36,.22)}' +
        '.nxs h4{margin:0;color:#ffb066;font-size:16px;display:flex;justify-content:space-between;align-items:center;gap:6px}.nxs h4 em{font-style:normal;font-size:11px;background:#22190f;color:#ffcf9e;border:1px solid #6b4a26;border-radius:99px;padding:3px 9px;white-space:nowrap}' +
        '.nxs .ns{font-size:12px;color:#aaa;margin:4px 0 4px;line-height:1.5}.nxs label{display:block;margin:10px 0 3px}.nxs label span{font-size:12.5px;color:#ddd;font-weight:800}' +
        '.nxs label i{font-style:normal;font-size:11px;font-weight:700;margin-left:6px}.nxs label i.pv{color:#7dffa6}.nxs label i.ch{color:#ffb066}' +
        '.nxs input{width:100%;box-sizing:border-box;background:#0b0b0d;color:#fff;border:1.5px solid #555;border-radius:9px;padding:9px 10px;font-size:15px;font-family:inherit}.nxs input:focus{outline:none;border-color:#ff8a24}' +
        '.nxs .cx{display:flex;flex-wrap:wrap;gap:5px;margin-top:5px}.nxs .cx b{font-weight:400;background:#22190f;color:#ffcf9e;border:1px solid #6b4a26;border-radius:99px;padding:4px 10px;font-size:12px;cursor:pointer}.nxs .cx b.on{background:#ff8a24;color:#111;font-weight:800}' +
        '.nxs .own{border-top:1px dashed #5a4026;margin-top:12px;padding-top:4px}.nxs .own .tg{font-size:12px;color:#ff8a24;font-weight:900;margin-top:6px}' +
        '.nxs .us{background:none;border:0;color:#7dffa6;font-size:11px;font-weight:800;text-decoration:underline;padding:0;margin-left:6px;font-family:inherit}' +
        '.nxs .nw{margin-top:10px;font-size:11px;color:#ffb066;line-height:1.5}' +
        '.copy .mhd{display:block;font-style:normal;color:#7dffa6;font-size:.92em;border-bottom:1px dashed #2e6b45;margin-bottom:6px;padding-bottom:6px;white-space:pre-wrap}';
      document.head.appendChild(st);
      var own = NXF[ID] || [];
      function fld(c, sh) {
        return '<label><span>' + c[2] + ' ' + c[1] + '</span><i data-tag="' + c[0] + '"></i></label><input data-nx="' + c[0] + '"' + (sh ? ' data-sh="1"' : '') + ' placeholder="' + esc(typeof c[4] === 'string' ? c[4] : ('例：' + (c[3][0] || ''))) + '">' +
          (c[3].length ? '<div class="cx" data-for="' + c[0] + '"' + (c[4] === 1 || (sh ? 0 : c[4]) ? ' data-multi="1"' : '') + '>' + c[3].map(function (x) { return '<b>' + esc(x) + '</b>'; }).join('') + '</div>' : '');
      }
      var box = document.createElement('div'); box.className = 'nxs';
      box.innerHTML = '<h4>✏️ このSTEPの設定<em>入れると頼み文が変わる</em></h4><div class="ns" id="nxsns"></div>' +
        NXC.map(function (c) { return fld(c, 1); }).join('') +
        (own.length ? '<div class="own"><div class="tg">このページだけの設定</div>' + own.map(function (c) { return fld(c, 0); }).join('') + '</div>' : '') +
        '<div class="nw">⚠️ キャラや口調は自由。でも経歴・資格・実績はうそを書かない</div>';
      var ht = document.querySelector('.ht'); if (!ht) return; ht.appendChild(box);
      var spans = [].slice.call(document.querySelectorAll('.copy > span:not(.mko)'));
      spans.forEach(function (sp) { sp.__o = sp.innerHTML; });
      function save(k, val, sh) {
        var p = nxMePage(); p[k] = val;
        try { localStorage.setItem('nx_mp_' + ID, JSON.stringify({ v: p, t: Date.now() })); } catch (e) {}
        if (sh) { var s = nxMeShared(); if (!(s[k] || '').trim() && val.trim()) { s[k] = val; try { localStorage.setItem('nx_me', JSON.stringify({ v: s, t: Date.now() })); } catch (e) {} } }
        if (window.nxSync) nxSync.push();
      }
      function tags() {
        var s = nxMeShared(), p = nxMePage(), any = false;
        NXC.forEach(function (c) {
          var k = c[0], t = box.querySelector('[data-tag="' + k + '"]'), pv = (p[k] || '').trim(), sv = (s[k] || '').trim();
          if (!pv && sv) { t.className = 'pv'; t.innerHTML = '← 前のページから'; any = true; }
          else if (pv && sv && pv !== sv) { t.className = 'ch'; t.innerHTML = '✏️ このページだけ変更<button type="button" class="us" data-use="' + k + '">ほかのページでも使う</button>'; }
          else { t.className = ''; t.innerHTML = ''; }
        });
        box.querySelector('#nxsns').textContent = any ? '前のページで入れた内容が入っています。変えたいところだけ書きかえてね（このページだけに反映）' : '例ボタンを押すだけでもOK。入れた内容は、次のページにも引きつがれます';
        [].forEach.call(box.querySelectorAll('.cx'), function (g) {
          var inp = box.querySelector('[data-nx="' + g.getAttribute('data-for') + '"]'), cur = inp.value;
          [].forEach.call(g.querySelectorAll('b'), function (b) { b.classList.toggle('on', g.getAttribute('data-multi') ? cur.split('・').indexOf(b.textContent) >= 0 : cur === b.textContent); });
        });
      }
      function render() {
        var on = nxMeOn(), head = nxMeHead(nxMeS4);
        spans.forEach(function (sp) {
          sp.innerHTML = sp.__o; if (!on) return;
          var w = document.createTreeWalker(sp, NodeFilter.SHOW_TEXT), nd, list = [];
          while ((nd = w.nextNode())) list.push(nd);
          list.forEach(function (x) { var f = nxMeFill(x.nodeValue); if (f !== x.nodeValue) x.nodeValue = f; });
          var i = document.createElement('i'); i.className = 'mhd'; i.textContent = head; sp.insertBefore(i, sp.firstChild);
        });
        [].forEach.call(document.querySelectorAll('.mk'), function (mk) { var f = mk.querySelector('[data-k]'); if (f) f.dispatchEvent(new Event('input')); });
      }
      var v = nxMeGet();
      [].forEach.call(box.querySelectorAll('[data-nx]'), function (i) {
        var k = i.getAttribute('data-nx'), sh = !!i.getAttribute('data-sh'); i.value = v[k] || '';
        i.addEventListener('input', function () { save(k, i.value.trim().slice(0, 120), sh); tags(); render(); });
      });
      box.addEventListener('click', function (e) {
        var u = e.target.closest('[data-use]');
        if (u) { var k = u.getAttribute('data-use'), s = nxMeShared(); s[k] = nxMePage()[k]; try { localStorage.setItem('nx_me', JSON.stringify({ v: s, t: Date.now() })); } catch (x) {} if (window.nxSync) nxSync.push(); tags(); return; }
        var b = e.target.closest('.cx b'); if (!b) return;
        var g = b.parentNode, inp = box.querySelector('[data-nx="' + g.getAttribute('data-for') + '"]'), t = b.textContent;
        if (g.getAttribute('data-multi')) { var a = inp.value.split('・').filter(Boolean), q = a.indexOf(t); if (q >= 0) a.splice(q, 1); else a.push(t); inp.value = a.join('・'); } else inp.value = t;
        inp.dispatchEvent(new Event('input'));
      });
      tags(); render();
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go); else go();
  })();
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
  var LK = {"s1": [["Python", "https://www.python.org/downloads/"], ["VS Code", "https://code.visualstudio.com/download"], ["GitHub登録", "https://github.com/signup"], ["Claude", "https://claude.ai/new"]], "s2": [["Claude 新しいチャット", "https://claude.ai/new"]], "s3": [["Claude 新しいチャット", "https://claude.ai/new"]], "s4": [["Claude プロジェクト", "https://claude.ai/projects"]], "s5": [["Meta for Developers", "https://developers.facebook.com/apps"], ["GitHub 新規作成", "https://github.com/new"], ["ntfy", "https://ntfy.sh/"]], "s6": [["Facebookページ作成", "https://www.facebook.com/pages/create"], ["Meta for Developers", "https://developers.facebook.com/apps"], ["GitHub 新規作成", "https://github.com/new"]], "s7": [["Claude 新しいチャット", "https://claude.ai/new"]], "s8": [["Ollama", "https://ollama.com/download"], ["VOICEVOX", "https://voicevox.hiroshiba.jp/"], ["Claude Code", "https://code.claude.com"]], "a1": [["楽天アフィリエイト", "https://affiliate.rakuten.co.jp/"], ["楽天ROOM", "https://room.rakuten.co.jp/"]], "a2": [["CapCut", "https://www.capcut.com/"]], "a3": [["Canva", "https://www.canva.com/"]], "a4": [["Claude プロジェクト", "https://claude.ai/projects"]], "a5": [["LINE Creators Market", "https://creator.line.me/ja/"]]};
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
    if (window.nxSync) nxSync.push();
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
  var nxs = document.createElement('script'); nxs.src = 'nxsync.js?v=4'; document.head.appendChild(nxs);
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
      out.textContent = nxMeWrap(t);
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
