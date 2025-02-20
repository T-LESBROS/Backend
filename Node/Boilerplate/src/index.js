const { program } = require('commander');
const mongoose = require('mongoose');
const createFleet = require('./App/commands/createFleetCommand');
const registerVehicle = require('./App/commands/registerVehicleCommand');
const parkVehicle = require('./App/commands/parkVehicleCommand');


mongoose.connect('mongodb://localhost/fleet_management', { useNewUrlParser: true, useUnifiedTopology: true });

program
  .command('create <userId>')
  .description('Create a new fleet for a user')
  .action(createFleet);

program
  .command('register-vehicle <fleetId> <vehiclePlateNumber>')
  .description('Register a vehicle to a fleet')
  .action(registerVehicle);

program
  .command('localize-vehicle <fleetId> <vehiclePlateNumber> <lat> <lng> [alt]')
  .description('Localize a vehicle in the fleet')
  .action(parkVehicle);

program.parse(process.argv);
