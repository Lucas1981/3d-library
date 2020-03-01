import Matrix from './Matrix.js';

export default class Matrices {
  constructor() {}

  static add(m1, m2) {
    const matrix = new Matrix(m1.rows, m1.columns, 0);
    for (var i = 0; i < m1.rows; i++) {
      for (var j = 0; j < m1.columns; j++) {
        matrix.matrix[i][j] = m1.matrix[i][j] + m2.matrix[i][j];
      }
    }
    return matrix;
  }

  static subtract(m1, m2) {
    const matrix = new Matrix(m1.rows, m1.columns);
    for (var i = 0; i < m1.rows; i++)
      for (var j = 0; j < m1.columns; j++)
        matrix.matrix[i][j] = m1.matrix[i][j] - m2.matrix[i][j];
    return matrix;
  }

  static scale(matrix, scalar) {
    const newMatrix = new Matrix(matrix.rows, matrix.columns);
    for (var i = 0; i < newMatrix.rows; i++)
      for (var j = 0; j < newMatrix.columns; j++)
        newMatrix.matrix[i][j] = matrix.matrix[i][j] * scalar;
    return newMatrix;
  }

  static product(m1, m2) {
    if (m1.columns !== m2.rows) {
      throw new Error('Mismatch between number of columns in this matrix and number of rows in foreign matrix');
    }

    const matrix = new Matrix(m1.rows, m2.columns, 0);
    for (var i = 0; i < m1.rows; i++) {
      for (var j = 0; j < m2.columns; j++) {
        for (var k = 0; k < m1.columns; k++) {
          matrix.matrix[i][j] += m1.matrix[i][k] * m2.matrix[k][j];
        }
      }
    }
    return matrix;
  }
}
