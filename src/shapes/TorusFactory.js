import Point3D from '../Point3D.js';
import Polygon3D from '../Polygon3D.js';
import Object3D from '../Object3D.js';
import Geometry from '../Geometry.js';

export default class TorusFactory {
  constructor() {}

  static create(x, y, z, sides, turns, thickness, reach, strokeColor = 'white', fillColor = null) {
    const vertices = [];
    const polygons = [];

    for (let i = 0; i < sides; i++) {
      // First, find the angles around which to build the points
      const ax = Math.sin(Geometry.convertDegreesToRadians(360 / sides * i));
      const az = Math.cos(Geometry.convertDegreesToRadians(360 / sides * i));

      // Then, register the spots around each turn
      for (let j = 0; j < turns; j++) {
        const r = Math.sin(Geometry.convertDegreesToRadians(360 / turns * j)) * thickness;
        let x1 = ax * (reach + r);
        let z1 = az * (reach + r);
        const y1 = Math.cos(Geometry.convertDegreesToRadians(360 / turns * j)) * thickness;
        vertices.push(new Point3D(x1, y1, z1));

        // Register all the polygons
        polygons.push(new Polygon3D([
          turns * i + j,
          turns * i + ((j + 1) % turns),
          (turns * ((i + 1) % sides)) + ((j + 1) % turns),
        ], strokeColor, fillColor));

        polygons.push(new Polygon3D([
          turns * i + j,
          (turns * ((i + 1) % sides)) + ((j + 1) % turns),
          (turns * ((i + 1) % sides)) + j,
        ], strokeColor, fillColor));
      }
    }

    return new Object3D(vertices, polygons, x, y, z);
  }
}
