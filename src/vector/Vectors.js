import Vector3D from './Vector3D.js';

export default class Vectors {
  constructor() {}

  /* P + Q */
  static add(v1, v2) {
    var outcome = [];
    for (var i = 0; i < v1.coordinatesAsArray.length; i++) {
      outcome[i] = v1.coordinatesAsArray[i] + v2.coordinatesAsArray[i];
    }
    return outcome;
  }

  /* P + (-Q) */
  static subtract(v1, v2) {
    var outcome = [];
    for (var i = 0; i < v1.coordinatesAsArray.length; i++) {
      outcome[i] = v1.coordinatesAsArray[i] - v2.coordinatesAsArray[i];
    }
    return outcome;
  }

  static scale(v1, scalar) {
    var outcome = [];
    for (var i = 0; i < v1.coordinatesAsArray.length; i++) {
      outcome[i] = v1.coordinatesAsArray[i] * scalar;
    }
    return outcome;
  }

  /* P x Q */
  static crossProduct(v1, v2) {
    var x = v1.coordinates.y * v2.coordinates.z - v1.coordinates.z * v2.coordinates.y;
    var y = v1.coordinates.z * v2.coordinates.x - v1.coordinates.x * v2.coordinates.z;
    var z = v1.coordinates.x * v2.coordinates.y - v1.coordinates.y * v2.coordinates.x;
    var newVector = new Vector3D(x, y, z);
    return newVector;
  }

  /* (P · Q) / ||P|| ^ 2 * Q */
  static projection(v1, v2) {
    var dotProduct = v1.dotProduct(v2);
    var scalar = dotProduct / Math.pow(v2.magnitude, 2);
    var outcome = this.scale(v2, scalar);
    return outcome;
  }

  static perpendicular(v1, v2) {
    const newVector = new Vector3D(v1.x, v1.y, v1.z);
    return new Vector3D(...newVector.perpendicular(v2));
  }
}
