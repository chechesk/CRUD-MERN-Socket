const transporter = require('../Config/email'); // Importar el transporter
const { MAIL_USER } = require('../Config/env');

const emailConfirmate = async (email) => {  // Cambiar para recibir solo email
  if (!email) {
    throw new Error('No email provided'); // Lanzar error si no se proporciona email
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
    console.log('Correo enviado:', info);  // Log de información de envío
  } catch (err) {
    console.error('Error al enviar el email:', err.message); // Log de errores
    throw new Error('Error sending email'); // Lanzar un error si falla el envío
  }
};

module.exports = emailConfirmate;
