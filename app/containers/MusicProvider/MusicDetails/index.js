/**
 *
 * MusicDetails
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card } from 'antd';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { selectMusicData, selectRoutePath } from '../selectors';
import styled from 'styled-components';
import { improveImg } from '@components/StyledCard';

const StyleDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
const Para = styled.p`
  font-family: 'Lucida Console', 'Courier New', monospace;
  background-color: lightyellow;
  padding: 5px;
  text-align: center;
  margin: 10px 0;
`;
const Price = styled.h3`
  font-family: 'Lucida Console', 'Courier New', monospace;
  text-align: center;
  color: coral;
`;
const Title = styled.h3`
  text-align: center;
`;

export function MusicDetails({ musicData, pathName, intl }) {
  const [Path] = useState(pathName.slice(7));

  return (
    <StyleDiv>
      {musicData.results.map((item, index) =>
        item.trackId === +Path ? (
          <Card
            data-testid="music-details"
            style={{ width: 300 }}
            cover={<img alt="example" src={improveImg(item.artworkUrl100)} />}
            title={<Title>{item.trackName}</Title>}
          >
            <Price data-testid="price">Price: ${item.trackPrice}</Price>
            <Para data-testid="name">Artist Name: {item.artistName}</Para>
            <Para data-testid="genre">Genre: {item.primaryGenreName}</Para>
            <Para data-testid="rating">
              Rating: {item.contentAdvisoryRating ?? intl.formatMessage({ id: 'unrated', defaultMessage: 'Unrated' })}
            </Para>
          </Card>
        ) : null
      )}
    </StyleDiv>
  );
}

MusicDetails.propTypes = {
  musicData: PropTypes.object,
  pathName: PropTypes.string,
  intl: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
  musicData: selectMusicData(),
  pathName: selectRoutePath()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(injectIntl, withConnect)(MusicDetails);

export const MusicDetailsTest = compose(injectIntl)(MusicDetails);
