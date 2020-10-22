import Point3D from './Point3D.js';
import Polygon3D from './Polygon3D';
import PaintersAlgorithm from './PaintersAlgorithm.js';
import TransformFactory from './TransformFactory.js';
import MatrixAdapter from './matrix/MatrixAdapter.js';
import Matrices from './matrix/Matrices.js';
import BackFaceCulling from './BackFaceCulling.js';
import Light from './lights/Light.js';
// import Gouraud from './texture/Gouraud.js';

const defaultApplyBackFaceCulling = true;
const methods = {
  svg: 1,
  canvasVectors: 2,
  canvasPixelated: 3
};
const method = methods.canvasVectors;

export default class World {
  constructor(viewFrustum, applyBackFaceCulling = defaultApplyBackFaceCulling) {
    this.applyBackFaceCulling = applyBackFaceCulling;
    this.viewFrustum = viewFrustum;
    this.objects = [];
    this.lights = [];
    this.context = viewFrustum.getContext();
  }

  setCamera(camera) {
    this.camera = camera;
  }

  addObject(object) {
    this.objects.push(object);
  }

  addLight(light) {
    this.lights.push(light);
  }

  addObjects(objects) {
    for (let i = 0; i < objects.length; i++) {
        this.addObject(objects[i]);
    }
    return this;
  }

  addLights(lights) {
    for (let i = 0; i < lights.length; i++) {
      this.addLight(lights[i]);
    }
    return this;
  }

  getObjects() {
    return this.objects;
  }

  draw() {
    this.viewFrustum.clearScreen();
    /* Assemble a final list of vertices and polygons based on the transformed objects */
    const cameraManipulation = TransformFactory.translateAndRotate(
      this.camera, this.camera.rotationX, this.camera.rotationY, this.camera.rotationZ
    );
    let finalPolygons = [];
    let finalVertices = [];
    let accumulatedIndex = 0;

    for(const object of this.objects) {
      const position = object.getPosition();
      const worldTranslation = TransformFactory.translate(position);
      const worldVertices = MatrixAdapter.applyMatrixToPoints3D(worldTranslation, object.getAlteredVertices());

      // Apply lighting here, before we apply the camera translations
      this.determineLighting(object.getPolygons(), worldVertices);

      // Then continue by applying the camera manipulation
      const vertices = MatrixAdapter.applyMatrixToPoints3D(cameraManipulation, worldVertices)
      const polygons = this.shiftVertexIndicesOfPolygons(object.getPolygons(), accumulatedIndex);
      finalPolygons = [
        ...finalPolygons,
        ...polygons
      ];
      finalVertices = [
        ...finalVertices,
        ...vertices
      ];
      accumulatedIndex += vertices.length;
    }

    const sortedFinalPolygons = PaintersAlgorithm.sort(finalVertices, finalPolygons);

    /* Then paint the compiled list of polygons */
    for (const polygon of sortedFinalPolygons) {
      const point = new Point3D(0, 0, -1 * this.viewFrustum.getHalfScreenWidth());
      if (!this.applyBackFaceCulling || BackFaceCulling.determine(point, finalVertices, polygon)) {
        this.drawPolygon(finalVertices, polygon);
      }
    }
  }

  shiftVertexIndicesOfPolygons(polygons, offset) {
    const newPolygons = [];
    for (let i = 0; i < polygons.length; i++) {
      const vertexIndices = [];
      const polygon = polygons[i];
      for (let j = 0; j < polygon.vertexIndices.length; j++) {
          vertexIndices[j] = polygon.vertexIndices[j] + offset;
      }
      newPolygons.push(
        new Polygon3D(
          vertexIndices,
          polygon.strokeColor,
          polygon.fillColor
        )
          .setStrokeColorAfterLighting(polygon.strokeColorAfterLighting)
          .setFillColorAfterLighting(polygon.fillColorAfterLighting)
      );
    }

    return newPolygons;
  }

  drawPolygon(vertices, polygon) {
    switch(method) {
      case methods.svg:
        break;
      case methods.canvasVectors:
        this.drawPolygonCanvasVectors(vertices, polygon);
        break;
      case methods.pixelated:
        // this.drawPolygonCanvasPixelated(vertices, polygon);
        break;
      default:
        throw new Error('Unknown drawing method specified');
    }
  }

  drawPolygonCanvasVectors(vertices, polygon) {
    this.context.beginPath();
    for (let i = 0; i < polygon.vertexIndices.length; i++) {
      const next = (i === polygon.vertexIndices.length - 1 ? 0 : i + 1);
      const v1 = vertices[polygon.vertexIndices[i]];
      const p1 = this.viewFrustum.getProjected2DPoint(v1);
      if (i == 0) this.context.moveTo(p1.x, p1.y);
      else this.context.lineTo(p1.x, p1.y);
    }
    this.context.closePath();

    if (polygon.strokeColor !== null)
      this.context.strokeStyle = polygon.strokeColorAfterLighting;
      this.context.stroke();
    if (polygon.fillColor !== null) {
      this.context.fillStyle = polygon.fillColorAfterLighting;
      this.context.fill();
    }
    return this;
  }

  determineLighting(polygons, vertices) {
    const lightMax = 255;
    for (const polygon of polygons) {
      const aggregate = polygon.vertexIndices.reduce((acc, curr) => ({
        x: acc.x + vertices[curr].x,
        y: acc.y + vertices[curr].y,
        z: acc.z + vertices[curr].z
      }), { x: 0, y: 0, z: 0 });

      const centerPoint = new Point3D(
        aggregate.x / polygon.vertexIndices.length,
        aggregate.y / polygon.vertexIndices.length,
        aggregate.z / polygon.vertexIndices.length
      );

      let fillColorFinal = { r: 0, g: 0, b: 0 };
      let strokeColorFinal = { r: 0, g: 0, b: 0 };

      for (const light of this.lights) {
        const i = light.calculate(centerPoint);
        fillColorFinal.r += polygon.fillColor.r * i;
        fillColorFinal.g += polygon.fillColor.g * i;
        fillColorFinal.b += polygon.fillColor.b * i;

        strokeColorFinal.r += polygon.strokeColor.r * i;
        strokeColorFinal.g += polygon.strokeColor.g * i;
        strokeColorFinal.b += polygon.strokeColor.b * i;
      }

      // Make sure the light doesn't exceed 255
      strokeColorFinal = {
        r: Math.min(strokeColorFinal.r, lightMax),
        g: Math.min(strokeColorFinal.g, lightMax),
        b: Math.min(strokeColorFinal.b, lightMax)
      };

      fillColorFinal = {
        r: Math.min(fillColorFinal.r, lightMax),
        g: Math.min(fillColorFinal.g, lightMax),
        b: Math.min(fillColorFinal.b, lightMax)
      };

      const strokeValue = `rgb(${fillColorFinal.r},${fillColorFinal.g},${fillColorFinal.b})`;
      const fillValue = `rgb(${fillColorFinal.r},${fillColorFinal.g},${fillColorFinal.b})`;
      polygon.setStrokeColorAfterLighting(strokeValue);
      polygon.setFillColorAfterLighting(fillValue);
    }
  }

  // drawPolygonCanvasPixelated(vertices, polygon) {
  //   const contextData = this.canvas.getContextData();
  //   Gouraud.drawGeneralTriangleGouraudTexture(polygon, textureData, contextData);
  // }
}
