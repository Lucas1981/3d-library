import Polygon3D from './Polygon3D';

export default class Object3D {
  constructor(vertices, polygons, x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.vertices = vertices;
    this.polygons = polygons;
  }

  addPolygon(vertexIndices, strokeColor, fillColor, isFilled, isStroked) {
    const polygon = new Polygon3D(vertexIndices, strokeColor, fillColor, isFilled, isStroked)
    this.polygons.push(polygon);
  }

  getVertices() {
    return this.vertices;
  }

  getPolygons() {
    return this.polygons;
  }
}
