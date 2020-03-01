export default class Matrix {
  constructor(rows, columns, initialValue = 0, initialValuesAsArray = null) {
    this._matrix = [];
    this._columns = columns;
    this._rows = rows;
    for (var i = 0; i < rows; i++) {
      this._matrix[i] = [];
      for (var j = 0; j < columns; j++) {
        if (initialValuesAsArray === null) {
          this._matrix[i][j] = initialValue;
        } else {
          this._matrix[i][j] = initialValuesAsArray[i][j];
        }
      }
    }
  }

  get matrix() { return this._matrix; }
  get columns() { return this._columns; }
  get rows() { return this._rows; }

  add(matrix) {
    for (var i = 0; i < this._rows; i++)
      for (var j = 0; j < this._columns; i++)
        this._matrix[i][j] += matrix.matrix[i][j];
    return this;
  }

  subtract(matrix) {
    for (var i = 0; i < this._rows; i++)
      for (var j = 0; j < this._rows; i++)
        this._matrix[i][j] -= matrix.matrix[i][j];
    return this;
  }

  scale(scalar) {
    for (var i = 0; i < this.rows; i++)
      for (var j = 0; j < this.columns; i++)
        this._matrix[i][j] *= scalar;
    return this;
  }
}
