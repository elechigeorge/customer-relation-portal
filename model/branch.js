import timestamp from "mongoose-timestamp";
import mongoose from "mongoose";


const BranchSchema = new mongoose.Schema({
  branch_name: {
      type: String,
  },
  address: {
      type: String,
  },
  city: {
      type: String,
  },
  state: {
      type: String,
  },
  phone_number: {
      type: String,
  },
  email: {
      type: String
  } 
});

BranchSchema.plugin(timestamp);

const Branch = mongoose.model("Branch", BranchSchema);

export default Branch;