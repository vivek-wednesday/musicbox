import { selectMusicContainerDomain } from '../selectors';

describe('MusicContainer selector tests', () => {
  let mockedState;

  beforeEach(() => {
    mockedState = {
      musicContainer: {}
    };
  });

  it('should select the user state', () => {
    expect(selectMusicContainerDomain(mockedState)).toEqual(mockedState.musicContainer);
  });
});
