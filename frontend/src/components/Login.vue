<template>
  <div class="col-12 col-md-6 col-lg-4 mx-auto">
    <div class="card shadow-sm border-0 rounded-4">
      <div class="card-body p-4">
        
  <h4 class="text-center mb-4 fw-bold text-secondary">{{ registerMode ? 'Crear cuenta' : 'Iniciar Sesión' }}</h4>

  <form @submit.prevent="registerMode ? handleRegister() : handleLogin()">
          
          <div class="mb-3">
            <label for="email" class="form-label small text-muted">Correo Electrónico</label>
            <input 
              type="email" 
              class="form-control form-control-lg fs-6" 
              id="email" 
              v-model="form.email"
              placeholder="nombre@ejemplo.com"
              required
              autocomplete="username"
            >
          </div>

          <div v-if="registerMode" class="mb-3">
            <label for="name" class="form-label small text-muted">Nombre</label>
            <input 
              type="text" 
              class="form-control form-control-lg fs-6" 
              id="name" 
              v-model="form.name"
              placeholder="Tu nombre"
              required
              autocomplete="name"
            >
          </div>

          <div class="mb-4">
            <div class="d-flex justify-content-between">
              <label for="password" class="form-label small text-muted">Contraseña</label>
            </div>
            <div class="input-group">
              <input 
                :type="mostrarPassword ? 'text' : 'password'" 
                class="form-control form-control-lg fs-6" 
                id="password" 
                v-model="form.password"
                placeholder="••••••"
                required
                autocomplete="current-password"
              >
              <button 
                class="btn btn-outline-secondary" 
                type="button" 
                @click="mostrarPassword = !mostrarPassword"
                style="border-color: #ced4da;"
              >
                <i :class="mostrarPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                {{ mostrarPassword ? '🙈' : '👁️' }} 
              </button>
            </div>
          </div>

          <div v-if="registerMode" class="mb-4">
            <label for="password_confirmation" class="form-label small text-muted">Confirmar Contraseña</label>
            <input 
              :type="mostrarPassword ? 'text' : 'password'" 
              class="form-control form-control-lg fs-6" 
              id="password_confirmation" 
              v-model="form.password_confirmation"
              placeholder="••••••"
              required
              autocomplete="new-password"
            >
          </div>

          <div v-if="errorMsg" class="alert alert-danger py-2 small" role="alert">
            {{ errorMsg }}
          </div>

          <div class="d-grid gap-2">
            <button 
              type="submit" 
              class="btn btn-primary btn-lg text-white fw-bold"
              :disabled="cargando"
              :style="{ backgroundColor: '#558fc9', borderColor: '#558fc9' }"
            >
              <span v-if="cargando" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              {{ cargando ? (registerMode ? 'Creando...' : 'Ingresando...') : (registerMode ? 'Crear cuenta' : 'Entrar') }}
            </button>
          </div>

          <div class="text-center mt-3">
            <a href="#" class="text-decoration-none small text-muted" @click.prevent="toggleMode">
              {{ registerMode ? '¿Ya tienes cuenta? Inicia sesión' : 'Crear una cuenta' }}
            </a>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

// Definimos los eventos que este componente puede emitir hacia el padre (Home)
const emit = defineEmits(['on-login']);

// Estado del formulario
const form = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
});

// Estados de UI
const mostrarPassword = ref(false);
const cargando = ref(false);
const errorMsg = ref('');
const registerMode = ref(false);

const router = useRouter();
const auth = useAuthStore();

// Inicializar store si viene de localStorage (en runtime ya se inicializa en main.js,
// pero llamarlo aquí es seguro para tests o storybook)
if (!auth.token) {
  auth.initFromStorage?.();
}

const handleLogin = async () => {
  // Reiniciar estados
  errorMsg.value = '';
  cargando.value = true;

  try {
    await auth.login({ email: form.email, password: form.password });

    // Emitimos al padre por compatibilidad y redirigimos al home
    emit('on-login');
    await router.push('/');

  } catch (error: any) {
    // Manejar mensajes del backend si vienen estructurados
    errorMsg.value = auth.error || error.response?.data?.message || error.message || 'Error al conectar con el servidor';
  } finally {
    cargando.value = false;
  }
};

const handleRegister = async () => {
  // Reiniciar estados
  errorMsg.value = '';
  cargando.value = true;

  try {
    if (form.password !== form.password_confirmation) {
      errorMsg.value = 'Las contraseñas no coinciden';
      return;
    }

    await auth.register({
      name: form.name,
      email: form.email,
      password: form.password,
      password_confirmation: form.password_confirmation
    });

    // Emitimos al padre por compatibilidad y redirigimos al home
    emit('on-login');
    await router.push('/');
  } catch (error: any) {
    errorMsg.value = auth.error || error.response?.data?.message || error.message || 'Error al registrar';
  } finally {
    cargando.value = false;
  }
};

const toggleMode = () => {
  registerMode.value = !registerMode.value;
  errorMsg.value = '';
  // limpiar datos del formulario cuando cambiamos de modo
  form.name = '';
  form.email = '';
  form.password = '';
  form.password_confirmation = '';
};
</script>

<style scoped>
/* Estilos específicos para sentirlo más "App nativa" */
.card {
  /* Sombra suave */
  box-shadow: 0 4px 24px rgba(0,0,0,0.06) !important; 
}

/* Ajuste para que los inputs no hagan zoom en iPhone al hacer focus */
input, select, textarea {
  font-size: 16px !important; 
}
</style>