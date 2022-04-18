import express from "express";
const router = express.Router();

import { login, register, update, getAll } from "../controller/manager.js";

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/update").put(update);
router.route("/list").get(getAll);

export default router;
