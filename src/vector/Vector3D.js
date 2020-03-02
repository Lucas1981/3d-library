import Geometry from '../Geometry.js';
import Vectors from './Vectors.js';

export default class Vector3D {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  get coordinates() {
    return {
      x: this.x,
      y: this.y,
      z: this.z
    };
  }

  get coordinatesAsArray() {
    return [
      this.x, this.y, this.z
    ];
  }

  get magnitude() {
    let magnitude = Math.pow(this.x, 2);
    magnitude += Math.pow(this.y, 2);
    magnitude += Math.pow(this.z, 2);
    magnitude = Math.sqrt(magnitude);
    return magnitude;
  }

  /* 1 / ||P|| */
  get unitLength() {
    return 1 / this.magnitude;
  }

  toPolar() {
    return {
      radius: Geometry.pythagoras(this.x, this.y),
      phi: Geometry.convertRadiansToDegrees(Geometry.pythagoras(this.x, this.y, this.z)),
      theta: Geometry.convertRadiansToDegrees(Math.atan(this.y / this.x))
    };
  }

  /* P + Q */
  addVector(vector) {
    const added = Vectors.add(this, vector);
    this.x = added[0];
    this.y = added[1];
    this.z = added[2];
  }

  /* P + (-Q) */
  subtractVector(vector) {
    var subtracted = Vectors.subtract(this, vector);
    this.x = subtracted[0];
    this.y = subtracted[1];
    this.z = subtracted[2];
  }

  scale(scalar) {
      var outcome = Vectors.scale(this, scalar);
      this.x = outcome[0];
      this.y = outcome[1];
      this.z = outcome[2];
  }

  /* P · Q */
  dotProduct(vector) {
      var dotProduct = vector.coordinatesAsArray[0] * this.x;
      dotProduct += vector.coordinatesAsArray[1] * this.y;
      dotProduct += vector.coordinatesAsArray[2] * this.z;
      return dotProduct;
  }

  isPerpendicularTo(vector) {
      if (this.dotProduct(vector) == 0) {
        return true;
      }
      return false;
  }

  /* P · Q / ||Q|| */
  lengthOfProjectionOnto(vector) {
    const dotProduct = this.dotProduct(vector);
    const projectionLength = dotProduct / vector.magnitude;
    return projectionLength;
  }

  /* Because P · Q = ||P|| * ||Q|| * Î± */
  angleBetween(vector) {
    const dotProduct = this.dotProduct(vector);
    const angle = Math.acos(dotProduct / this.magnitude / vector.magnitude);
    return angle;
  }

  /* P x Q */
  crossProduct(vector) {
    const crossProduct = Vectors.crossProduct(this, vector);
    const coordinates = crossProduct.coordinatesAsArray;
    this.x = coordinates[0];
    this.y = coordinates[1];
    this.z = coordinates[2];
  }

  /* P - (P · Q) / ||P|| ^ 2 * Q */
  perpendicular(vector) {
    const projection = Vectors.projection(this, vector);
    const x = projection[0];
    const y = projection[1];
    const z = projection[2];
    const newVector = new Vector3D(x, y, z);
    const perpendicular = Vectors.subtract(this, newVector);
    return perpendicular;
  }
}
