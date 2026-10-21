const CACHE='dutch-vocab-v2';
const FILES=['./','./index.html','./manifest.webmanifest','./icon.svg'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)));self.skipWaiting()});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))));self.clients.claim()});
self.addEventListener('fetch',event=>{
 const request=event.request;
 if(request.method!=='GET')return;
 const url=new URL(request.url);
 const allowed=new Set(FILES.map(file=>new URL(file,self.registration.scope).pathname));
 if(url.origin!==self.location.origin||!allowed.has(url.pathname))return;
 event.respondWith(caches.match(request).then(hit=>hit||fetch(request)));
});
