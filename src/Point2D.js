export default class Point2D {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }

    asArray() {
      return [this.x, this.y];
    }

    toJSON() {
      return {
          x: this.x,
          y: this.y
      };
    }
};
