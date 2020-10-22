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

  static createNormalizedVector(v1) {
  	if (v1.magnitude === 0) return v1; // This would produce a division-by-zero. To avoid that, return 0.

    return new Vector3D(
      v1.x * v1.unitLength,
      v1.y * v1.unitLength,
      v1.z * v1.unitLength
    );
  }
}
