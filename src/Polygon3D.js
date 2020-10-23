import VectorAdapter from './vector/VectorAdapter.js';
import VectorFactory from './vector/VectorFactory.js';
import Vectors from './vector/Vectors.js';
import Canvas from './Canvas.js';

export default class Polygon3D {
  constructor(
    vertexIndices,
    strokeColor = null,
    fillColor = null,
    texture = null,
    strokeColorAfterLighting = null,
    fillColorAfterLighting = null,
    intensity = 1,
    sp = 1,
    emission = 0
  ) {
    this.vertexIndices = vertexIndices;
    this.strokeColor = strokeColor;
    this.fillColor = fillColor;
    this.texture = texture;
    this.strokeColorAfterLighting = strokeColorAfterLighting;
    this.fillColorAfterLighting = fillColorAfterLighting;
    this.intensity = 1;
    this.sp = sp;
    this.emission = emission;
  }

  determineSurfaceNormal(vertices) {
    const basePolygonVector = VectorAdapter.point3DToVector3D(vertices[this.vertexIndices[0]]);
    const firstPolygonVector = VectorAdapter.point3DToVector3D(vertices[this.vertexIndices[1]]);
    const secondPolygonVector = VectorAdapter.point3DToVector3D(vertices[this.vertexIndices[2]]);
    const vector1 = VectorFactory.createVector3DFromArray(Vectors.subtract(firstPolygonVector, basePolygonVector));
    const vector2 = VectorFactory.createVector3DFromArray(Vectors.subtract(secondPolygonVector, basePolygonVector));
    return Vectors.crossProduct(vector1, vector2);
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
