import asyncHandler from "express-async-handler";
import Branch from "../model/branch.js";

// @desc    Fetch all branches
// @route   GET /branch
// @access  Public
const fetch_branch = asyncHandler(async (request, response) => {
  try {
    // try to fetch all a branch
    const branch = await Branch.find({}).sort("-1");

    // check if branch is available before given any feedback
    if (branch) {
      response.status(200).json(branch);
    }
  } catch (error) {
    console.error(error);
    response.status(500).json(error);
  }
});

// @desc    Create a new branch
// @route   POST /branch/create
// @access  Private / limited to the admin's
const create_branch = asyncHandler(async (request, response) => {
  try {
    // check if the logged in user is an admin
    if (!request.admin) {
      response
        .status(401)
        .json({ message: "you are unauthorized to create new branch " });
    }
    // grab fields from the body of the reques
    const { branch_name, address, city, state, phone_number, email } = request.body;

    // check that no field is empty
    if (!branch_name || !address || !city || !state || !phone_number || !email) {
      response.status(400).json({
        message: "No field should be empty, kindly fill in all fields",
      });
    }

    // check that a branch doesn't have the same name
    const branch_exists = await Branch.findOne({ branch_name: new RegExp("^" + branch_name + "$", "i"), });

    if (branch_exists) {
      response
        .status(400)
        .json({
          message: "A branch has that same name, kindly choose another name",
        });
    }

    // create a new branch object
    const new_branch = {
      branch_name,
      address,
      city,
      state,
      phone_number,
      email,
    };

    const branch = await Branch.create(new_branch);

    if (branch) {
      response.status(201).json(branch);
    }

  } catch (error) {
    console.error(error);
    response.status(500).json(error);
  }
});

// @desc    Get single branch by ID
// @route   GET /branch/:id
// @access  Public
const fetch_branch_by_id = asyncHandler(async (request, response) => {
  try {
    const branchId = request.params.id;
    // try to fetch all a branch
    const branch = await Branch.find({ _id: branchId });

    // check if branch is available before given any feedback
    if (branch) {
      response.status(200).json(branch);
    } else {
      response.status(400).json({ message: "There is no branch with that id" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json(error);
  }
});

// @desc    delete single branch by ID
// @route   DELETE /branch/:id
// @access  Public
const delete_branch_by_id = asyncHandler(async (request, response) => {
  try {
    const branchId = request.params.id;
    // try to fetch all a branch
    await Branch.deleteOne({ _id: branchId });

    // check if branch is available before given any feedback
    if (error) throw new Error(error);

    response.status(200).json({message: "deleted"});

  } catch (error) {
    console.error(error);
    response.status(500).json(error);
  }
});

export { fetch_branch, fetch_branch_by_id, create_branch, delete_branch_by_id };
