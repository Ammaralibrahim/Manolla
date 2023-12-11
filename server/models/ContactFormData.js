const mongoose = require("mongoose");

const contactFormDataSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const ContactFormDataModel = mongoose.model("ContactFormData", contactFormDataSchema);

module.exports = ContactFormDataModel;
