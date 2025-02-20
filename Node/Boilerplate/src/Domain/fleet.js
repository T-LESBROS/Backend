class Fleet {
  constructor(fleetId) {
    this.fleetId = fleetId;
    this.vehicles = [];
  }

  getVehicles() {
    return this.vehicles;
  }
  
  addVehicle(vehicle) {
    if (this.vehicles.some(vehicle => vehicle.plateNumber === vehicle.plateNumber)) {
      throw new Error('This vehicle is already registered');
    }
    this.vehicles.push(vehicle);
  }
}

module.exports = Fleet;