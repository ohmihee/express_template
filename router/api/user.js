import { Router } from "express";
const router = Router();

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

router.get("/profile", (req, res) => {
  res.json({ user: "user" });
});

export default router;
