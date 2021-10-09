import React from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store, { RootState } from './store';
import counterSlice from './counterSlice';
import RenderTimes from '@/component/RenderTimes';

const App: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.count);
  const dispatch = useDispatch();

  return (
    <div>
      <div>{count}</div>
      <RenderTimes />
      <button onClick={() => dispatch(counterSlice.actions.increment())}>incre</button>
      <button onClick={() => dispatch(counterSlice.actions.decrement())}>decre</button>
    </div>
  );
};

const ChildB: React.FC = () => {
  const count = useSelector((state: any) => state.counter.countB);
  const dispatch = useDispatch();

  return (
    <div>
      <div>{count}</div>
      <RenderTimes />
      <button onClick={() => dispatch(counterSlice.actions.increB())}>incre</button>
      {/* <button onClick={() => dispatch(counterSlice.actions.decrement())}>decre</button> */}
    </div>
  );
}

const ReduxApp: React.FC = () => {
  return (
    <Provider store={store}>
      <App />
      <ChildB />
    </Provider>
  );
};

export default ReduxApp;
