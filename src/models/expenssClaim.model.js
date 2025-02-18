const mongoose = require("mongoose");

const ExpenseClaimSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: { type: Number, required: true },
    category: {
      type: String,
      enum: ["travel", "meals", "supplies", "other"],
      required: true,
    },
    description: { type: String },
    receipt: { type: String }, // Store file URL if needed
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ExpenseClaim", ExpenseClaimSchema);
