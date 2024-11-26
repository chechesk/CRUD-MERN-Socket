

const logoutUser = (req, res) => {
    // Si estás usando cookies para almacenar el token, puedes hacer esto
    res.clearCookie('token');  // Elimina la cookie que almacena el token JWT
  
    // Si estás usando localStorage, el frontend deberá eliminarlo por sí mismo.
  
    res.status(200).json({
      message: 'Sesión cerrada con éxito',
    });
  };
  
  module.exports = logoutUser;