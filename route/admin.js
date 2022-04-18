import express from "express";
const router = express.Router();

import { login, register, update } from "../controller/admin.js";

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/update").put(update);

export default router;
