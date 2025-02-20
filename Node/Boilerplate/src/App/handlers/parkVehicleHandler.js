const Fleet = require('../../Infra/fleet');
const Vehicle = require('../../Infra/vehicle');
const Location = require('../../Infra/location');

async function parkVehicleHandler(fleetId, vehiclePlateNumber, lat, lng, alt = 0) {
  const fleet = await Fleet.findById(fleetId);
  if (!fleet) {
    throw new Error('Fleet not found!');
  }

  const vehicle = await Vehicle.findOne({ _id: { $in: fleet.vehicles }, plateNumber: vehiclePlateNumber });
  if (!vehicle) {
    throw new Error('Vehicle not found in fleet!');
  }

  const location = new Location({ lat, lng, alt });
  await location.save();

  vehicle.location = location._id;
  await vehicle.save();

  return { fleetId, vehicleId: vehicle._id, plateNumber: vehiclePlateNumber, lat, lng, alt };
}

module.exports = parkVehicleHandler;
