/* Python Rápido: curso interactivo de Python que se ejecuta en el navegador con Pyodide. */
(() => {
  "use strict";

  const PYODIDE_URL = "https://cdn.jsdelivr.net/npm/pyodide@0.26.4/";
  const COURSE = window.COURSE;
  const STORE_KEY = "python-rapido-v1";
  const XP_EXERCISE = 10;
  const XP_QUESTION = 3;

  // ---------- datos ----------
  const LESSONS = [];
  COURSE.modules.forEach((m, mi) => {
    m.num = mi + 1;
    m.lessons.forEach((l) => {
      l.module = m;
      l.index = LESSONS.length;
      LESSONS.push(l);
    });
  });
  const BY_ID = Object.fromEntries(LESSONS.map((l) => [l.id, l]));

  // ---------- estado persistente ----------
  const state = loadState();
  function loadState() {
    const base = { ex: {}, quiz: {}, code: {}, xp: 0, streak: 0, lastDay: null, last: null, theme: null, sandbox: null };
    try {
      return Object.assign(base, JSON.parse(localStorage.getItem(STORE_KEY) || "{}"));
    } catch (e) {
      return base;
    }
  }
  let saveTimer = null;
  function save(now) {
    clearTimeout(saveTimer);
    const write = () => {
      try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* sin almacenamiento */ }
    };
    if (now) write(); else saveTimer = setTimeout(write, 300);
  }
  function today(offset = 0) {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  }
  function addXP(n) {
    state.xp += n;
    if (state.lastDay !== today()) {
      state.streak = state.lastDay === today(-1) ? state.streak + 1 : 1;
      state.lastDay = today();
    }
    save(true);
  }
  function currentStreak() {
    return state.lastDay === today() || state.lastDay === today(-1) ? state.streak : 0;
  }
  function quizDone(l) {
    if (!l.quiz || !l.quiz.length) return true;
    const q = state.quiz[l.id] || {};
    return l.quiz.every((_, i) => q[i]);
  }
  function lessonDone(l) { return !!state.ex[l.id] && quizDone(l); }
  function lessonStarted(l) { return !!state.ex[l.id] || Object.keys(state.quiz[l.id] || {}).length > 0; }
  function nextLesson() { return LESSONS.find((l) => !lessonDone(l)) || null; }
  function doneCount() { return LESSONS.filter(lessonDone).length; }

  // ---------- utilidades ----------
  const $ = (sel, root = document) => root.querySelector(sel);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  function h(html) {
    const t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }
  let toastTimer = null;
  function toast(msg, ms = 2600) {
    const t = $("#toast");
    t.textContent = msg;
    t.hidden = false;
    t.style.animation = "none";
    void t.offsetWidth;
    t.style.animation = "";
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { t.hidden = true; }, ms);
  }

  // ---------- resaltado de sintaxis ----------
  const KW = new Set("False None True and as assert async await break class continue def del elif else except finally for from global if import in is lambda nonlocal not or pass raise return try while with yield match case".split(" "));
  const BI = new Set("print len range int float str bool list dict set tuple input type sum min max abs round sorted reversed enumerate zip map filter open isinstance super any all self next iter repr divmod chr ord hasattr getattr setattr id help dir".split(" "));
  const TOKEN = /(#[^\n]*)|((?:[rRbBfFuU]{1,2})?(?:"""[\s\S]*?(?:"""|$)|'''[\s\S]*?(?:'''|$)|"(?:[^"\\\n]|\\.)*"?|'(?:[^'\\\n]|\\.)*'?))|(\b\d[\d_]*(?:\.\d*)?(?:[eE][+-]?\d+)?\b)|(@[A-Za-z_]\w*)|([A-Za-z_À-ɏ]\w*)/g;
  function highlight(code) {
    let out = "";
    let last = 0;
    let prev = "";
    TOKEN.lastIndex = 0;
    let m;
    while ((m = TOKEN.exec(code))) {
      out += esc(code.slice(last, m.index));
      const [tok, com, str, num, dec, ident] = m;
      if (com) out += `<span class="c">${esc(tok)}</span>`;
      else if (str) out += `<span class="s">${esc(tok)}</span>`;
      else if (num) out += `<span class="n">${esc(tok)}</span>`;
      else if (dec) out += `<span class="d">${esc(tok)}</span>`;
      else if (ident) {
        if (KW.has(ident)) out += `<span class="k">${ident}</span>`;
        else if (prev === "def" || prev === "class") out += `<span class="f">${esc(ident)}</span>`;
        else if (BI.has(ident)) out += `<span class="b">${ident}</span>`;
        else out += esc(ident);
      }
      prev = ident || "";
      last = m.index + tok.length;
    }
    return out + esc(code.slice(last));
  }

  // ---------- markdown mínimo ----------
  function inline(s) {
    const codes = [];
    const tmp = s.replace(/`([^`]+)`/g, (_, c) => `\u0001${codes.push(c) - 1}\u0002`);
    return esc(tmp)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\u0001(\d+)\u0002/g, (_, i) => `<code>${esc(codes[+i])}</code>`);
  }
  function codeBlock(code, lang) {
    const isPy = lang === "python";
    const body = isPy ? highlight(code) : esc(code);
    const tryBtn = isPy ? `<button class="btn try" type="button" data-try>Probar</button>` : "";
    return `<div class="codeblock">${tryBtn}<pre><code>${body}</code></pre><textarea hidden>${esc(code)}</textarea></div>`;
  }
  function splitRow(row) {
    return row.replace(/\\\|/g, "\u0000").trim().replace(/^\||\|$/g, "").split("|").map((c) => c.replace(/\u0000/g, "|").trim());
  }
  function md(src) {
    const lines = src.split("\n");
    let html = "";
    let i = 0;
    const isSpecial = (l) => /^```|^\s*\||^[-*] |^\d+\. |^> |^### /.test(l) || !l.trim();
    while (i < lines.length) {
      const l = lines[i];
      if (l.startsWith("```")) {
        const lang = l.slice(3).trim();
        const buf = [];
        i++;
        while (i < lines.length && !lines[i].startsWith("```")) buf.push(lines[i++]);
        i++;
        html += codeBlock(buf.join("\n"), lang);
      } else if (/^\s*\|/.test(l)) {
        const rows = [];
        while (i < lines.length && /^\s*\|/.test(lines[i])) rows.push(lines[i++]);
        const head = splitRow(rows[0]);
        const body = rows.slice(2).map(splitRow);
        html += `<div class="table-wrap"><table><thead><tr>${head.map((c) => `<th>${inline(c)}</th>`).join("")}</tr></thead><tbody>${body.map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
      } else if (/^[-*] /.test(l)) {
        const items = [];
        while (i < lines.length && /^[-*] /.test(lines[i])) items.push(lines[i++].slice(2));
        html += `<ul>${items.map((x) => `<li>${inline(x)}</li>`).join("")}</ul>`;
      } else if (/^\d+\. /.test(l)) {
        const items = [];
        while (i < lines.length && /^\d+\. /.test(lines[i])) items.push(lines[i++].replace(/^\d+\. /, ""));
        html += `<ol>${items.map((x) => `<li>${inline(x)}</li>`).join("")}</ol>`;
      } else if (l.startsWith("> ")) {
        const buf = [];
        while (i < lines.length && lines[i].startsWith("> ")) buf.push(lines[i++].slice(2));
        html += `<div class="tip">${inline(buf.join(" "))}</div>`;
      } else if (l.startsWith("### ")) {
        html += `<h4>${inline(l.slice(4))}</h4>`;
        i++;
      } else if (!l.trim()) {
        i++;
      } else {
        const buf = [];
        while (i < lines.length && !isSpecial(lines[i])) buf.push(lines[i++]);
        html += `<p>${inline(buf.join(" "))}</p>`;
      }
    }
    return html;
  }

  // ---------- editor de código ----------
  let activeEditor = null;
  function createEditor({ code = "", onChange, onRun, minLines = 4 }) {
    const el = h(`<div class="editor">
      <div class="gutter" aria-hidden="true"></div>
      <div class="ed-wrap"><pre aria-hidden="true"><code></code></pre>
      <textarea spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" wrap="off" aria-label="Editor de código Python"></textarea></div>
    </div>`);
    const ta = $("textarea", el);
    const pre = $("pre", el);
    const codeEl = $("code", el);
    const gutter = $(".gutter", el);
    let errLine = null;
    ta.value = code;

    function render() {
      const v = ta.value;
      codeEl.innerHTML = highlight(v) + (v.endsWith("\n") || v === "" ? " " : "");
      const n = Math.max(v.split("\n").length, minLines);
      let g = "";
      for (let k = 1; k <= n; k++) g += `<span${k === errLine ? ' class="err-line"' : ""}>${k}</span>`;
      gutter.innerHTML = g;
      const lh = parseFloat(getComputedStyle(el).lineHeight) || 22;
      const scrollbar = ta.scrollWidth > ta.clientWidth + 1 ? 14 : 0;
      ta.style.height = `${n * lh + 20 + scrollbar}px`;
      pre.style.transform = `translateX(${-ta.scrollLeft}px)`;
    }
    function changed() {
      if (errLine !== null) errLine = null;
      render();
      if (onChange) onChange(ta.value);
    }
    function insert(text) {
      ta.focus();
      let ok = false;
      try { ok = document.execCommand("insertText", false, text); } catch (e) { ok = false; }
      if (!ok) {
        ta.setRangeText(text, ta.selectionStart, ta.selectionEnd, "end");
        changed();
      }
    }
    function lineStart(pos) { return ta.value.lastIndexOf("\n", pos - 1) + 1; }
    function indentLines(dedent) {
      const v = ta.value;
      const s = lineStart(ta.selectionStart);
      let e = ta.selectionEnd;
      if (e > s && v[e - 1] === "\n") e--;
      const lineEnd = v.indexOf("\n", e) === -1 ? v.length : v.indexOf("\n", e);
      const block = v.slice(s, lineEnd);
      const out = block.split("\n").map((ln) => (dedent ? ln.replace(/^ {1,4}/, "") : "    " + ln)).join("\n");
      ta.setSelectionRange(s, lineEnd);
      insert(out);
      ta.setSelectionRange(s, s + out.length);
    }
    ta.addEventListener("input", changed);
    ta.addEventListener("scroll", () => { pre.style.transform = `translateX(${-ta.scrollLeft}px)`; });
    ta.addEventListener("focus", () => { activeEditor = api; showKeybar(true); });
    ta.addEventListener("blur", () => setTimeout(() => { if (document.activeElement?.closest?.(".editor") == null) showKeybar(false); }, 120));
    ta.addEventListener("keydown", (e) => {
      const { selectionStart: a, selectionEnd: b, value: v } = ta;
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        if (onRun) onRun();
        return;
      }
      if (e.key === "Tab" && !e.altKey && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        if (e.shiftKey || a !== b) indentLines(e.shiftKey);
        else insert("    ");
        return;
      }
      if (e.key === "Enter" && !e.shiftKey && !e.isComposing) {
        e.preventDefault();
        const ls = lineStart(a);
        const before = v.slice(ls, a);
        let indent = before.match(/^ */)[0];
        if (/:\s*(#.*)?$/.test(before)) indent += "    ";
        else if (/^\s*(return|break|continue|pass|raise)\b/.test(before) && indent.length >= 4) indent = indent.slice(4);
        insert("\n" + indent);
        return;
      }
      if (e.key === "Backspace" && a === b && a > 0) {
        const before = v.slice(lineStart(a), a);
        if (before.length > 0 && /^ +$/.test(before)) {
          e.preventDefault();
          const del = before.length % 4 || 4;
          ta.setSelectionRange(a - del, a);
          insert("");
        }
      }
    });
    const api = {
      el,
      get: () => ta.value,
      set(v) { ta.value = v; errLine = null; render(); if (onChange) onChange(v); },
      insert,
      indent: () => indentLines(false),
      focus: () => ta.focus(),
      markError(line) { errLine = line || null; render(); },
      run: () => onRun && onRun(),
      render,
    };
    requestAnimationFrame(render);
    return api;
  }

  // barra de teclas para pantallas táctiles
  const KEYS = [["⇥", "tab"], ["(", "()"], ["[", "[]"], ["{", "{}"], [":", ":"], ['"', '""'], ["'", "''"], ["=", "="], ["_", "_"], ["+", "+"], ["-", "-"], ["*", "*"], ["/", "/"], ["%", "%"], ["<", "<"], [">", ">"], ["#", "# "], [".", "."], [",", ", "]];
  const touch = window.matchMedia("(pointer: coarse)").matches;
  function setupKeybar() {
    const bar = $("#keybar");
    bar.innerHTML = `<button type="button" class="run" data-k="run">▶ Ejecutar</button>` + KEYS.map(([lbl, k]) => `<button type="button" data-k="${esc(k)}">${esc(lbl)}</button>`).join("");
    bar.addEventListener("pointerdown", (e) => e.preventDefault());
    bar.addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (!b || !activeEditor) return;
      const k = b.dataset.k;
      if (k === "run") return activeEditor.run();
      if (k === "tab") return activeEditor.insert("    ");
      if (["()", "[]", "{}", '""', "''"].includes(k)) {
        activeEditor.insert(k);
        const ta = $("textarea", activeEditor.el);
        ta.setSelectionRange(ta.selectionStart - 1, ta.selectionStart - 1);
        return;
      }
      activeEditor.insert(k);
    });
    const place = () => {
      if (!window.visualViewport) return;
      const vv = window.visualViewport;
      bar.style.bottom = `${Math.max(0, window.innerHeight - vv.height - vv.offsetTop)}px`;
    };
    window.visualViewport?.addEventListener("resize", place);
    window.visualViewport?.addEventListener("scroll", place);
  }
  function showKeybar(show) {
    if (!touch) return;
    $("#keybar").hidden = !show;
  }

  // ---------- Python (Pyodide) ----------
  let pyPromise = null;
  function setPyStatus(s, text) {
    const b = $("#py-status");
    b.dataset.s = s;
    $("#py-status-text").textContent = text;
    b.title = text;
  }
  function loadScript(src) {
    return new Promise((res, rej) => {
      const s = document.createElement("script");
      s.src = src;
      s.onload = res;
      s.onerror = () => rej(new Error("No se pudo descargar " + src));
      document.head.appendChild(s);
    });
  }
  function loadPython() {
    if (pyPromise) return pyPromise;
    setPyStatus("loading", "Cargando Python…");
    pyPromise = (async () => {
      if (!window.loadPyodide) await loadScript(PYODIDE_URL + "pyodide.js");
      const py = await window.loadPyodide({ indexURL: PYODIDE_URL });
      py.runPython(window.PY_RUNNER);
      py.runPython(`
import builtins, js
def _entrada(mensaje=""):
    print(mensaje, end="")
    r = js.prompt(str(mensaje) or "Escribe un valor:")
    r = "" if r is None else str(r)
    print(r)
    return r
builtins.input = _entrada
`);
      setPyStatus("ready", "Python listo");
      return py;
    })().catch((err) => {
      pyPromise = null;
      setPyStatus("error", "Sin Python (toca para reintentar)");
      throw err;
    });
    return pyPromise;
  }
  async function runPython(code, test) {
    const py = await loadPython();
    const fn = py.globals.get("run_code");
    const res = fn(code, test || null);
    const obj = res.toJs({ dict_converter: Object.fromEntries });
    res.destroy();
    fn.destroy();
    return obj;
  }

  // Ejecuta y pinta la salida. Devuelve el resultado.
  async function execute(editor, outEl, resEl, test, buttons) {
    buttons.forEach((b) => { b.disabled = true; });
    outEl.innerHTML = `<span class="muted">${pyPromise ? "Ejecutando…" : "Cargando Python (solo la primera vez, unos segundos)…"}</span>`;
    resEl.className = "result";
    resEl.innerHTML = "";
    await new Promise((r) => setTimeout(r, 30));
    let r;
    try {
      r = await runPython(editor.get(), test);
    } catch (err) {
      outEl.innerHTML = "";
      resEl.className = "result bad";
      resEl.innerHTML = `<b>No se pudo cargar Python</b>Comprueba tu conexión a internet y vuelve a intentarlo. La primera carga descarga unos 12 MB; después queda guardado.`;
      buttons.forEach((b) => { b.disabled = false; });
      return null;
    }
    buttons.forEach((b) => { b.disabled = false; });
    outEl.innerHTML = r.output ? esc(r.output) : `<span class="muted">(sin salida: usa print() para ver valores)</span>`;
    if (r.error) {
      const e = r.error;
      editor.markError(e.line);
      resEl.className = "result bad";
      resEl.innerHTML = `<b>❌ Error${e.line ? ` en la línea ${e.line}` : ""}</b><pre>${esc(e.message)}</pre>${e.hint ? `<div class="hint">💡 ${esc(e.hint)}</div>` : ""}`;
    }
    return r;
  }

  // ---------- vistas ----------
  const app = $("#app");
  function setNav(name) {
    document.querySelectorAll("[data-nav]").forEach((a) => a.classList.toggle("active", a.dataset.nav === name));
  }
  function ring(pct) {
    const r = 46, c = 2 * Math.PI * r;
    return `<div class="ring" aria-label="${pct}% completado"><svg viewBox="0 0 110 110" width="100%" height="100%">
      <circle cx="55" cy="55" r="${r}" fill="none" stroke="rgba(255,255,255,.25)" stroke-width="10"/>
      <circle cx="55" cy="55" r="${r}" fill="none" stroke="#f2c230" stroke-width="10" stroke-linecap="round"
        stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - pct / 100)}"/></svg>
      <div class="pct"><div>${pct}%<small>completado</small></div></div></div>`;
  }

  function viewHome() {
    setNav("home");
    document.title = "Python Rápido";
    const done = doneCount();
    const pct = Math.round((done * 100) / LESSONS.length);
    const next = nextLesson();
    const totalMin = LESSONS.reduce((s, l) => s + l.minutes, 0);
    const cta = next
      ? `<a class="btn btn-primary" href="#/l/${next.id}">${done || lessonStarted(next) ? "Continuar" : "Empezar ahora"}: ${esc(next.title)} →</a>`
      : `<a class="btn btn-primary" href="#/libre">🎓 ¡Curso completado! Ir a la zona libre</a>`;
    const howto = done === 0 ? `<div class="howto">
        <div><b>1. Lee 2 minutos</b>Teoría corta, solo lo esencial, con ejemplos.</div>
        <div><b>2. Ejecuta y rompe</b>Todo el código se ejecuta aquí mismo, sin instalar nada.</div>
        <div><b>3. Supera el reto</b>Tu solución se corrige al instante con pruebas automáticas.</div>
      </div>` : "";
    const modules = COURSE.modules.map((m) => {
      const mDone = m.lessons.filter(lessonDone).length;
      const open = next && next.module === m;
      const items = m.lessons.map((l) => {
        const cls = lessonDone(l) ? "done" : lessonStarted(l) ? "half" : "";
        const isNext = next && next.id === l.id ? " next" : "";
        return `<li><a class="${cls}${isNext}" href="#/l/${l.id}"><span class="chk">${lessonDone(l) ? "✓" : ""}</span><span>${l.index + 1}. ${esc(l.title)}</span><span class="min">${l.minutes} min</span></a></li>`;
      }).join("");
      return `<details class="module${mDone === m.lessons.length ? " done" : ""}"${open ? " open" : ""}>
        <summary><span class="micon">${m.icon}</span><span class="mtext"><span class="mnum">Módulo ${m.num}</span>
          <span class="mtitle">${esc(m.title)}</span><span class="mdesc">${esc(m.desc)}</span>
          <div class="bar"><i style="width:${(mDone * 100) / m.lessons.length}%"></i></div></span>
          <span class="mprog">${mDone}/${m.lessons.length}</span></summary>
        <ul class="lesson-list">${items}</ul></details>`;
    }).join("");
    app.innerHTML = `
      <section class="hero">
        <div class="hero-text">
          <h1>Aprende Python practicando</h1>
          <p>${COURSE.modules.length} módulos, ${LESSONS.length} lecciones con retos que se corrigen solos y 4 proyectos finales. Unas ${Math.round(totalMin / 60)} horas de práctica real, en el móvil o en la computadora.</p>
          ${cta}
        </div>
        ${ring(pct)}
      </section>
      <div class="stats">
        <div class="stat"><b>${done}/${LESSONS.length}</b><span>lecciones</span></div>
        <div class="stat"><b>${state.xp}</b><span>puntos XP</span></div>
        <div class="stat"><b>${currentStreak()} 🔥</b><span>días seguidos</span></div>
      </div>
      ${howto}
      <h2 class="section-title">Temario</h2>
      ${modules}
      <div class="footer-actions">
        <button class="linklike" type="button" id="export">Exportar progreso</button> ·
        <button class="linklike" type="button" id="import">Importar progreso</button> ·
        <button class="linklike" type="button" id="reset">Reiniciar progreso</button>
      </div>`;
    $("#reset").onclick = () => {
      if (confirm("¿Borrar todo tu progreso y tu código guardado?")) {
        Object.assign(state, { ex: {}, quiz: {}, code: {}, xp: 0, streak: 0, lastDay: null, last: null });
        save(true);
        viewHome();
      }
    };
    $("#export").onclick = async () => {
      const data = btoa(unescape(encodeURIComponent(JSON.stringify(state))));
      try { await navigator.clipboard.writeText(data); toast("Progreso copiado. Pégalo en otro dispositivo con «Importar»."); }
      catch (e) { prompt("Copia este código:", data); }
    };
    $("#import").onclick = () => {
      const data = prompt("Pega el código de progreso:");
      if (!data) return;
      try {
        Object.assign(state, JSON.parse(decodeURIComponent(escape(atob(data.trim())))));
        save(true);
        toast("Progreso importado ✓");
        viewHome();
      } catch (e) { alert("Ese código no es válido."); }
    };
  }

  function viewLesson(id) {
    const l = BY_ID[id];
    if (!l) return viewHome();
    setNav("home");
    state.last = id;
    save();
    document.title = `${l.title} · Python Rápido`;
    const prev = LESSONS[l.index - 1];
    const next = LESSONS[l.index + 1];
    const wasDone = lessonDone(l);
    const codeKey = (k) => `${id}:${k}`;

    app.innerHTML = `
      <div class="lesson-head">
        <div class="crumbs"><a href="#/">← Temario</a><span>Módulo ${l.module.num} · ${esc(l.module.title)}</span></div>
        <h1>${esc(l.title)}</h1>
        <span class="pill">Lección ${l.index + 1} de ${LESSONS.length}</span>
        <span class="pill">⏱ ${l.minutes} min</span>
        <span class="pill ok" id="done-pill"${wasDone ? "" : " hidden"}>✓ Completada</span>
      </div>
      <section class="card md">${md(l.teoria)}</section>
      ${l.ejemplo ? `<section class="card" id="ex-card"><h2>🧪 Pruébalo</h2>
        <p class="explain" style="margin-top:0">Ejecuta el ejemplo, cámbialo y vuelve a ejecutar. Aprender rompiendo cosas es lo más rápido.</p>
        <div id="ex-editor"></div>
        <div class="toolbar"><button class="btn btn-primary" id="ex-run" type="button">▶ Ejecutar</button>
          <button class="btn btn-ghost" id="ex-reset" type="button">↺ Restaurar</button></div>
        <div class="output" id="ex-out"></div><div class="result" id="ex-res"></div></section>` : ""}
      <section class="card" id="ch-card"><h2>🎯 Reto <span class="pill ok" id="ch-pill"${state.ex[id] ? "" : " hidden"}>✓ Superado</span></h2>
        <div class="md">${md(l.ejercicio)}</div>
        <div id="ch-editor"></div>
        <div class="toolbar">
          <button class="btn btn-ok" id="ch-check" type="button">✔ Comprobar</button>
          <button class="btn" id="ch-run" type="button">▶ Ejecutar</button>
          <span class="spacer"></span>
          ${l.pista ? `<button class="btn btn-ghost" id="ch-hint" type="button">💡 Pista</button>` : ""}
          <button class="btn btn-ghost" id="ch-sol" type="button">👁 Solución</button>
          <button class="btn btn-ghost" id="ch-reset" type="button">↺</button>
        </div>
        <div class="output" id="ch-out"></div><div class="result" id="ch-res"></div></section>
      ${l.quiz && l.quiz.length ? `<section class="card" id="quiz-card"><h2>❓ Mini test</h2><div id="quiz"></div></section>` : ""}
      <div id="complete"></div>
      <nav class="lesson-nav">
        ${prev ? `<a class="btn" href="#/l/${prev.id}"><span>← ${esc(prev.title)}</span></a>` : `<span></span>`}
        ${next ? `<a class="btn btn-primary" href="#/l/${next.id}"><span>${esc(next.title)} →</span></a>` : `<a class="btn btn-primary" href="#/">🏁 Fin del curso</a>`}
      </nav>`;

    // "Probar" en bloques de código de la teoría
    bindTryButtons(app);

    // Ejemplo
    if (l.ejemplo) {
      const exOut = $("#ex-out"), exRes = $("#ex-res"), exRun = $("#ex-run");
      const exEd = createEditor({
        code: state.code[codeKey("ej")] ?? l.ejemplo,
        onChange: (v) => { state.code[codeKey("ej")] = v; save(); },
        onRun: () => exRun.click(),
      });
      $("#ex-editor").replaceWith(exEd.el);
      exRun.onclick = () => execute(exEd, exOut, exRes, null, [exRun]);
      $("#ex-reset").onclick = () => { exEd.set(l.ejemplo); delete state.code[codeKey("ej")]; exOut.innerHTML = ""; exRes.innerHTML = ""; };
    }

    // Reto
    const chOut = $("#ch-out"), chRes = $("#ch-res"), chRun = $("#ch-run"), chCheck = $("#ch-check");
    let fails = 0;
    const chEd = createEditor({
      code: state.code[codeKey("re")] ?? l.codigo,
      onChange: (v) => { state.code[codeKey("re")] = v; save(); },
      onRun: () => chCheck.click(),
      minLines: 6,
    });
    $("#ch-editor").replaceWith(chEd.el);
    chRun.onclick = () => execute(chEd, chOut, chRes, null, [chRun, chCheck]);
    chCheck.onclick = async () => {
      const r = await execute(chEd, chOut, chRes, l.prueba, [chRun, chCheck]);
      if (!r) return;
      if (r.status === "pass") {
        const first = !state.ex[id];
        state.ex[id] = true;
        if (first) addXP(XP_EXERCISE); else save(true);
        chRes.className = "result ok";
        chRes.innerHTML = `<b>✅ ¡Correcto!${first ? ` +${XP_EXERCISE} XP` : ""}</b>Tu código pasó todas las pruebas.${l.quiz && !quizDone(l) ? " Ahora responde el mini test." : ""}`;
        $("#ch-pill").hidden = false;
        checkComplete();
      } else if (r.status === "fail") {
        fails++;
        chRes.className = "result bad";
        chRes.innerHTML = `<b>🤔 Todavía no</b><pre>${esc(r.fail)}</pre>${fails >= 2 && l.pista ? `<div class="hint">¿Atascado? Prueba con la 💡 pista.</div>` : ""}`;
      } else if (r.status === "error") {
        fails++;
      }
    };
    if (l.pista) {
      $("#ch-hint").onclick = () => {
        chRes.className = "result info";
        chRes.innerHTML = `<b>💡 Pista</b>${inline(l.pista)}`;
      };
    }
    $("#ch-sol").onclick = () => {
      if (!state.ex[id] && fails < 1 && !confirm("¿Ver la solución? Intentarlo primero ayuda mucho a aprender.\n\nSi la ves, el reto cuenta igual cuando la ejecutes con ✔ Comprobar.")) return;
      chRes.className = "result info";
      chRes.innerHTML = `<b>👁 Una solución posible</b><div class="codeblock" style="margin-top:8px"><pre><code>${highlight(l.solucion)}</code></pre></div>
        <button class="btn" type="button" id="use-sol">Copiar al editor</button>`;
      $("#use-sol").onclick = () => { chEd.set(l.solucion); chEd.focus(); };
    };
    $("#ch-reset").onclick = () => {
      if (confirm("¿Volver al código inicial del reto?")) {
        chEd.set(l.codigo);
        delete state.code[codeKey("re")];
        chOut.innerHTML = "";
        chRes.innerHTML = "";
      }
    };

    // Quiz
    if (l.quiz && l.quiz.length) {
      const qs = state.quiz[id] || (state.quiz[id] = {});
      const box = $("#quiz");
      l.quiz.forEach((q, qi) => {
        const div = h(`<div class="quiz-q"><p>${qi + 1}. ${inline(q.q)}</p><div class="opts"></div><div class="explain" hidden></div></div>`);
        const opts = $(".opts", div);
        const exp = $(".explain", div);
        q.options.forEach((o, oi) => {
          const b = h(`<button class="opt" type="button">${inline(o)}</button>`);
          if (qs[qi] && oi === q.answer) b.classList.add("right");
          b.onclick = () => {
            if (qs[qi]) return;
            if (oi === q.answer) {
              b.classList.add("right");
              qs[qi] = true;
              addXP(XP_QUESTION);
              opts.querySelectorAll(".opt").forEach((x) => { x.disabled = true; });
              exp.hidden = false;
              exp.innerHTML = `✅ ${q.explain ? inline(q.explain) : "¡Exacto!"}`;
              checkComplete();
            } else {
              b.classList.add("wrong");
              b.disabled = true;
              exp.hidden = false;
              exp.textContent = "❌ No es esa. Prueba otra vez.";
            }
          };
          opts.appendChild(b);
        });
        if (qs[qi]) {
          opts.querySelectorAll(".opt").forEach((x) => { x.disabled = true; });
          if (q.explain) { exp.hidden = false; exp.innerHTML = `✅ ${inline(q.explain)}`; }
        }
        box.appendChild(div);
      });
    }

    function checkComplete() {
      if (lessonDone(l)) {
        $("#done-pill").hidden = false;
        $("#complete").innerHTML = `<div class="complete-banner">🎉 ¡Lección completada! ${doneCount()}/${LESSONS.length}</div>`;
        if (!wasDone) toast(next ? `🎉 Lección completada. Siguiente: ${next.title}` : "🏆 ¡Terminaste el curso!");
      }
    }
    if (wasDone) checkComplete();
    loadPython().catch(() => {});
  }

  function bindTryButtons(root) {
    root.querySelectorAll("[data-try]").forEach((b) => {
      b.onclick = () => {
        state.sandbox = b.parentElement.querySelector("textarea").value;
        save(true);
        location.hash = "#/libre";
      };
    });
  }

  function viewSandbox() {
    setNav("libre");
    document.title = "Zona libre · Python Rápido";
    const inicial = `# Zona libre: experimenta con lo que quieras.
# Ctrl + Enter también ejecuta.

nombre = "mundo"
print(f"Hola, {nombre}!")

for i in range(1, 4):
    print(i, "→", i ** 2)
`;
    app.innerHTML = `<div class="lesson-head"><h1>⌨️ Zona libre</h1>
      <p class="explain" style="margin:0">Tu espacio para practicar. El código se guarda automáticamente en este dispositivo.</p></div>
      <section class="card"><div id="sb-editor"></div>
      <div class="toolbar"><button class="btn btn-primary" id="sb-run" type="button">▶ Ejecutar</button>
      <span class="spacer"></span>
      <button class="btn btn-ghost" id="sb-copy" type="button">📋 Copiar</button>
      <button class="btn btn-ghost" id="sb-clear" type="button">🗑 Vaciar</button></div>
      <div class="output" id="sb-out"></div><div class="result" id="sb-res"></div></section>
      <section class="card md"><h2>Ideas para practicar</h2>
      <ul><li>Una calculadora de propinas que pida el total con <code>input()</code>.</li>
      <li>Un programa que diga si un año es bisiesto.</li>
      <li>Una tabla de multiplicar con formato usando f-strings.</li>
      <li>Un contador de vocales que use un diccionario.</li>
      <li>Escribe <code>import this</code> y ejecuta.</li></ul></section>`;
    const out = $("#sb-out"), res = $("#sb-res"), run = $("#sb-run");
    const ed = createEditor({
      code: state.sandbox ?? inicial,
      onChange: (v) => { state.sandbox = v; save(); },
      onRun: () => run.click(),
      minLines: 12,
    });
    $("#sb-editor").replaceWith(ed.el);
    run.onclick = () => execute(ed, out, res, null, [run]);
    $("#sb-clear").onclick = () => { ed.set(""); out.innerHTML = ""; res.innerHTML = ""; ed.focus(); };
    $("#sb-copy").onclick = async () => {
      try { await navigator.clipboard.writeText(ed.get()); toast("Código copiado"); } catch (e) { toast("No se pudo copiar"); }
    };
    loadPython().catch(() => {});
  }

  function viewCheatsheet() {
    setNav("chuleta");
    document.title = "Chuleta · Python Rápido";
    app.innerHTML = `<div class="lesson-head"><h1>📄 Chuleta de Python</h1>
      <p class="explain" style="margin:0 0 12px">Lo esencial en una página. Toca «Probar» para llevar un bloque a la zona libre.</p></div>
      <input class="search" id="cs-q" type="search" placeholder="Buscar: split, dict, lambda…" aria-label="Buscar en la chuleta">
      <div class="cheat-grid">${COURSE.cheatsheet.map((c) => `<section class="card md" data-text="${esc((c.title + " " + c.md).toLowerCase())}"><h2>${esc(c.title)}</h2>${md(c.md)}</section>`).join("")}</div>`;
    bindTryButtons(app);
    $("#cs-q").addEventListener("input", (e) => {
      const q = e.target.value.trim().toLowerCase();
      app.querySelectorAll("[data-text]").forEach((s) => { s.hidden = q && !s.dataset.text.includes(q); });
    });
  }

  // ---------- router ----------
  function route() {
    const hash = location.hash.replace(/^#\/?/, "");
    showKeybar(false);
    activeEditor = null;
    if (hash.startsWith("l/")) viewLesson(decodeURIComponent(hash.slice(2)));
    else if (hash === "libre") viewSandbox();
    else if (hash === "chuleta") viewCheatsheet();
    else viewHome();
    window.scrollTo(0, 0);
    app.focus({ preventScroll: true });
  }

  // ---------- tema ----------
  function applyTheme() {
    if (state.theme) document.documentElement.dataset.theme = state.theme;
    else delete document.documentElement.dataset.theme;
  }
  $("#theme-btn").onclick = () => {
    const dark = state.theme ? state.theme === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    state.theme = dark ? "light" : "dark";
    save(true);
    applyTheme();
  };
  $("#py-status").onclick = () => {
    if (!pyPromise) loadPython().catch(() => {});
    else toast($("#py-status-text").textContent);
  };

  applyTheme();
  setupKeybar();
  window.addEventListener("hashchange", route);
  route();
  // Empieza a descargar Python en segundo plano para que el primer «Ejecutar» sea inmediato.
  setTimeout(() => loadPython().catch(() => {}), 400);

  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
})();
