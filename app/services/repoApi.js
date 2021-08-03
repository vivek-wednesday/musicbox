import { generateApiClient } from '@utils/apiUtils';
const itunesApi = generateApiClient('itunes');

export const getSong = songName => itunesApi.get(`/search?term=${songName}`);
