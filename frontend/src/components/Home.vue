<template>
    <div class="container">
        <div class="d-flex justify-content-center" :style="{height: '120px'}">
            <img src="../assets/images/logo.png">
        </div>
    
        <div class="row g-4 width-100 ">
            <Ruta  v-for="ruta in Rutas" :key="ruta.id" :ruta="ruta"/>
        </div>
    </div>
</template>

<script setup lang="ts">

import Ruta from './Ruta.vue';
import { Rutas } from '../constants/rutas';
</script>