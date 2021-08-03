/**
 *
 * MusicContainer
 *
 */

import React, { memo } from 'react'
// import PropTypes from 'prop-types'
import { Input } from 'antd';
import { connect } from 'react-redux'
import { injectIntl /* FormattedMessage as T */ } from 'react-intl'

import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import { injectSaga } from 'redux-injectors'
import { selectMusicContainer, selectMusicData, selectMusicError, selectMusicName } from './selectors'
//import saga from './saga'
import styled from 'styled-components';
import { debounce, isEmpty } from 'lodash';
import { musicContainerCreators } from './reducer';
import musicContainerSaga from './saga';

const { Search } = Input;

const Container = styled.div`
  display: flex;
  justify-content: center;
`

const StyledSearch = styled(Search)`
  max-width: 30rem;
  margin: 2rem;
`;



export function MusicContainer({ dispatchGetMusic,
  dispatchClearGetMusic }) {
  //useInjectSaga({ key: 'musicContainer', saga })
  const handleOnChange = songName => {
    if (!isEmpty(songName)) {
      //dispatchGetMusic(songName)
      console.log(songName)
    } else {
      //dispatchClearGetMusic()
      console.log("empty")
    }
  }

  const debounceHandleOnChange = debounce(handleOnChange, 400)

  return (
    <Container data-testid="music-container">
      <StyledSearch data-testid="search-bar" placeholder="Search for your fav song"
        size="large" enterButton
        onChange={evt => debounceHandleOnChange(evt.target.value)} />
    </Container>
  )
}

MusicContainer.propTypes = {
}

const mapStateToProps = createStructuredSelector({
  musicContainer: selectMusicContainer(),
  musicData: selectMusicData(),
  musicError: selectMusicError(),
  musicName: selectMusicName()
})

function mapDispatchToProps(dispatch) {
  const { requestGetMusic, clearGetMusic } = musicContainerCreators;
  return {
    dispatchGetMusic: songName => dispatch(requestGetMusic(songName)),
    dispatchClearGetMusic: () => dispatch(clearGetMusic())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  injectIntl,
  withConnect,
  memo,
  injectSaga({ key: 'musicContainer', saga: musicContainerSaga })
)(MusicContainer)

export const MusicContainerTest = compose(injectIntl)(MusicContainer)