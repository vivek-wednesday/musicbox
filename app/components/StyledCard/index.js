/**
 *
 * StyledCard
 *
 */
import React, { useEffect, useRef, useState } from 'react';
import { Card, Progress, Col } from 'antd';
import {
  BackwardOutlined,
  PlayCircleOutlined,
  ForwardOutlined,
  CustomerServiceOutlined,
  PauseCircleOutlined
} from '@ant-design/icons';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { T } from '@components/T';
import { colors } from '@themes/index';
import styled from 'styled-components';

// Function to improve image resolution as well as deal with undefined data.
function getImage(str) {
  var escapedFind = '100x100'.replace(/([.*+?^=!:${}()|\]\\])/g, '\\$1');
  return str.replace(new RegExp(escapedFind, 'g'), '300x300');
}

const StyledSmall = styled.small`
    font-size: 14px;
    color: gray;
    font-weight: normal;
    &:hover {
      font-size: 16px;
      color: coralred;
    }
  `;

function StyledCard(props) {
  const { musicData } = props;
  const { Meta } = Card;

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [progress, setProgress] = useState(0);
  const [itrvl, setItrvl] = useState(null);

  const audioList = useRef([]);

  useEffect(() => {
    clearInterval(itrvl);
    setCurrentSong(null);
    setProgress(0);
    setIsPlaying(false);
  }, [musicData]);

  function showProgress(e) {
    setItrvl(setInterval(() => setProgress((e.currentTime / e.duration) * 100), 1000));
  }

  function controlAudio(val, type) {
    const ele = audioList.current[val];
    if (type === 'backward') {
      ele.currentTime -= 5;
    } else if (type === 'forward') {
      ele.currentTime += 5;
    } else if (type === 'play') {
      ele.play();
      setIsPlaying(true);
      setCurrentSong(val);
      showProgress(ele);
    } else if (type === 'pause') {
      ele.pause();
      setIsPlaying(false);
      clearInterval(itrvl);
    }
  }

  function showProgressBar(id) {
    if (currentSong === id) {
      return <Progress percent={progress} showInfo={false} />;
    }
  }

  const imgStyle = {
    borderBottomLeftRadius: 35, 
    borderBottomRightRadius: 35, 
    padding: 10 
  }

  const primaryStyle = {
    fontSize: 40,
    color: colors.primaryBtn
  }

  const secondaryStyle = { 
    fontSize: 35,
    color: colors.secondaryBtn 
  }

  return musicData === undefined ? (
    <T data-testid="no-music-data" id="no_results" />
  ) : isEmpty(musicData.results) ? (
    <T data-testid="no-music-data" id="no_results" />
  ) : (
    musicData.results.slice(0, 10).map((item, index) => {
      const data = musicData.results[index];
      return (
        <Col key={index}>
          <Card
            data-testid="card-wrapper"
            key={data.trackId}
            className="neumorphic"
            style={{ width: 300 }}
            cover={
              <img
                alt="example"
                src={getImage(data.artworkUrl100)}
                style={imgStyle}
              />
            }
            actions={[
              <BackwardOutlined
                key="backward"
                style={secondaryStyle}
                onClick={() => {
                  controlAudio(index, 'backward');
                }}
              />,
              <>
                {isPlaying ? (
                  currentSong === index ? (
                    <PauseCircleOutlined
                      key="play"
                      style={primaryStyle}
                      onClick={() => {
                        controlAudio(index, 'pause');
                      }}
                    />
                  ) : (
                    <PlayCircleOutlined key="play" style={{fontSize: 40}} />
                  )
                ) : (
                  <PlayCircleOutlined
                    key="play"
                    style={primaryStyle}
                    onClick={() => {
                      controlAudio(index, 'play');
                    }}
                  />
                )}
              </>,
              <ForwardOutlined
                key="forward"
                style={secondaryStyle}
                onClick={() => {
                  controlAudio(index, 'forward');
                }}
              />
            ]}
          >
            <Meta
              avatar={<CustomerServiceOutlined style={{ fontSize: 20 }} spin={currentSong === index ? true : false} />}
              title={data.trackCensoredName}
            />
            <Meta
              title={<StyledSmall>{data.artistName}</StyledSmall>}
              description={showProgressBar(index)}
            />
            <audio ref={ele => audioList.current[index] = ele} src={data.previewUrl} preload="none" loop />
          </Card>
        </Col>
      );
    })
  );
}

StyledCard.propTypes = {
  musicData: PropTypes.object
};

export default StyledCard;
