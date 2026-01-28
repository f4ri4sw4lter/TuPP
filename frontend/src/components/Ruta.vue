<template>
    <div class="p-4 rounded-4" :style="{ backgroundColor: props.ruta.color, color: '#fff' }" id="ruta-card">
        <div class="col-12 d-flex align-items-center">
            <div class="col-12 text-uppercase text-center" @click="mostrarRuta = !mostrarRuta">
                <h3 class="fs-4">Ruta de {{ props.ruta.titulo }}</h3>
            </div>
        </div>

        <transition name="accordion">
            <div class="row gap-3" v-show="mostrarRuta">
                <Meta v-for="meta in metasForRuta" :key="meta.id" :meta="meta" />

                <NuevaMeta :id="props.ruta.id"/>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import Meta from './Meta.vue';
import NuevaMeta from './NuevaMeta.vue';
import { ref, defineProps, computed } from 'vue';

const props = defineProps<{ ruta: any }>(); 
const mostrarRuta = ref(false);

// Computed metas for this ruta, ordered by id using the store-provided ruta.metas
const metasForRuta = computed(() => {
    const list = props.ruta?.metas ?? [];
    return [...list].sort((a, b) => (a.id ?? 0) - (b.id ?? 0));
});
</script>

<style>
#ruta-card {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: grid;
    gap: 1rem;
}

    /* --- Transición tipo acordeón --- */
    .accordion-enter-active,
    .accordion-leave-active {
    transition: all 0.6s ease;
    overflow: hidden;
    }

    .accordion-enter-from,
    .accordion-leave-to {
    max-height: 0;
    opacity: 0;
    }

    .accordion-enter-to,
    .accordion-leave-from {
    max-height: 500px; /* ajustá según el contenido */
    opacity: 1;
    }
</style>