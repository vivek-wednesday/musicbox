/*
 *
 * MusicContainer reducer
 *
 */

import { translate } from '@app/components/IntlGlobalProvider/index'
import produce from 'immer'
import get from 'lodash/get'
import { createActions } from 'reduxsauce'


export const initialState = { musicName: null, musicData: [], musicError: null }

export const { Types: musicContainerTypes, Creators: musicContainerCreators } = createActions({
  requestGetMusic: ['musicName'],
  successGetMusic: ['data'],
  failureGetMusic: ['error'],
  clearGetMusic: []
})

/* eslint-disable default-case, no-param-reassign */
export const musicContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case musicContainerTypes.REQUEST_GET_MUSIC:
        draft.musicName = action.musicName;
        break;
      case musicContainerTypes.SUCCESS_GET_MUSIC:
        draft.musicData = action.data;
        break;
      case musicContainerTypes.FAILURE_GET_MUSIC:
        draft.musicError = get(action.error, 'message', translate('something_went_wrong'));
        break;
      case musicContainerTypes.CLEAR_GET_MUSIC:
        return initialState;
    }
  })

export default musicContainerReducer
