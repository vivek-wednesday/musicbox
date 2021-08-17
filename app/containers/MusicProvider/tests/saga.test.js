/**
 * Test musicContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put, select  } from 'redux-saga/effects';
import { getSong } from '@app/services/musicApi';
import { apiResponseGenerator } from '@app/utils/testUtils';
import { musicContainerTypes } from '../reducer';
import musicContainerSaga, { getSongList, getSongDetail } from '../saga';
import { selectMusicResults } from '../selectors';


describe('MusicContainer saga tests', () => {
  const generator = musicContainerSaga();
  const musicName = 'arijit';
  let getMusicGenerator = getSongList({ musicName });
  let getDetailGenerator = getSongDetail({ detail: musicName })

  it('should start task to watch for REQUEST_GET_MUSIC action', () => {
    expect(generator.next().value).toEqual(takeLatest(musicContainerTypes.REQUEST_GET_MUSIC, getSongList));
  });

  it('should start task to watch for REQUEST_MUSIC_DETAIL action', () => {
    expect(generator.next().value).toEqual(takeLatest(musicContainerTypes.REQUEST_MUSIC_DETAIL, getSongDetail));
  });

  it('should ensure that the action FAILURE_GET_MUSIC is dispatched when the api call fails', () => {
    const res = getMusicGenerator.next().value;
    expect(res).toEqual(call(getSong, musicName));
    const errorResponse = {
      errorMessage: 'There was an error while fetching music information.'
    };
    expect(getMusicGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: musicContainerTypes.FAILURE_GET_MUSIC,
        error: errorResponse
      })
    );
  });

  it('should ensure that the action SUCCESS_GET_MUSICS is dispatched when the api call succeeds', () => {
    getMusicGenerator = getSongList({ musicName });
    const res = getMusicGenerator.next().value;
    expect(res).toEqual(call(getSong, musicName));
    const musicResponse = {
      totalCount: 1,
      items: [{ musicName: musicName }]
    };
    expect(getMusicGenerator.next(apiResponseGenerator(true, musicResponse)).value).toEqual(
      put({
        type: musicContainerTypes.SUCCESS_GET_MUSIC,
        data: musicResponse
      })
    );
  });

  it('should ensure that selector is working', () => {
    const res = getDetailGenerator.next().value;
    expect(() => expect(res).toStrictEqual(select(selectMusicResults())))
  });
});
