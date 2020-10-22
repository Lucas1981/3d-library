import Canvas from './Canvas.js';

export default class Polygon3D {
  constructor(
    vertexIndices,
    strokeColor = null,
    fillColor = null,
    texture = null,
    strokeColorAfterLighting = null,
    fillColorAfterLighting = null
  ) {
    this.vertexIndices = vertexIndices;
    this.strokeColor = strokeColor;
    this.fillColor = fillColor;
    this.texture = texture;
    this.strokeColorAfterLighting = strokeColorAfterLighting;
    this.fillColorAfterLighting = fillColorAfterLighting;
  }

  setStrokeColorAfterLighting(color) {
    this.strokeColorAfterLighting = color;
    return this;
  }

  setFillColorAfterLighting(color) {
    this.fillColorAfterLighting = color;
    return this;
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
