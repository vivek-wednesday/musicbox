import { getSong } from '@app/services/repoApi';
import { put, call, takeLatest } from 'redux-saga/effects';
import { musicContainerCreators, musicContainerTypes } from './reducer'
// Individual exports for testing
const { REQUEST_GET_MUSIC } = musicContainerTypes;
const { successGetMusic, failureGetMusic } = musicContainerCreators;

export function* getSongList(action) {
  const response = yield call(getSong, action.musicName);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetMusic(data));
  } else {
    yield put(failureGetMusic(data));
  }
}

export default function* musicContainerSaga() {
  yield takeLatest(REQUEST_GET_MUSIC, getSongList);
}