import Point3D from '../Point3D.js';
import Polygon3D from '../Polygon3D.js';
import Object3D from '../Object3D.js';
import Geometry from '../Geometry.js';

const defaultSides = 32;

export default class SphereFactory {
  constructor() {}

  static create(x, y, z, radius, sides = defaultSides, strokeColor = 'white', fillColor = null) {
    const vertices = [];
    const polygons = [];

    for (let i = 0; i <= sides; i++) {
      const r = Math.sin(Geometry.convertDegreesToRadians(180 / sides * i)) * radius;
      for(let j = 0; j < sides; j++) {
        const x1 = Math.cos(Geometry.convertDegreesToRadians(180 / sides * i)) * radius;
        const y1 = Math.sin(Geometry.convertDegreesToRadians(360 / sides * j)) * r;
        const z1 = Math.cos(Geometry.convertDegreesToRadians(360 / sides * j)) * r;

        vertices.push(new Point3D(x1, y1, z1));

        if (i > 0) {
          polygons.push(new Polygon3D([
            (i * sides) + j,
            ((i - 1) * sides) + ((j + 1) % sides),
            ((i - 1) * sides) + j,
          ], strokeColor, fillColor));

          polygons.push(new Polygon3D([
            (i * sides) + j,
            (i * sides) + ((j + 1) % sides),
            ((i - 1) * sides) + ((j + 1) % sides),
          ], strokeColor, fillColor));
        }
      }
    }

    return new Object3D(vertices, polygons, x, y, z);
  }
}
