import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { Middleware } from 'redux';
import counterReducer from '../features/counter/counterSlice';
import counterReducer2 from '../features/counter2/counterReducer2';

const middlewares: any[] = [];

const logIsMiddlemare: Middleware = stateApi => next => action => {
  console.log('getState', stateApi.getState());
  return next(action);
}

middlewares.push(logIsMiddlemare);

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    counter2: counterReducer2
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: {
        payload: {
          payload1: 'payload1',
          payload2: 'payload2'
        }
      }
    }
  }).concat(middlewares)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
