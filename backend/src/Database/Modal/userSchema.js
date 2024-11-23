const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  birthdate: { type: Date, required: true },
  creation_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Users', userSchema);