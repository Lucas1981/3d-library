export default class Camera {
  constructor(x, y, z, rotationX = 0, rotationY = 0, rotationZ = 0) {
    this._x = x;
    this._y = y;
    this._z = z;
    this._rotationX = rotationX;
    this._rotationY = rotationY;
    this._rotationZ = rotationZ;
  }

  get x() { return this._x; }
  get y() { return this._y; }
  get z() { return this._z; }
  get rotationX() { return this._rotationX; }
  get rotationY() { return this._rotationY; }
  get rotationZ() { return this._rotationZ; }

  set x(x) { this._x = x; }
  set y(y) { this._y = y; }
  set z(z) { this._z = z; }
  set rotationX(rotationX) { this._rotationX = rotationX; }
  set rotationY(rotationY) { this._rotationY = rotationY; }
  set rotationZ(rotationZ) { this._rotationZ = rotationZ; }
}
