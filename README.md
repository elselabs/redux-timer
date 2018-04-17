# redux-timer [![npm version](https://img.shields.io/npm/v/redux-timer.svg?style=flat-square)](https://www.npmjs.com/package/redux-timer)[![npm downloads](https://img.shields.io/npm/dm/redux-timer.svg?style=flat-square)](https://www.npmjs.com/package/redux-timer)

[SetInterval](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval) [middleware](http://redux.js.org/docs/advanced/Middleware.html) for Redux used to dispatch an action or function periodically.

## Installation

```js
npm install redux-timer
```

## Usage

```js
import { createStore, applyMiddleware } from 'redux';
import timerMiddleware from 'redux-timer';

const store = createStore(reducers, applyMiddleware(timerMiddleware));
```

### How to start a timer

To start a timer, you have to dispatch an action with type `START_TIMER` with a payload of the following.

* name (required) - `String` representing the name of the timer.
* action (required) - `String` matching an action type **or** a `Function` that you would like to periodically execute.
* interval (required) - Timer interval in milliseconds
* runImmediately (optional) - `Boolean` to determine whether to fire the action immediately. This is set to `true` by default.

#### Using `action` as an action type

```js
import { START_TIMER } from 'redux-timer';

export const startTimer = () => ({
  type: START_TIMER,
  payload: {
    name: 'exampleTimer',
    action: 'SOME_ACTION_TICK',
    interval: 1000,
    runImmediately: true
  }
});
```

#### Using `action` as a `Function`

```js
import { START_TIMER } from 'redux-timer';

export const exampleAction = () => async dispatch => {
  dispatch({
    type: START_TIMER,
    payload: {
      name: 'exampleTimer',
      action: async () => {
        try {
          const response = await fetch('https://api.github.com');
          const data = await response.json();
          dispatch(setData(response.body.result));
        } catch (e) {
          // do something with this error
        }
      },
      interval: 5000,
      runImmediately: false
    }
  });
};
```

### How to stop a timer

To stop a timer, you have to dispatch an action with type `STOP_TIMER` with a payload of the following.

* name (required) - `String` representing the name of the timer

```js
import { STOP_TIMER } from 'redux-timer';

export const stopTimer = () => ({
  type: STOP_TIMER,
  payload: {
    name: 'exampleTimer'
  }
});
```

## TODO List

* Need to add tests
* Need to add CI/CD
