import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '@/App.vue';
import { router } from './router';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap'
import './assets/main.css'

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

app.use(createPinia());
app.use(router);
app.mount('#app');