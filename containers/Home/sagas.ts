// import { BaseXHR } from '@utils/axios';
// import { call, put, takeLatest } from 'redux-saga/effects';

// function* getHomeData(action) {
//   try {
//     const response = yield call(BaseXHR, {
//       method: 'GET',
//       url: 'https://jsonplaceholder.typicode.com/todos/1',
//     });
//     yield put(actions.getHomeDataSuccess(response));
//   } catch (error) {
//     yield put(actions.getHomeDataFailure(error));
//   }
// }

const homeSagas: any = [
  // ...takeLatest(TYPE, getHomeData)
];

export default homeSagas;
