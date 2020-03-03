import Canvas from './Canvas.js';
import AnimationFactory from './AnimationFactory.js';
import CubeFactory from './shapes/CubeFactory.js';
import DodecahedronFactory from './shapes/DodecahedronFactory.js';
import PyramidFactory from './shapes/PyramidFactory.js';
import TetrahedronFactory from './shapes/TetrahedronFactory.js';
import ViewFrustum from './ViewFrustum.js';
import World from './world.js';

const width = 800;
const height = 500;
const fov = 60;
const anglesPerMilliseconds = 90 / 1000;
const dodecahedron = DodecahedronFactory.create(-100, 0, 400, 20);
const cube = CubeFactory.create(20, 0, 80, 5);
const pyramid = PyramidFactory.create(-20, 20, 100, 8, 2);
const tetrahedron = TetrahedronFactory.create(20, 20, 100, 8, 1);
const viewFrustum = new ViewFrustum(width, height, fov, "canvas");
const world = new World(viewFrustum);
const main = elapsedTime => {
  const progress = anglesPerMilliseconds * elapsedTime;
  dodecahedron.rotate(anglesPerMilliseconds * elapsedTime, anglesPerMilliseconds * elapsedTime * 1.1, 0);
  cube.rotate(-anglesPerMilliseconds * elapsedTime, anglesPerMilliseconds * elapsedTime * 1.1, 0);
  pyramid.rotate(-anglesPerMilliseconds * elapsedTime, 0, anglesPerMilliseconds * elapsedTime * 1.1);
  tetrahedron.rotate(-anglesPerMilliseconds * elapsedTime, 0, 0)
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
const pyramidPolygons = pyramid.getPolygons();
const tetrahedronPolygons = tetrahedron.getPolygons();

for (let i = 0; i < dodecahedronPolygons.length; i++) {
  dodecahedronPolygons[i].setStrokeColor(colors[i]);
  dodecahedronPolygons[i].setFillColor(colors[i]);
}

for (let i = 0; i < cubePolygons.length; i++) {
  cubePolygons[i].setStrokeColor(colors[i]);
  cubePolygons[i].setFillColor(colors[i]);
}

for (let i = 0; i < pyramidPolygons.length; i++) {
  pyramidPolygons[i].setStrokeColor(colors[i]);
  pyramidPolygons[i].setFillColor(colors[i]);
}

for (let i = 0; i < tetrahedronPolygons.length; i++) {
  tetrahedronPolygons[i].setStrokeColor(colors[i]);
  tetrahedronPolygons[i].setFillColor(colors[i]);
}

world.addObject(cube);
world.addObject(dodecahedron);
world.addObject(pyramid);
world.addObject(tetrahedron);

infiniteLoop();
