import Canvas from './Canvas.js';
import AnimationFactory from './AnimationFactory.js';
import ShapeFactory from './shapes/ShapeFactory.js';
import ViewFrustum from './ViewFrustum.js';
import World from './world.js';
import LightFactory from './lights/LightFactory.js';
import Point3D from './Point3D.js';

const width = 800;
const height = 500;
const fov = 60;
const anglesPerMilliseconds = 90 / 1000;
const shapes = [
  // ShapeFactory.dodecahedron(-100, 0, 400, 20),
  // ShapeFactory.cube(20, 0, 80, 5),
  // ShapeFactory.pyramid(-20, 20, 100, 8, 2),
  // ShapeFactory.tetrahedron(20, 20, 100, 8, 1),
  // ShapeFactory.mesh(0, 0, 100, 8, 8, 4, 4),
  // ShapeFactory.prism(0, 0, 100, 8, 16, 5),
  // ShapeFactory.torus(0, 0, 150, 32, 25, 11, 25),
  ShapeFactory.sphere(0, 0, 60, 10, 32),
  // ShapeFactory.triangle(20, 0, 100, 8) // This is a diagnostic for the backFaceCulling. Checks out
];
const viewFrustum = new ViewFrustum(width, height, fov, "canvas");
const world = new World(viewFrustum);
const main = elapsedTime => {
  const progress = anglesPerMilliseconds * elapsedTime;
  const objects = world.getObjects();
  for (const object of objects) {
    object.rotate(
      anglesPerMilliseconds * elapsedTime,
      -anglesPerMilliseconds * elapsedTime,
      anglesPerMilliseconds * elapsedTime);
  }
  world.draw();
};
const infiniteLoop = AnimationFactory.infiniteLoop(main);
const lights = [
  LightFactory.point(new Point3D(0, 0, 50), 1, 1, 0, 0.1),
  // LightFactory.point(new Point3D(30, -30, 30), 1, 0, 0.2, 0),
];

const colors = [
  { r: 255, g: 0, b: 0 }, // red
  { r: 0, g: 255, b: 0 }, // green
  { r: 0, g: 0, b: 255 }, // blue
  { r: 255, g: 255, b: 0 }, // yellow
  { r: 255, g: 165, b: 0 }, // orange
  { r: 165, g: 42, b: 42 }, // brown
  { r: 255, g: 255, b: 255 }, // brown
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

world.addObjects(shapes);
world.addLights(lights);
infiniteLoop();
