/**
 *
 * StyledGrid
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
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import styled from 'styled-components';
import { styles } from '@themes';
import { T } from '@components/T';
import If from '@components/If';
import routeConstants from '@utils/routeConstants';
import { BACKWARD, FORWARD, PAUSE, PLAY } from '@utils/constants';

// Function to improve image resolution as well as deal with undefined data.
export function improveImg(str) {
  const escapedFind = '100x100'.replace(/([.*+?^=!:${}()|\]\\])/g, '\\$1');
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

const ImgStyle = styled.img`
  border-radius: 30% !important;
  padding: 10px;
`;

const Play = styled(PlayCircleOutlined)`
  ${styles.primaryIcon}
`;

const DisabledPlay = styled(PlayCircleOutlined)`
  ${styles.disabledIcon}
`;

const Pause = styled(PauseCircleOutlined)`
  ${styles.primaryIcon}
`;

const Forward = styled(ForwardOutlined)`
  ${styles.secondaryIcon}
`;
const Backward = styled(BackwardOutlined)`
  ${styles.secondaryIcon}
`;

function StyledGrid(props) {
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
    if (type === BACKWARD) {
      ele.currentTime -= 5;
    } else if (type === FORWARD) {
      ele.currentTime += 5;
    } else if (type === PLAY) {
      ele.play();
      setIsPlaying(true);
      setCurrentSong(val);
      showProgress(ele);
    } else if (type === PAUSE) {
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

  function resolveLink(trackId) {
    const path = routeConstants.details.route;
    return path.replace(':id', trackId);
  }

  return (
    <If condition={!isEmpty(musicData.results)} otherwise={<T data-testid="no-music-data" id="no_results" />}>
      {musicData.results.slice(0, 10).map((item, index) => {
        const data = musicData.results[index];
        return (
          <Col key={index}>
            <Card
              data-testid="card-wrapper"
              key={data.trackId}
              className="neumorphic"
              style={{ width: 300 }}
              cover={<ImgStyle alt="example" src={improveImg(data.artworkUrl100)} />}
              actions={[
                <Backward
                  key={BACKWARD}
                  data-testid="backward"
                  onClick={() => {
                    controlAudio(index, BACKWARD);
                  }}
                />,
                <If
                  key={index}
                  condition={isPlaying}
                  otherwise={
                    <Play
                      key={PLAY}
                      data-testid="play"
                      onClick={() => {
                        controlAudio(index, PLAY);
                      }}
                    />
                  }
                >
                  <If condition={currentSong === index} otherwise={<DisabledPlay key={PLAY} data-testid="disabled" />}>
                    <Pause
                      key={PAUSE}
                      data-testid="pause"
                      onClick={() => {
                        controlAudio(index, PAUSE);
                      }}
                    />
                  </If>
                </If>,
                <Forward
                  key={FORWARD}
                  data-testid="forward"
                  onClick={() => {
                    controlAudio(index, FORWARD);
                  }}
                />
              ]}
            >
              <Meta
                avatar={<CustomerServiceOutlined style={{ fontSize: 20 }} spin={currentSong === index} />}
                title={data.trackCensoredName}
              />

              <Meta
                title={
                  <Link exact="true" to={resolveLink(item.trackId)}>
                    <StyledSmall>{data.artistName}</StyledSmall>
                  </Link>
                }
                description={showProgressBar(index)}
              />
              <audio ref={ele => (audioList.current[index] = ele)} src={data.previewUrl} preload="none" loop />
            </Card>
          </Col>
        );
      })}
    </If>
  );
}

//Details

StyledGrid.propTypes = {
  musicData: PropTypes.object
};

export default StyledGrid;
