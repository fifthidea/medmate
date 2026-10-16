const CACHE_NAME = "medmate-v1";

const FILES = [
  "./",
  "./index.html",
  "./css/style.css",
  "./dist/app.bundle.js",
  "./fonts/Yekan.ttf",
  "./image/favicon.ico",
  "./image/menu/1.png",
  "./image/menu/2.png",
  "./image/menu/3.png",
  "./image/battll.png",
  "./image/bmi.png",
  "./image/clock.png",
  "./image/dext.png",
  "./image/injection.png",
  "./image/MDCalc.svg",
  "./image/micro.png",
  "./image/perc.png",
  "./image/PICu.png",
  "./image/pomp.png",
  "./image/swap.png",
  "./manifest.json",
  "./icon192.png",
  "./icon192.webp",
  "./icon512.png",
  "./mask192.png",
  "./mask512.png",
  "./package.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys.filter(key => key.startsWith("my-app-") &&
        key !== CACHE_NAME).map(key => caches.delete(key))
    );
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith((async () => {
    const cached = await caches.match(event.request);
    if (cached) return cached;

    try {
      const response = await fetch(event.request);
      if (response.ok) {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(event.request, response.clone());
      }
      return response;
    } catch {
      if (event.request.mode === "navigate") {
        return (await caches.match("./index.html")) ||
          new Response("Offline", { status: 503 });
      }
      return new Response("", { status: 503 });
    }
  })());
});