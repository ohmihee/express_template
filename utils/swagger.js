import { Router } from "express";

const router = Router();

import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import fs from "fs";
import path from "path";
// const __dirname = path.resolve();
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const _ = require("lodash");
import config from "../config/index.js";

const directoryPath = path.join(__dirname, "../router/api");
console.log(`directoryPath: ${directoryPath}`);
const pathes = [];

const filesName = fs.readdirSync(directoryPath, (err, files) => {
  if (err) {
    return console.log(`Unable to scan directory: ${err}`);
  }
  return files.forEach((file) => pathes.push(file));
});

console.log(`filesName: ${filesName}`);

function getFullPathes(names) {
  names.forEach((name) => {
    let customPath;
    if (name !== "index") {
      console.log(name, "name==");
      customPath = `./router/api/${name}`;
    }
    if (!_.isUndefined(name)) {
      console.log(name, "name2==");
      pathes.push(customPath);
    }
  });
}

getFullPathes(filesName);
console.log("pathes: ", pathes);

const options = {
  swaggerDefinition: {
    info: {
      title: "i Lrn",
      version: "1.0.0",
      description: "i Lrn Microlearning System,REST API with Swagger doc",
      contact: {
        email: "a.mezian@dreamtechs.co",
      },
    },
    tags: [
      {
        name: "users",
        description: "Users API",
      },
      {
        name: "Auth",
        description: "Authentication apis",
      },
      {
        name: "Email",
        description: "for testing and sending emails ",
      },
      {
        name: "termsAndCondition",
        description: " the terms and condition for the application",
      },
      {
        name: "Versioning",
        description:
          " operation related to check the version of the apis or the mobile .. etc ",
      },
    ],
    schemes: ["http"],
    host: `localhost:${config.app.port}`,
    basePath: "/api/v1",
    securityDefinitions: {
      Bearer: {
        type: "apiKey",
        description: "JWT authorization of an API",
        name: "Authorization",
        in: "header",
      },
    },
  },

  apis: pathes,
};

const swaggerSpec = swaggerJsDoc(options);
require("swagger-model-validator")(swaggerSpec);

router.get("/swagger", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

function validateModel(name, model) {
  const responseValidation = swaggerSpec.validateModel(
    name,
    model,
    false,
    true
  );
  if (!responseValidation.valid) {
    throw new Error("Model doesn't match swagger contract");
  }
}

export { router, validateModel };
