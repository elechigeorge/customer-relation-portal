import timestamp from "mongoose-timestamp";
import mongoose from "mongoose";

const ManagerSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone_number: {
    type: String,
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
  },
  //   additional fields for authentication
  token: String,
  password: {
    type: String,
  },
});

ManagerSchema.plugin(timestamp);

const Manager = mongoose.model("Manager", ManagerSchema);

export default Manager;
