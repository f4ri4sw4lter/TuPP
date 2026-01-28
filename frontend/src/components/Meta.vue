<template>
    <div class="card p-3">
        <div>
            <template v-if="!editing">
                <p class="meta-titulo" @click="mostrarAccionables = !mostrarAccionables">
                    {{ props.meta.titulo }}
                </p>
            </template>
            <template v-else>
                <div class="d-flex gap-2 align-items-center">
                    <input ref="editInput" v-model="editTitle" class="form-control" />
                    <button class="btn btn-sm btn-success" @click="guardarEdicion">Guardar</button>
                    <button class="btn btn-sm btn-danger" @click="cancelarEdicion">Cancelar</button>
                </div>
            </template>
        </div>

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
                       <button class="btn btn-primary" @click="startEdicion">
                            <span>
                                <i class="bi bi-pencil-fill"></i>
                                editar meta
                            </span>
                        </button>
                       <button class="btn btn-danger" @click="confirmarBorrado">
                            <span>
                                <i class="bi bi-trash-fill"></i>
                                borrar meta
                            </span>
                        </button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { useAccionablesStore } from '@/stores/accionables';
import Accionable from './Accionable.vue';
import { vLongPress } from '../directives/vLongPress';
import NuevoAccionable from './NuevoAccionable.vue';
import { useMetasStore } from '@/stores/metas';

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

// Edición inline del título de la meta
const editing = ref(false);
const editTitle = ref(props.meta.titulo);
const editInput = ref<HTMLInputElement | null>(null);

const startEdicion = async () => {
    editTitle.value = props.meta.titulo;
    editing.value = true;
    await nextTick();
    if (editInput.value) editInput.value.focus();
};

const guardarEdicion = async () => {
    const nuevoTitulo = (editTitle.value || '').trim();
    if (!nuevoTitulo) {
        alert('El título no puede estar vacío');
        return;
    }
    try {
        const metas = useMetasStore();
        await metas.updateMeta(props.meta.id, { titulo: nuevoTitulo });
        editing.value = false;
    } catch (e) {
        console.error('Error guardando meta', e);
        alert('No se pudo guardar la meta. Revisa la consola.');
    }
};

const cancelarEdicion = () => {
    editTitle.value = props.meta.titulo;
    editing.value = false;
};

const confirmarBorrado = async () => {
    const ok = confirm('¿Seguro que quieres borrar esta meta? Esta acción no se puede deshacer.');
    if (!ok) return;
    try {
        const metas = useMetasStore();
        await metas.deleteMeta(props.meta.id);
    } catch (e) {
        console.error('Error borrando meta', e);
        alert('No se pudo borrar la meta. Revisa la consola.');
    }
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