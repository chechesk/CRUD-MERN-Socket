# CRUD-MERN-Socket
Este es un proyecto basado en el stack **MERN** (MongoDB, Express, React, Node.js) que implementa **Sockets** para manejar la comunicación en tiempo real. El proyecto incluye funcionalidades de **CRUD**, autenticación, pruebas unitarias, control de versiones y está preparado para despliegue con Docker.

---

## Tabla de Contenidos
- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Uso](#uso)
- [Documentación](#documentación)
- [Pruebas Unitarias](#pruebas-unitarias)
- [Docker](#docker)
- [Contribución](#contribución)
- [Licencia](#licencia)

---

## Características
- **Backend:**
  - API RESTful para manejar operaciones CRUD.
  - Manejo de autenticación con contraseñas encriptadas.
  - Documentación de rutas con Swagger API.
  - Pruebas unitarias para garantizar calidad.
  - Base de MongoDB Atlas con conexion con moongose
- **Frontend:**
  - Interfaz creada con **React** y **Vite**.
  - Estilizado con **TailwindCSS**.
  - Navegación gestionada con **React Router v7**.
- **DevOps:**
  - Contenedores para backend y frontend configurados con Docker y Docker Compose.

---

## Tecnologías Utilizadas

### Backend
- **Node.js** y **Express** como framework principal.
- **MongoDB** como base de datos.
- **Mongoose** para modelar datos.
- **bcrypt** para encriptación de contraseñas.
- **Swagger API** para documentar las rutas.
- **Jest** y **Supertest** para pruebas unitarias.

### Frontend
- **Vite** para desarrollo rápido y eficiente.
- **React** como biblioteca principal.
- **TailwindCSS** para estilizado moderno.
- **React Router v7** para manejo de rutas.

### DevOps
- **Docker** y **Docker Compose** para despliegue y gestión de entornos.

---

## Estructura del Proyecto

CRUD-MERN-Socket/
 ├── backend/ │ 
 ├── src/ │ 
 ├── controllers/ │ 
 ├── models/ │ 
 ├── routes/ │ 
 ├── tests/  │
 
 ├── frontend/ │ 
 ├── src/ │ │ 
 ├── components/ │ 
 ├── pages/ │ 
 ├── App.tsx │ 
 ├── public/ │

 ├── docker-compose.yml │
 ├── README.md │

 
---

## Requisitos Previos
- **Node.js** versión 16 o superior.
- **Docker** y **Docker Compose** instalados.
- Conexión a una base de datos MongoDB (local o en la nube).

---

## Instalación

### 1. Clonar el Repositorio
```bash
git clone https://github.com/chechesk/CRUD-MERN-Socket.git
cd CRUD-MERN-Socket

2. Configurar Variables de Entorno
Crea un archivo .env en las carpetas backend y frontend siguiendo los ejemplos provistos (.env.example).

3. Instalar Dependencias
Backend:
cd backend
npm install

Frontend:
cd frontend
npm install

Uso
Ejecutar el Proyecto Localmente
Backend:
cd backend
npm start
El servidor se ejecutará en el puerto 3001.

Frontend:
cd frontend
npm run dev
La aplicación estará disponible en el puerto 5173.

Documentación
Las rutas del backend están documentadas con Swagger API. Una vez que el servidor esté corriendo, puedes acceder a la documentación en:
http://localhost:3001/api-docs

Pruebas Unitarias
Para ejecutar las pruebas en el backend, usa el siguiente comando:
cd backend
npm run test

Docker
El proyecto incluye un archivo docker-compose.yml que configura los servicios de backend y frontend.

Construir y Ejecutar los Contenedores
docker-compose up --build

Puertos
Backend: 3001
Frontend: 5173

Contribución
Si deseas contribuir, por favor abre un issue o envía un pull request con tus mejoras o sugerencias.