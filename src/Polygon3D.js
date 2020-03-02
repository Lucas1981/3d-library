export default class Polygon3D {
  constructor(vertexIndices, strokeColor = null, fillColor = null) {
    this.vertexIndices = vertexIndices;
    this.strokeColor = strokeColor;
    this.fillColor = fillColor;
  }

  setStrokeColor(color) {
    this.strokeColor = color;
  }

  setFillColor(color) {
    this.fillColor = color;
  }
}
