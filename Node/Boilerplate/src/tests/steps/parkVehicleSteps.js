const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const createFleet = require('../../App/commands/createFleetCommand');
const registerVehicle = require('../../App/commands/registerVehicleCommand');
const parkVehicle = require('../../App/commands/parkVehicleCommand');
const Vehicle = require('../../Domain/vehicle');
const Fleet = require('../../Domain/fleet');
const Location = require('../../Domain/location');
const VehicleDB = require('../../Infra/vehicle');
const FleetDB = require('../../Infra/fleet');
const LocationDB = require('../../Infra/location');
const mongoose = require('mongoose');

let fleet, vehicle, location1, location2;

Given('my fleet', async function () {  
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

Given('a vehicle', async function () {
  if (this.parameters.persistence === 'mongo') {
    vehicle = new VehicleDB({ plateNumber: 'BB-123-DB' });
    await vehicle.save();
  } else {
    vehicle = new Vehicle('BB-123-AA');
  }
});

Given('I have registered this vehicle into my fleet', async function () {  
  if (this.parameters.persistence === 'mongo') {
    await registerVehicle(fleet._id, vehicle.plateNumber)
  } else {
    fleet.addVehicle(vehicle);
  }
});

Given('a location1', async function () {
  if (this.parameters.persistence === 'mongo') {
    location1 = new LocationDB({ lat: 12, lng: 13, alt:51 });
    await location1.save();
  } else {
    location1 = new Location(12, 13, 51);
  }
});

When('I park my vehicle at this location1', async function () {
  if (this.parameters.persistence === 'mongo') {
    await parkVehicle(fleet._id, vehicle.plateNumber, location1.lat, location1.lng, location1.alt)
  } else {
    vehicle.location = location1;
  }
});

Then('the known location of my vehicle should verify this location1', async function () {
  if (this.parameters.persistence === 'mongo') {
    const updatedVehicle = await VehicleDB.findOne({ plateNumber: vehicle.plateNumber }).populate('location');    
    assert.strictEqual(updatedVehicle.location.lat, location1.lat);
    assert.strictEqual(updatedVehicle.location.lng, location1.lng);
    assert.strictEqual(updatedVehicle.location.alt, location1.alt);
  } else {
    vehicle.location = location1;
    assert.strictEqual(vehicle.getLocation(), location1);
  }
});



Given('a location2', function () {
  location2 = new Location(56, 78);
});

Given('my vehicle has been parked into this location2', function () {
  vehicle.parkAt(location2);
});

When('I try to park my vehicle at this location2', function () {
  try {
    vehicle.parkAt(location2);
  } catch (error) {
    this.error = error.message;
  }
});

Then('I should be informed that my vehicle is already parked at this location2', function () {
  assert.strictEqual(this.error, "This vehicle is already at that location");
});