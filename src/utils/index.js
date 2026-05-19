import dayjs from 'dayjs';

// Desarrollo: 'http://localhost:8080/tarea'
// Producción: Configurable mediante variables de entorno (.env) con fallback seguro
export const SOAP_SERVER_URL = import.meta.env.VITE_SOAP_SERVER_URL || 'https://www.contadores.org.ar:8085/soap/Icpcesfe';
export const version = "1.2.0"

export const capitalizeFirstLetter = (str) => {
  if (typeof str === 'string') {
    return str.charAt(0).toUpperCase() + str.slice(1);
  } else {
    return str.format('MMMM YYYY');
  }
};

const taskColors = {
  "1": "yellow",
  "2": "blue",
  "3": "red",
  "4": "purple",
  "5": "pink",
};

const tagsColors = {
  "1": "yellow",
  "2": "blue",
  "3": "red",
  "4": "purple",
  "5": "pink",
};

// Verde, azul y naranja no los usemos
// 5 colores
// Amarillo - redes
// Rojo - Mail población especial
// Celeste - mail masivo
// Violeta - efemerides
// Rosado - Web

export const getColorForTaskType = (typeId) => {
  return taskColors[typeId] || "teal";
};

export const getColorForTags = (typeId) => {
  return tagsColors[typeId] || "teal";
};

export const downloadFile = (cuerpo, nombreArchivoConExtension) => {

  const extension = nombreArchivoConExtension.split('.').pop();

  const byteCharacters = atob(cuerpo);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);

  const blob = new Blob([byteArray]);

  const enlaceDescarga = document.createElement('a');
  enlaceDescarga.href = URL.createObjectURL(blob);

  const nombreArchivoSinExtension = nombreArchivoConExtension.replace(`.${extension}`, '');
  const nombreDescarga = `${nombreArchivoSinExtension}.${extension}`;

  enlaceDescarga.download = nombreDescarga || 'archivo';

  document.body.appendChild(enlaceDescarga);

  enlaceDescarga.click();

  document.body.removeChild(enlaceDescarga);
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0 en JavaScript
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

// Función para agrupar tareas por fecha
export const groupTasksByDate = (tasks) => {
  const groupedTasks = {};

  tasks.forEach((task) => {
    const fechaParte = task.fechav.split(' ')[0]; // Extrae la fecha de la tarea
    // Convierte la fecha al formato 'YYYY-MM-DD'
    const formattedDate = dayjs(fechaParte, 'DD/MM/YYYY').format('YYYY-MM-DD');

    if (!groupedTasks[formattedDate]) {
      groupedTasks[formattedDate] = [];
    }

    groupedTasks[formattedDate].push(task.asunto);
  });

  // Ordenar las fechas
  const sortedGroupedTasks = Object.keys(groupedTasks).sort().reduce((obj, key) => {
    obj[key] = groupedTasks[key];
    return obj;
  }, {});

  return sortedGroupedTasks;
};