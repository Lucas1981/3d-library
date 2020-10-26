import VectorFactory from '../vector/VectorFactory.js';
import Vectors from '../vector/Vectors.js';
import Vector3D from '../vector/Vector3D.js';

export default class Lighting {
    static calculate(
      intensity,
      polygon,
      vertices,
      surfaceNormal,
      camera,
      light
    ) {
      let dx, dy, dz;
      // Calculate ambient light
      const ia = intensity * polygon.intensity;

      // Calculate diffuse light
      const targetPoint = vertices[polygon.vertexIndices[0]];
      dx = targetPoint.x - light.x;
      dy = targetPoint.y - light.y;
      dz = targetPoint.z - light.z;
      const sourceVector = new Vector3D(dx, dy, dz); // Compare dp to vector pointing the other way
      const normalizedSourceVector = VectorFactory.createNormalizedVector(sourceVector);
      const factor = normalizedSourceVector.dotProduct(surfaceNormal);
      const id = intensity * polygon.intensity * factor;

      // Calculate specular light. We need distance to light, and camera as vectors for this. This is almost working, but the reflection itself seems inverted
      const l = normalizedSourceVector;
      const n = surfaceNormal;
      const r = new Vector3D(...Vectors.projection(normalizedSourceVector, surfaceNormal));
      dx = camera.x - targetPoint.x;
      dy = camera.y - targetPoint.y;
      dz = camera.z - targetPoint.z;
      const distanceSourceToCamera = new Vector3D(dx, dy, dz); // Compare dp to vector pointing the other way
      const v = VectorFactory.createNormalizedVector(distanceSourceToCamera);
      const rv = r.dotProduct(v);
      const nl = n.dotProduct(l);
      const show = nl > 0 ? 1 : 0;
      const is = intensity * Math.pow(Math.max(rv, 0), polygon.sp) * show;

      // Return the final result
      return ia + id + is + polygon.emission;
    }
}
