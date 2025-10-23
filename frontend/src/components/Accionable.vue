<template>
    <div class="border p-3 rounded d-flex align-items-center">
        <p class="col-11">{{ text }}</p>
        <div class="col-auto">
            <input type="checkbox" class="form-check-input custom-checkbox" :style="{ width: '30px', height: '30px' }">
        </div>
    </div>
</template>

<script setup lang="ts">
const { text } = defineProps<{ text: string }>();
</script>

<style scoped>
.custom-checkbox:checked {
  background-color: #ff7043; /* tu color personalizado */
  border-color: #ff7043;
}
</style>