const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Contraseña encriptada
  birthdate: { type: Date, required: true },
  creation_date: { type: Date, default: Date.now },
},

{ timestamps: true });

// Hook para encriptar la contraseña antes de guardar
userSchema.pre('save', async function (next) {
  const user = this;

  // Si la contraseña no ha sido modificada, salta este paso
  if (!user.isModified('password')) return next();

  try {
    // Genera el salt y encripta la contraseña
    const salt = await bcrypt.genSalt(10); // 10 es el factor de costo recomendado
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = mongoose.model('Users', userSchema);