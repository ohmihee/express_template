import { createLogger, format, transports } from "winston";
import fs from "fs";
import DailyRotate from "winston-daily-rotate-file";
import config from "../config/index.js";

const { env } = config.app;
const logDir = "logs";

let infoLogger;
let errorLogger;
let warnLogger;
let allLogger;

//const logFormat =

class Logger {
  constructor() {
    // 로그 폴더가 존재하지 않으면 해당 로그 폴더를 생성함
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir);
    }

    infoLogger = createLogger({
      // 개발 환경인 경우 level은 info, 아닌 경우 debug
      level: env === "development" ? "info" : "debug",
      format: format.combine(
        format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss",
        }),
        format.printf((info) => {
          `${info.timestamp} ${info.level} : ${info.message}`;
        })
      ),
      //   format: combine(
      //     label({
      //         label: 'Test-Log'
      //     }),
      //     timestamp({
      //         format: 'YYYY-MM-DD HH:mm:ss'
      //     })
      //   ),
      transports: [
        new transports.Console({
          levels: "info",
          format: format.combine(
            format.colorize(),
            format.printf(
              (info) => `${info.timestamp} ${info.level}: ${info.message}`
            )
          ),
        }),
        new DailyRotate({
          dirname: logDir,
          filename: `%DATE%-info-results.log`,
          datePattern: "YYYY-MM-DD",
        }),
      ],
      exitOnError: false,
    });
    errorLogger = createLogger({
      format: format.combine(
        format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss",
        }),
        format.printf(
          (error) => `${error.timestamp} ${error.level} : ${error.message}`
        )
      ),
      transports: [
        new transports.Console({
          levels: "error",
          format: format.combine(
            format.colorize(),
            format.printf(
              (error) => `${error.timestamp} ${error.level}: ${error.message}`
            )
          ),
        }),

        new DailyRotate({
          dirname: logDir,
          filename: `%DATE%-errors-results.log`,
          datePattern: "YYYY-MM-DD",
        }),
      ],
      exitOnError: false,
    });

    warnLogger = createLogger({
      format: format.combine(
        format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss",
        }),
        format.printf(
          (warn) => `${warn.timestamp} ${warn.level}: ${warn.message}`
        )
      ),
      transports: [
        new transports.Console({
          levels: "warn",
          format: format.combine(
            format.colorize(),
            format.printf(
              (warn) => `${warn.timestamp} ${warn.level}: ${warn.message}`
            )
          ),
        }),
        new DailyRotate({
          dirname: logDir,
          filename: `%DATE%-warnings-results.log`,
          datePattern: "YYYY-MM-DD",
        }),
      ],
      exitOnError: false,
    });
    allLogger = createLogger({
      // change level if in dev environment versus production
      format: format.combine(
        format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss",
        }),
        format.printf(
          (silly) => `${silly.timestamp} ${silly.level}: ${silly.message}`
        )
      ),
      transports: [
        new DailyRotate({
          filename: `${logDir}/%DATE%-results.log`,
          datePattern: "YYYY-MM-DD",
        }),
      ],
      exitOnError: false,
    });
  }

  log(message, severity, data) {
    if (severity == null || infoLogger.levels[severity] == null) {
      this.severity = "info";
    }
    if (severity === "info") {
      infoLogger.log(severity, message, data);
      allLogger.log(severity, message, data);
    } else if (severity === "error") {
      errorLogger.log(severity, message);
      allLogger.log(severity, message, data);
    } else if (severity === "warn") {
      warnLogger.log(severity, message, data);
      allLogger.log(severity, message, data);
    }
  }
}

export default Logger;
