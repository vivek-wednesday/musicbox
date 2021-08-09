/**
 *
 * MusicContainer
 *
 */

import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Input, Row } from 'antd';
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import { injectSaga } from 'redux-injectors'
import styled from 'styled-components';
import { debounce, isEmpty } from 'lodash';
import StyledCard from '@app/components/StyledCard/index';
import { musicContainerCreators } from './reducer';
import musicContainerSaga from './saga';
import { selectMusicContainer, selectMusicData, selectMusicError, selectMusicName } from './selectors'


const { Search } = Input;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const StyledSearch = styled(Search)`
  max-width: 30rem;
  margin: 2rem;
`;

export function MusicContainer({
  dispatchGetMusic,
  dispatchClearGetMusic,
  intl,
  musicData = {},
  musicError = null,
  musicName
}) {
  const handleOnChange = songName => {
    if (!isEmpty(songName)) {
      dispatchGetMusic(songName);
    } else {
      dispatchClearGetMusic();
    }
  }

  const debounceHandleOnChange = debounce(handleOnChange, 400);

  return (
    <Container data-testid="music-container">
      <StyledSearch data-testid="search-bar" placeholder={intl.formatMessage({ "id": 'search_placeholder' })}
        size="large" enterButton
        onChange={evt => debounceHandleOnChange(evt.target.value)} />
      <Row gutter={[40, 24]} justify="center">
        <StyledCard musicData={musicData} />
      </Row>
    </Container>
  );
}

MusicContainer.propTypes = {
  dispatchGetMusic: PropTypes.func,
  dispatchClearGetMusic: PropTypes.func,
  intl: PropTypes.object,
  musicData: PropTypes.shape({
    resultCount: PropTypes.number,
    results: PropTypes.array
  }),
  musicError: PropTypes.string,
  musicName: PropTypes.string
};

const mapStateToProps = createStructuredSelector({
  musicContainer: selectMusicContainer(),
  musicData: selectMusicData(),
  musicError: selectMusicError(),
  musicName: selectMusicName()
});

function mapDispatchToProps(dispatch) {
  const { requestGetMusic, clearGetMusic } = musicContainerCreators;
  return {
    dispatchGetMusic: songName => dispatch(requestGetMusic(songName)),
    dispatchClearGetMusic: () => dispatch(clearGetMusic())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  injectIntl,
  withConnect,
  memo,
  injectSaga({ key: 'musicContainer', saga: musicContainerSaga })
)(MusicContainer);

export const MusicContainerTest = compose(injectIntl)(MusicContainer);
