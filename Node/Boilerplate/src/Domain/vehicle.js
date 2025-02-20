class Vehicle {
  constructor(plateNumber, location = null, fleetId = null) {
    this.plateNumber = plateNumber;
    this.location = location;
    this.fleetId = fleetId;
  }
  
  parkAt(location) {
    if (this.location && this.location.isEqual(location)) {
      throw new Error('This vehicle is already at that location');
    }
    this.location = location;
  }

  getLocation() {
    return this.location;
  }
}

module.exports = Vehicle;
  