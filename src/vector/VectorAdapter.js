import Vector3D from './Vector3D.js';
import Point3D from '../Point3D.js';

export default class VectorAdapter {
  constructor() {}

  static point3DToVector3D(point) {
    return new Vector3D(point.x, point.y, point.z);
  }

  static vector3DToPoint3D(vector) {
    return new Point3D(vector.x, vector.y, vector.z);
  }
}
