import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { Middleware } from 'redux';
import counterReducer from '../features/counter/counterSlice';

const middlewares: any[] = [];

const logIsMiddlemare: Middleware = (storeAPI) => next => action => {
  console.log('middleware action', action);
  console.log('storeAPI', storeAPI)
  return next(action);
}

middlewares.push(logIsMiddlemare);

export const store = configureStore({
  reducer: {
    counter: counterReducer
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
