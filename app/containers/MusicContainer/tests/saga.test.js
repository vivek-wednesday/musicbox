/**
 * Test musicContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest } from 'redux-saga/effects';
import musicContainerSaga, { defaultFunction } from '../saga';
import { musicContainerTypes } from '../reducer';

describe('MusicContainer saga tests', () => {
  const generator = musicContainerSaga();

  it('should start task to watch for DEFAULT_ACTION action', () => {
    expect(generator.next().value).toEqual(takeLatest(musicContainerTypes.DEFAULT_ACTION, defaultFunction));
  });
});
