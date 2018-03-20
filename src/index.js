export const START_TIMER = 'START_TIMER';
export const STOP_TIMER = 'STOP_TIMER';
const timers = {};

const validateTimerName = (name) => {
  if (!name) {
    throw new Error('Missing parameter. Name is required');
  }
  if (typeof name !== 'string') {
    throw new Error('Name must be a string');
  }
};

const validateTimerAction = (action) => {
  if (!action) {
    throw new Error('Missing parameter. Action is required');
  }
  if (typeof action !== 'string' && typeof action !== 'function') {
    throw new Error('Action must be a function or string');
  }
};

const validateTimerInterval = (interval) => {
  if (!interval) {
    throw new Error('Missing parameter. Interval is required');
  }
  if (typeof interval !== 'number') {
    throw new Error('Interval must be a number');
  }
};

const startTimer = ({ dispatch }, { name, action, interval }) => {
  validateTimerName(name);
  validateTimerAction(action);
  validateTimerInterval(interval);

  // clear timer if already started
  if (timers[name]) {
    clearInterval(timers[name]);
  }

  const func =
    typeof action === 'string' ? () => dispatch({ type: action }) : action;

  // run immediately
  func();

  // create the setInterval
  timers[name] = setInterval(func, interval);
};

const stopTimer = ({ name }) => {
  validateTimerName(name);

  if (timers[name]) {
    clearInterval(timers[name]);
  }
};

const timerMiddleware = state => next => (action) => {
  const { type, payload } = action;
  switch (type) {
    case START_TIMER:
      return startTimer(state, payload);
    case STOP_TIMER:
      return stopTimer(payload);
    default:
      return next(action);
  }
};

export default timerMiddleware;
