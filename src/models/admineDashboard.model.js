const mongoose = require("mongoose");

const AdminDashboardSchema = new mongoose.Schema(
  {
    totalEmployees: { type: Number, default: 0 },
    activeEmployees: { type: Number, default: 0 },
    pendingLeaves: { type: Number, default: 0 },
    pendingExpenses: { type: Number, default: 0 },
    processedPayrolls: { type: Number, default: 0 },
    totalGoalsCompleted: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AdminDashboard", AdminDashboardSchema);
