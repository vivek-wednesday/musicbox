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
    substate => get(substate, 'musicData')
  );

export const selectMusicResults = () => 
  createSelector(
    selectMusicContainerDomain,
    substate => get(get(substate, 'musicData'), 'results')
  )

  export const selectMusicError = () =>
  createSelector(
    selectMusicContainerDomain,
    substate => get(substate, 'musicError')
  );

  export const selectNewData = () =>
  createSelector(
    selectMusicContainerDomain,
    substate => get(substate, 'newData')
  );

  export const selectDetailError = () =>
  createSelector(
    selectMusicContainerDomain,
    substate => get(substate, 'detailError')
  );

  export const selectMusicDetail = () =>
  createSelector(
    selectMusicContainerDomain,
    substate => get(substate, 'musicDetail')
  );

export const selectMusicName = () =>
  createSelector(
    selectMusicContainerDomain,
    substate => get(substate, 'musicName')
  );

export default selectMusicContainer;
