import Canvas from './Canvas.js';
import AnimationFactory from './AnimationFactory.js';
import CubeFactory from './CubeFactory.js';
import DodecahedronFactory from './DodecahedronFactory.js';
import ViewFrustum from './ViewFrustum.js';
import World from './world.js';

const width = 800;
const height = 500;
const fov = 60;
const anglesPerMilliseconds = 90 / 1000;
const dodecahedron = DodecahedronFactory.create(0, 0, 0, 60, 'white', 'green');
const cube = CubeFactory.create(0, 0, 0, 'white', 'rgba(255, 0, 0, .1)');
const viewFrustum = new ViewFrustum(width, height, fov, "canvas");
const world = new World(viewFrustum);
const main = elapsedTime => {
  const progress = anglesPerMilliseconds * elapsedTime;
  // dodecahedron.rotate(anglesPerMilliseconds * elapsedTime, anglesPerMilliseconds * elapsedTime * 1.1, 0);
  world.draw();
};
const infiniteLoop = AnimationFactory.infiniteLoop(main);

world.addObject(cube);
world.addObject(dodecahedron);

infiniteLoop();
