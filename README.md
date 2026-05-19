# 📅 Agenda Institucional CPCE

Plataforma web de gestión de tareas y calendario institucional para el sector de comunicación del **Consejo Profesional de Ciencias Económicas (CPCE) de Santa Fe**.

🚀 **Demo en Vivo:** [https://agenda-cpcesfe.vercel.app](https://agenda-cpcesfe.vercel.app)

---

## 📋 Descripción del Proyecto

La Agenda Institucional CPCE es un sistema integral diseñado para administrar y organizar el flujo de trabajo del área de comunicación. Permite al equipo coordinar tareas complejas mediante un calendario interactivo, llevar un control estricto de los estados de cada actividad, y gestionar la privacidad y delegación a diferentes responsables.

Recientemente el proyecto atravesó un rediseño completo de UI/UX para otorgarle un aspecto mucho más elegante, serio y premium, así como una optimización profunda en el rendimiento y conexión de los servicios en la nube.

## ✨ Características Principales

- **Seguridad y Autenticación:** Inicio de sesión enlazado a los servicios Web del consejo.
- **Calendario Interactivo:** Vista de calendario elegante con soporte **Drag and Drop** para arrastrar, soltar y reprogramar tareas de forma dinámica.
- **Gestión Avanzada de Tareas:**
  - Creación rápida de tareas con selectores cargados dinámicamente.
  - Clasificación mediante tipos, etiquetas (tags) y estados.
  - Asignación de "usuarios afectados" y alcance geográfico.
  - Control de privacidad (tareas globales o privadas).
- **Control Documental:** 
  - Subida de archivos adjuntos.
  - Restricción y validación de tamaño.
  - Edición y descarga de archivos.
- **Trazabilidad:** Historial y registro detallado de modificaciones en cada evento.
- **UI/UX Premium:** Interfaz de usuario moderna que fusiona Chakra UI y utilidades avanzadas de Tailwind CSS (glassmorphism, animaciones fluidas, loaders minimalistas y paletas de colores corporativas).

## 💻 Stack Tecnológico

- **Frontend Core:** React.js, Vite
- **Estilos y UI:** Tailwind CSS, Chakra UI, Componentes Headless
- **Fechas y Tiempos:** Day.js
- **Enrutamiento:** React Router DOM
- **Llamadas a API / Datos:** Axios interactuando con un backend heredado basado en **Web Services SOAP (XML)**.
- **Despliegue:** Vercel Hosting Edge

## 🚀 Instalación y Despliegue Local

### Prerrequisitos
- Node.js (versión 18 o superior recomendada)
- Git

### Pasos

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/KarimServin/agenda.git
   cd agenda
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Abrir en tu navegador web la URL proporcionada en la terminal (por defecto `http://localhost:5173`).

### Compilar para producción
Para generar un build optimizado para producción, ejecuta:
```bash
npm run build
```

## 📸 Capturas del Sistema

- **Inicio de Sesión**
  ![Inicio de Sesión](public/Login.png)

- **Vista Home (Calendario Interactivo)**
  ![Vista Home](public/Home.png)

- **Vista Detalle de Tarea y Archivos**
  ![Vista Detalle](public/Detalle.png)

---
*Desarrollado para optimizar y modernizar los procesos internos del CPCE Santa Fe.*
