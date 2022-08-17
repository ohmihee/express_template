import jwt from "jsonwebtoken";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const _ = require("lodash");

import config from "../config/index.js";
import RequestHandler from "./requestHandler.js";
import Logger from "../utils/logger.js";

const logger = new Logger();
const requestHandler = new RequestHandler(logger);

function getTokenFromHeader(req) {
  if (
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Token") ||
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer")
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
}

function verifyToken(req, res, next) {
  try {
    if (_.isUndefined(req.headers.authorization)) {
      requestHandler.throwError(
        401,
        "Unauthorized",
        "Not Authorized to access this resource!"
      )();
    }
    const Bearer = req.headers.authorization.split(" ")[0];
    if (!Bearer || Bearer !== "Bearer") {
      requestHandler.throwError(
        401,
        "Unauthorized",
        "Not Authorized to access this resource!"
      )();
    }

    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      requestHandler.throwError(
        401,
        "Unauthorized",
        "Not Authorized to access this resource!"
      )();
    }

    jwt.verify(token, config.auth.jwt_secret, (err, decoded) => {
      if (err) {
        requestHandler.throwError(
          401,
          "Unauthorized",
          "please provide a vaid token ,your token might be expired"
        )();
        req.decoded = decoded;
        next();
      }
    });
  } catch (e) {
    requestHandler.sendError(req, res, err);
  }
}

export { getTokenFromHeader, verifyToken };
