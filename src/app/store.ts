import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import { Middleware, AnyAction } from 'redux';
import counterReducer from '../features/counter/counterSlice';
import counterReducer2 from '../features/counter2/counterReducer2';

const middlewares: Middleware[] = [];

const logInMiddleware: Middleware = stateApi => next => action => {
  console.log('log in middleware');
  return next(action);
}

middlewares.push(logInMiddleware);

interface ExtraArgument {
  [key: string]: string;
}

const extraArgument: ExtraArgument = {
  extra: 'extra',
  payload: 'payload'
}

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    counter2: counterReducer2
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument
    }
  }).concat(middlewares)
});

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  ExtraArgument, // extraArgument
  AnyAction
>;
