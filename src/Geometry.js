const radiansToDegrees = 180 / Math.PI;
const degreesToRadians = Math.PI / 180;

export default class Geometry {
  constructor() {
  }

  static pythagoras(...args) {
    let squares = 0;
    for (const argument of args) {
      squares += Math.pow(argument, 2);
    }
    return Math.sqrt(squares);
}

  static convertDegreesToRadians(degrees) {
      return degrees * degreesToRadians;
  }

  static convertRadiansToDegrees(radians) {
      return radians * radiansToDegrees;
  }
}
