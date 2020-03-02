import Object3D from '../Object3D.js';
import Polygon3D from '../Polygon3D.js';
import Point3D from '../Point3D.js';

const cubeVertices = [
  new Point3D(-1, -1, -1),
  new Point3D(1, -1, -1),
  new Point3D(1, 1, -1),
  new Point3D(-1, 1, -1),

  new Point3D(-1, -1, 1),
  new Point3D(1, -1, 1),
  new Point3D(1, 1, 1),
  new Point3D(-1, 1, 1),
];

export default class CubeFactory {
  constructor() {}

  static create(x = 0, y = 0, z = 0, strokeColor = '#ffffff', fillColor = null) {
    const polygons = [
      new Polygon3D([0, 3, 2, 1], strokeColor, fillColor),
      new Polygon3D([4, 0, 1, 5], strokeColor, fillColor),
      new Polygon3D([7, 4, 5, 6], strokeColor, fillColor),
      new Polygon3D([3, 7, 6, 2], strokeColor, fillColor),
      new Polygon3D([4, 7, 3, 0], strokeColor, fillColor),
      new Polygon3D([1, 2, 6, 5], strokeColor, fillColor)
    ];
    return new Object3D(cubeVertices, polygons, x, y, z);
  }
}