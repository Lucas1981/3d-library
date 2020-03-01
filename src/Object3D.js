import Polygon3D from './Polygon3D';
import TransformFactory from './TransformFactory.js';
import MatrixAdapter from './matrix/MatrixAdapter.js';
import Point3D from './Point3D.js';

export default class Object3D {
  constructor(vertices, polygons, x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.vertices = vertices;
    this.polygons = polygons;
    this.alteredVertices = [...this.vertices];
  }

  addPolygon(vertexIndices, strokeColor, fillColor, isFilled, isStroked) {
    const polygon = new Polygon3D(vertexIndices, strokeColor, fillColor, isFilled, isStroked);
    this.polygons.push(polygon);
  }

  getVertices() {
    return this.vertices;
  }

  getAlteredVertices() {
    return this.alteredVertices;
  }

  getPolygons() {
    return this.polygons;
  }

  getPosition() {
    var position = new Point3D(this.x, this.y, this.z);
    return position;
  }

  rotate(alpha, beta, gamma) {
    const rotateMatrix = TransformFactory.rotate(alpha, beta, gamma);
    this.applyMatrixToAlteredVertices(rotateMatrix);
    return this;
  }

  scale(scalar) {
    const scaleMatrix = TransformFactory.scale(scalar);
    this.applyMatrixToAlteredVertices(scaleMatrix);
    return this;
  }

  rotateX(angle) {
    this.rotateInOneDirection('x', angle);
    return this;
  }

  rotateY(angle) {
    this.rotateInOneDirection('y', angle);
    return this;
  }

  rotateZ(angle) {
    this.rotateInOneDirection('z', angle);
    return this;
  }

  rotateInOneDirection(direction, angle) {
    var rotation = TransformFactory.rotateInOneDirection(direction, angle);
    this.applyMatrixToAlteredVertices(rotation);
  }

  applyMatrixToAlteredVertices(matrix) {
    this.alteredVertices = MatrixAdapter.applyMatrixToPoints3D(matrix, this.alteredVertices);
  }

  resetAlteredVertices() {
    this.alteredVertices = [...this.vertices];
  }
}
