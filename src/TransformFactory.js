import Matrix from './matrix/Matrix.js';
import Matrices from './matrix/Matrices.js';
import MatrixFactory from './matrix/MatrixFactory.js';
import Geometry from './Geometry.js';
import { scaleModel, reflectXModel, reflectYModel, reflectZModel } from './matrix/models.js';
// import models from './ModelFactory.ts';

export default class TransformFactory {
  constructor() {}

  static scale(scalar) {
    if (scalar === 0) { scalar = 1; }
    let matrix = MatrixFactory.identity(4);
    for (let i = 0; i < scaleModel.length; i++) {
      for (let j = 0; j < scaleModel[0].length; j++) {
        matrix.matrix[i][j] = scaleModel[i][j] * scalar;
      }
    }
    return matrix;
  }

  static reflect(type) {
    switch (type) {
      case 'x':
        return new Matrix(4, 4, 0, reflectXModel);
      case 'y':
        return new Matrix(4, 4, 0, reflectYModel);
      case 'z':
        return new Matrix(4, 4, 0, reflectZModel);
      default:
        throw new Error('No valid rotation axis specified');
    }
  }

  static rotate(alpha, beta, gamma) {
    const rotateX = this.rotateX(alpha);
    const rotateXY = Matrices.product(rotateX, this.rotateY(beta));
    const rotateXYZ = Matrices.product(rotateXY, this.rotateZ(gamma));
    return rotateXYZ;
  }

  static scaleAndRotate(scalar, alpha, beta, gamma) {
    const rotated = this.rotate(alpha, beta, gamma);
    var scaled = Matrices.product(rotated, this.scale(scalar));
    return scaled;
  }

  static rotateInOneDirection(direction, angleInDegrees) {
    switch (direction) {
      case 'x':
        return this.rotateX(angleInDegrees);
      case 'y':
        return this.rotateY(angleInDegrees);
      case 'z':
        return this.rotateZ(angleInDegrees);
      default:
        throw new Error('No valid rotation axis specified');
    }
  }

  static rotateX(angleInDegrees) {
      const angleInRadians = Geometry.convertDegreesToRadians(angleInDegrees);
      const matrix = new Matrix(4, 4, 0, [
        [1, 0, 0, 0],
        [0, Math.cos(angleInRadians), Math.sin(angleInRadians), 0],
        [0, -1 * Math.sin(angleInRadians), Math.cos(angleInRadians), 0],
        [0, 0, 0, 1]
      ]);
      return matrix;
  }

  static rotateY(angleInDegrees) {
    const angleInRadians = Geometry.convertDegreesToRadians(angleInDegrees);
    const matrix = new Matrix(4, 4, 0, [
      [Math.cos(angleInRadians), 0, -1 * Math.sin(angleInRadians), 0],
      [0, 1, 0, 0],
      [Math.sin(angleInRadians), 0, Math.cos(angleInRadians), 0],
      [0, 0, 0, 1]
    ]);
    return matrix;
  }

  static rotateZ(angleInDegrees) {
    const angleInRadians = Geometry.convertDegreesToRadians(angleInDegrees);
    var arr = [
      [Math.cos(angleInRadians), Math.sin(angleInRadians), 0, 0],
      [-1 * Math.sin(angleInRadians), Math.cos(angleInRadians), 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
    ];
    const matrix = new Matrix(4, 4, 0, arr);
    return matrix;
  }

  static translate(translationVertex) {
    const baseArray = MatrixFactory.identity(4).matrix;
    baseArray[3][0] = translationVertex.x;
    baseArray[3][1] = translationVertex.y;
    baseArray[3][2] = translationVertex.z;
    var baseMatrix = new Matrix(4, 4, 0, baseArray);
    return baseMatrix;
  }
}
