import Matrix from './Matrix.js';
import Matrices from './Matrices.js';
import GeometryAdapter from '../GeometryAdapter.js';

export default class MatrixAdapter {
  constructor() {}

  static point3DToMatrix(point) {
    var matrix = new Matrix(4, 1, 0, [[point.x], [point.y], [point.z], [point.w]]);
    return matrix;
  }

  static points3DToMatrix(points) {
    var pointsAsArray = GeometryAdapter.points3DToArray(points);
    var matrix = new Matrix(pointsAsArray.length, 4, 0, pointsAsArray);
    return matrix;
  }

  static matrixToPoints3D(matrix) {
    var matrixAsArray = matrix.matrix;
    var points = GeometryAdapter.arrayToPoints3D(matrixAsArray);
    return points;
  }

  static applyMatrixToPoints3D(matrix, points) {
    var vertices = this.points3DToMatrix(points);
    var product = Matrices.product(vertices, matrix);
    var newPoints = MatrixAdapter.matrixToPoints3D(product);
    return newPoints;
  }
}
