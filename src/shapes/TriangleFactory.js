import Point3D from '../Point3D.js';
import Polygon3D from '../Polygon3D.js';
import Object3D from '../Object3D.js';

export default class TriangleFactory {
  constructor() {}

  static create(x, y, z, scale = 1, strokeColor = 'white', fillColor = null) {
    const vertices = [
      new Point3D(-1 * scale, 0, 20), // top
      new Point3D(1 * scale, 0, 20),
      new Point3D(0, 1 * scale, 20),
    ];

    const polygons = [
      new Polygon3D([0, 1, 2], strokeColor, fillColor),
    ];

    return new Object3D(vertices, polygons, x, y, z);
  }
}
