<template>
    <div class="border p-3 rounded d-flex align-items-center">
        <p class="col-11">{{ texto }}</p>
        <div class="col-auto">
            <input 
                type="checkbox" 
                class="form-check-input custom-checkbox" 
                :style="{ width: '30px', height: '30px' }"
                @change="$emit('update:hecho', ($event.target as HTMLInputElement).checked)"
                :checked="hecho"
            >
        </div>
    </div>
</template>

<script setup lang="ts">
const { texto, hecho } = defineProps<{ texto: string, hecho: boolean }>();

defineEmits<{
    (e: 'update:hecho', value: boolean): void
}>();
</script>

<style scoped>
.custom-checkbox:checked {
  background-color: #ff7043; /* tu color personalizado */
  border-color: #ff7043;
}
</style>