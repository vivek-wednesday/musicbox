import get from 'lodash/get';
import { createSelector } from 'reselect'
import { initialState } from './reducer'
/**
 * Direct selector to the musicContainer state domain
 */

const selectMusicContainerDomain = state => state.musicContainer || initialState
const selectRouterDomain = state => state.router.location

export const selectMusicContainer = () =>
  createSelector(
    selectMusicContainerDomain,
    substate => substate
  );

export const selectRoutePath = () => 
  createSelector(
      selectRouterDomain,
      substate => get(substate, 'pathname')
  );


export const selectMusicData = () =>
  createSelector(
    selectMusicContainerDomain,
    substate => get(substate, 'musicData')
  );

export const selectMusicError = () =>
  createSelector(
    selectMusicContainerDomain,
    substate => get(substate, 'musicError')
  );

export const selectMusicName = () =>
  createSelector(
    selectMusicContainerDomain,
    substate => get(substate, 'musicName')
  );

export default selectMusicContainer;
