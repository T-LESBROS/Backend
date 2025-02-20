const Fleet = require('../../Infra/fleet');

async function getFleet(fleetId) {
  const fleet = await Fleet.findById(fleetId).populate('vehicles');
  if (!fleet) {
    throw new Error('Fleet not found');
  }
  return fleet;
}

module.exports = getFleet;
