# redux-timer [![npm version](https://img.shields.io/npm/v/redux-timer.svg?style=flat-square)](https://www.npmjs.com/package/redux-timer)[![npm downloads](https://img.shields.io/npm/dm/redux-timer.svg?style=flat-square)](https://www.npmjs.com/package/redux-timer)

[SetInterval](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval) [middleware](http://redux.js.org/docs/advanced/Middleware.html) for Redux. Used to dispatch an action or function periodically.

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

* timerName (required) - `String` representing the name of the timer.
* timerAction (required) - `String` matching an action type **or** a `Function` that you would like to periodically execute.
* timerInterval (required) - Timer interval in milliseconds

#### Using `timerAction` as an action type

```js
import { START_TIMER } from 'redux-timer';

export const startTimer = () => ({
  type: START_TIMER,
  payload: {
    timerName: 'exampleTimer',
    timerAction: 'SOME_ACTION_TICK',
    timerInterval: 1000
  }
});
```

#### Using `timerAction` as a `Function`

```js
import { START_TIMER } from 'redux-timer';

export const exampleAction = () => async dispatch => {
  dispatch({
    type: START_TIMER,
    payload: {
      timerName: 'exampleTimer',
      timerAction: async () => {
        try {
          const response = await fetch('https://api.github.com');
          const data = await response.json();
          dispatch(setData(response.body.result));
        } catch (e) {
          // do something with this error
        }
      },
      timerInterval: 5000
    }
  });
};
```

### How to stop a timer

To stop a timer, you have to dispatch an action with type `STOP_TIMER` with a payload of the following.

* timerName (required) - `String` representing the name of the timer

```js
import { STOP_TIMER } from 'redux-timer';

export const stopTimer = () => ({
  type: STOP_TIMER,
  payload: {
    timerName: 'exampleTimer'
  }
});
```

## TODO List

* Need to add tests
* Need to add CI/CD
