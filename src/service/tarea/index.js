import axios from "axios";
import { SOAP_SERVER_URL } from "../../utils";

export const checkTaskService = async (dateStart, dateEnd, tags, tarea, afecta, estado, asunto, orden, origen, privado) => {
  try {
    const soapRequest = `
      <soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:cpcesfeIntf-Icpcesfe">
        <soapenv:Header/>
        <soapenv:Body>
          <urn:nube_consultareas soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
            <Credencial xsi:type="urn:Tcredencial" xmlns:urn="urn:cpcesfeIntf">
              <Usuario xsi:type="xsd:string">${localStorage.getItem("user") || ""}</Usuario>
              <Sesion xsi:type="xsd:string">${localStorage.getItem("sesion") || ""}</Sesion>
              <Origen xsi:type="xsd:string">WEB</Origen>
            </Credencial>
            <Fechad xsi:type="xsd:string"></Fechad>
            <Fechah xsi:type="xsd:string"></Fechah>
            <Vfechad xsi:type="xsd:string">${dateStart || ""}</Vfechad>
            <Vfechah xsi:type="xsd:string">${dateEnd || ""}</Vfechah>
            <Tags xsi:type="xsd:string">${tags || ""}</Tags>
            <Tarea xsi:type="xsd:string">${tarea || ""}</Tarea>
            <Asunto xsi:type="xsd:string">${asunto || ""}</Asunto>
            <Afecta xsi:type="xsd:string">${afecta || ""}</Afecta>
            <Orden xsi:type="xsd:string">${orden || ""}</Orden>
            <Origen xsi:type="xsd:string">${origen || ""}</Origen>
            <Estado xsi:type="xsd:string">${estado || ""}</Estado>
            <Privado xsi:type="xsd:string">${privado || ""}</Privado>
          </urn:nube_consultareas>
        </soapenv:Body>
      </soapenv:Envelope>`;

    const response = await axios.post(SOAP_SERVER_URL, soapRequest);
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response.data, 'text/xml');

    const erroridNode = xmlDoc.querySelector('Errorid');
    const errornombreNode = xmlDoc.querySelector('Errornombre');
    const errorid = erroridNode?.textContent || "";
    const errornombre = errornombreNode?.textContent || "";

    let items = xmlDoc.querySelectorAll('item');
    let itemData = [];

    // Verificar si los items tienen referencias 'href'
    if (items.length > 0 && items[0].getAttribute('href')) {
      // Resuelve referencias de 'href' y busca nodos por id
      items.forEach((item) => {
        const hrefId = item.getAttribute('href').replace("#", "");
        const referencedNode = xmlDoc.querySelector(`[id="${hrefId}"]`);
        if (referencedNode) {
          const itemDataExtracted = extractItemData(referencedNode);
          itemData.push(itemDataExtracted);
        }
      });
    } else {
      // Si no hay 'href', procesa los items directamente
      items.forEach((item) => {
        const itemDataExtracted = extractItemData(item);
        itemData.push(itemDataExtracted);
      });
    }

    const jsonData = {
      Errorid: errorid,
      Errornombre: errornombre,
      items: itemData,
    };

    return jsonData;

  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Función auxiliar para extraer datos del nodo de tarea
function extractItemData(item) {
  const orden = item.querySelector('Orden')?.textContent || "";
  const tag = item.querySelector('Tag')?.textContent || "";
  const tarea = item.querySelector('Tarea')?.textContent || "";
  const taread = item.querySelector('Taread')?.textContent || "";
  const asunto = item.querySelector('Asunto')?.textContent || "";
  const alcance = item.querySelector('Alcance')?.textContent || "";
  const origen = item.querySelector('Origen')?.textContent || "";
  const fechai = item.querySelector('Fechai')?.textContent || "";
  const fecha = item.querySelector('Fecha')?.textContent || "";
  const fechav = item.querySelector('Fechav')?.textContent || "";
  const usuario = item.querySelector('Usuario')?.textContent || "";
  const cuerpo = item.querySelector('Cuerpo')?.textContent || "";
  const afecta = item.querySelector('Afecta')?.textContent || "";
  const estado = item.querySelector('Estado')?.textContent || "";
  const estadod = item.querySelector('Estadod')?.textContent || "";
  const estadof = item.querySelector('Estadof')?.textContent || "";
  const afectado = item.querySelector('Afectado')?.textContent || "";
  const privado = item.querySelector('Privado')?.textContent || "";

  return {
    orden,
    tag,
    tarea,
    taread,
    asunto,
    alcance,
    origen,
    fechai,
    fecha,
    fechav,
    usuario,
    cuerpo,
    afecta,
    estado,
    estadod,
    estadof,
    afectado,
    privado
  };
}



export const checkSoapForEditTaskService = async (orden) => {
  try {
    const soapRequest = `
      <soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:cpcesfeIntf-Icpcesfe">
        <soapenv:Header/>
        <soapenv:Body>
          <urn:nube_consultareas soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
            <Credencial xsi:type="urn:Tcredencial" xmlns:urn="urn:cpcesfeIntf">
              <Usuario xsi:type="xsd:string">${localStorage.getItem("user") ? localStorage.getItem("user") : ""}</Usuario>
              <Sesion xsi:type="xsd:string">${localStorage.getItem("sesion") ? localStorage.getItem("sesion") : ""}</Sesion>
              <Origen xsi:type="xsd:string">WEB</Origen>
            </Credencial>
            <Fechad xsi:type="xsd:string"></Fechad>
            <Fechah xsi:type="xsd:string"></Fechah>
            <Vfechad xsi:type="xsd:string"></Vfechad>
            <Vfechah xsi:type="xsd:string"></Vfechah>
            <Tags xsi:type="xsd:string"></Tags>
            <Tarea xsi:type="xsd:string"></Tarea>
            <Asunto xsi:type="xsd:string"></Asunto>
            <Afecta xsi:type="xsd:string"></Afecta>
            <Orden xsi:type="xsd:string">${orden ? orden : ""}</Orden>
          </urn:nube_consultareas>
        </soapenv:Body>
      </soapenv:Envelope>`;

    const response = await axios.post(SOAP_SERVER_URL, soapRequest);
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response.data, 'text/xml');

    const erroridNode = xmlDoc.querySelector('Errorid');
    const errornombreNode = xmlDoc.querySelector('Errornombre');

    const errorid = erroridNode ? erroridNode.textContent : "";
    const errornombre = errornombreNode ? errornombreNode.textContent : "";



    const jsonData = {
      Errorid: errorid,
      Errornombre: errornombre,
      items: response.data,
    };

    return jsonData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const getTaskForOrder = async (orden) => {

  try {
    const soapRequest = `
      <soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:cpcesfeIntf-Icpcesfe">
        <soapenv:Header/>
        <soapenv:Body>
            <urn:nube_consultareasf soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
              <Credencial xsi:type="urn:Tcredencial" xmlns:urn="urn:cpcesfeIntf">
                  <Usuario xsi:type="xsd:string">${localStorage.getItem("user") ? localStorage.getItem("user") : ""}</Usuario>
                  <Sesion xsi:type="xsd:string">${localStorage.getItem("sesion") ? localStorage.getItem("sesion") : ""}</Sesion>
                  <Origen xsi:type="xsd:string">web</Origen>
              </Credencial>
              <Orden xsi:type="xsd:string">${orden ?? ""}</Orden>
            </urn:nube_consultareasf>
        </soapenv:Body>
      </soapenv:Envelope>`;

    const response = await axios.post(SOAP_SERVER_URL, soapRequest);
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response.data, 'text/xml');

    const erroridNode = xmlDoc.querySelector('Errorid');
    const errornombreNode = xmlDoc.querySelector('Errornombre');

    const errorid = erroridNode ? erroridNode.textContent : "";
    const errornombre = errornombreNode ? errornombreNode.textContent : "";

    const items = xmlDoc.querySelectorAll('item');
    const itemData = Array.from(items).map(item => {
      const orden = item.querySelector('Orden')?.textContent;
      const tag = item.querySelector('Tag')?.textContent;
      const tarea = item.querySelector('Tarea')?.textContent;
      const taread = item.querySelector('Taread')?.textContent;
      const asunto = item.querySelector('Asunto')?.textContent;
      const alcance = item.querySelector('Alcance')?.textContent;
      const origen = item.querySelector('Origen')?.textContent;
      const fechai = item.querySelector('Fechai')?.textContent;
      const fecha = item.querySelector('Fecha')?.textContent;
      const fechav = item.querySelector('Fechav')?.textContent;
      const usuario = item.querySelector('Usuario')?.textContent;
      const cuerpo = item.querySelector('Cuerpo')?.textContent;
      const afecta = item.querySelector('Afecta')?.textContent;
      const estado = item.querySelector('Estado')?.textContent;
      const estadod = item.querySelector('Estadod')?.textContent;
      const estadof = item.querySelector('Estadof')?.textContent;
      const afectado = item.querySelector('Afectado')?.textContent;
      return { origen, orden, tarea, taread, asunto, alcance, tag, fecha, fechav, usuario, cuerpo, afecta, estado, fechai, estadod, estadof, afectado };
    });

    const jsonData = {
      Errorid: errorid,
      Errornombre: errornombre,
      items: itemData,
    };

    return jsonData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createTaskService = async (options) => {
  console.log(options)
  try {
    const soapRequest =
      `<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:cpcesfeIntf-Icpcesfe">
      <soapenv:Header/>
      <soapenv:Body>
         <urn:nube_altatareas soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
            <Credencial xsi:type="urn:Tcredencial" xmlns:urn="urn:cpcesfeIntf">
               <Usuario xsi:type="xsd:string">${localStorage.getItem("user")}</Usuario>
               <Sesion xsi:type="xsd:string">${localStorage.getItem("sesion")}</Sesion>
               <Origen xsi:type="xsd:string">WEB</Origen>
            </Credencial>
            <Items xsi:type="urn:TnubetareasItems" xmlns:urn="urn:cpcesfeIntf">
               <Orden xsi:type="xsd:string">${options?.Orden || ""}</Orden>
               <Tag xsi:type="xsd:string">${options?.Tag || ""}</Tag>
               <Tarea xsi:type="xsd:string">${options?.Tarea || ""}</Tarea>
               <Taread xsi:type="xsd:string">${options?.Taread || ""}</Taread>
               <Asunto xsi:type="xsd:string">${options?.Asunto || ""}</Asunto>
               <Origen xsi:type="xsd:string">${options?.Origen || ""}</Origen>
               <Fechai xsi:type="xsd:string">${options?.Fechai || ""}</Fechai>
               <Fecha xsi:type="xsd:string">${options.Fecha || ''}</Fecha>
               <Fechav xsi:type="xsd:string">${options.Fechav || ""}</Fechav>
               <Alcance xsi:type="xsd:string">${options?.Alcance || ""}</Alcance>
               <Usuario xsi:type="xsd:string">${options?.Usuario || ""}</Usuario>
               <Cuerpo xsi:type="xsd:string">${options?.Cuerpo || ""}</Cuerpo>
               <Afecta xsi:type="xsd:string">${options?.Afecta || ""}</Afecta>
               <Estado xsi:type="xsd:string">${options?.Estado || ""}</Estado>
               <Estadod xsi:type="xsd:string"></Estadod>
               <Estadof xsi:type="xsd:string"></Estadof>
               <Afectado xsi:type="xsd:string"></Afectado>
               <Privado xsi:type="xsd:string">${options?.Privado}</Privado>
            </Items>
         </urn:nube_altatareas>
      </soapenv:Body>
   </soapenv:Envelope>`;
    console.log(soapRequest)

    const response = await axios.post(SOAP_SERVER_URL, soapRequest);
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response.data, 'text/xml');
    const erroridNode = xmlDoc.querySelector('Errorid');
    const errornombreNode = xmlDoc.querySelector('Errornombre');
    const idNode = xmlDoc.querySelector('Id')

    const errorid = erroridNode ? erroridNode.textContent : "";
    const errornombre = errornombreNode ? errornombreNode.textContent : "";
    const id = idNode ? idNode.textContent : "";

    const jsonData = {
      Errorid: errorid ?? "",
      Errornombre: errornombre ?? "",
      id: id ?? ""
    };

    return jsonData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//TIPOS DE TAREAS
export const typesTasksService = async () => {
  try {
    const soapRequest = `<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:cpcesfeIntf-Icpcesfe">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:nube_nubetareas soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
          <Credencial xsi:type="urn:Tcredencial" xmlns:urn="urn:cpcesfeIntf">
             <Usuario xsi:type="xsd:string">${localStorage.getItem("user")}</Usuario>
             <Sesion xsi:type="xsd:string">${localStorage.getItem("sesion")}</Sesion>
             <Origen xsi:type="xsd:string">WEB</Origen>
          </Credencial>
       </urn:nube_nubetareas>
    </soapenv:Body>
 </soapenv:Envelope>`;

    const response = await axios.post(SOAP_SERVER_URL, soapRequest);
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response.data, "text/xml");

    const erroridNode = xmlDoc.querySelector("Errorid");
    const errornombreNode = xmlDoc.querySelector("Errornombre");

    const errorid = erroridNode?.textContent;
    const errornombre = errornombreNode?.textContent;

    let items = xmlDoc.querySelectorAll("item");
    let itemData = [];

    // Si los items tienen referencias (href), resolver los IDs referenciados
    if (items.length > 0 && items[0].getAttribute("href")) {
      // Resolvemos las referencias
      items.forEach((item) => {
        const hrefId = item.getAttribute("href").replace("#", "");
        const referencedNode = xmlDoc.querySelector(`[id="${hrefId}"]`);
        if (referencedNode) {
          const codigo = referencedNode.querySelector("Codigo")?.textContent;
          const codigod = referencedNode.querySelector("Codigod")?.textContent;
          itemData.push({ codigo, codigod });
        }
      });
    } else {
      // Estructura directa con <Codigo> y <Codigod> dentro de <item>
      items.forEach((item) => {
        const codigo = item.querySelector("Codigo")?.textContent;
        const codigod = item.querySelector("Codigod")?.textContent;
        itemData.push({ codigo, codigod });
      });
    }

    const jsonData = {
      Errorid: errorid,
      Errornombre: errornombre,
      items: itemData,
    };

    return jsonData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


//TAGS DE TAREAS
export const tagService = async () => {
  const soapRequest =
    `<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:cpcesfeIntf-Icpcesfe">
      <soapenv:Header/>
      <soapenv:Body>
        <urn:nube_nubetags soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
          <Credencial xsi:type="urn:Tcredencial" xmlns:urn="urn:cpcesfeIntf">
            <Usuario xsi:type="xsd:string">${localStorage.getItem("user") || ""}</Usuario>
            <Sesion xsi:type="xsd:string">${localStorage.getItem("sesion") || ""}</Sesion>
            <Origen xsi:type="xsd:string">WEB</Origen>
          </Credencial>
        </urn:nube_nubetags>
      </soapenv:Body>
    </soapenv:Envelope>`;

  try {
    const response = await axios.post(SOAP_SERVER_URL, soapRequest);
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response.data, 'text/xml');

    const erroridNode = xmlDoc.querySelector('Errorid');
    const errornombreNode = xmlDoc.querySelector('Errornombre');

    const errorid = erroridNode?.textContent;
    const errornombre = errornombreNode?.textContent;

    let tags = [];

    // Verifica si la estructura contiene referencias href o elementos directos
    const itemNodes = xmlDoc.querySelectorAll('item');
    if (itemNodes.length > 0 && itemNodes[0].getAttribute('href')) {
      // Si los items tienen href, buscar por ID en lugar de usar querySelector
      itemNodes.forEach(itemNode => {
        const hrefId = itemNode.getAttribute('href').replace('#', ''); // Remover el '#' del href
        const referencedNode = xmlDoc.querySelector(`[id="${hrefId}"]`); // Buscar el nodo con el atributo id
        const tagNode = referencedNode?.querySelector('Tag');
        if (tagNode) {
          tags.push(tagNode.textContent);
        }
      });
    } else {
      // Estructura directa con <Tag> dentro de <item>
      const tagNodes = xmlDoc.querySelectorAll('Tag');
      tagNodes.forEach(tagNode => {
        const tag = tagNode.textContent;
        tags.push(tag);
      });
    }

    const jsonData = {
      Errorid: errorid,
      Errornombre: errornombre,
      tags: tags,
    };

    return jsonData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};




//ESTADOS DE TAREAS
export const statusTasksService = async () => {
  try {
    const soapRequest = `<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:cpcesfeIntf-Icpcesfe">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:nube_nubeestados soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
         <Credencial xsi:type="urn:Tcredencial" xmlns:urn="urn:cpcesfeIntf">
            <Usuario xsi:type="xsd:string">${localStorage.getItem('user')}</Usuario>
            <Sesion xsi:type="xsd:string">${localStorage.getItem('sesion')}</Sesion>
            <Origen xsi:type="xsd:string">web</Origen>
         </Credencial>
      </urn:nube_nubeestados>
   </soapenv:Body>
</soapenv:Envelope>`;
    const response = await axios.post(SOAP_SERVER_URL, soapRequest);

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response.data, "text/xml");

    const erroridNode = xmlDoc.querySelector("Errorid");
    const errornombreNode = xmlDoc.querySelector("Errornombre");

    const errorid = erroridNode?.textContent;
    const errornombre = errornombreNode?.textContent;

    const items = xmlDoc.querySelectorAll("item");
    const itemData = Array.from(items).map((item) => {
      const codigo = item.querySelector("Codigo")?.textContent;
      const codigod = item.querySelector("Denominacion")?.textContent;
      return { codigo, codigod };
    });

    const jsonData = {
      Errorid: errorid,
      Errornombre: errornombre,
      items: itemData,
    };

    return jsonData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const stateTaskService = async (orden, estado) => {

  try {
    const soapRequest =
      `<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:cpcesfeIntf-Icpcesfe">
        <soapenv:Header/>
        <soapenv:Body>
           <urn:nube_estadotareas soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
              <Credencial xsi:type="urn:Tcredencial" xmlns:urn="urn:cpcesfeIntf">
                 <Usuario xsi:type="xsd:string">${localStorage.getItem("user")}</Usuario>
                 <Sesion xsi:type="xsd:string">${localStorage.getItem("sesion")}</Sesion>
                 <Origen xsi:type="xsd:string">WEB</Origen>
              </Credencial>
              <Tarea xsi:type="xsd:string">${orden}</Tarea>
              <Estado xsi:type="xsd:string">${estado}</Estado>
           </urn:nube_estadotareas>
        </soapenv:Body>
     </soapenv:Envelope>`;

    const response = await axios.post(SOAP_SERVER_URL, soapRequest);

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response.data, 'text/xml');

    const erroridNode = xmlDoc.querySelector('Errorid');
    const errornombreNode = xmlDoc.querySelector('Errornombre');

    const errorid = erroridNode?.textContent;
    const errornombre = errornombreNode?.textContent;

    const jsonData = {
      Errorid: errorid,
      Errornombre: errornombre,
    };

    return jsonData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//GESTIÓN DE ARCHIVOS
export const uploadFileService = async (options) => {

  const soapRequest = `<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:cpcesfeIntf-Icpcesfe">
    <soapenv:Header/>
    <soapenv:Body>
    <urn:nube_altatareasf soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
    <Credencial xsi:type="urn:Tcredencial" xmlns:urn="urn:cpcesfeIntf">
    <Usuario xsi:type="xsd:string">${localStorage.getItem("user") || ""}</Usuario>
    <Sesion xsi:type="xsd:string">${localStorage.getItem("sesion") || ""}</Sesion>
    <Origen xsi:type="xsd:string">WEB</Origen>
    </Credencial>
    <Items xsi:type="urn:TnubetareasfItems" xmlns:urn="urn:cpcesfeIntf">
    <Orden xsi:type="xsd:string"></Orden>
    <Tarea xsi:type="xsd:string">${options.Tarea}</Tarea>
    <Asunto xsi:type="xsd:string">${options.Asunto}</Asunto>
    <Archivo xsi:type="xsd:string">${options.Archivo}</Archivo>
    <Cuerpo xsi:type="xsd:string">${options.Cuerpo}</Cuerpo>
    <Estado xsi:type="xsd:string"></Estado>
    <Estadod xsi:type="xsd:string"></Estadod>
    <Estadof xsi:type="xsd:string"></Estadof>
    </Items>
    </urn:nube_altatareasf>
    </soapenv:Body>
    </soapenv:Envelope>`;
  try {
    const response = await axios.post(SOAP_SERVER_URL, soapRequest);

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response.data, 'text/xml');

    const erroridNode = xmlDoc.querySelector('Errorid');
    const errornombreNode = xmlDoc.querySelector('Errornombre');
    const idNode = xmlDoc.querySelector('Id');

    const errorid = erroridNode?.textContent;
    const errornombre = errornombreNode?.textContent;
    const id = idNode?.textContent;

    const jsonData = {
      Errorid: errorid,
      Errornombre: errornombre,
      id: id
    };

    return jsonData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getFileService = async (options) => {
  try {
    const soapRequest = `<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:cpcesfeIntf-Icpcesfe">
        <soapenv:Header/>
        <soapenv:Body>
           <urn:nube_consultatareasf soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
              <Credencial xsi:type="urn:Tcredencial" xmlns:urn="urn:cpcesfeIntf">
                 <Usuario xsi:type="xsd:string">${localStorage.getItem("user") || ""}</Usuario>
                 <Sesion xsi:type="xsd:string">${localStorage.getItem("sesion") || ""}</Sesion>
                 <Origen xsi:type="xsd:string">WEB</Origen>
              </Credencial>
              <Tarea xsi:type="xsd:string">${options.Tarea}</Tarea>
              <Orden xsi:type="xsd:string">${options.Orden || ""}</Orden>
           </urn:nube_consultatareasf>
        </soapenv:Body>
     </soapenv:Envelope>`;

    const response = await axios.post(SOAP_SERVER_URL, soapRequest);
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response.data, "text/xml");

    const erroridNode = xmlDoc.querySelector("Errorid");
    const errornombreNode = xmlDoc.querySelector("Errornombre");

    const errorid = erroridNode?.textContent || null;
    const errornombre = errornombreNode?.textContent || null;

    let items = [];

    // Opción 1: Verifica si hay referencias con href
    const hrefNode = xmlDoc.querySelector("return[href]");
    if (hrefNode) {
      // Encuentra el nodo referenciado por el href (por ejemplo, href="#1")
      const refId = hrefNode.getAttribute('href').substring(1); // Elimina el "#" del id
      const linkedNode = xmlDoc.getElementById(refId);

      if (linkedNode) {
        const itemNodes = linkedNode.querySelectorAll("item");
        items = Array.from(itemNodes).map(() => {
          const asunto = xmlDoc.querySelector(`Asunto`)?.textContent;
          const archivo = xmlDoc.querySelector(`Archivo`)?.textContent;
          const cuerpo = xmlDoc.querySelector(`Cuerpo`)?.textContent;
          const orden = xmlDoc.querySelector(`Orden`)?.textContent;
          return { asunto, archivo, cuerpo, orden };
        });
      }
    } else {
      // Opción 2: Los items están directamente dentro de <return>
      const itemNodes = xmlDoc.querySelectorAll("item");
      items = Array.from(itemNodes).map((item) => {
        const asunto = item.querySelector("Asunto")?.textContent;
        const archivo = item.querySelector("Archivo")?.textContent;
        const cuerpo = item.querySelector("Cuerpo")?.textContent;
        const orden = item.querySelector("Orden")?.textContent;
        return { asunto, archivo, cuerpo, orden };
      });
    }

    const jsonData = {
      Errorid: errorid,
      Errornombre: errornombre,
      items,
    };

    return jsonData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


//USUARIOS INVOLUCRADOS EN LAS TAREAS
export const usersService = async () => {
  const soapRequest = `<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:cpcesfeIntf-Icpcesfe">
                <soapenv:Header/>
                <soapenv:Body>
                <urn:base_usuarios soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
                    <Credencial xsi:type="urn:Tcredencial" xmlns:urn="urn:cpcesfeIntf">
                        <Usuario xsi:type="xsd:string">${localStorage.getItem("user") || ""}</Usuario>
                        <Sesion xsi:type="xsd:string">${localStorage.getItem("sesion") || ""}</Sesion>
                        <Origen xsi:type="xsd:string">WEB</Origen>
                    </Credencial>
                    <Origen xsi:type="xsc:string">T</Origen>
                    <Busca xsi:type="xsd:string"></Busca>
                </urn:base_usuarios>
                </soapenv:Body>
            </soapenv:Envelope>`;

  try {
    const response = await axios.post(SOAP_SERVER_URL, soapRequest);

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response.data, "text/xml");

    const erroridNode = xmlDoc.querySelector("Errorid");
    const errornombreNode = xmlDoc.querySelector("Errornombre");

    const errorid = erroridNode?.textContent;
    const errornombre = errornombreNode?.textContent;

    let items = xmlDoc.querySelectorAll("item");
    let itemData = [];

    // Verifica si los items tienen referencias 'href'
    if (items.length > 0 && items[0].getAttribute('href')) {
      // Resuelve referencias de 'href' y busca nodos por id
      items.forEach((item) => {
        const hrefId = item.getAttribute('href').replace("#", "");
        const referencedNode = xmlDoc.querySelector(`[id="${hrefId}"]`);
        if (referencedNode) {
          const itemDataExtracted = extractUserData(referencedNode);
          itemData.push(itemDataExtracted);
        }
      });
    } else {
      // Si no hay 'href', procesa los items directamente
      items.forEach((item) => {
        const itemDataExtracted = extractUserData(item);
        itemData.push(itemDataExtracted);
      });
    }

    const jsonData = {
      Errorid: errorid,
      Errornombre: errornombre,
      items: itemData,
    };

    return jsonData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

function extractUserData(item) {
  if (typeof window !== "undefined" && !window.loggedUserXml) {
    console.log("DEBUG - User XML Node structure:", item.outerHTML || new XMLSerializer().serializeToString(item));
    window.loggedUserXml = true;
  }
  const codigo = item.querySelector("Codigo")?.textContent || "";
  const denominacion = item.querySelector("Denominacion")?.textContent || "";

  return {
    codigo,
    denominacion
  };
}


export const userInfoService = async () => {
  const soapRequest = `<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:cpcesfeIntf-Icpcesfe">
            <soapenv:Header/>
            <soapenv:Body>
               <urn:ConsultaMatricula soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
                  <Credencial xsi:type="urn:Tcredencial" xmlns:urn="urn:cpcesfeIntf">
                     <Usuario xsi:type="xsd:string">${localStorage.getItem("user")}</Usuario>
                     <Sesion xsi:type="xsd:string">${localStorage.getItem("sesion")}</Sesion>
                     <Origen xsi:type="xsd:string">WEB</Origen>
                  </Credencial>
                  <Matricula xsi:type="urn:Tmatricula" xmlns:urn="urn:cpcesfeIntf">
                     <Tipo xsi:type="xsd:string">${localStorage.getItem("type")}</Tipo>
                     <Numero xsi:type="xsd:string">${localStorage.getItem("number")}</Numero>
                  </Matricula>
               </urn:ConsultaMatricula>
            </soapenv:Body>
         </soapenv:Envelope>`;
  try {
    const response = await axios.post(SOAP_SERVER_URL, soapRequest);

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response.data, "text/xml");

    const errorid = xmlDoc.getElementsByTagName("Errorid")[0].textContent;
    const errornombre =
      xmlDoc.getElementsByTagName("Errornombre")[0].textContent;
    const tipo = xmlDoc.getElementsByTagName("Tipo")[0].textContent;
    const numero = xmlDoc.getElementsByTagName("Numero")[0].textContent;
    const denominacion =
      xmlDoc.getElementsByTagName("Denominacion")[0].textContent;
    const email = xmlDoc.getElementsByTagName("Email")[0].textContent;
    const cuit = xmlDoc.getElementsByTagName("Cuit")[0].textContent;
    const alta = xmlDoc.getElementsByTagName("Alta")[0].textContent;

    const jsonData = {
      Errorid: errorid,
      Errornombre: errornombre,
      Tipo: tipo,
      Numero: numero,
      Denominacion: denominacion,
      Email: email,
      Cuit: cuit,
      Alta: alta,
    };
    return jsonData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteTaskService = async ({ usuario, sesion, tarea }) => {
  const soapRequest = `<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:cpcesfeIntf-Icpcesfe">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:nube_borratareas soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
         <Credencial xsi:type="urn:Tcredencial" xmlns:urn="urn:cpcesfeIntf">
            <Usuario xsi:type="xsd:string">${usuario}</Usuario>
            <Sesion xsi:type="xsd:string">${sesion}</Sesion>
            <Origen xsi:type="xsd:string">WEB</Origen>
         </Credencial>
         <Tarea xsi:type="xsd:string">${tarea}</Tarea>
         <Estado xsi:type="xsd:string"></Estado>
      </urn:nube_borratareas>
   </soapenv:Body>
</soapenv:Envelope>`;
  try {
    const response = await axios.post(SOAP_SERVER_URL, soapRequest);

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response.data, "text/xml");

    const errorid = xmlDoc.getElementsByTagName("Errorid")[0].textContent;
    const errornombre = xmlDoc.getElementsByTagName("Errornombre")[0].textContent;

    const jsonData = {
      Errorid: errorid,
      Errornombre: errornombre,
    };
    return jsonData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
