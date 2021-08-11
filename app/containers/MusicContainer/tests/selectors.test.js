import selectMusicContainer, { selectMusicData, selectMusicError, selectMusicName } from '../selectors';

describe('MusicContainer selector tests', () => {
  let mockedState;
  let musicName;
  let musicData;
  let musicError;

  beforeEach(() => {
    musicName = 'arijit';
    musicData = { totalCount: 1 };
    musicError = 'There was some error while fetching the music details';

    mockedState = {
      musicContainer: {
        musicName,
        musicData,
        musicError
      }
    };
  });
  it('should select the musicContainer state', () => {
    const musicContainerSelector = selectMusicContainer();
    expect(musicContainerSelector(mockedState)).toEqual(mockedState.musicContainer);
  });
  it('should select the musicName', () => {
    const musicSelector = selectMusicName();
    expect(musicSelector(mockedState)).toEqual(musicName);
  });

  it('should select musicData', () => {
    const musicDataSelector = selectMusicData();
    expect(musicDataSelector(mockedState)).toEqual(musicData);
  });

  it('should select the musicError', () => {
    const musicErrorSelector = selectMusicError();
    expect(musicErrorSelector(mockedState)).toEqual(musicError);
  });
});
