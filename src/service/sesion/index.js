import axios from "axios";
import { MD5 } from "crypto-js";
import { SOAP_SERVER_URL } from "../../utils";

export const loginRequest = async (user, password) => {
  const hashedPassword = MD5(password).toString();
  const soapRequest = `
    <soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:cpcesfeIntf-Icpcesfe">
      <soapenv:Header/>
        <soapenv:Body>
          <urn:Acceso soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
              <Usuario xsi:type="urn:TUsuario" xmlns:urn="urn:cpcesfeIntf">
                <Usuario xsi:type="xsd:string">${user ? user : ""}</Usuario>
                <Clave xsi:type="xsd:string">${hashedPassword ? hashedPassword : ""}</Clave>
                <Sesion xsi:type="xsd:string"></Sesion>
                <Ip xsi:type="xsd:string"></Ip>
                <Pc xsi:type="xsd:string"></Pc>
                <Latitud xsi:type="xsd:string"></Latitud>
                <Longitud xsi:type="xsd:string"></Longitud>
                <Origen xsi:type="xsd:string">WEB</Origen>
                <Llave xsi:type="xsd:string"></Llave>
                <Version xsi:type="xsd:string"></Version>
                <Token xsi:type="xsd:string"></Token>
              </Usuario>
          </urn:Acceso>
        </soapenv:Body>
    </soapenv:Envelope>`;

  try {
    const response = await axios.post(SOAP_SERVER_URL, soapRequest);

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response.data, 'text/xml');

    const getNodeText = (tag) => {
      const nodes = xmlDoc.getElementsByTagName(tag);
      return nodes.length > 0 ? nodes[0].textContent : "";
    };

    const faultString = getNodeText('faultstring') || getNodeText('error');
    if (faultString) {
      throw new Error(faultString);
    }

    const errorid = getNodeText('Errorid');
    const errornombre = getNodeText('Errornombre');
    if (errorid && errorid !== "0" && errorid !== "") {
      throw new Error(errornombre || "Error desconocido del servidor");
    }

    const tipo = getNodeText('Tipo');
    const numero = getNodeText('Numero');
    const parentesco = getNodeText('Parentesco');
    const denominacion = getNodeText('Denominacion');
    const socio = getNodeText('Socio');
    const estado = getNodeText('Estado');
    const estadod = getNodeText('Estadod');
    const demo = getNodeText('Demo');
    const css = getNodeText('Css');
    const cra = getNodeText('Cra');
    const dss = getNodeText('Dss');
    const cont = getNodeText('Cont');
    const interno = getNodeText('Interno');
    const cuit = getNodeText('Cuit');
    const email = getNodeText('Email');
    const telefonos = getNodeText('Telefonos');
    const sesion = getNodeText('Sesion');
    const delegacion = getNodeText('Delegacion');
    const delegaciond = getNodeText('Delegaciond');
    const delegaciondd = getNodeText('Delegaciondd');
    const domicilior = getNodeText('Domicilior');
    const postalr = getNodeText('Postalr');
    const postalrd = getNodeText('Postalrd');
    const domicilioe = getNodeText('Domicilioe');
    const postale = getNodeText('Postale');
    const postaled = getNodeText('Postaled');
    const provinciar = getNodeText('Provinciar');
    const provinciard = getNodeText('Provinciard');
    const provinciae = getNodeText('Provinciae');
    const provinciaed = getNodeText('Provinciaed');
    const usuario = getNodeText('Usuario');
    const iva = getNodeText('Iva');
    const fechan = getNodeText('Fechan');
    const fechaf = getNodeText('Fechaf');
    const fechag = getNodeText('Fechag');
    const fechama = getNodeText('Fechama');
    const fechamb = getNodeText('Fechamb');
    const foto = getNodeText('Foto');
    const firma = getNodeText('Firma');
    const push = getNodeText('Push');
    const empleado = getNodeText('Empleado');

    const jsonData = {
      Tipo: tipo,
      Numero: numero,
      Parentesco: parentesco,
      Denominacion: denominacion,
      Socio: socio,
      Estado: estado,
      Estadod: estadod,
      Demo: demo,
      Css: css,
      Cra: cra,
      Dss: dss,
      Cont: cont,
      Interno: interno,
      Cuit: cuit,
      Email: email,
      Telefonos: telefonos,
      Sesion: sesion,
      Delegacion: delegacion,
      Delegaciond: delegaciond,
      Delegaciondd: delegaciondd,
      Domicilior: domicilior,
      Postalr: postalr,
      Postalrd: postalrd,
      Domicilioe: domicilioe,
      Postale: postale,
      Postaled: postaled,
      Provinciar: provinciar,
      Provinciard: provinciard,
      Provinciae: provinciae,
      Provinciaed: provinciaed,
      Usuario: usuario,
      Iva: iva,
      Fechan: fechan,
      Fechaf: fechaf,
      Fechag: fechag,
      Fechama: fechama,
      Fechamb: fechamb,
      Foto: foto,
      Firma: firma,
      Push: push,
      Empleado: empleado,
      Errorid: errorid,
      Errornombre: errornombre,
    };
    return jsonData
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const checkLoginService = async () => {
  const user = localStorage.getItem("user") || ""
  const sesion = localStorage.getItem("sesion") || ""
  const soapRequest =
    `<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:cpcesfeIntf-Icpcesfe">
  <soapenv:Header/>
  <soapenv:Body>
     <urn:Estado soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
        <Credencial xsi:type="urn:Tcredencial" xmlns:urn="urn:cpcesfeIntf">
           <Usuario xsi:type="xsd:string">${user ? user : ""}</Usuario>
           <Sesion xsi:type="xsd:string">${sesion ? sesion : ""}</Sesion>
           <Origen xsi:type="xsd:string">WEB</Origen>
        </Credencial>
     </urn:Estado>
  </soapenv:Body>
</soapenv:Envelope>`
  try {
    const response = await axios.post(SOAP_SERVER_URL, soapRequest);

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response.data, 'text/xml');

    const errorid = xmlDoc.getElementsByTagName('Errorid')[0].textContent;
    const errornombre = xmlDoc.getElementsByTagName('Errornombre')[0].textContent;

    const jsonData = {
      Sesion: sesion,
      Errorid: errorid,
      Errornombre: errornombre,
    };
    return jsonData
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const RecoverPassword = async (user, dni, numberUser, type) => {
    const soapRequest = `
    <soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:cpcesfeIntf-Icpcesfe">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:Recupera soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
          <Documento xsi:type="xsd:string">${dni}</Documento>
          <usuario xsi:type="xsd:string">${user}</usuario>
          <tipo xsi:type="xsd:string">${type}</tipo>
          <numero xsi:type="xsd:string">${numberUser}</numero>
       </urn:Recupera>
    </soapenv:Body>
 </soapenv:Envelope>`;

    try {
        const response = await axios.post(import.meta.env.VITE_RECOVER_PASSWORD_URL || 'http://localhost:3001/', soapRequest, {
            headers: {
                'Content-Type': 'text/xml;charset=UTF-8',
            },
        });

        return response
    } catch (error) {
        console.error(error);
        throw error;
    }
};
