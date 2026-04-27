# POS System - Punto de Venta

Sistema web completo para punto de venta (POS) desarrollado con **Angular 21** para el frontend y **Spring Boot 4** para el backend API REST.

## 📋 Descripción

Este proyecto es una solución integral para la gestión de puntos de venta, incluyendo:

- **Dashboard** - Panel de control con métricas y estadísticas
- **POS** - Interfaz de punto de venta para transacciones
- **Productos** - Gestión de inventario y productos
- **Clientes** - Administración de clientes
- **Proveedores** - Gestión de proveedores
- **Usuarios** - Control de usuarios y permisos
- **Créditos** - Sistema de créditos a clientes
- **Control de Caja** - Apertura, cierre y control de caja
- **Configuración** - Configuración general del sistema

## 🏗️ Arquitectura del Proyecto

```
/workspace
├── frontend/    # Frontend (Angular 21)
└── backend/            # Backend (Spring Boot 4)
```

---

## 🖥️ Frontend - Angular App

### Tecnologías

- **Angular** 21.1.5
- **TypeScript** ~5.9.2
- **TailwindCSS** 4.1.12
- **RxJS** ~7.8.0
- **Vitest** - Testing

### Requisitos Previos

- Node.js 18+ 
- npm 11.7.0+
- Angular CLI 21+

### Instalación

```bash
cd frontend
npm install
```

### Desarrollo

Iniciar servidor de desarrollo:

```bash
ng serve
```

La aplicación estará disponible en `http://localhost:4200/`

### Build de Producción

```bash
ng build
```

Los archivos compilados se guardarán en `dist/`.

### Características del Frontend

- ✅ Progressive Web App (PWA) con Service Worker
- ✅ Diseño responsivo con TailwindCSS
- ✅ Lazy loading de módulos
- ✅ Guards de autenticación
- ✅ Interceptores HTTP
- ✅ Manejo de estado reactivo

---

## ⚙️ Backend - Spring Boot API

### Tecnologías

- **Spring Boot** 4
- **Java** 25
- **Spring Security** con OAuth2 Resource Server
- **Spring Data JPA**
- **PostgreSQL** 18
- **Lombok**
- **SpringDoc OpenAPI** (Swagger UI)
- **Maven**

### Requisitos Previos

- JDK 25+
- Maven 3.9+
- PostgreSQL 18.3 (o usar Docker)

### Configuración

Copiar el archivo de ejemplo y configurar las variables de entorno:

```bash
cd backend
cp .env.example .env
```

Editar `.env` con tus configuraciones:

```env
SPRING_PROFILES_ACTIVE=dev

DB_HOST=localhost
DB_PORT=5432
DB_NAME=pos_system
DB_USER=postgres
DB_PASS=password

JWT_SECRET=tu_secreto_seguro
JWT_EXPIRATION=3600000
```

### Ejecución con Docker (Recomendado)

```bash
docker-compose up -d
```

Esto levantará:
- Base de datos PostgreSQL
- API Spring Boot

### Ejecución Local

```bash
./mvnw spring-boot:run
```

O construir y ejecutar el JAR:

```bash
./mvnw clean package
java -jar target/possystemapi-1.0.0.jar
```

### API Documentation

Una vez ejecutando la API, acceder a:
- **Swagger UI**: `http://localhost:8080/swagger-ui.html`
- **OpenAPI JSON**: `http://localhost:8080/v3/api-docs`

### Endpoints Principales

La API incluye endpoints para:
- `/api/auth/**` - Autenticación y autorización
- `/api/products/**` - Gestión de productos
- `/api/customers/**` - Gestión de clientes
- `/api/suppliers/**` - Gestión de proveedores
- `/api/users/**` - Gestión de usuarios
- `/api/pos/**` - Transacciones de venta
- `/api/credits/**` - Créditos
- `/api/cash-control/**` - Control de caja
- `/api/configuracion/**` - Configuración

---

## 🐳 Docker

### Backend

El backend incluye configuración Docker completa:

```bash
# Construir imagen
docker build -t pos-api .

# Ejecutar con docker-compose
docker-compose up -d
```

### Variables de Entorno

Ver `.env.example` para todas las variables requeridas.

---

## 🔐 Seguridad

- Autenticación basada en JWT (JSON Web Tokens)
- OAuth2 Resource Server
- Roles y permisos configurables
- Encriptación de contraseñas
- CORS configurado para el frontend

---

## 📦 Estructura de la Base de Datos

El sistema utiliza PostgreSQL con las siguientes entidades principales:

- Usuarios
- Roles y Permisos
- Productos
- Categorías
- Clientes
- Proveedores
- Ventas
- Detalles de Venta
- Créditos
- Pagos
- Control de Caja
- Configuración

---

## 📝 Licencia

Este proyecto está bajo licencia de código abierto. Todos los derechos reservados.

---

## 👨‍💻 Desarrollo

### Agregar nuevas características

1. **Backend**: Crear Controller, Service, Repository y Entity
2. **Frontend**: Crear componentes, servicios y modelos correspondientes
3. Actualizar rutas y guards si es necesario

### Convenciones de Código

- **Backend**: Seguir estándares de Spring Boot y Java
- **Frontend**: Seguir guías de estilo de Angular
- Usar TypeScript strict mode
- Implementar tests para nuevas funcionalidades

---

## 📌 Versión

- **Frontend**: 1.0.0-SNAPSHOT
- **Backend**: 1.0.0-SNAPSHOT

---

Desarrollado usando Angular y Spring Boot
