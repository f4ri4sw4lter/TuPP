<template>
    <div class="card p-3">
        <p class="meta-titulo" @click="mostrarAccionables = !mostrarAccionables">
            {{ props.meta.titulo }}
        </p>

        <div class="progress mb-1 w-100">
            <div class="progress-bar bg-success" role="progressbar" :style="{ width: porcentajeProgreso + '%' }"
                :aria-valuenow="porcentajeProgreso" aria-valuemin="0" aria-valuemax="100"></div>
        </div>

        <transition name="accordion">
            <div class="row gap-3" v-show="mostrarAccionables">
                <Accionable v-for="accionable in props.meta.accionables" :key="accionable.id"
                    :texto="accionable.texto" :hecho="accionable.hecho"
                    @update:hecho="(val) => toggleAccionable(accionable, val)" />
                <div class="botones-meta">
                    <NuevoAccionable :id="props.meta.id" />
                    <button class="btn btn-primary" @click="editarMeta"><span>editar meta</span></button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAccionablesStore } from '@/stores/accionables';
import Accionable from './Accionable.vue';
import { vLongPress } from '../directives/vLongPress';
import NuevoAccionable from './NuevoAccionable.vue';

const props = defineProps<{ meta: any }>();
const mostrarAccionables = ref(false)

const porcentajeProgreso = computed(() => {
    // Usamos props.meta para asegurar reactividad
    const total = props.meta.accionables.length;
    if (total === 0) return 0;

    const completados = props.meta.accionables.filter((a: any) => a.hecho).length;

    return (completados / total) * 100;
});

const toggleAccionable = async (accionable: any, value: boolean) => {
    // Optimistic UI update
    accionable.hecho = value;
    try {
        const store = useAccionablesStore();
        await store.updateAccionable(accionable.id, { hecho: value });
    } catch (e) {
        // Revert on error
        accionable.hecho = !value;
        console.error('Error actualizando accionable', e);
    }
};

const editarMeta = () => {
    // placeholder: implementar edición de meta si es necesario
    console.log('editar meta');
};

</script>

<style scoped>
/* ... tus estilos ... */
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
    max-height: 500px;
    opacity: 1;
}

.botones-meta {
    display: grid;
    gap: 0.5rem;
    width: 100%;
}

.botones-meta .btn {
    min-height: 50px;
    padding: 0;
    margin: 0;
    width: 100%;
}
</style>