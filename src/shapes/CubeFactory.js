import Object3D from '../Object3D.js';
import Polygon3D from '../Polygon3D.js';
import Point3D from '../Point3D.js';

export default class CubeFactory {
  constructor() {}

  static create(x = 0, y = 0, z = 0, s = 1, strokeColor = '#ffffff', fillColor = null) {
    const cubeVertices = [
      new Point3D(-1 * s, -1 * s, 1 * s),
      new Point3D(1 * s, -1 * s, 1 * s),
      new Point3D(1 * s, 1 * s, 1 * s),
      new Point3D(-1 * s, 1 * s, 1 * s),

      new Point3D(-1 * s, -1 * s, -1 * s),
      new Point3D(1 * s, -1 * s, -1 * s),
      new Point3D(1 * s, 1 * s, -1 * s),
      new Point3D(-1 * s, 1 * s, -1 * s),
    ];

    const polygons = [
      new Polygon3D([0, 1, 5], strokeColor, fillColor),
      new Polygon3D([0, 5, 4], strokeColor, fillColor),
      new Polygon3D([1, 2, 6], strokeColor, fillColor),
      new Polygon3D([1, 6, 5], strokeColor, fillColor),
      new Polygon3D([2, 3, 7], strokeColor, fillColor),
      new Polygon3D([2, 7, 6], strokeColor, fillColor),
      new Polygon3D([3, 0, 4], strokeColor, fillColor),
      new Polygon3D([3, 4, 7], strokeColor, fillColor),
      new Polygon3D([4, 5, 6], strokeColor, fillColor),
      new Polygon3D([4, 6, 7], strokeColor, fillColor),
      new Polygon3D([3, 2, 1], strokeColor, fillColor),
      new Polygon3D([3, 1, 0], strokeColor, fillColor)
    ];

    return new Object3D(cubeVertices, polygons, x, y, z);
  }
}
