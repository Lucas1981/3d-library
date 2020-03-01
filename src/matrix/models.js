const scaleModel = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
];

const reflectXModel = [
  [-1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1]
];

const reflectYModel = [
  [1, 0, 0, 0],
  [0, -1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1]
];

const reflectZModel = [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, -1, 0],
  [0, 0, 0, 1]
];

export {
  scaleModel,
  reflectXModel,
  reflectYModel,
  reflectZModel
};
