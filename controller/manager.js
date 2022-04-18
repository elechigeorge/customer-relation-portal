import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import Manager from "../model/manager.js";
import generateToken from "../utils/generateToken.js"

// @desc    Auth managers
// @route   POST /manager/login
// @access  Public
const login = asyncHandler(async (request, response) => {
  try {
    // grab auth crendentials
    const { email, password } = request.body;

    // validate the credentials
    if (email == "" || password == "") {
      response.status(400).json({ message: "Kindly fill in all fields" });
    }

    // attempt to grab the customer
    const attempted_manager = await Manager.findOne({ email: email });

    if (!attempted_manager) {
      response.status(400).json({ message: "Kindly review your credentials" });
    }
    // check if password is correct
    const isMatched = bcrypt.compare(password, attempted_manager.password);

    if (isMatched) {
      response.status(200).json({
        token: generateToken(attempted_manager._id),
        ...attempted_manager._doc,
      });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json(error);
  }
});

// @desc    Register a new manager
// @route   POST /manager/register
// @access  Public
const register = asyncHandler(async (request, response) => {
  try {
    // grab all fields from request body
    const { image, first_name, last_name, email, phone_number, branch, password } =
      request.body;

    // check if all the fields are not empty
    if (
      first_name == "" ||
      last_name == "" ||
      email == "" ||
      phone_number == "" ||
      !branch ||
      password == ""
    ) {
      response.status(400).json({ message: "Kindly fill in all fields" });
    }

    // check if manager exist with that email
    const manager_exist = await Manager.findOne({ email });

    if (manager_exist) {
      response
        .status(400)
        .json({ message: "Manager with that email already exist, choose a new email" });
    }
    // hash their password
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    // register a new customer
    const new_manager = {
      image,
      first_name,
      last_name,
      email,
      phone_number,
      branch,
      password: hash,
    };

    const manager = await Manager.create(new_manager);

    // check if creation was successful
    if (manager) {
      response.status(201).json(manager);
    }
  } catch (error) {
    console.error(error);
    response.status(500).json(error);
  }
});

// @desc    Update current manager profile
// @route   PUT /manager/update
// @access  Private to manager
const update = asyncHandler(async (request, response) => {
  response.status(200).json({ message: "Manager Updated" });
});


const getAll = asyncHandler(async (request, response) => {
  try {
    // try to grab all managers 
    const managers = await Manager.find();

    response.status(200).json(managers);

  } catch (error) {
    console.error(error);
    response.status(500).json({message: "Server Error"})
  }
})

export { login, register, update, getAll };