// import { createStore } from 'redux';

// function storeReducer (state = { count: 0 }, action) {
//   switch (action.type) {
//     case 'counter/add':
//       return { count: state.count + 1 };
//     case 'counter/minus':
//       return { count: state.count - 1 };
//     default:
//       return state;
//   }
// }

// export default createStore(storeReducer);

import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './counterSlice';

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
