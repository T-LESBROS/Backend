const createFleetHandler = require('../handlers/createFleetHandler');

async function createFleet(userId) {
  try {
    const fleet = await createFleetHandler(userId);
    console.log('Fleet created with ID:', fleet._id);
    return fleet;
  } catch (error) {
    console.error('Error creating fleet:', error.message);
  }
}

module.exports = createFleet;
