import Point3D from './Point3D.js';

export default class GeometryAdapter {
  constructor() {}

  static points3DToArray(points) {
    const myArray = [];
    for (let i = 0; i < points.length; i++) {
      myArray[i] = points[i].asArray();
    }
    return myArray;
  }

  static arrayToPoints3D(myArray) {
    const points = [];
    for (let i = 0; i < myArray.length; i++) {
      const vertex = myArray[i];
      const point = new Point3D(vertex[0], vertex[1], vertex[2]);
      points.push(point);
    }
    return points;
  }
}
