import timestamp from "mongoose-timestamp";
import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: true,
  },
  token: String,
});

AdminSchema.plugin(timestamp);

const Admin = mongoose.model("Admin", AdminSchema);

export default Admin;
