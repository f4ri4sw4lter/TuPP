<template>
    <div class="container">
    
        <div class="row g-4 width-100" v-if="!estaLogueado">
            <Login @on-login="estaLogueado = true" />
        </div>

        <div class="row g-4 width-100 p-1" v-else>
            <Ruta  
                v-for="ruta in listaRutas" 
                :key="ruta.id" 
                :ruta="ruta"
            />
            
            <div class="col-12 text-center mt-3">
                <button class="btn-logout" @click="cerrarSesion">Cerrar Sesi&oacute;n</button>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import Ruta from './Ruta.vue';
import Login from './Login.vue';
import { Rutas as datosIniciales } from '../constants/rutas';
import { useAuthStore } from '@/stores/auth';
import { useMetasStore } from '@/stores/metas';

const auth = useAuthStore();
const metasStore = useMetasStore();

const estaLogueado = ref(!!auth.token);

// listaRutas como computed desde el store (reactiva)
const listaRutas = computed(() => metasStore.rutas.length ? metasStore.rutas : datosIniciales);

// inicializar: si ya hay token en storage, cargar rutas/metas
onMounted(async () => {
    if (auth.token) {
        estaLogueado.value = true;
        await metasStore.fetchRutasConMetas();
    }
});

// si el login ocurre en runtime, watch auth.token
watch(() => auth.token, async (newToken, oldToken) => {
    estaLogueado.value = !!newToken;
    if (newToken) {
        await metasStore.fetchRutasConMetas();
    } else {
        metasStore.rutas = datosIniciales;
    }
});

const cerrarSesion = async () => {
    await auth.logout();
    estaLogueado.value = false;
    metasStore.rutas = datosIniciales;
};
</script>

<style scoped>  
.btn-logout {
  background: transparent;
  border: 2px solid #d32f2f;
  color: #d32f2f;
  padding: 8px 16px;
  border-radius: 12px; /* Ajusta según tus otros botones */
  font-weight: bold;
  transition: all 0.3s ease;
}
</style>