export default class Canvas {
  constructor(id, width, height) {
    this.id = id;
    this.width = width;
    this.height = height;
    this.canvas = this.id ? document.getElementById(id) : document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.initiate();
  }

  initiate() {
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  getCanvas() {
      return this.canvas;
  }

  getContext() {
      return this.ctx;
  }

  setWidth(width) {
      this.canvas.width = width;
      return this;
  }

  setHeight(height) {
      this.canvas.height = height;
      return this;
  }

  circle(x, y, r, fillColor, strokeColor) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, r, 0, 2 * Math.PI);
    this.ctx.closePath();
    this.ctx.fillStyle = fillColor;
    this.ctx.strokeStyle = strokeColor;
    this.ctx.fill();
    this.ctx.stroke();
    return this;
  }

  rect(x, y, width, height, fillColor, strokeColor) {
    this.ctx.fillStyle = fillColor;
    this.ctx.strokeStyle = strokeColor;
    this.ctx.beginPath();
    this.ctx.rect(x, y, width, height);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
    return this;
  }

  line(x1, y1, x2, y2, color, thickness) {
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.closePath();
    this.ctx.strokeStyle = color;
    this.ctx.stroke();
    return this;
  }

  path(coordinates, fillColor, strokeColor, thickness) {
    this.ctx.beginPath();
    for (let i = 0; i < coordinates.length; i++) {
      const coordinate = coordinates[i];
      if (i === 0) this.ctx.moveTo(coordinate[0], coordinate[1]);
      else this.ctx.lineTo(coordinate[0], coordinate[1]);
    }
    this.ctx.closePath();
    this.ctx.strokeStyle = strokeColor;
    this.ctx.fillStyle = fillColor;
    this.ctx.fill();
    this.ctx.stroke();
    return this;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    return this;
  }

  clearRect(x, y, width, height) {
    this.ctx.clearRect(x, y, width, height);
    return this;
  }
}
