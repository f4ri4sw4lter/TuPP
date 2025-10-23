# 🚀 Guía de Instalación - Laravel + Vue3

Esta guía te ayudará a configurar y ejecutar el proyecto completo paso a paso.

## ✅ Prerrequisitos

- Docker Desktop instalado y ejecutándose
- Git (opcional)

## 📁 Estructura del Proyecto

```
laravel12-nginx-vue3/
├── backend/                   # Laravel 11 + PHP 8.2
├── frontend/                  # Vue 3 + Vite
├── docker_stack/              # Configuraciones Docker
│   ├── nginx/                 # Servidor web
│   ├── php/                   # Configuración PHP-FPM
│   └── vue/                   # Dockerfile para Vue3
├── docker-compose.yml         # Configuración principal
└── .env                       # Variables de entorno
```

## 🔧 Paso a Paso - Instalación

⚠️ **IMPORTANTE:** Ejecuta los pasos en orden. No pases al siguiente hasta que el anterior esté completo.

### 1. Clonar el repositorio

```bash
git clone <repository-url> tupp_network3-project
cd tupp_network3-project
```

### 2. Verificar estructura

Las carpetas `frontend` y `backend` ya están creadas con la estructura base.

### 3. Instalar Laravel (PASO CRÍTICO)

```bash
# IMPORTANTE: La carpeta backend debe estar vacía para este comando
# Crear proyecto Laravel en la carpeta backend
docker compose run --rm tupp_php_82 composer create-project laravel/laravel . 

# Copiar archivo de configuración
docker compose run --rm tupp_php_82 cp .env.example .env

# Generar clave de aplicación
docker compose run --rm tupp_php_82 php artisan key:generate

# Configurar permisos (importante en Linux)
docker compose run --rm tupp_php_82 chmod -R 777 storage bootstrap/cache
```

### 4. Configurar base de datos

El archivo `.env` de Laravel ya está configurado para conectar con MySQL.

### 5. Instalar dependencias de Vue3

```bash
# Instalar dependencias de Node.js
docker compose run --rm tupp_vue3 npm install
```

### 6. Levantar todos los servicios

```bash
# Construir y ejecutar todos los contenedores
docker compose up --build

# O en modo detached (en segundo plano)
docker compose up --build -d

# Esperar 1-2 minutos para que MySQL se inicie completamente
```

## 🌐 URLs de Acceso

Una vez levantados los servicios:

- **Frontend Vue3:** http://localhost:5173
- **Backend Laravel:** http://localhost:8081
- **Base de datos MySQL:** localhost:3310

## 🧪 Verificar Instalación

### Paso 1: Verificar que todos los servicios estén corriendo
```bash
docker compose ps
```
Deberías ver 4 servicios: `tupp_php_82`, `tupp_mysql_8`, `tupp_server_nginx`, `tupp_vue3`

### Paso 2: Test Backend Laravel
1. Ir a http://localhost:8081
2. Deberías ver la página de bienvenida de Laravel
3. Si ves error 500, revisar logs: `docker compose logs tupp_php_82`

### Paso 3: Test Frontend Vue3
1. Ir a http://localhost:5173
2. Deberías ver la página de bienvenida de Vue3
3. Navegar a "About" para ver información del stack
4. El botón "Probar conexión con Laravel" debería estar disponible

### Paso 4: Test Base de Datos
```bash
# Conectar a MySQL desde terminal
docker compose exec tupp_mysql_8 mysql -u admin -padmin123 bdalumnos

# O usar tu cliente MySQL favorito con:
# Host: localhost
# Puerto: 3310
# Usuario: admin
# Contraseña: admin123
# Base de datos: bdalumnos
```

### Paso 5: Test API Laravel (Opcional)
```bash
# Crear una ruta de prueba en Laravel
docker compose exec tupp_php_82 php artisan make:controller ApiController

# Luego agregar en backend/routes/api.php:
# Route::get('/test', function () {
#     return response()->json(['message' => 'API funcionando correctamente', 'timestamp' => now()]);
# });

# Probar la API
curl http://localhost:8081/api/test
```

### ✅ Checklist de Verificación
- [ ] Docker compose ps muestra 4 servicios corriendo
- [ ] Laravel carga en http://localhost:8081
- [ ] Vue3 carga en http://localhost:5173  
- [ ] Conexión a MySQL funciona
- [ ] Hot reload funciona (cambiar algo en Vue3 y ver que se actualiza)
- [ ] No hay errores en `docker compose logs`

