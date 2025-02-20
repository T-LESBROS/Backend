const Fleet = require('../../Infra/fleet');
const Vehicle = require('../../Infra/vehicle');

async function registerVehicleHandler(fleetId, vehiclePlateNumber) {
  try {
    const fleet = await Fleet.findById(fleetId);
    if (!fleet) {
      console.log('Fleet not found!');
      return;
    }
    let vehicle = await Vehicle.findOne({ plateNumber: vehiclePlateNumber });
    if (!vehicle) {
      console.log('Vehicle not found, creating vehicle!');
      vehicle = new Vehicle({ plateNumber: vehiclePlateNumber });
      await vehicle.save();
    }
    if (fleet.vehicles.includes(vehicle._id)) {
      console.log(`Vehicle ${vehiclePlateNumber} is already registered in fleet ${fleetId}`);
      return;
    }
    fleet.vehicles.push(vehicle._id);
    await fleet.save();
    console.log(`Vehicle ${vehiclePlateNumber} registered to fleet ${fleetId}`);
  } catch (error) {
    console.error('Handler error registering vehicle:', error);
  }
}

module.exports = registerVehicleHandler;
