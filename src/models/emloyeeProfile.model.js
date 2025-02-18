const mongoose = require("mongoose");

const EmployeeProfileSchema = new mongoose.Schema(
  {
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", required: true 
    },
    jobTitle: { 
        type: String, 
        required: true 
    },
    department: { 
        type: String, 
        required: true 
    },
    dateOfJoining: { 
        type: Date, 
        required: true 
    },
    status: {
      type: String,
      enum: ["active", "inactive", "terminated"],
      default: "active",
    },
    contactInfo: {
      phone: { type: String },
      address: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("EmployeeProfile", EmployeeProfileSchema);
