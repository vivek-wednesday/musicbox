/**
 *
 * MusicDetails
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card } from 'antd';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectSaga } from 'redux-injectors';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { improveImg } from '@components/StyledCard';
import If from '@components/If';
import musicContainerSaga from '../saga';
import { selectMusicData } from '../selectors';
import { musicContainerCreators } from '../reducer';

const StyleDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
const Para = styled.p`
  background-color: lightyellow;
  padding: 5px;
  text-align: center;
  margin: 10px 0;
`;
const Price = styled.h3`
  text-align: center;
  color: coral;
`;
const Title = styled.h3`
  text-align: center;
`;

export function MusicDetails({ musicData, intl, dispatchGetMusic }) {
  const path = useParams();
  return (
    <StyleDiv>
      {musicData.results.map((item, index) => (
        <If key={index} condition={item.trackId === +path.id} otherwise={null}>
          <Card
            data-testid="music-details"
            style={{ width: 300 }}
            cover={<img alt="example" src={improveImg(item.artworkUrl100)} />}
            title={<Title>{item.trackName}</Title>}
          >
            <Price data-testid="price">{intl.formatMessage({ id: 'price' }, { price: item.trackPrice })}</Price>
            <Para data-testid="name">{intl.formatMessage({ id: 'artist' }, { name: item.artistName })}</Para>
            <Para data-testid="genre">{intl.formatMessage({ id: 'genre' }, { genre: item.primaryGenreName })}</Para>
            <Para data-testid="rating">
              {intl.formatMessage({ id: 'rating' }, { rating: item.contentAdvisoryRating ?? 'NR' })}
            </Para>
          </Card>
        </If>
      ))}
    </StyleDiv>
  );
}

MusicDetails.propTypes = {
  musicData: PropTypes.object,
  pathName: PropTypes.string,
  intl: PropTypes.object,
  dispatchGetMusic: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  musicData: selectMusicData(),
});

function mapDispatchToProps(dispatch) {
  const { requestGetMusic } = musicContainerCreators;
  return {
    dispatchGetMusic: songName => dispatch(requestGetMusic(songName))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  injectIntl,
  withConnect,
  injectSaga({ key: 'musicContainer', saga: musicContainerSaga })
)(MusicDetails);

export const MusicDetailsTest = compose(injectIntl)(MusicDetails);
