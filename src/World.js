import Point3D from './Point3D.js';
import Polygon3D from './Polygon3D';
import PaintersAlgorithm from './PaintersAlgorithm.js';
import TransformFactory from './TransformFactory.js';
import MatrixAdapter from './matrix/MatrixAdapter.js';
import BackFaceCulling from './BackFaceCulling.js';
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
    let finalPolygons = [];
    let finalVertices = [];
    let accumulatedIndex = 0;

    for(const object of this.objects) {
      const position = object.getPosition();
      const translation = TransformFactory.translate(position);
      const vertices = MatrixAdapter.applyMatrixToPoints3D(translation, object.getAlteredVertices());
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
      newPolygons.push(new Polygon3D(vertexIndices, polygon.strokeColor, polygon.fillColor, polygon.isFilled, polygon.isStroked));
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
    const aggregate = { x: 0, y: 0, z: 0 };

    this.context.beginPath();
    for (let i = 0; i < polygon.vertexIndices.length; i++) {
      const next = (i === polygon.vertexIndices.length - 1 ? 0 : i + 1);
      const v1 = vertices[polygon.vertexIndices[i]];
      const p1 = this.viewFrustum.getProjected2DPoint(v1);
      if (i == 0) this.context.moveTo(p1.x, p1.y);
      else this.context.lineTo(p1.x, p1.y);
      aggregate.x += v1.x;
      aggregate.y += v1.y;
      aggregate.z += v1.z;
    }
    const centerPoint = new Point3D(
      aggregate.x / polygon.vertexIndices.length,
      aggregate.y / polygon.vertexIndices.length,
      aggregate.z / polygon.vertexIndices.length
    );

    this.context.closePath();

    if (polygon.strokeColor !== null)
      this.context.strokeStyle = this.determineLighting(polygon.strokeColor, centerPoint);
      this.context.stroke();
    if (polygon.fillColor !== null) {
      this.context.fillStyle = this.determineLighting(polygon.fillColor, centerPoint);
      this.context.fill();
    }
    return this;
  }

  determineLighting(color, point) {
    const lightMax = 255;
    let final = { r: 0, g: 0, b: 0 };

    for (const light of this.lights) {
      const { r, g, b } = light.calculate(color, point);
      final.r += r;
      final.g += g;
      final.b += b;
    }

    // Make sure the light doesn't exceed 255
    final = {
      r: Math.min(final.r, lightMax),
      g: Math.min(final.g, lightMax),
      b: Math.min(final.b, lightMax)
    };

    const { r, g, b } = final;
    return `rgb(${r},${g},${b})`;
  }

  // drawPolygonCanvasPixelated(vertices, polygon) {
  //   const contextData = this.canvas.getContextData();
  //   Gouraud.drawGeneralTriangleGouraudTexture(polygon, textureData, contextData);
  // }
}
