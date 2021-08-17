export default {
  repos: {
    route: '/',
    props: {
      maxwidth: 500,
      padding: 20
    },
    exact: true
  },
  details: {
    route: '/:id',
    props: {
      maxwidth: 500,
      padding: 20
    },
    exact: true
  }
};
