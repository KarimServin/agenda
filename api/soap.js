import https from 'https';

// Vercel no parsea el body para Content-Type: text/xml.
// Necesitamos leer el stream raw manualmente.
function getRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk.toString();
    });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, SOAPAction'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const targetUrl = 'https://www.contadores.org.ar:8085/soap/Icpcesfe';

    // Leer el body como stream raw (único método confiable con text/xml en Vercel)
    const rawBody = await getRawBody(req);
    console.log('Raw body received (first 200 chars):', rawBody.substring(0, 200));

    // Hacer el request al servidor SOAP como si fuéramos un cliente directo
    const responseData = await new Promise((resolve, reject) => {
      const url = new URL(targetUrl);
      const options = {
        hostname: url.hostname,
        port: url.port || 443,
        path: url.pathname,
        method: 'POST',
        headers: {
          'Content-Type': 'text/xml;charset=UTF-8',
          'Content-Length': Buffer.byteLength(rawBody, 'utf8'),
          'SOAPAction': req.headers['soapaction'] || '',
        },
        rejectUnauthorized: false, // Ignorar errores de certificado SSL
      };

      const proxyReq = https.request(options, (proxyRes) => {
        let responseBody = '';
        proxyRes.on('data', (chunk) => { responseBody += chunk.toString(); });
        proxyRes.on('end', () => resolve({ status: proxyRes.statusCode, body: responseBody }));
      });

      proxyReq.on('error', reject);
      proxyReq.write(rawBody, 'utf8');
      proxyReq.end();
    });

    res.setHeader('Content-Type', 'text/xml;charset=UTF-8');
    res.status(responseData.status).send(responseData.body);

  } catch (error) {
    console.error('Error in SOAP proxy:', error.message);
    res.status(500).send(`<?xml version="1.0" encoding="UTF-8"?><error>${error.message}</error>`);
  }
}
