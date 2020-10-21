export default class Point3D {
  constructor(x, y, z, w = 1) {
    this._x = x;
    this._y = y;
    this._z = z;
    this._w = w;
  }

  get x() { return this._x; }
  get y() { return this._y; }
  get z() { return this._z; }
  set x(x) { this._x = x; }
  set y(y) { this._y = y; }
  set z(z) { this._z = z; }

  asArray() {
      return [this._x, this._y, this._z, this._w];
  }

  toJSON() {
      return {
          x: this._x,
          y: this._y,
          z: this._z,
          w: this._w
      };
  }
}
