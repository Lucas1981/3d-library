import Canvas from './Canvas.js';
import AnimationFactory from './AnimationFactory.js';
import CubeFactory from './shapes/CubeFactory.js';
import DodecahedronFactory from './shapes/DodecahedronFactory.js';
import ViewFrustum from './ViewFrustum.js';
import World from './world.js';

const width = 800;
const height = 500;
const fov = 60;
const anglesPerMilliseconds = 90 / 1000;
const dodecahedron = DodecahedronFactory.create(-100, 0, 400, 60, 'white', 'green');
const cube = CubeFactory.create(20, 0, 80, 'white', 'darkblue').scale(10);
const viewFrustum = new ViewFrustum(width, height, fov, "canvas");
const world = new World(viewFrustum);
const main = elapsedTime => {
  const progress = anglesPerMilliseconds * elapsedTime;
  dodecahedron.rotate(anglesPerMilliseconds * elapsedTime, anglesPerMilliseconds * elapsedTime * 1.1, 0);
  cube.rotate(-anglesPerMilliseconds * elapsedTime, anglesPerMilliseconds * elapsedTime * 1.1, 0);
  world.draw();
};
const infiniteLoop = AnimationFactory.infiniteLoop(main);
const polygons = dodecahedron.getPolygons();

const colors = [
  "red", "yellow", "green", "blue",
  "orange", "brown", "white", "pink",
  "grey", "magenta", "teal", "purple",
];

const dodecahedronPolygons = dodecahedron.getPolygons();
const cubePolygons = cube.getPolygons();

for (let i = 0; i < dodecahedronPolygons.length; i++) {
  dodecahedronPolygons[i].setStrokeColor(colors[i]);
  dodecahedronPolygons[i].setFillColor(colors[i]);
}

for (let i = 0; i < cubePolygons.length; i++) {
  cubePolygons[i].setStrokeColor(colors[i]);
  cubePolygons[i].setFillColor(colors[i]);
}

world.addObject(cube);
world.addObject(dodecahedron);

infiniteLoop();
