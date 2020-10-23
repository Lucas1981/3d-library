import Canvas from './Canvas.js';
import AnimationFactory from './AnimationFactory.js';
import ShapeFactory from './shapes/ShapeFactory.js';
import ViewFrustum from './ViewFrustum.js';
import World from './world.js';
import Light from './lights/Light.js';
import Point3D from './Point3D.js';
import Geometry from './Geometry.js';
import Camera from './camera/Camera.js';
import Vector3D from './vector/Vector3D.js';

const width = 800;
const height = 500;
const fov = 60;
const anglesPerMilliseconds = 90 / 1000;
const shapes = [
  // ShapeFactory.dodecahedron(-10, 0, 0, 2),
  // ShapeFactory.cube(10, 0, 0, 3).rotate(4, 12, 8),
  // ShapeFactory.pyramid(-20, 20, 100, 8, 2),
  // ShapeFactory.tetrahedron(20, 20, 100, 8, 1),
  ShapeFactory.mesh(0, 10, 0, 8, 8, 4, 4).rotate(90, 0, 0),
  // ShapeFactory.prism(0, 7, 0, 2, 15, 10).rotate(90, 0, 0),
  ShapeFactory.torus(10, 5, 0, 32, 12, 1, 5).rotate(10, 0, 0),
  ShapeFactory.torus(-10, 5, 0, 32, 12, 1, 5).rotate(10, 0, 0),
  ShapeFactory.sphere(0, 0, 0, 5, 32),
  // ShapeFactory.triangle(20, 0, 100, 8) // This is a diagnostic for the backFaceCulling. Checks out
];
const viewFrustum = new ViewFrustum(width, height, fov, "canvas");
const cameraRadius = 45;
let cameraAngle = 0;
const camera = new Camera(0, 0, 50, 0, 0, 0);
const world = new World(viewFrustum);
const lights = [
  new Light(new Point3D(0, 0, 0)).setPf(1),
];
const main = elapsedTime => {
  const progress = anglesPerMilliseconds * elapsedTime;
  const objects = world.getObjects();
  for (const object of objects) {
    // object.rotate(
    //   0,// anglesPerMilliseconds * elapsedTime,
    //   0, // anglesPerMilliseconds * elapsedTime,
    //   0); // anglesPerMilliseconds * elapsedTime);
  }
  cameraAngle = (cameraAngle + progress) % 360;
  const l = new Vector3D(
    Math.sin(Geometry.convertDegreesToRadians(cameraAngle)),
    0,
    Math.cos(Geometry.convertDegreesToRadians(cameraAngle))
  );
  lights[0].setL(l);
  // camera.rotationY = -cameraAngle;
  lights[0].setSourcePoint(
    new Vector3D(
      Math.sin(Geometry.convertDegreesToRadians(cameraAngle)),
      0,
      Math.cos(Geometry.convertDegreesToRadians(cameraAngle))
  ));

  world.draw();
};
const infiniteLoop = AnimationFactory.infiniteLoop(main);

const colors = [
  { r: 255, g: 0, b: 0 }, // red
  { r: 0, g: 255, b: 0 }, // green
  { r: 0, g: 0, b: 255 }, // blue
  { r: 255, g: 255, b: 0 }, // yellow
  { r: 255, g: 165, b: 0 }, // orange
  { r: 165, g: 42, b: 42 }, // brown
  { r: 255, g: 255, b: 255 }, // white
  { r: 255, g: 192, b: 203 }, // pink
  { r: 128, g: 128, b: 128 }, // gray
  { r: 255, g: 0, b: 255 }, // magenta
  { r: 0, g: 128, b: 128 }, // teal
];

for (let shape of shapes) {
  const polygons = shape.getPolygons();
  for (let i = 0; i < polygons.length; i++) {
    const polygon = polygons[i];
    polygon.setStrokeColor(colors[i % colors.length]);
    polygon.setFillColor(colors[i % colors.length]);
  }
}

world.addLights(lights);
world.setCamera(camera);
world.addObjects(shapes);
infiniteLoop();
