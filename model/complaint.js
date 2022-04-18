import timestamp from "mongoose-timestamp";
import mongoose from "mongoose";


const ComplaintSchema = new mongoose.Schema({
  title: {
      type: String
  },
  message: {
      type: String
  },
  reviewed: {
      type: Boolean,
      default: false
  },
  customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer"
  },
  branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch"
  }
});

ComplaintSchema.plugin(timestamp);

const Complaint = mongoose.model("Complaint", ComplaintSchema);

export default Complaint;