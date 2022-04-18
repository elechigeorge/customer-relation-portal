import asyncHandler from "express-async-handler";
import Complaint from "../model/complaint.js";

// @desc    Fetch all complaints
// @route   GET /complaints
// @access  Public
const fetch_all_complaints = asyncHandler(async (_, response) => {
  try {
    // try to fetch all complaints from all branches
    const complaints = await Complaint.find({})
      .sort("-1")
      .populate("customer")

    // send response
    response.status(200).json(complaints);
  } catch (error) {
    console.error(error);
    response.status(500).json(error);
  }
});

// @desc    Create a new complaint
// @route   POST /complaint/create
// @access  Private to only customers
const create_complaint = asyncHandler(async (request, response) => {
  try {
    // check if the logged in user is a customer
    if (!request.customer) {
      response
        .status(401)
        .json({ message: "Only customers can create a complaint" });
    }

    // grab fields from the body of the request
    const { title, message } = request.body;

    // check that no field is empty
    if (title == "" || message == "") {
      response.status(400).json({
        message: "No field should be empty, kindly fill in all fields",
      });
    }

    // create a new complaint object
    const new_complaint = {
      title,
      message,
      customer: request.customer,
      branch: request.customer.branch,
    };

    // create complain
    const complaint = await Complaint.create(new_complaint);

    // send feedback
    if (complaint) {
      response.status(201).json(complaint);
    }
  } catch (error) {
    console.error(error);
    response.status(500).json(error);
  }
});

// @desc    Get complains by branch
// @route   GET /complaint/:branchId
// @access  Public
const fetch_complaints_by_branch = asyncHandler(async (request, response) => {
  try {
    const branchId = request.params.id;
    // try to fetch all a branch
    const complaints = await Complaint.find({ branch: branchId });

    // check if branch has complaints
    if (complaints) {
      response.status(200).json(complaints);
    } else {
      response
        .status(200)
        .json({ message: "There is no branch for this branch" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json(error);
  }
});

// @desc    Get complains by branch
// @route   GET /complaint/:branchId
// @access  Public
const fetch_complaints_by_id = asyncHandler(async (request, response) => {
  try {
    const branchId = request.params.id;
    // try to fetch all a branch
    const complaint = await Complaint.findOne({ _id: branchId });

    // check if branch has complaints
    if (complaint) {
      response.status(200).json(complaint);
    } else {
      response
        .status(200)
        .json({ message: "There is no branch for this branch" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json(error);
  }
});

export {
  fetch_all_complaints,
  fetch_complaints_by_branch,
  fetch_complaints_by_id,
  create_complaint,
};
