const nodemailer = require('nodemailer');

// Configuración del transportador de Nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST, 
  port: 587, // Usualmente 587 para TLS o 465 para SSL
  secure: false, // true para SSL (puerto 465), false para TLS (puerto 587)
  auth: {
    user: process.env.MAIL_USER, // Usuario autenticado
    pass: process.env.MAIL_PASSWORD, // Contraseña del usuario
  },
});

// Verificar conexión con el servidor SMTP
transporter.verify((error, success) => {
  if (error) {
    console.error('Error al conectar con el servidor SMTP:', error);
  } else {
    console.log('Servidor SMTP listo para enviar correos:', success);
  }
});

module.exports = transporter;