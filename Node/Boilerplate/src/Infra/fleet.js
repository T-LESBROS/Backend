const mongoose = require('mongoose');
const { Schema } = mongoose;

const fleetSchema = new Schema({
  userId: { type: String, required: true },
  vehicles: [{ type: Schema.Types.ObjectId, ref: 'Vehicle' }],
});

const Fleet = mongoose.model('Fleet', fleetSchema);
module.exports = Fleet;
