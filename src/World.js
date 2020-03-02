import Point3D from './Point3D.js';
import Polygon3D from './Polygon3D';
import PaintersAlgorithm from './PaintersAlgorithm.js';
import TransformFactory from './TransformFactory.js';
import MatrixAdapter from './matrix/MatrixAdapter.js';
import BackFaceCulling from './BackFaceCulling.js';

const applyBackFaceCulling = false;

export default class World {
  constructor(viewFrustum) {
    this.viewFrustum = viewFrustum;
    this.objects = [];
    this.context = viewFrustum.getContext();
  }

  addObject(object) {
    this.objects.push(object);
  }

  addObjects(objects) {
    for (let i = 0; i < objects.length; i++) {
        this.addObject(objects[i]);
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
      if (!applyBackFaceCulling || BackFaceCulling.determine(point, finalVertices, polygon)) {
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
      this.context.strokeStyle = polygon.strokeColor;
      this.context.stroke();
    if (polygon.fillColor !== null) {
      this.context.fillStyle = polygon.fillColor;
      this.context.fill();
    }
    return this;
  }
}
