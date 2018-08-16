import { applyMiddleware, combineReducers, createStore } from 'redux';
import { combineEpics, createEpicMiddleware, ofType } from 'redux-observable';
import { delay, mapTo } from 'rxjs/operators';
import { composeWithDevTools } from 'redux-devtools-extension';

const PING = 'PING';
const PONG = 'PONG';

export const ping = () => ({ type: PING });
export const pong = () => ({ type: PONG });

const pingReducer = (state = { isPinging: false }, action) => {
  switch (action.type) {
    case PING:
      return { isPinging: true };

    case PONG:
      return { isPinging: false };

    default:
      return state;
  }
};

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });

const counterReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 };

    case DECREMENT:
      return { ...state, count: state.count - 1 };

    default:
      return state;
  }
};

const pingEpic = action$ => action$.pipe(
  ofType(PING),
  delay(1000), // Asynchronously wait 1000ms then continue
  mapTo(pong())
);

const counterEpic = action$ => action$.pipe(
  ofType(INCREMENT),
  delay(1000), // Asynchronously wait 1000ms then continue
  mapTo(ping())
);

const rootEpic = combineEpics(pingEpic, counterEpic);
const epicMiddleware = createEpicMiddleware();
const middleware = composeWithDevTools({})(applyMiddleware(epicMiddleware));
const store = createStore(combineReducers({ ping: pingReducer, counter: counterReducer }), middleware);
epicMiddleware.run(rootEpic);

export default store;
