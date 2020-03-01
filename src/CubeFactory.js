import Object3D from './Object3D.js';
import Polygon3D from './Polygon3D.js';
import Point3D from './Point3D.js';

const cubeVertices = [
  new Point3D(-10, -10, 40),
  new Point3D(10, -10, 40),
  new Point3D(10, 10, 40),
  new Point3D(-10, 10, 40),

  new Point3D(-10, -10, 60),
  new Point3D(10, -10, 60),
  new Point3D(10, 10, 60),
  new Point3D(-10, 10, 60),
];

export default class CubeFactory {
  constructor() {}

  static create(x = 0, y = 0, z = 0, strokeColor = '#ffffff', fillColor = null) {
    const polygons = [
      new Polygon3D([0, 1, 2, 3], strokeColor, fillColor),
      new Polygon3D([4, 5, 6, 7], strokeColor, fillColor),
      new Polygon3D([0, 1, 5, 4], strokeColor, fillColor),
      new Polygon3D([3, 2, 6, 7], strokeColor, fillColor),
      new Polygon3D([5, 1, 2, 6], strokeColor, fillColor),
      new Polygon3D([4, 0, 3, 7], strokeColor, fillColor)
    ];
    return new Object3D(cubeVertices, polygons, x, y, z);
  }
}
