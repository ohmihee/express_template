import mysql from "mysql2/promise";
import config from "./index.js";
const pool = mysql.createPool(config.mysql);
import Logger from "../utils/logger.js";

import { createRequire } from "module";
const require = createRequire(import.meta.url);

const logger = new Logger();
const dbConnect = () => {
  const mysql = require("mysql2");
  const con = mysql.createConnection(config.mysql);

  con.connect(function (err) {
    if (err) throw err;
    logger.log("DB Coeected!", "info");
  });
};

async function query(sql) {
  let connection;
  try {
    connection = await pool.getConnection(async (conn) => conn);
    try {
      const [result] = await connection.query(sql);
      return result;
    } catch (err) {
      const e = new Error(err);
      e.name = "Query Error";
      throw e;
    }
  } catch (err) {
    const e = new Error(err);
    e.name = "DB Error";
    throw e;
  } finally {
    connection.release();
  }
}

async function execute(sql, params) {
  let connection;
  try {
    connection = await pool.getConnection(async (conn) => conn);
    try {
      const [result] = await connection.execute(sql, params);
      return result;
    } catch (err) {
      const e = new Error(err);
      e.name = "Query Error";
      throw e;
    }
  } catch (err) {
    const e = new Error(err);
    e.name = "DB Error";
    throw e;
  } finally {
    connection.release();
  }
}

export { query, execute, dbConnect };
