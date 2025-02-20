const registerVehicleHandler = require('../handlers/registerVehicleHandler');

module.exports = registerVehicle;

async function registerVehicle(fleetId, vehiclePlateNumber) {
  try {
    await registerVehicleHandler(fleetId, vehiclePlateNumber);
  } catch (error) {
    console.error('Command error registering vehicle:', error.message);
  }
}

module.exports = registerVehicle;