## 🔧 Comandos Útiles

### Laravel (Backend)
```bash
# Ejecutar migraciones
docker compose exec tupp_php_82 php artisan migrate

# Crear controlador
docker compose exec tupp_php_82 php artisan make:controller ApiController

# Limpiar cache
docker compose exec tupp_php_82 php artisan cache:clear

# Ver logs
docker compose logs tupp_php_82
```

### Vue3 (Frontend)
```bash
# Instalar nueva dependencia
docker compose exec tupp_vue3 npm install <package-name>

# Compilar para producción
docker compose exec tupp_vue3 npm run build

# Ver logs
docker compose logs tupp_vue3
```

### Docker
```bash
# Ver contenedores ejecutándose
docker compose ps

# Parar todos los servicios
docker compose down

# Reconstruir servicios
docker compose up --build

# Ver logs de todos los servicios
docker compose logs -f
```

## 🐛 Solución de Problemas

### Error: "No such container" o servicio no encontrado
```bash
# Verificar que los contenedores estén corriendo
docker compose ps

# Si no están corriendo, levantarlos
docker compose up --build
```

### Error en instalación de Laravel
```bash
# Si falla el comando composer create-project
# Verificar que la carpeta backend esté vacía
ls -la backend/

# Si hay archivos, limpiar la carpeta
rm -rf backend/*
rm -rf backend/.* 2>/dev/null || true

# Intentar de nuevo
docker compose run --rm tupp_php_82 composer create-project laravel/laravel . .
```

### Error de permisos en Laravel
```bash
# Después de crear el proyecto Laravel, ajustar permisos
docker compose exec tupp_php_82 chmod -R 777 storage bootstrap/cache
```

### Vue3 no carga o errores de npm
```bash
# Limpiar node_modules y reinstalar
docker compose exec tupp_vue3 rm -rf node_modules package-lock.json
docker compose exec tupp_vue3 npm install

# O desde fuera del contenedor
docker compose run --rm tupp_vue3 npm install
```

### Puerto ocupado
```bash
# Si el puerto 5173 está ocupado
docker compose stop tupp_vue3
# Cambiar puerto en docker-compose.yml: "5174:5173"
docker compose up tupp_vue3
```

### Error de conexión a base de datos
```bash
# Verificar que MySQL esté corriendo
docker compose logs tupp_mysql_8

# Verificar variables de entorno
cat .env

# Esperar que MySQL esté completamente iniciado (puede tomar 1-2 minutos)
docker compose exec tupp_mysql_8 mysql -u root -proot123 -e "SHOW DATABASES;"
```

### Problemas con Hot Reload en Vue3
Si los cambios no se reflejan automáticamente:
```bash
# Reiniciar el servicio de frontend
docker compose restart tupp_vue3

# O verificar que el volumen esté correctamente montado
docker compose exec tupp_vue3 ls -la /app
```

### Permisos en Linux
```bash
# Si hay problemas de permisos
sudo chown -R $USER:$USER backend/
sudo chown -R $USER:$USER frontend/

# Para Laravel específicamente
sudo chown -R www-data:www-data backend/storage backend/bootstrap/cache
```

### Limpiar Docker completamente
```bash
# Limpiar contenedores y volúmenes
docker compose down -v
docker system prune -f
docker volume prune -f
docker compose up --build
```

### Verificar logs de errores
```bash
# Ver logs específicos de cada servicio
docker compose logs tupp_php_82
docker compose logs tupp_vue3
docker compose logs tupp_mysql_8
docker compose logs tupp_server_nginx

# Ver logs en tiempo real
docker compose logs -f
```

## 📝 Siguientes Pasos

1. **Configurar API Laravel:** Crear rutas API en `backend/routes/api.php`
2. **Configurar Axios:** Configurar cliente HTTP en Vue3
3. **Migraciones:** Crear tablas de base de datos
4. **Autenticación:** Implementar sistema de login
5. **Componentes Vue:** Desarrollar componentes de la aplicación

## 💡 Tips de Desarrollo

- **Hot Reload:** Tanto Laravel como Vue3 tienen hot reload habilitado
- **Logs:** Usa `docker compose logs -f <service>` para ver logs en tiempo real
- **Base de datos:** Usa herramientas como phpMyAdmin o TablePlus para gestionar MySQL
- **API Testing:** Usa Postman o Insomnia para probar APIs de Laravel

¡Listo! Tu entorno de desarrollo Laravel + Vue3 está configurado y funcionando. 🎉