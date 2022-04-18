import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import Customer from "../model/customer.js";
import generateToken from "../utils/generateToken.js"

// @desc    Auth customer
// @route   POST /customer/login
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
    const attempted_customer = await Customer.findOne({ email: email });

    if (!attempted_customer) {
      response.status(400).json({ message: "Kindly review your credentials" });
    }
    // check if password is correct
    const isMatched = bcrypt.compare(password, attempted_customer.password);

    if (isMatched) {
      response.status(200).json({
        token: generateToken(attempted_customer._id),
        ...attempted_customer._doc,
      });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json(error);
  }
});

// @desc    Register a new customer
// @route   POST /customer/register
// @access  Public
const register = asyncHandler(async (request, response) => {
  try {
    // grab all fields from request body
    const { image, first_name, last_name, email, phone_number, branch, password } =
      request.body;

    // check if all the fields are not empty
    if (
      image == "" ||
      first_name == "" ||
      last_name == "" ||
      email == "" ||
      phone_number == "" ||
      !branch ||
      password == ""
    ) {
      response.status(400).json({ message: "Kindly fill in all fields" });
    }

    // check if customer exist with that email
    const customer_exist = await Customer.findOne({ email });

    if (customer_exist) {
      response
        .status(400)
        .json({ message: "Customer already exist, choose a new email" });
    }
    // hash their password
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    // register a new customer
    const new_customer = {
      image,
      first_name,
      last_name,
      email,
      phone_number,
      branch,
      password: hash,
    };

    console.log(new_customer)

    const customer = await Customer.create(new_customer);

    // check if creation was successful
    if (customer) {
      response.status(201).json(customer);
    }
  } catch (error) {
    console.error(error);
    response.status(500).json(error);
  }
});

// @desc    Update current customer profile
// @route   PUT /customer/update
// @access  Private to customers
const update = asyncHandler(async (request, response) => {
  response.status(200).json({ message: "Customer Updated" });
});


const getAll = asyncHandler(async (request, response) => {
  try {
    // try to grab all managers 
    const customers = await Customer.find({});

    if(customers) response.status(200).json(customers);

  } catch (error) {
    console.error(error);
    response.status(500).json({message: "Server Error"})
  }
})

export { login, register, update, getAll };
