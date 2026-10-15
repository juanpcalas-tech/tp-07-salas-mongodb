const mongoose = require("mongoose");
const reservasSchema = new mongoose.Schema(
  {
    estudiante: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (v) => v.length > 0,
        message: "El nombre no puede estar vacío",
      },
    },
    email: {
      type: String,
      required: true,
      trim: true,
      match: [/@/, "El email debe contener un carácter '@'"],
    },
    sala: {
      type: String,
      required: true,
      enum: ["Sala Norte", "Sala Sur", "Sala Multimedia"],
    },
    fecha: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (v) => v.length > 0,
        message: "La fecha no puede estar vacía",
      },
    },
    turno: { type: String, required: true, enum: ["Mañana", "Tarde", "Noche"] },
    personas: {
      type: Number,
      required: true,
      min: 1,
      max: 6,
      validate: { validator: Number.isInteger, message: "Debe ser Entero" },
    },
  },
  { collection: "reservas" },
);
const Reserva = mongoose.model("Reserva", reservasSchema);
module.exports = { Reserva };
