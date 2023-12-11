const mongoose = require('mongoose');

const FormDataSchema = new mongoose.Schema({
  name: String,
  lastname: String,
  email: String,
  password: String,
  phone: String,
  image: String, // Store the image path
  location: String,
})

const FormDataModel = mongoose.model('usersSchema', FormDataSchema);

module.exports = FormDataModel;
