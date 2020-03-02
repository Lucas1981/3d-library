import Vector3D from './Vector3D.js';
import Geometry from '../Geometry.js';

export default class VectorFactory {
  constructor() {}

  static createVector3DFromPolar(polar) {
    const phiInRadians = Geometry.convertDegreesToRadians(polar.phi);
    const thetaInRadians = Geometry.convertDegreesToRadians(polar.theta);
    const x = polar.radius * Math.sin(phiInRadians) * Math.cos(thetaInRadians);
    const y = polar.radius * Math.sin(phiInRadians) * Math.sin(thetaInRadians);
    const z = polar.radius * Math.cos(phiInRadians);
    const vector = new Vector3D(x, y, z);
    return vector;
  }

  static createVector3DFromArray(arr) {
    const vector = new Vector3D(arr[0], arr[1], arr[2]);
    return vector;
  }
}
