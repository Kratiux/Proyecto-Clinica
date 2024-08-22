const mongoose = require('mongoose');

const citaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  tipoServicio: {
    type: String,
    required: true,
  },
  duracion: {
    type: String,
  },
  informacionContacto: {
    type: String,
  },
  comentarios: {
    type: String,
  },
  enviarRecordatorio: {
    type: Boolean,
  },
});

const Cita = mongoose.model('Cita', citaSchema);

module.exports = Cita;
