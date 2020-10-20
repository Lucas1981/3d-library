import CubeFactory from './CubeFactory.js';
import DodecahedronFactory from './DodecahedronFactory.js';
import PyramidFactory from './PyramidFactory.js';
import TetrahedronFactory from './TetrahedronFactory.js';
import MeshFactory from './MeshFactory.js';
import PrismFactory from './PrismFactory.js';
import TriangleFactory from './TriangleFactory.js';
import TorusFactory from './TorusFactory.js';
import SphereFactory from './SphereFactory.js';

export default class ShapeFactory {
  static cube(x = 0, y = 0, z = 0, s = 1, strokeColor = '#ffffff', fillColor = null) {
    return CubeFactory.create(x, y, z, s, strokeColor, fillColor);
  }

  static dodecahedron(x, y, z, radius, strokeColor = 'white', fillColor = null) {
    return DodecahedronFactory.create(x, y, z, radius, strokeColor = 'white', fillColor = null);
  }

  static pyramid(x, y, z, scale = 1, radius = 1, strokeColor = 'white', fillColor = null) {
    return PyramidFactory.create(x, y, z, scale, radius, strokeColor, fillColor);
  }

  static tetrahedron(x, y, z, scale = 1, radius = 1, strokeColor = 'white', fillColor = null) {
    return TetrahedronFactory.create(x, y, z, scale, radius, strokeColor, fillColor);
  }

  static mesh(x, y, z, rows, columns, width, height, strokeColor = 'white', fillColor = null) {
    return MeshFactory.create(x, y, z, rows, columns, width, height, strokeColor, fillColor);
  }

  static prism(x, y, z, radius, turns, height, strokeColor = 'white', fillColor = null) {
    return PrismFactory.create(x, y, z, radius, turns, height, strokeColor, fillColor);
  }

  static triangle(x, y, z, scale, strokeColor = 'white', fillColor = null) {
    return TriangleFactory.create(x, y, z, scale, strokeColor, fillColor);
  }

  static torus(x, y, z, sides, turns, thickness, reach, strokeColor = 'white', fillColor = null) {
    return TorusFactory.create(x, y, z, sides, turns, thickness, reach, strokeColor, fillColor);
  }

  static sphere(x, y, z, radius, sides = 32, strokeColor = 'white', fillColor = null) {
    return SphereFactory.create(x, y, z, radius, sides, strokeColor, fillColor);
  }
}
