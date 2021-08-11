import MockAdapter from 'axios-mock-adapter';
import { getApiClient } from '@utils/apiUtils';
import { getSong } from '../musicApi';

describe('musicApi tests', () => {
  const musicName = 'arijit';
  it('should make the api call to "/search?term=${musicName}"', async () => {
    const mock = new MockAdapter(getApiClient().axiosInstance);
    const data = [
      {
        totalCount: 1,
        items: [{ musicName }]
      }
    ];
    mock.onGet(`/search?term=${musicName}`).reply(200, data);
    const res = await getSong(musicName);
    expect(res.data).toEqual(data);
  });
});
