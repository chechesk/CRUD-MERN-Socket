const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const Authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Obtiene el token de las cabeceras

  if (!token) {
    return res.status(401).json({ message: 'No se ha proporcionado un token de autenticación' });
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Almacenar la información del usuario en la solicitud
    next(); // Permitir que el siguiente middleware o controlador sea ejecutado
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

module.exports = { Authenticate };
