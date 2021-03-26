import { createReducer, createAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

export const increment = createAction<void>('increment')
export const decrement = createAction<void>('decrement')
export const incrementByAmount = createAction<number>('incrementByAmount')

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0
}

const counterReducer2 = createReducer(initialState, {
  [increment.type]: state => {
    state.value = state.value + 1;
  },
  [decrement.type]: state => {
    state.value = state.value - 1;
  },
  [incrementByAmount.type]: (state, action) => {
    state.value += action.payload;
  }
})

export const incrementAsync = (amount: number): AppThunk => (dispatch, getState, extraArgument) => {
  console.log('extraArgument', extraArgument);
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

export const selectCount = (state: RootState) => state.counter2.value;

export default counterReducer2;
