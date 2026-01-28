<template>
    <button class="btn btn-success" @click="mostrarAgregarAccionable = !mostrarAgregarAccionable" v-show="!mostrarAgregarAccionable"><span>agregar accionable</span></button>

    <div class="agregar-accionable" v-show="mostrarAgregarAccionable">
        <div class="input-group">
            <textarea 
                ref="textareaRef"
                v-model="nuevoAccionable"
                @input="ajustarAltura"
                class="form-control nuevo-accionable-texto" 
                name="nuevo-accionable-texto" 
                rows="1" 
                placeholder="Nuevo Accionable"
            ></textarea>
            <div class="botones">
                <button class="btn btn-primary" @click="aceptarFormulario"><span>aceptar</span></button>
                <button class="btn btn-danger" @click="cancelarFormulario"><span>borrar</span></button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAccionablesStore } from '@/stores/accionables';

const { id } = defineProps<{ id: number }>();
const nuevoAccionable = ref('');
const textareaRef = ref<HTMLTextAreaElement | null>(null);
const mostrarAgregarAccionable = ref(false);

const cancelarFormulario = () => {
    nuevoAccionable.value = '';
    mostrarAgregarAccionable.value = false;

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

const aceptarFormulario = async () => {
    if (!nuevoAccionable.value.trim()) return;
    const accionables = useAccionablesStore();
    try {
        await accionables.addAccionable({ meta_id: id, texto: nuevoAccionable.value.trim() });
        // limpiar formulario
        nuevoAccionable.value = '';
        mostrarAgregarAccionable.value = false;
        if (textareaRef.value) textareaRef.value.style.height = 'auto';
    } catch (e) {
        // manejar error si hace falta
        console.error('Error creando accionable', e);
    }
};

</script>


<style scoped>

.btn.btn-success {
    text-align: center;
    width: 100%;
    height: 50px;
}

.input-group {
    display: grid;
    gap: 0.5rem;
    width: 100%;
}

.form-control.nuevo-accionable-texto {
    height: 100px;
    padding: 0;
    margin: 0;
    width: 100%;
    border: 1px solid #558fc9;
    border-radius: 5px 5px 5px 5px;
}

.botones {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
    width: 100%;
}
</style>