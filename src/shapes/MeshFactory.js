import Point3D from '../Point3D.js';
import Polygon3D from '../Polygon3D.js';
import Object3D from '../Object3D.js';

export default class MeshFactory {
  static create(x, y, z, rows, columns, width, height, strokeColor = 'white', fillColor = null) {
    const vertices = [];
    const polygons = [];
    const halfTotalWidth = rows * width / 2;
    const halfTotalHeight = columns * height / 2;
    for (let i = 0; i <= rows; i++) {
      for (let j = 0; j <= columns; j++) {
        const point = new Point3D(
          -1 * halfTotalWidth + i * width,
          -1 * halfTotalHeight + j * height,
          0
        );
        vertices.push(point);

        if (i < rows && j < columns) {
          const firstRow = j * (columns + 1);
          const lastRow = (j + 1) * (columns + 1);
          const p1 = i + 1 + lastRow;
          const p2 = i + lastRow;
          const p3 = i + firstRow;
          const p4 = i + 1 + firstRow;
          const polygon1 = new Polygon3D([p1, p2, p3], strokeColor, fillColor);
          const polygon2 = new Polygon3D([p1, p3, p4], strokeColor, fillColor);
          polygons.push(polygon1);
          polygons.push(polygon2);
        }
      }
    }

    return new Object3D(vertices, polygons, x, y, z);
  }
}
