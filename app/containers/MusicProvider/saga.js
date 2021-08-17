import { put, call, select, takeLatest } from 'redux-saga/effects';
import { getSong } from '@app/services/musicApi';
import { musicContainerCreators, musicContainerTypes } from './reducer'
import { selectMusicResults } from './selectors';
// Individual exports for testing
const { REQUEST_GET_MUSIC, REQUEST_MUSIC_DETAIL } = musicContainerTypes;
const { successGetMusic, failureGetMusic, successGetDetail, failureGetDetail } = musicContainerCreators;

export function* getSongList(action) {
  const response = yield call(getSong, action.musicName);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetMusic(data));
  } else {
    yield put(failureGetMusic(data));
  }
}

export function* getSongDetail(action) {
  const state = yield select(selectMusicResults());
  const response = state.find(ele => +ele.trackId === +action.detail)
  if(response){
    yield put(successGetDetail(response))
  } else {
    const newResponse = yield call(getSong, action.detail);
    const { data, ok } = newResponse;
    if(ok) {
      yield put(successGetDetail(data.results[0]))
    } else {
      yield put(failureGetDetail(data))
    }
  }
}


export default function* musicContainerSaga() {
  yield takeLatest(REQUEST_GET_MUSIC, getSongList);
  yield takeLatest(REQUEST_MUSIC_DETAIL, getSongDetail);
}


