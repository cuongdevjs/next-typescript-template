const path = require('path');
const { parse } = require('url');
const express = require('express');
const next = require('next');
// const routes = require('./routes');

const port = process.env.PORT || process.env.NEXT_PUBLIC_PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

// const handle = routes.getRequestHandler(app);
const handle = app.getRequestHandler();

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening(server) {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Listening on ${bind}`);
}

app.prepare().then(() => {
  const server = express();

  server.all('*', (req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;
    // handle GET request to /service-worker.js
    if (pathname === '/service-worker.js') {
      // const filePath = path.join(__dirname, '../public', pathname);
      // app.serveStatic(req, res, filePath);
      res.sendFile(path.resolve(__dirname, '../.next', 'service-worker.js'));
      // const filePath = path.resolve(__dirname, '../.next', 'service-worker.js');
      // app.serveStatic(req, res, filePath);
    } else {
      handle(req, res, parsedUrl);
    }
  });

  // server.use(express.static(path.join(__dirname, './public/static')));

  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);
});
