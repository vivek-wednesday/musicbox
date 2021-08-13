/**
 *
 * MusicDetails
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card } from 'antd';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectSaga } from 'redux-injectors';
import styled from 'styled-components';
import { improveImg } from '@components/StyledCard';
import If from '@components/If';
import musicContainerSaga from '../saga';
import { musicContainerCreators } from '../reducer';
import { useParams } from 'react-router-dom';
import { selectDetailError, selectNewData } from '../selectors';
import { T } from '@app/components/T/index';

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

export function MusicDetails({ musicResult, intl, dispatchGetMusicDetail, detailError }) {
  const path = useParams()
  
  useEffect(() => {
    dispatchGetMusicDetail(path.id)
  }, [])

  return (
    <StyleDiv>
        <If condition={!detailError} otherwise={<T data-testid="no-music-data" id="not_found" />}>
          <Card
            data-testid="music-details"
            style={{ width: 300 }}
            cover={<img alt="example" src={improveImg(musicResult.artworkUrl100)} />}
            title={<Title>{musicResult.trackName}</Title>}
          >
            <Price data-testid="price">{intl.formatMessage({ id: 'price' }, { price: musicResult.trackPrice })}</Price>
            <Para data-testid="name">{intl.formatMessage({ id: 'artist' }, { name: musicResult.artistName })}</Para>
            <Para data-testid="genre">{intl.formatMessage({ id: 'genre' }, { genre: musicResult.primaryGenreName })}</Para>
            <Para data-testid="rating">
              {intl.formatMessage({ id: 'rating' }, { rating: musicResult.contentAdvisoryRating ?? 'NR' })}
            </Para>
          </Card>
        </If>
    </StyleDiv>
  );
}

MusicDetails.propTypes = {
  intl: PropTypes.object,
  dispatchGetMusicDetail: PropTypes.func,
  musicResult: PropTypes.object,
  detailError: PropTypes.string
};

const mapStateToProps = createStructuredSelector({
  musicResult: selectNewData(),
  detailError: selectDetailError(),
});

export function mapDispatchToProps(dispatch) {
  const { requestMusicDetail } = musicContainerCreators;
  return {
    dispatchGetMusicDetail: id => dispatch(requestMusicDetail(id))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  injectIntl,
  withConnect,
  memo,
  injectSaga({ key: 'musicContainer', saga: musicContainerSaga })
)(MusicDetails);

export const MusicDetailsTest = compose(injectIntl)(MusicDetails);
