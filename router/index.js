import { Router } from "express";
import api from "./api/index.js";

const router = Router();

router.use("/", api);

export default router;
