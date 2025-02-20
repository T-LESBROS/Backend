const Fleet = require('../../Infra/fleet');

async function createFleetHandler(userId) {
  const fleet = new Fleet({ userId, vehicles: [] });
  await fleet.save();
  return fleet;
}

module.exports = createFleetHandler;
