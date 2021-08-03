import NotFound from '@containers/NotFoundPage/Loadable';
//import HomeContainer from '@containers/HomeContainer/Loadable';
import routeConstants from '@utils/routeConstants';
import MusicContainer from '@containers/MusicContainer/Loadable';
export const routeConfig = {
  music: {
    component: MusicContainer,
    ...routeConstants.repos
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
