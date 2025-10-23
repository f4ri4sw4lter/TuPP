<template>
    <div class="card p-3">
        <p class="meta-titulo" @click="mostrarAccionables = !mostrarAccionables">
            {{ meta.titulo }}
        </p>

        <div class="progress mb-1 w-100">
            <div class="progress-bar bg-success" role="progressbar" style="width: 50%" aria-valuenow="50"
                aria-valuemin="0" aria-valuemax="100"></div>
        </div>

        <transition name="accordion">
            <div class="row gap-3" v-show="mostrarAccionables">
                <Accionable v-for="accionable in meta.accionables" :key="accionable" :text="accionable" />
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Accionable from './Accionable.vue';

const { meta } = defineProps<{ meta: any }>();
const mostrarAccionables = ref(false)
</script>


<style scoped>
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