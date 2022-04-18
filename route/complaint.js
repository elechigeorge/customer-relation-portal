import express from "express";
const router = express.Router();

// import controllers
import {
  fetch_all_complaints,
  fetch_complaints_by_branch,
  fetch_complaints_by_id,
  create_complaint,
} from "../controller/complaint.js";
import { protect_customer } from "../middlewares/authenticate_customer.js";

router.route("/create").post(protect_customer, create_complaint);
router.route("/").get(fetch_all_complaints);
router.route("/:id").get(fetch_complaints_by_id);
router.route("/branch_list/:id").get(fetch_complaints_by_branch);

export default router;