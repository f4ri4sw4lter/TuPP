# Docker, Laravel, Vue3, Nginx, MySQL8 - Multiplataforma (Windows/Linux)

Proyecto Full-Stack con Laravel 11 (Backend) y Vue3+Vite (Frontend) usando Docker, optimizado para compatibilidad Windows/Linux.

## 🚀 Características

- **Backend:** Laravel 11 con PHP 8.2
- **Frontend:** Vue 3 + Vite + TypeScript + Vue Router + Pinia
- **Base de datos:** MySQL 8.0
- **Servidor web:** Nginx
- **Compatible:** Windows y Linux
- **Hot Reload:** Habilitado para desarrollo

## 📋 Requisitos Previos

- Docker Desktop instalado y ejecutándose
- Git (opcional)

## ⚙️ Configuración del Entorno

### 1. Clonar o descargar el proyecto

```bash
git clone <repository-url> nombre-proyecto
cd nombre-proyecto
```

### 2. Crear carpetas de frontend y backend

```bash
mkdir frontend
mkdir backend
```

- **backend/**: aquí irá el código de Laravel.
- **frontend/**: aquí irá el código de Vue3.

### 3. Configuración de variables de entorno

El archivo `.env` ya está configurado con valores por defecto:
```bash
MYSQL_DATABASE=bdalumnos
MYSQL_USER=admin
MYSQL_PASSWORD=admin123
MYSQL_ROOT_PASSWORD=root123
```

El archivo `frontend/.env` está configurado para desarrollo:
```bash
VITE_API_BASE_URL=http://localhost:8081
VITE_APP_NAME="Laravel Vue3 App"
```

## 🚀 Ejecución del proyecto

### 1. Crear el proyecto Laravel en la carpeta backend

```bash
docker compose run --rm php82 composer create-project laravel/laravel . .
```
> Nota: El segundo punto indica que el proyecto se creará dentro de la carpeta `backend`.

### 2. Crear el proyecto Vue3 en la carpeta frontend

El proyecto Vue3 ya está inicializado con la estructura básica. Solo necesitas instalar las dependencias:

```bash
docker compose run --rm frontend npm install
```

### 3. Levantar los servicios

Para levantar todos los proyectos (backend, frontend, base de datos y nginx) juntos, ejecuta:

```bash
docker compose up --build
```

Esto construirá y levantará todos los servicios definidos en el archivo `docker-compose.yml`.

## 🌐 Servicios disponibles

- **Frontend (Vue3):** [http://localhost:5173](http://localhost:5173)
- **Backend (Laravel):** [http://localhost:8081](http://localhost:8081)
- **Base de datos MySQL:** `localhost:3310`

## 🔧 Desarrollo

### Estructura del proyecto

```
nombre-proyecto/
├── backend/                   # Aplicación Laravel
│   ├── app/
│   ├── routes/
│   └── composer.json
├── frontend/                  # Aplicación Vue3
│   ├── src/
│   │   ├── views/
│   │   ├── router/
│   │   └── components/
│   ├── package.json
│   └── vite.config.js
├── docker_stack/              # Configuraciones Docker
│   ├── nginx/
│   ├── php/
│   └── vue/
├── docker-compose.yml         # Configuración principal
└── .env                       # Variables de entorno
```

### Hot Reload

- **Frontend:** Vite está configurado con hot reload automático
- **Backend:** Los cambios en PHP se reflejan automáticamente

## 📝 Notas

- Asegúrate de crear las carpetas `backend` y `frontend` antes de iniciar los servicios.
- Si ya tienes proyectos existentes, puedes copiar el código de Laravel en `backend/` y el de Vue3 en `frontend/`.
- Los comandos están preparados para funcionar con esta estructura.

## 🐛 Solución de problemas comunes

- Si tienes problemas de permisos, revisa las instrucciones específicas para Windows y Linux en este README.
- Si cambias los puertos, recuerda actualizar las referencias en los archivos de configuración y variables de entorno.

---
