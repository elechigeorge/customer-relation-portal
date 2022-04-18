import express from "express";
const router = express.Router();

// import controllers
import {
  create_branch,
  fetch_branch,
  fetch_branch_by_id,
  delete_branch_by_id,
} from "../controller/branch.js";

import {protect_admin} from "../middlewares/authenticate_admin.js"

router.route("/create").post(protect_admin, create_branch);
router.route("/").get(fetch_branch);
router.route("/:id").get(fetch_branch_by_id).delete(delete_branch_by_id);

export default router;
