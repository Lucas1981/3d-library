import Vectors from '../vector/Vectors.js';
import Vector3D from '../vector/Vector3D.js';
import VectorFactory from '../vector/VectorFactory.js';
import Geometry from '../Geometry.js';

export default class Light {
  constructor(sourcePoint, i = 1, cl = 1, kc = 1, kl = 0, kq = 0, pf = 0, l = null) {
    this.sourcePoint = sourcePoint;
    this.i = i;
    this.cl = cl;
    this.kc = kc;
    this.kl = kl;
    this.kq = kq;
    this.pf = pf;
    this.l = l;
  }

  // Might want to make some use of the builder pattern here to make keeping things dynamic more easy
  get x() { return this.sourcePoint.x; }
  get y() { return this.sourcePoint.y; }
  get z() { return this.sourcePoint.z; }
  setX(x) { this.sourcePoint.x = x; return this; }
  setY(y) { this.sourcePoint.y = y; return this; }
  setZ(z) { this.sourcePoint.z = z; return this; }
  setKc(kc) { this.kc = kc; return this; }
  setKl(kl) { this.kl = kl; return this; }
  setKq(kq) { this.kq = kq; return this; }
  setPf(pf) { this.pf = pf; return this; }
  setL(l) { this.l = l; return this; }

  calculate(targetPoint) {
    // Calculate the distance from the source to the point p
    const dx = this.sourcePoint.x - targetPoint.x;
    const dy = this.sourcePoint.y - targetPoint.y;
    const dz = this.sourcePoint.z - targetPoint.z;

    const dxy = Geometry.pythagoras(dx, dy);
    const d = Geometry.pythagoras(dz, dxy);

    // Save some time, don't calculate the spotlight if we don't have to
    let spotlight = 1;
    if (this.l && this.pf) {
      const sourceVector = new Vector3D(-dx, -dy, -dz); // Compare dp to vector pointing the other way
      const normalizedSourceVector = VectorFactory.createNormalizedVector(sourceVector);
      const normalizedTargetVector = VectorFactory.createNormalizedVector(this.l);
      const dp = normalizedTargetVector.dotProduct(normalizedSourceVector);
      spotlight = Math.pow(Math.max(dp, 0), this.pf);
    }

    // Run it through the ambient and point light combo (LaMothe, p. 760)
    const divider = this.kc + (this.kl * d) + (this.kq * Math.pow(d, 2));

    // Then return the calculated intensities, see LaMothe, p. 766
    return (this.i * this.cl * spotlight) / divider;
  }

  asJSON() {
    return {
      sourcePoint: this.sourcePoint,
      cl: this.cl,
      kc: this.kc,
      kl: this.kl,
      kq: this.kq,
      pf: this.pf,
      l: this.l
    };
  }
}
