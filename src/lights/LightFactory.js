export default class LightFactory {
  constructor() {}

  static point(sourcePoint, cl = 1, kc = 1, kl = 1, kq = 1) {
    return (i, targetPoint) => {
      // Calculate the distance from the source to the point p
      const dx = Math.abs(sourcePoint.x - targetPoint.x);
      const dy = Math.abs(sourcePoint.y - targetPoint.y);
      const dz = Math.abs(sourcePoint.z - targetPoint.z);

      const xyDist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
      const d = Math.sqrt(Math.pow(dz, 2) + Math.pow(xyDist, 2));

      // Run it through the ambient and point light combo (LaMothe, p. 760)
      const divider = (kc + (kl * d) + (kq * Math.pow(d, 2)));

      // Then return the calculated intensities
      return {
        r: (i.r * cl) / divider,
        g: (i.g * cl) / divider,
        b: (i.b * cl) / divider
      };
    };
  }
}
