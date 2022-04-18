import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import Admin from "../model/admin.js";
import generateToken from "../utils/generateToken.js"

// @desc    Auth admin
// @route   POST /admin/login
// @access  Public
const login = asyncHandler(async (request, response) => {
  try {
    // grab auth crendentials
    const { email, password } = request.body;

    // validate the credentials
    if (email == "" || password == "") {
      response.status(400).json({ message: "Kindly fill in all fields" });
    }

    // attempt to grab the admin
    const attempted_admin = await Admin.findOne({ email: email });

    if (!attempted_admin) {
      response.status(400).json({ message: "Kindly review your credentials" });
    }
    // check if password is correct
    const isMatched = bcrypt.compare(password, attempted_admin.password);

    if (isMatched) {
      response.status(200).json({
        token: generateToken(attempted_admin._id),
        ...attempted_admin._doc,
      });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json(error);
  }
});

// @desc    Register a new admin
// @route   POST /customer/register
// @access  Public
const register = asyncHandler(async (request, response) => {
  try {
    // grab all fields from request body
    const { full_name, email, password } =
      request.body;

    // check if all the fields are not empty
    if (
      full_name == "" ||
      email == "" ||
      password == ""
    ) {
      response.status(400).json({ message: "Kindly fill in all fields" });
    }

    // check if customer exist with that email
    const admin_exist = await Admin.findOne({ email });

    if (admin_exist) {
      response
        .status(400)
        .json({ message: "Admin already exist, choose a new email" });
    }
    // hash their password
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    // register a new admin
    const new_admin = {
      full_name,
      email,
      password: hash,
    };

    const admin = await Admin.create(new_admin);

    // check if creation was successful
    if (admin) {
      response.status(201).json({
        token: generateToken(attempted_admin._id),
        ...attempted_admin._doc,
      });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json(error);
  }
});

// @desc    Update current admin profile
// @route   PUT /admin/update
// @access  Private to admin
const update = asyncHandler(async (request, response) => {
  response.status(200).json({ message: "Customer Updated" });
});

export { login, register, update };
