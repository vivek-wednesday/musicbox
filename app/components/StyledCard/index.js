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

// Function to improve image resolution as well as deal with undefined data.
function getImage(str) {
  var escapedFind = '100x100'.replace(/([.*+?^=!:${}()|\]\\])/g, '\\$1');
  return str.replace(new RegExp(escapedFind, 'g'), '300x300');
}

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

  return musicData === undefined ? (
    <T data-testid="no-music-data" id="no_results" />
  ) : isEmpty(musicData.results) ? (
    <T data-testid="no-music-data" id="no_results" />
  ) : (
    musicData.results.slice(0, 10).map((item, index) => {
      const data = musicData.results[index];
      return (
        <Col key={index} >
          <Card
            data-testid="card-wrapper"
            key={data.trackId}
            className="neumorphic"
            style={{ width: 300 }}
            cover={
              <img
                alt="example"
                src={getImage(data.artworkUrl100)}
                style={{ borderBottomLeftRadius: 35, borderBottomRightRadius: 35, padding: 10 }}
              />
            }
            actions={[
              <BackwardOutlined
                key="backward"
                style={{ fontSize: 35, color: colors.secondaryBtn }}
                onClick={() => {
                  controlAudio(index, 'backward');
                }}
              />,
              <>
                {isPlaying ? (
                  currentSong === index ? (
                    <PauseCircleOutlined
                      key="play"
                      style={{ fontSize: 40, color: colors.primaryBtn }}
                      onClick={() => {
                        controlAudio(index, 'pause');
                      }}
                    />
                  ) : (
                    <PlayCircleOutlined key="play" style={{ fontSize: 40, color: colors.secondaryBtn }} />
                  )
                ) : (
                  <PlayCircleOutlined
                    key="play"
                    style={{ fontSize: 40, color: colors.primaryBtn }}
                    onClick={() => {
                      controlAudio(index, 'play');
                    }}
                  />
                )}
              </>,
              <ForwardOutlined
                key="forward"
                style={{ fontSize: 35, color: colors.secondaryBtn }}
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
            <Meta title={data.artistName} description={showProgressBar(index)} />
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
