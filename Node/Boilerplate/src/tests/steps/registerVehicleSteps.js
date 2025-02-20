const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const createFleet = require('../../App/commands/createFleetCommand');
const registerVehicle = require('../../App/commands/registerVehicleCommand');
const Vehicle = require('../../Domain/vehicle');
const Fleet = require('../../Domain/fleet');
const VehicleDB = require('../../Infra/vehicle');
const FleetDB = require('../../Infra/fleet');
const mongoose = require('mongoose');

let fleet, fleet2, fleet3, fleet4, vehicle, vehicle2, vehicle3;

Given('my fleet1', async function () {
  if (this.parameters.persistence === 'mongo') {
    await mongoose.connect('mongodb://localhost/fleet_management', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    fleet = await createFleet('carsDB');
  } else {
    fleet = new Fleet('cars');
  }
});

Given('a vehicle1', async function () {
  if (this.parameters.persistence === 'mongo') {
    vehicle = new VehicleDB({ plateNumber: 'AA-123-DB' });
    await vehicle.save();
  } else {
    vehicle = new Vehicle('AA-123-AA');
  }
});

When('I register this vehicle1 into my fleet1', async function () {
  if (this.parameters.persistence === 'mongo') {
    await registerVehicle(fleet._id, vehicle.plateNumber)
  } else {
    fleet.addVehicle(vehicle);
  }
});

Then('this vehicle1 should be part of my vehicle fleet1', async function () {
  if (this.parameters.persistence === 'mongo') {
    const updatedFleet = await FleetDB.findById(fleet._id).populate('vehicles');
    assert.strictEqual(updatedFleet.vehicles.some(fleetVehicle => fleetVehicle.plateNumber === vehicle.plateNumber), true);
  } else {
    const vehicles = fleet.getVehicles();
    assert.strictEqual(vehicles.some(fleetVehicle => fleetVehicle.plateNumber === vehicle.plateNumber), true);
  }
});
  

Given('my fleet2', function () {
  fleet2 = new Fleet('trucks');
});

Given('a vehicle2', function () {
  vehicle2 = new Vehicle("TR-123-AA");
});

Given('I have registered this vehicle2 into my fleet2', function () {
  fleet2.addVehicle(vehicle2);
});

When('I try to register this vehicle2 into my fleet2', function () {
  try {
    fleet2.addVehicle(vehicle2); 
  } catch (error) {
    this.error = error.message;
  }
});

Then('I should be informed this this vehicle2 has already been registered into my fleet2', function () {
  assert.strictEqual(this.error, 'This vehicle is already registered');
});


Given('my fleet3', function () {
  fleet3 = new Fleet('small_cars');
});

Given('the fleet4 of another user', function () {
  fleet4 = new Fleet('red_cars');
});

Given('a vehicle3', function () {
  vehicle3 = new Vehicle("FE-123-AA");
});

Given('this vehicle3 has been registered into the other user\'s fleet4', function () {
  fleet4.addVehicle(vehicle3);
});

When('I register this vehicle3 into my fleet3', function () {
  fleet3.addVehicle(vehicle3);
});

Then('this vehicle3 should be part of my vehicle fleet3', function () {
  const vehicles = fleet3.getVehicles();
  assert.strictEqual(vehicles.some(fleetVehicle => fleetVehicle.plateNumber === vehicle3.plateNumber), true);
});
