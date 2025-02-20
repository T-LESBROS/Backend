class Location {
  constructor(X, Y) {
    this.X = X;
    this.Y = Y;
  }

  isEqual(otherLocation) {
    return this.X === otherLocation.X && this.Y === otherLocation.Y;
  }
}

module.exports = Location;
  