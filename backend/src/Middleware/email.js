const transporter = require('../Config/email'); // Importar el transporter

const Email = async (req, res) => {
  const body = req.body;
  const email = body.email;

  if (!email) {
    return res.status(400).send('No email provided');
  }

  try {
    // Configuración del correo
    const mailOptions = {
      from: process.env.MAIL_USER, // Remitente
      to: email, // Destinatario
      subject: 'Test email', // Asunto
      text: 'This email is sent using Nodemailer.', // Mensaje
    };

    // Enviar el correo
    const info = await transporter.sendMail(mailOptions);

    console.log('Email enviado:', info.response);
    return res.send('Email sent successfully');
  } catch (error) {
    console.error('Error al enviar el email:', error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = Email;
