// import produce from 'immer'

import { musicContainerReducer, musicContainerTypes, initialState } from '../reducer';
import { createIntl, createIntlCache } from 'react-intl'
import { setIntl, translate } from "@components/IntlGlobalProvider/index"
import translationMessages from "../../../translations/en.json"

/* eslint-disable default-case, no-param-reassign */
describe('MusicContainer reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  beforeAll(() => {
    setIntl(() => {
      const cache = createIntlCache();
      const intl = createIntl(
        {
          locale: 'en',
          messages: translationMessages
        },
        cache
      );
      return intl;
    })
  })

  it('should return the initial state', () => {
    expect(musicContainerReducer(undefined, {})).toEqual(state);
  });

  it('should return the updated state when an REQUEST_GET_MUSIC is dispatched', () => {
    const musicName = "arijit"
    const expectedResult = { ...state, musicName };
    expect(
      musicContainerReducer(state, {
        type: musicContainerTypes.REQUEST_GET_MUSIC,
        musicName
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the data is present when SUCCESS_GET_MUSIC is dispatched', () => {
    const data = { id: 1 };
    const expectedResult = { ...state, musicData: data };
    expect(
      musicContainerReducer(state, {
        type: musicContainerTypes.SUCCESS_GET_MUSIC,
        data
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that error message has some data FAILURE_GET_MUSIC is dispatched', () => {
    const error = translate('something_went_wrong');

    const expectedResult = { ...state, musicError: error };
    expect(
      musicContainerReducer(state, {
        type: musicContainerTypes.FAILURE_GET_MUSIC,
        error
      })
    ).toEqual(expectedResult);
  });
});
