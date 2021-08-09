import get from 'lodash/get';
import { createSelector } from 'reselect'
import { initialState } from './reducer'
/**
 * Direct selector to the musicContainer state domain
 */

const selectMusicContainerDomain = state => state.musicContainer || initialState


export const selectMusicContainer = () =>
  createSelector(
    selectMusicContainerDomain,
    substate => substate
  );

export const selectMusicData = () =>
  createSelector(
    selectMusicContainerDomain,
    substate => get(substate, 'musicData', undefined)
  );

export const selectMusicError = () =>
  createSelector(
    selectMusicContainerDomain,
    substate => get(substate, 'musicError', undefined)
  );

export const selectMusicName = () =>
  createSelector(
    selectMusicContainerDomain,
    substate => get(substate, 'musicName', undefined)
  );

export default selectMusicContainer;
