import { Router } from "express";
const router = Router();
import prisma from "../../config/prisma.js";

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
<<<<<<< HEAD
  const result = await prisma.user.create({
    data: {
      nickName: "nick",
      password: "password",
    },
  });
  console.log(result);
=======
  //await query("create table test (uId int)");
>>>>>>> a918add (feat: add email)
  res.json({ user: "user" });
});

export default router;
