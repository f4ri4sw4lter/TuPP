<template>
    <div class="p-4 rounded-4" :style="{ backgroundColor: ruta.color, color: '#fff' }">
        <div class="col-12 d-flex align-items-center">
            <div class="col-2 fs-1">
                💪🏼
            </div>
            <div class="col-10 text-uppercase text-left">
                <h3 class="fs-4">Ruta de {{ ruta.titulo }}</h3>
            </div>
        </div>
        <div class="row gap-3">
            <Meta v-for="meta in ruta.metas" :key="meta.id" :meta="meta" />
        </div>
        <div class="btn-agregar">Agregar nueva meta</div>

        <div class="agregar-meta">
            <div class="input-group">
                <label htmlFor="nueva-meta-nombre">Nueva meta</label>
                <input type="text" class="nueva-meta-nombre" name="nueva-meta-nombre" />
                <div class="botones">
                    <button class="btn-agregar-meta"><span>✔️</span></button>
                    <button class="btn-cancelar-meta"><span>❌</span></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Meta from './Meta.vue';
import { defineProps } from 'vue';

const { ruta } = defineProps<{ ruta: any }>();
</script>