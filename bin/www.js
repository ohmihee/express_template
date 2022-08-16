import http from "http";
import app from "../server/index.js";
import Logger from "../utils/logger.js";
//import { dbConnect } from "../config/databaseConfig.js";

const logger = new Logger();

/**
 * Create HTTP Server
 */
const server = http.createServer(app);

/**
 * Normalize a port into a number, string or false
 */

function normalizePort(val) {
  const port = parseInt(val, 10);
  // number o => false
  // number x => true
  if (Number.isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}

const port = normalizePort(process.env.DEV_APP_PORT || "3000");

function onError(err) {
  if (err.syscall !== "listen") {
    throw err;
  }

  const bind = typeof port === "string" ? `Pipe${port}` : `Port ${port}`;

  switch (err.code) {
    case "EACCES":
      logger.log(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      logger.log(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw err;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;

  logger.log(`the server started listining on port ${bind}`, "info");
  //dbConnect();
}

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
