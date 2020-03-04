import Point3D from '../Point3D.js';
import Polygon3D from '../Polygon3D.js';
import Object3D from '../Object3D.js';
import Geometry from '../Geometry.js';

export default class MeshFactory {
  static create(x, y, z, radius, turns, height, strokeColor = 'white', fillColor = null) {
    const vertices = [];
    const polygons = [];
    const step = 360 / turns;
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < turns; j++) {
        const point = new Point3D(
          Math.sin(Geometry.convertDegreesToRadians(step * j)) * radius,
          Math.cos(Geometry.convertDegreesToRadians(step * j)) * radius,
          i * radius
        );
        vertices.push(point);
        if (i > 0) {
          const lastRow = i * turns;
          const firstRow = (i - 1) * turns;
          const p1 = (j === 0 ? turns : j) - 1 + firstRow;
          const p2 = j + lastRow;
          const p3 = (j === 0 ? turns : j) - 1 + lastRow;
          const p4 = j + firstRow;
          const polygon1 = new Polygon3D([p1, p2, p3], strokeColor, fillColor);
          const polygon2 = new Polygon3D([p1, p4, p2], strokeColor, fillColor);
          polygons.push(polygon1);
          polygons.push(polygon2);
        }
      }
    }
    return new Object3D(vertices, polygons, x, y, z);
  }
}
