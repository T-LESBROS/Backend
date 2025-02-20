const Vehicle = require('../../Infra/vehicle');

async function getVehicle(vehicleId) {
  const vehicle = await Vehicle.findById(vehicleId).populate('location');
  if (!vehicle) {
    throw new Error('Vehicle not found');
  }
  return vehicle;
}

module.exports = getVehicle;
