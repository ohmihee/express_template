import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import compression from "compression";
import config from "../config/index.js";
import Logger from "../utils/logger.js";
import * as swagger from "../utils/swagger.js";
import * as helmet from "helmet";

const logger = new Logger();

const app = express();
/**
 * ------------------------------
 * helmet: used for security
 * ------------------------------
 */
app.use(helmet.contentSecurityPolicy());
app.use(helmet.crossOriginEmbedderPolicy());
app.use(helmet.crossOriginOpenerPolicy());
app.use(helmet.crossOriginResourcePolicy());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.originAgentCluster());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

app.set("config", config);
app.use(bodyParser.json());
// 데이터를 json형태로 파싱하여 준다.

import { createRequire } from "module";
const require = createRequire(import.meta.url);
app.use(require("method-override")());

app.use(
  compression({
    level: 6,
    threshold: 400 * 1000,
    filter: (req, res) => {
      if (req.headers["x-no-compression"]) {
        // header에 x-no-compression이 있으면, 압축하지 않도록 false를 반환한다.
        return false;
      }
      return compression.filter(req, res);
      // 없는 경우에는 압축허용
    },
  })
);
app.use(cors());

process.on("SIGNINT", () => {
  logger.log("stopping the server", "info");
  process.exit();
});
// process.on('', ()=>{})
// 해당 첫번째 인자에 해당하는 이벤트 발생시 특정한 적업을 하도록 설정할 수 있다.

app.set("port", process.env.DEV_APP_PORT);
app.use("/api/docs", swagger.router);
// app.get("/", (req, res) => {
//   const payload = "dkssdjssdjfkalsjfklasjklfjlkakssdjfkalsjfklasajk";
//   res.send(payload.repeat(10000));
// });
import router from "../router/index.js";
app.use("/api/v1", router);

app.use((req, res, next) => {
  logger.log(
    "the url you are trying to reach is not hosted on our server",
    "error"
  );
  const err = new Error("Not Found");
  err.status = 404;
  res.status(err.status).json({
    type: "error",
    message: "the url you are trying to reach is not hosted on our server",
  });
  next(err);
});

// app.listen(3000, () => {
//   console.log("server start 3000");
// });
// console.log("success");

export default app;
