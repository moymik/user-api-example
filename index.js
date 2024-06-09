import http from 'http';
import routeHandler from './routes/router.js';
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer(routeHandler);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});