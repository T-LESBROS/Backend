const mongoose = require('mongoose');
const { Schema } = mongoose;

const vehicleSchema = new Schema({
  plateNumber: { type: String, required: true },
  location: { type: Schema.Types.ObjectId, ref: 'Location' },
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);
module.exports = Vehicle;
