import { Router } from "express";
import users from "./user.js";

const router = Router();

router.use("/users", users);

export default router;
