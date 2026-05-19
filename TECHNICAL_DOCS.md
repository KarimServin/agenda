# Documentación Técnica y Arquitectura del Sistema
## Agenda Institucional CPCE

Este documento describe la arquitectura técnica, las decisiones de diseño y el funcionamiento interno de la aplicación web de la Agenda Institucional. Está orientado a desarrolladores y arquitectos de software que requieran dar mantenimiento o extender la funcionalidad del sistema.

---

## 1. Visión General de la Arquitectura

El sistema está diseñado siguiendo un modelo **Cliente-Servidor**. 
- **Frontend (Cliente):** Una Single Page Application (SPA) moderna desarrollada con React.js, empaquetada con Vite, que provee una interfaz reactiva e interactiva.
- **Backend (Servicios):** El sistema no posee una base de datos ni lógica de negocio directa en la capa de frontend. Toda la persistencia, validación de reglas de negocio y autenticación se realiza comunicándose con el **Backend central heredado del CPCE**, el cual expone **Web Services SOAP (XML)**.

### Flujo de Datos
1. El usuario interactúa con la interfaz (ej. solicita crear una tarea o inicia sesión).
2. El Frontend construye un payload en formato XML (`<soapenv:Envelope>`).
3. Se realiza una petición HTTP POST vía **Axios** hacia el endpoint SOAP del backend (usualmente en el puerto 8085).
4. El servidor responde con un XML que es interceptado por el Frontend.
5. El sistema utiliza `DOMParser` para convertir la respuesta XML a un formato JSON procesable por los componentes de React.

---

## 2. Estructura del Código Fuente

El código se organiza siguiendo un patrón modular basado en responsabilidades, dentro del directorio `/src`:

- `/components/`: Contiene todos los componentes visuales de la aplicación.
  - `/home/`: Vistas principales, el calendario interactivo y el formulario de creación.
  - `/login/`: Componentes relacionados con la autenticación.
  - `/layout/`: Contenedores y barras de navegación.
  - `/buttons/`: Botones reutilizables con lógica encapsulada (ej. `CreateTask.jsx`).
- `/provider/`: Implementación de la **Context API** de React. Aquí se encuentra `taskProvider.jsx`, el cual gestiona el estado global de las tareas, los filtros activos y las opciones estáticas (tipos, estados, tags, usuarios).
- `/service/`: Capa de abstracción de datos. Contiene los adaptadores que construyen los payloads SOAP, realizan la petición HTTP y parsean el XML devuelto. Se divide en módulos lógicos (ej. `sesion` y `tarea`).
- `/utils/`: Configuraciones estáticas, constantes globales (como la URL base del servidor SOAP) y funciones de ayuda genéricas.

---

## 3. Decisiones Técnicas y Patrones

### Manejo de Estado (Context API)
Se optó por utilizar React Context API (`TaskProvider`) en lugar de librerías externas complejas como Redux. El contexto envuelve toda la aplicación y provee:
- Acceso a las tareas cargadas en el calendario.
- Estado de los filtros de búsqueda.
- Listados paramétricos cacheados (tipos de tarea, usuarios, etc.) que se cargan reactivamente tras validar la sesión del usuario.

### Estilizado Híbrido (Chakra UI + Tailwind CSS)
La interfaz combina la robustez y accesibilidad de los componentes pre-construidos de **Chakra UI** (Modales, Formularios, Selects) con la flexibilidad de **Tailwind CSS** para lograr un acabado "Premium" (sombras complejas, glassmorphism, ajustes tipográficos precisos) sin escribir CSS puro.

### Autenticación y Seguridad
La sesión del usuario no es mantenida por cookies seguras debido a las restricciones del protocolo SOAP legacy. En su defecto:
1. El login devuelve un "Token de sesión" (`sesion`) y un identificador de usuario (`user`).
2. Estos datos se guardan de forma temporal en el `localStorage` del navegador.
3. En **cada petición subsecuente**, se inyectan en las cabeceras del payload XML (`<Credencial>`).
4. Existen "Guards" (verificaciones) a nivel de componente para redirigir al login si el servicio SOAP devuelve el error específico `92` (Sesión inválida/expirada).

---

## 4. Integración SOAP Específica

Debido a que el backend retorna XML, el frontend debe actuar como un traductor. Un patrón típico en la capa de `service` incluye:

1. **Interpolación de Templates:** Uso de *template literals* de JavaScript para inyectar variables en el string del XML.
2. **Control de Referencias Hash (href):** El backend a menudo optimiza la respuesta XML utilizando referencias. Si un elemento de la lista (ej. un usuario) se repite, el backend no duplica el nodo, sino que envía un atributo `href="#id"`. El parseador del frontend implementa lógica de búsqueda para reconstruir el objeto completo buscando el nodo original por su `id`.
3. **Manejo de Errores:** Se capturan los nodos `<Errorid>` y `<Errornombre>` desde el XML para estandarizar las excepciones y pasarlas de forma limpia a la UI.

---

## 5. Entorno y Despliegue

El entorno de producción se gestiona mediante **Vercel**.
- **Build Tool:** `Vite` compila el código optimizando el bundle dividiendo los chunks grandes e inyectando polyfills si es necesario.
- **Routing:** Ya que es una SPA, las configuraciones de Vercel aseguran que todas las rutas se redirijan a `index.html` para que React Router maneje la navegación.
- **Consideraciones CORS:** Para que la comunicación funcione, el servidor SOAP del CPCE debe tener las políticas CORS correctamente configuradas para aceptar peticiones provenientes del dominio de producción (`agenda-cpcesfe.vercel.app`).
