import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '@/App.vue';
import { router } from './router';
import { useAuthStore } from '@/stores/auth';
import { usePwaStore } from '@/stores/pwa';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap'
import './assets/main.css'
// PWA: register service worker and prompt
// Note: import of the virtual module provided by vite-plugin-pwa can fail
// during development if the plugin isn't installed. Use a dynamic import
// so the app still runs when the plugin is missing.

const app = createApp(App);

app.config.errorHandler = (err, vm, info) => {
  console.error('[vue error]', err, info);
  window.dispatchEvent(new CustomEvent('api-error', {
    detail: { message: 'Error interno de la aplicación', status: 500, original: err?.message ?? String(err) }
  }));
};

window.addEventListener('unhandledrejection', (ev) => {
  console.error('[unhandledrejection]', ev.reason);
  window.dispatchEvent(new CustomEvent('api-error', {
    detail: { message: ev.reason?.message ?? 'Unhandled rejection', status: 0, original: ev.reason }
  }));
});

const pinia = createPinia();
app.use(pinia);
app.use(router);

// Inicializar auth desde localStorage (si existe token)
const auth = useAuthStore(pinia);
auth.initFromStorage();
// PWA store: keep deferred prompt and installed state
const pwa = usePwaStore(pinia);

// detect if app is already installed (standalone) — desktop/modern browsers
if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
  pwa.setInstalled(true);
}
// iOS standalone detection
if (window.navigator && (window.navigator.standalone === true)) {
  pwa.setInstalled(true);
}

// Register the service worker (auto update) if the PWA plugin is available
// register SW if plugin available
(async () => {
  try {
    const mod = await import('virtual:pwa-register');
    const registerSW = mod.registerSW || (mod.default && mod.default.registerSW);
    if (typeof registerSW === 'function') {
      registerSW({
        onRegistered(r) {
          // optional: periodically check for updates
          if (r) setInterval(() => r.update(), 60 * 60 * 1000);
        }
      });
    }
  } catch (err) {
    // plugin not installed / virtual module not available — ignore silently
  }
})();

// listen for beforeinstallprompt and show prompt immediately on first visit
// Capture the beforeinstallprompt event so we can show the install button in the Login UI
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent automatic prompt
  e.preventDefault();
  // store the event in the pwa store so UI can trigger it
  try {
    pwa.setDeferredPrompt(e);
  } catch (err) {
    // ignore if store not available for some reason
  }
});

// When the app is installed, update the store so the install button can hide
window.addEventListener('appinstalled', () => {
  try { pwa.setInstalled(true); } catch (e) {}
  try { pwa.clearDeferredPrompt(); } catch (e) {}
});

// iOS: advise user how to add to home screen (Safari doesn't fire beforeinstallprompt)
if (/iphone|ipad|ipod/i.test(window.navigator.userAgent)) {
  // show a subtle hint once per session
  if (!sessionStorage.getItem('ios-pwa-hint')) {
    sessionStorage.setItem('ios-pwa-hint', '1');
    setTimeout(() => {
      // show a gentle instruction — you can replace this with a nicer modal
      alert('Para instalar la app en iOS: pulse el botón Compartir y luego "Agregar a pantalla de inicio".');
    }, 1500);
  }
}

app.mount('#app');