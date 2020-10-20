import Canvas from './Canvas.js';

export default class Polygon3D {
  constructor(
    vertexIndices,
    strokeColor = null,
    fillColor = null,
    texture = null
  ) {
    this.vertexIndices = vertexIndices;
    this.strokeColor = strokeColor;
    this.fillColor = fillColor;
    this.texture = texture;
  }

  setTexture(texture) {
    this.texture = texture;
  }

  setStrokeColor(color) {
    this.strokeColor = color;
  }

  setFillColor(color) {
    this.fillColor = color;
  }
}
