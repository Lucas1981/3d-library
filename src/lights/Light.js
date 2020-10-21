import Geometry from '../Geometry.js';

export default class Light {
  constructor(sourcePoint, cl = 1, kc = 1, kl = 1, kq = 1) {
    this.sourcePoint = sourcePoint;
    this.cl = cl;
    this.kc = kc;
    this.kl = kl;
    this.kq = kq;
  }

  get x() { return this.sourcePoint.x; }
  get y() { return this.sourcePoint.y; }
  get z() { return this.sourcePoint.z; }
  setX(x) { this.sourcePoint.x = x; }
  setY(y) { this.sourcePoint.y = y; }
  setZ(z) { this.sourcePoint.z = z; }

  calculate(i, targetPoint) {
    // Calculate the distance from the source to the point p
    const dx = Math.abs(this.sourcePoint.x - targetPoint.x);
    const dy = Math.abs(this.sourcePoint.y - targetPoint.y);
    const dz = Math.abs(this.sourcePoint.z - targetPoint.z);

    const dxy = Geometry.pythagoras(dx, dy);
    const d = Geometry.pythagoras(dz, dxy);

    // Run it through the ambient and point light combo (LaMothe, p. 760)
    const divider = (this.kc + (this.kl * d) + (this.kq * Math.pow(d, 2)));

    // Then return the calculated intensities
    return {
      r: (i.r * this.cl) / divider,
      g: (i.g * this.cl) / divider,
      b: (i.b * this.cl) / divider
    };
  }
}
