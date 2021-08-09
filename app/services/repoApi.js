import { useApi } from '@utils/apiUtils';
const itunesApi = useApi('itunes');

export const getSong = songName => itunesApi.get(`/search?term=${songName}`);
