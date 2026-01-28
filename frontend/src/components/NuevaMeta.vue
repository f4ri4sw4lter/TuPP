<template>
    <div class="btn-agregar-meta" @click="mostrarFormulario = !mostrarFormulario" v-show="!mostrarFormulario">Agregar nueva meta</div>

    <div class="agregar-meta" v-show="mostrarFormulario">
        <div class="input-group">
            <textarea 
                ref="textareaRef"
                v-model="nuevaMetaNombre"
                @input="ajustarAltura"
                class="form-control nueva-meta-nombre" 
                name="nueva-meta-nombre" 
                rows="1" 
                placeholder="Nueva Meta"
            ></textarea>
            <div class="botones">
                <button class="btn btn-primary" @click="aceptarFormulario"><span>aceptar</span></button>
                <button class="btn btn-danger" @click="cancelarFormulario"><span>borrar</span></button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { useMetasStore } from '@/stores/metas';

const { id } = defineProps<{ id: number }>();
const nuevaMetaNombre = ref('');
const textareaRef = ref<HTMLTextAreaElement | null>(null);
const mostrarFormulario = ref(false);

const metasStore = useMetasStore();

const aceptarFormulario = async () => {
    if (!nuevaMetaNombre.value.trim()) return;

    const payload = {
        titulo: nuevaMetaNombre.value.trim(),
        ruta_id: id
    };

    try {
        await metasStore.addMeta(payload);
        // limpiar formulario
        cancelarFormulario();
    } catch (e) {
        console.error('Error creando meta', e);
    }
};

const cancelarFormulario = () => {
    nuevaMetaNombre.value = '';
    mostrarFormulario.value = false;

    if (textareaRef.value) {
        textareaRef.value.style.height = 'auto'; 
    }
};

const ajustarAltura = () => {
    const element = textareaRef.value;
    if (element) {
        element.style.height = 'auto';
        element.style.height = `${element.scrollHeight}px`;
    }
};

</script>


<style scoped>
.btn-agregar-meta {
    padding: 0.5rem 1rem;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 0.5rem;
    text-align: center;
    cursor: pointer;
    width: 100%;
}

.agregar-meta {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}

.nueva-meta-nombre {
    width: 100%;
    height: auto;
    border-style: dashed;
}

.input-group {
    display: flex;
    gap: 0.5rem;
    width: 100%;
}

.botones {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
    width: 100%;
}

.botones button {
    height: 50px;
    padding: 0;
    margin: 0;
}
</style>