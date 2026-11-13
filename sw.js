// Service worker: guarda todo el curso (incluido Python) en el dispositivo en la primera visita,
// para que la app instalada funcione sin conexión.
const VERSION = "python-rapido-v2";
const SHELL = [
  "./", "index.html", "css/styles.css", "js/app.js", "js/curso-datos.js", "manifest.webmanifest",
  "icons/icon.svg", "icons/icon-192.png", "icons/icon-512.png",
  "vendor/pyodide/pyodide.js", "vendor/pyodide/pyodide.asm.js", "vendor/pyodide/pyodide-data.js",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  // Pyodide no cambia: primero caché.
  if (url.pathname.includes("/vendor/")) {
    e.respondWith(caches.match(req, { ignoreSearch: true }).then((hit) => hit || fetch(req)));
    return;
  }
  // Archivos del curso: primero red (para recibir actualizaciones) y, sin conexión, caché.
  e.respondWith(
    fetch(req)
      .then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put(req, copy));
        }
        return res;
      })
      .catch(() => caches.match(req, { ignoreSearch: true }).then((r) => r || caches.match("index.html")))
  );
});
