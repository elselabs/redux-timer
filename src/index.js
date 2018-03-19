export const START_TIMER = 'START_TIMER';
export const STOP_TIMER = 'STOP_TIMER';

export default function timerMiddleware({ dispatch }) {
  const timers = {};

  const validateTimerName = (timerName) => {
    if (!timerName) throw new Error('Missing timerName');
    if (typeof timerName !== 'string') {
      throw new Error('timerName must be a string');
    }
  };

  const validateTimerAction = (timerAction) => {
    // if timerAction exists but is not a string or function throw error
    if (timerAction) {
      if (
        typeof timerAction !== 'string' &&
        typeof timerAction !== 'function'
      ) {
        throw new Error('timerAction must be a function or string');
      }
    } else {
      throw new Error('Missing timerAction');
    }
  };

  const validateTimerInterval = (timerInterval) => {
    if (!timerInterval) throw new Error('Missing timerInterval');
    if (typeof timerInterval !== 'number') {
      throw new Error('timerInterval must be a number');
    }
  };

  // eslint-disable-next-line consistent-return
  return next => (action) => {
    if (action.type === START_TIMER) {
      const { timerName, timerAction, timerInterval } = action.payload;

      validateTimerName(timerName);
      validateTimerAction(timerAction);
      validateTimerInterval(timerInterval);

      // clear timer if already started
      if (timers[timerName]) {
        clearInterval(timers[timerName]);
      }

      const func =
        typeof timerAction === 'string'
          ? () => dispatch({ type: timerAction })
          : timerAction;

      // run immediately
      func();
      // create the setInterval
      timers[timerName] = setInterval(func, timerInterval);
    } else if (action.type === STOP_TIMER) {
      const { timerName } = action.payload;
      validateTimerName(timerName);
      if (timers[timerName]) {
        clearInterval(timers[timerName]);
      }
    } else {
      return next(action); // do nothing just continue
    }
  };
}
