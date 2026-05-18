import axios from 'axios';
import https from 'https';

export default async function handler(req, res) {
  // Habilitar CORS para evitar cualquier tipo de bloqueo en el cliente
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, SOAPAction'
  );

  // Responder a peticiones preflight de CORS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const targetUrl = 'https://www.contadores.org.ar:8085/soap/Icpcesfe';
    
    // Agente HTTPS personalizado que ignora problemas de TLS y certificados
    const agent = new https.Agent({
      rejectUnauthorized: false
    });

    let bodyData = '';
    if (typeof req.body === 'string') {
      bodyData = req.body;
    } else if (typeof req.body === 'object') {
      // Si Vercel o axios de forma nativa procesaron el cuerpo, obtenemos la data cruda o stringified
      bodyData = req.body.toString();
    }

    const response = await axios.post(targetUrl, req.body || bodyData, {
      headers: {
        'Content-Type': 'text/xml;charset=UTF-8',
        'SOAPAction': req.headers['soapaction'] || ''
      },
      httpsAgent: agent,
      timeout: 15000
    });

    res.setHeader('Content-Type', 'text/xml;charset=UTF-8');
    res.status(200).send(response.data);
  } catch (error) {
    console.error('Error in SOAP proxy serverless function:', error.message);
    res.status(500).json({ 
      error: 'Proxy Error connecting to SOAP', 
      message: error.message,
      details: error.response?.data || null 
    });
  }
}
