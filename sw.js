// Service worker: permite usar el curso sin conexión después de la primera visita.
const VERSION = "python-rapido-v1";
const SHELL = ["./", "index.html", "css/styles.css", "js/app.js", "js/curso-datos.js", "manifest.webmanifest", "icons/icon.svg", "icons/icon-192.png", "icons/icon-512.png"];
const PYODIDE = "https://cdn.jsdelivr.net/npm/pyodide@";

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION && k !== "pyodide").map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  // Pyodide: primero caché (los archivos de una versión no cambian nunca).
  if (req.url.startsWith(PYODIDE)) {
    e.respondWith(
      caches.open("pyodide").then(async (c) => {
        const hit = await c.match(req);
        if (hit) return hit;
        const res = await fetch(req);
        if (res.ok) c.put(req, res.clone());
        return res;
      })
    );
    return;
  }
  // Archivos del curso: primero red (para recibir actualizaciones) y si falla, caché.
  if (new URL(req.url).origin === self.location.origin) {
    e.respondWith(
      fetch(req)
        .then((res) => {
          if (res.ok) caches.open(VERSION).then((c) => c.put(req, res.clone()));
          return res;
        })
        .catch(() => caches.match(req, { ignoreSearch: true }).then((r) => r || caches.match("index.html")))
    );
  }
});
