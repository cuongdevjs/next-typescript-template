import { configureStore } from '@reduxjs/toolkit';
import { Store } from 'redux';
import { createWrapper, Context, MakeStore } from 'next-redux-wrapper';
import createSagaMiddleware, { Task } from 'redux-saga';

import { reducers } from './reducers';
import rootSaga from './sagas';

export interface SagaStore extends Store {
  sagaTask?: Task;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const makeStore: MakeStore<any> = (_context: Context) => {
  // 1: Create the middleware
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  const middlewares = [sagaMiddleware];

  const store = configureStore({
    reducer: reducers,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        //! send formData from upload file => ignore error seriablizable data
        // serializableCheck: { ignoredActions: ["editors/uploadMedia/TRIGGER"] },
        immutableCheck: false,
        serializableCheck: false,
      }).concat(middlewares),
    devTools:
      /* istanbul ignore next line */
      process.env.NODE_ENV !== 'production',
  });
  // 2: Add an extra parameter for applying middleware:

  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

  // 4: now return the store:
  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;

export const wrapper = createWrapper<AppStore>(makeStore, {
  debug: false,
});
