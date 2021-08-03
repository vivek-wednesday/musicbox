// import produce from 'immer'
import { musicContainerReducer, musicContainerTypes, initialState } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('MusicContainer reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(musicContainerReducer(undefined, {})).toEqual(state);
  });

  it('should return the update the state when an action of type DEFAULT is dispatched', () => {
    const expectedResult = { ...state, somePayload: 'Mohammed Ali Chherawalla' };
    expect(
      musicContainerReducer(state, {
        type: musicContainerTypes.DEFAULT_ACTION,
        somePayload: 'Mohammed Ali Chherawalla'
      })
    ).toEqual(expectedResult);
  });
});
