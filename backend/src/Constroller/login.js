const jwt = require('jsonwebtoken');
const userSchema = require('../Database/Modal/userSchema');
const { JWT_SECRET } = require('../Config/env');



const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Buscar el usuario por correo
  try {
    const user = await userSchema.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'Usuario no encontrado' });
  }

  if (!user.isVerified) {
    return res.status(401).json({ message: 'Por favor, confirma tu correo electrónico antes de iniciar sesión.' });
  }

  const passwordMatch = await user.comparePassword(password);
  if (!passwordMatch) {
    return res.status(401).json({ message: 'Contraseña incorrecta' });
  }

  const token = jwt.sign(
    { id: user._id, name: user.name, email: user.email },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token });


  } catch (error) {
    next(error);
  }
}
module.exports =  loginUser 