
<template>
  <div class="app-root" :style="{ backgroundColor: '#F3F6FB' }">

    <main class="p-6 mx-1">
      <router-view/>
    </main>

    <footer class="app-footer text-center fs-6">
      &copy; 2026 Aplicación de progresión personal
    </footer>
  </div>
</template>

<script setup lang="ts">
</script>

<style>
.app-root {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* ensure full viewport height */
}

.app-root main {
  /* main grows to take available space so footer stays at bottom */
  flex: 1 0 auto;
}

.app-footer {
  background-color: #E5E7EB; /* subtle gray similar to bg-gray-200 */
  color: #374151; /* similar to text-gray-700 */
  padding: 0.5rem 0;
}
</style>
