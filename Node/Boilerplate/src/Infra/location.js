const mongoose = require('mongoose');
const { Schema } = mongoose;

const locationSchema = new Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  alt: { type: Number, default: 0 },
});

const Location = mongoose.model('Location', locationSchema);
module.exports = Location;
