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

    const tipo = xmlDoc.getElementsByTagName('Tipo')[0].textContent;
    const numero = xmlDoc.getElementsByTagName('Numero')[0].textContent;
    const parentesco = xmlDoc.getElementsByTagName('Parentesco')[0].textContent;
    const denominacion = xmlDoc.getElementsByTagName('Denominacion')[0].textContent;
    const socio = xmlDoc.getElementsByTagName('Socio')[0].textContent;
    const estado = xmlDoc.getElementsByTagName('Estado')[0].textContent;
    const estadod = xmlDoc.getElementsByTagName('Estadod')[0].textContent;
    const demo = xmlDoc.getElementsByTagName('Demo')[0].textContent;
    const css = xmlDoc.getElementsByTagName('Css')[0].textContent;
    const cra = xmlDoc.getElementsByTagName('Cra')[0].textContent;
    const dss = xmlDoc.getElementsByTagName('Dss')[0].textContent;
    const cont = xmlDoc.getElementsByTagName('Cont')[0].textContent;
    const interno = xmlDoc.getElementsByTagName('Interno')[0].textContent;
    const cuit = xmlDoc.getElementsByTagName('Cuit')[0].textContent;
    const email = xmlDoc.getElementsByTagName('Email')[0].textContent;
    const telefonos = xmlDoc.getElementsByTagName('Telefonos')[0].textContent;
    const sesion = xmlDoc.getElementsByTagName('Sesion')[0].textContent;
    const delegacion = xmlDoc.getElementsByTagName('Delegacion')[0].textContent;
    const delegaciond = xmlDoc.getElementsByTagName('Delegaciond')[0].textContent;
    const delegaciondd = xmlDoc.getElementsByTagName('Delegaciondd')[0].textContent;
    const domicilior = xmlDoc.getElementsByTagName('Domicilior')[0].textContent;
    const postalr = xmlDoc.getElementsByTagName('Postalr')[0].textContent;
    const postalrd = xmlDoc.getElementsByTagName('Postalrd')[0].textContent;
    const domicilioe = xmlDoc.getElementsByTagName('Domicilioe')[0].textContent;
    const postale = xmlDoc.getElementsByTagName('Postale')[0].textContent;
    const postaled = xmlDoc.getElementsByTagName('Postaled')[0].textContent;
    const provinciar = xmlDoc.getElementsByTagName('Provinciar')[0].textContent;
    const provinciard = xmlDoc.getElementsByTagName('Provinciard')[0].textContent;
    const provinciae = xmlDoc.getElementsByTagName('Provinciae')[0].textContent;
    const provinciaed = xmlDoc.getElementsByTagName('Provinciaed')[0].textContent;
    const usuario = xmlDoc.getElementsByTagName('Usuario')[0].textContent;
    const iva = xmlDoc.getElementsByTagName('Iva')[0].textContent;
    const fechan = xmlDoc.getElementsByTagName('Fechan')[0].textContent;
    const fechaf = xmlDoc.getElementsByTagName('Fechaf')[0].textContent;
    const fechag = xmlDoc.getElementsByTagName('Fechag')[0].textContent;
    const fechama = xmlDoc.getElementsByTagName('Fechama')[0].textContent;
    const fechamb = xmlDoc.getElementsByTagName('Fechamb')[0].textContent;
    const foto = xmlDoc.getElementsByTagName('Foto')[0].textContent;
    const firma = xmlDoc.getElementsByTagName('Firma')[0].textContent;
    const push = xmlDoc.getElementsByTagName('Push')[0].textContent;
    const empleado = xmlDoc.getElementsByTagName('Empleado')[0].textContent;
    const errorid = xmlDoc.getElementsByTagName('Errorid')[0].textContent;
    const errornombre = xmlDoc.getElementsByTagName('Errornombre')[0].textContent;

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
