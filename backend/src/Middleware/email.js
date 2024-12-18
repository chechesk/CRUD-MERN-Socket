const transporter = require('../Config/email'); // Importar el transporter
const { MAIL_USER } = require('../Config/env');

const Email = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send('No email provided');
  }

  try {
    // Configuración del correo
    const mailOptions = {
      from: MAIL_USER, // Remitente
      to: email, // Destinatario
      subject: 'Bienvenido a nuestra plataforma', // Asunto
      text: 'Hola, gracias por registrarte en nuestra plataforma.', // Mensaje
    };

    // Enviar el correo
    const info = await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully', info);
  } catch (err) {
    console.error('Error al enviar el email:', err.message); // Log de errores
    res.status(500).json({ error: 'Error sending email' });
  }
};

module.exports = Email;
