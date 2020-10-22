import Geometry from '../Geometry.js';
import Point3D from '../Point3D.js';
import Polygon3D from '../Polygon3D.js';
import Object3D from '../Object3D.js';

export default class DodecahedronFactory {
    constructor() {}

    static create(_x, _y, _z, radius, strokeColor = 'white', fillColor = null) {
      const baseAngle = 180 - 360 / 5;
      const secondBaseAngle = 180 / 3;
      const sideLength = 2 * radius * Math.cos(Geometry.convertDegreesToRadians(0.5 * baseAngle));
      const extraRadius = Math.cos(Geometry.convertDegreesToRadians(secondBaseAngle)) * sideLength;
      const stuckoutRadius = radius + extraRadius;
      const verticalStep = Math.sqrt(Math.pow(sideLength, 2) - Math.pow(extraRadius, 2));
      const middleLineLength = Math.sqrt(Math.pow(radius, 2) - Math.pow((1 / 2) * sideLength, 2)) + radius;
      const bottomDistance = Math.sin(Geometry.convertDegreesToRadians(secondBaseAngle)) * middleLineLength;
      const totalLength = verticalStep + bottomDistance;
      const offsetY = totalLength / 2 * -1;
      const vertices = [];
      for (let i = 0; i < 5; i++) {
        let z = Math.sin(Geometry.convertDegreesToRadians(360 / 5 * i)) * radius;
        let x = Math.cos(Geometry.convertDegreesToRadians(360 / 5 * i)) * radius;
        vertices.push(new Point3D(x, offsetY, z));
        z = Math.sin(Geometry.convertDegreesToRadians(360 / 5 * i)) * stuckoutRadius;
        x = Math.cos(Geometry.convertDegreesToRadians(360 / 5 * i)) * stuckoutRadius;
        let y = verticalStep;
        vertices.push(new Point3D(x, offsetY + y, z));
        z = Math.sin(Geometry.convertDegreesToRadians((360 / 5 * i) + 180)) * stuckoutRadius;
        x = Math.cos(Geometry.convertDegreesToRadians((360 / 5 * i) + 180)) * stuckoutRadius;
        y = totalLength - verticalStep;
        vertices.push(new Point3D(x, offsetY + y, z));
        z = Math.sin(Geometry.convertDegreesToRadians((360 / 5 * i) + 180)) * radius;
        x = Math.cos(Geometry.convertDegreesToRadians((360 / 5 * i) + 180)) * radius;
        y = totalLength;
        vertices.push(new Point3D(x, offsetY + y, z));
      }
      // This is still kinda funky being built up not of triangles. Things will behave weird when camera translation/rotation kicks in
      const polygons = [
        new Polygon3D([0, 1, 14, 5, 4], strokeColor, fillColor),
        new Polygon3D([4, 5, 18, 9, 8], strokeColor, fillColor),
        new Polygon3D([8, 9, 2, 13, 12], strokeColor, fillColor),
        new Polygon3D([12, 13, 6, 17, 16], strokeColor, fillColor),
        new Polygon3D([16, 17, 10, 1, 0], strokeColor, fillColor),
        new Polygon3D([7, 6, 13, 2, 3], strokeColor, fillColor),
        new Polygon3D([11, 10, 17, 6, 7], strokeColor, fillColor),
        new Polygon3D([15, 14, 1, 10, 11], strokeColor, fillColor),
        new Polygon3D([19, 18, 5, 14, 15], strokeColor, fillColor),
        new Polygon3D([3, 2, 9, 18, 19], strokeColor, fillColor),
        new Polygon3D([0, 4, 8, 12, 16], strokeColor, fillColor),
        new Polygon3D([19, 15, 11, 7, 3], strokeColor, fillColor)
      ];
      return new Object3D(vertices, polygons, _x, _y, _z);
    }
}
