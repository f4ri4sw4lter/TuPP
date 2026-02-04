<template>
  <div v-if="visible" class="ios-hint-backdrop" @click.self="close">
    <div class="ios-hint-card">
      <div class="d-flex align-items-center mb-3">
        <img src="../assets/images/logo.png" alt="logo" class="me-3 ios-logo" />
        <h5 class="mb-0">Instalar TuPP en iOS</h5>
      </div>

      <p class="small text-muted">
        Para instalar la aplicación en iOS siga estos pasos:
      </p>
      <ol class="small">
        <li>Pulse el botón <strong>Compartir</strong> (ícono de cuadrado con flecha).</li>
        <li>Seleccione <strong>Agregar a pantalla de inicio</strong>.</li>
        <li>Ajuste el nombre (opcional) y pulse <strong>Agregar</strong>.</li>
      </ol>

      <div class="d-flex justify-content-end mt-3">
        <button class="btn btn-outline-secondary me-2" @click="close">Cerrar</button>
        <button class="btn btn-primary" @click="dismissForever">No mostrar de nuevo</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { usePwaStore } from '@/stores/pwa';

const pwa = usePwaStore();
const visible = computed(() => pwa.iosHintVisible && !pwa.isInstalled);

const close = () => {
  pwa.clearIosHint();
};

const dismissForever = () => {
  // set a flag in sessionStorage/localStorage to avoid showing again across sessions
  localStorage.setItem('ios-pwa-hint-dismissed', '1');
  pwa.clearIosHint();
};
</script>

<style scoped>
.ios-hint-backdrop {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.35);
  z-index: 2000;
}
.ios-hint-card {
  width: 320px;
  background: #fff;
  border-radius: 12px;
  padding: 18px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.12);
}
.ios-logo { width: 48px; height:48px; border-radius:8px; }
</style>
