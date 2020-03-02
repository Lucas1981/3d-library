import Canvas from './Canvas';
import Geometry from './Geometry.js';
import Point2D from './Point2D.js';

export default class ViewFrustum {
  constructor(screenWidth, screenHeight, horizontalFieldOfViewAngle, canvasId) {
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;
    this.horizontalFieldOfViewAngle = horizontalFieldOfViewAngle;
    this.canvasId = canvasId;
    this.canvas = new Canvas(this.canvasId, this.screenWidth, this.screenHeight);
    this.aspectRatio = this.screenHeight / this.screenWidth;
    this.halfScreenWidth = this.screenWidth / 2;
    this.halfScreenHeight = this.screenHeight / 2;
    this.distanceToProjectionPlane = this.calculateDistanceToProjectionPlane(this.horizontalFieldOfViewAngle);
    this.verticalFieldOfViewAngle = this.calculateVerticalFieldOfViewAngle(this.aspectRatio, this.distanceToProjectionPlane);
    this.initiate();
  }

  initiate() {
    this.canvas.setWidth(this.screenWidth);
    this.canvas.setHeight(this.screenHeight);
  }

  getCanvas() {
    return this.canvas.getCanvas();
  }

  getContext() {
    return this.canvas.getContext();
  }

  getHalfScreenWidth() {
    return this.halfScreenWidth;
  }

  clearScreen() {
    return this.canvas.clear();
  }

  calculateDistanceToProjectionPlane(angleInDegrees) {
    const angleInRadians = Geometry.convertDegreesToRadians(angleInDegrees / 2);
    return 1 / Math.tan(angleInRadians) * this.halfScreenWidth;
  }

  calculateVerticalFieldOfViewAngle(aspectRatio, distanceToProjectionPlane) {
    return 2 * Math.atan(aspectRatio / distanceToProjectionPlane);
  }

  getProjected2DPoint(point3D) {
    const x = this.distanceToProjectionPlane / point3D.z * point3D.x;
    const y = this.distanceToProjectionPlane / point3D.z * point3D.y;
    const point2D = new Point2D(this.halfScreenWidth + x, this.halfScreenHeight + y);
    return point2D;
  }
}
