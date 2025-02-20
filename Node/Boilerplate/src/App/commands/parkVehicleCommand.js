const parkVehicleHandler = require('../handlers/parkVehicleHandler');

async function parkVehicle(fleetId, vehiclePlateNumber, lat, lng, alt = 0) {
  try {
    const result = await parkVehicleHandler(fleetId, vehiclePlateNumber, lat, lng, alt);
    console.log(`Vehicle ${result.plateNumber} parked at (${result.lat}, ${result.lng}, ${result.alt})`);
    return result;
  } catch (error) {
    console.error('Error parking vehicle:', error.message);
  }
}

module.exports = parkVehicle;
