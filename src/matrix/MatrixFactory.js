import Matrix from './Matrix.js';

export default class MatrixFactory {
  constructor() {}

  static matrix(rows, columns) {
    return new Matrix(rows, columns);
  }

  static identity(n) {
    const matrix = new Matrix(n, n, 0);
    for (let i = 0; i < n; i++)
      matrix.matrix[i][i] = 1;
    return matrix;
  }

  static createFrom1DArray(myArray) {
    const myArray2D = [myArray];
    const newMatrix = this.createFrom2DArray(myArray2D);
    return newMatrix;
  }

  static createFrom2DArray(myArray2D) {
    const rows = myArray2D.length;
    const columns = myArray2D[0].length;
    const newMatrix = new Matrix(rows, columns);
    for (let i = 0; i < rows; i++)
      for (let j = 0; j < columns; j++)
        newMatrix.matrix[i][j] = myArray2D[i][j];
    return newMatrix;
  }

  static transpose(matrix) {
    const transposedMatrixAsArray = [];
    let transposedMatrix;
    for (let i = 0; i < matrix.matrix[0].length; i++) {
      transposedMatrixAsArray[i] = [];
      for (let j = 0; j < matrix.matrix.length; j++) {
        transposedMatrixAsArray[i][j] = matrix.matrix[j][i];
      }
    }
    transposedMatrix = new Matrix(matrix.matrix[0].length, matrix.matrix.length, 0, transposedMatrixAsArray);
    return transposedMatrix;
  }
}
