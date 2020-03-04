import CubeFactory from './CubeFactory.js';
import DodecahedronFactory from './DodecahedronFactory.js';
import PyramidFactory from './PyramidFactory.js';
import TetrahedronFactory from './TetrahedronFactory.js';
import MeshFactory from './MeshFactory.js';
import PrismFactory from './PrismFactory.js';

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
    return new PrismFactory.create(x, y, z, radius, turns, height, strokeColor, fillColor);
  }
}
