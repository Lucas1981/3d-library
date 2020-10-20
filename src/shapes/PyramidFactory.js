import Object3D from '../Object3D.js';
import Polygon3D from '../Polygon3D.js';
import Point3D from '../Point3D.js';

export default class PyramidFactory {
  constructor() {}

  static create(x, y, z, scale = 1, radius = 1, strokeColor = 'white', fillColor = null) {
    const vertices = [
      new Point3D(0, 1 * scale * radius, 0), // top
      new Point3D(1 * scale, 0, -1 * scale),
      new Point3D(1 * scale, 0, 1 * scale),
      new Point3D(-1 * scale, 0, 1 * scale),
      new Point3D(-1 * scale, 0, -1 * scale)
    ];

    const polygons = [
      new Polygon3D([3, 2, 1], strokeColor, fillColor),
      new Polygon3D([4, 3, 1], strokeColor, fillColor),
      new Polygon3D([0, 1, 2], strokeColor, fillColor),
      new Polygon3D([0, 2, 3], strokeColor, fillColor),
      new Polygon3D([0, 3, 4], strokeColor, fillColor),
      new Polygon3D([0, 4, 1], strokeColor, fillColor),
    ];

    return new Object3D(vertices, polygons, x, y, z);
  }
}
