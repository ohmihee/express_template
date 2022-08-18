import { Router } from "express";
const router = Router();
import { execute, query } from "../../config/databaseConfig.js";

/**
 * @swagger
 * definitions:
 *   users:
 *     required:
 *       - id
 *       - username
 *       - email
 *     properties:
 *       id:
 *         type: integer
 *       username:
 *         type: string
 *       email:
 *         type: string
 */

router.get("/profile", async (req, res) => {
  query("create table test (uId int)");
  res.json({ user: "user" });
});

export default router;
