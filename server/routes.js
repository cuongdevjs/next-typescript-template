// #region Global Imports
const nextRoutes = require('next-routes');
// #endregion Global Imports

const routes = (module.exports = nextRoutes());

routes.add('home', '/', 'Home');
routes.add('theme', '/theme', 'Theme');
routes.add('healthcheck', `/healthcheck`, 'Healthcheck');
routes.add('preview', `/preview`, 'Preview');
routes.add('tour', `/vi/:tour/:scene?`, 'Public');

module.exports.Link = routes.Link;
module.exports.Router = routes.Router;

module.exports = routes;
