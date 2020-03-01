export default class Point3D {
  constructor(x, y, z, w = 1) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  asArray() {
      return [this.x, this.y, this.z, this.w];
  }

  toJSON() {
      return {
          x: this.x,
          y: this.y,
          z: this.z,
          w: this.w
      };
  }
}
