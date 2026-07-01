export default async function handler(req: any, res: any) {
  // enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Método no permitido. Utilizar POST." });
  }

  try {
    const { name, email, phone, message, origin } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: "El nombre y el correo electrónico son obligatorios." });
    }

    return res.status(200).json({
      success: true,
      message: `¡Hola ${name}! Recibimos tu solicitud para agendar una reunión desde '${origin || 'Formulario Web'}'. Un asesor socio-financiero de nuestro equipo te contactará por email (${email}) en el transcurso del día para coordinar un encuentro en calma.`
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || "Error al registrar la solicitud." });
  }
}
