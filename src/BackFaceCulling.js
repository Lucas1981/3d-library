import VectorAdapter from './vector/VectorAdapter.js';
import VectorFactory from './vector/VectorFactory.js';
import Vectors from './vector/Vectors.js';

export default class BackFaceCulling {
  constructor() {}

  static determine(relativePosition, vertices, polygon) {
    // v0 = [0, 0, -320]; // this is the relativePosition vector
    // v1 = subVector(objects.vlist[objects.poly[i].vert[1]], objects.vlist[objects.poly[i].vert[0]]);
    // v2 = subVector(objects.vlist[objects.poly[i].vert[2]], objects.vlist[objects.poly[i].vert[0]]);
    // n = crossProduct(v2, v1);
    // dp = dotProduct(v0, n);
    // let relativePositionAsVector: Vector3D = VectorAdapter.point3DToVector3D(relativePosition);
    const basePolygonVector = VectorAdapter.point3DToVector3D(vertices[polygon.vertexIndices[0]]);
    const firstPolygonVector = VectorAdapter.point3DToVector3D(vertices[polygon.vertexIndices[1]]);
    const secondPolygonVector = VectorAdapter.point3DToVector3D(vertices[polygon.vertexIndices[2]]);
    const vector1 = VectorFactory.createVector3DFromArray(Vectors.subtract(firstPolygonVector, basePolygonVector));
    const vector2 = VectorFactory.createVector3DFromArray(Vectors.subtract(secondPolygonVector, basePolygonVector));
    const normal = Vectors.crossProduct(vector1, vector2);
    const dotProduct = basePolygonVector.dotProduct(normal);
    return dotProduct <= 0;
  }
}
