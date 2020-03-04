import Canvas from './Canvas.js';
import AnimationFactory from './AnimationFactory.js';
import ShapeFactory from './shapes/ShapeFactory.js';
import ViewFrustum from './ViewFrustum.js';
import World from './world.js';

const width = 800;
const height = 500;
const fov = 60;
const anglesPerMilliseconds = 90 / 1000;
const shapes = [
  ShapeFactory.dodecahedron(-100, 0, 400, 20),
  ShapeFactory.cube(20, 0, 80, 5),
  ShapeFactory.pyramid(-20, 20, 100, 8, 2),
  ShapeFactory.tetrahedron(20, 20, 100, 8, 1),
  ShapeFactory.mesh(0, 0, 100, 8, 8, 4, 4),
  ShapeFactory.prism(0, 0, 100, 8, 16, 5, 'yellow', 'darkgrey')
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

const colors = [
  "red", "yellow", "green", "blue",
  "orange", "brown", "white", "pink",
  "grey", "magenta", "teal", "purple",
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
infiniteLoop();
