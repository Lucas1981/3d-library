export default class AnimationFactory {
  constructor() {}

  static infiniteLoop(callback) {
    let previousTime = new Date();
    const loopFunction = () => {
      const currentTime = new Date();
      const elapsedTime = +currentTime - +previousTime;
      callback(elapsedTime);
      previousTime = currentTime;
      requestAnimationFrame(loopFunction);
    };
    return loopFunction;
  }

  static conditionalLoop(callback) {
    let previousTime = new Date();
    const loopFunction = () => {
      const currentTime = new Date();
      const elapsedTime = +currentTime - +previousTime;
      const condition = callback(elapsedTime);
      if (condition) {
        previousTime = currentTime;
        requestAnimationFrame(loopFunction);
      }
    };
    return loopFunction;
  }

  static interruptibleLoop(callback, condition) {
    let previousTime = new Date();
    const loopFunction = () => {
      const currentTime = new Date();
      const elapsedTime = +currentTime - +previousTime;
      if (condition()) {
        callback(elapsedTime);
      }
      previousTime = currentTime;
      requestAnimationFrame(loopFunction);
    };
    return loopFunction;
  }
};
