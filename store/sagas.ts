import homeSagas from '@containers/Home/sagas';

import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  try {
    yield all([...homeSagas]);
  } catch {}
}
