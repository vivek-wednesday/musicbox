import NotFound from '@containers/NotFoundPage/Loadable';
//import HomeContainer from '@containers/HomeContainer/Loadable';
import routeConstants from '@utils/routeConstants';
import MusicContainer from '@containers/MusicProvider/MusicContainer/Loadable';
import MusicDetails from '@containers/MusicProvider/MusicDetails/Loadable';
export const routeConfig = {
  details: {
    component: MusicDetails,
    ...routeConstants.details
  },
  music: {
    component: MusicContainer,
    ...routeConstants.repos
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
