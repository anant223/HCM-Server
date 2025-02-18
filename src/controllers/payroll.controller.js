const Payroll = require("../models/payroll.model.js")
const ApiResponse = require("../utils/apiResponse.js");
const ApiError = require("../utils/apiError.js");
const asyncHandeler = require("../utils/asyncHandeler.js");

const createPayroll = asyncHandeler(async (req, res, next) => {
    const { employeeId, salary, bonuses, deductions, netPay } = req.body;

    if (!employeeId || !salary || netPay) {
        return next(new ApiError("All fields are required", 400));
    }

    const payroll = await Payroll.create({
      employeeId,
      salary,
      bonuses : bonuses || 0,
      deductions : deductions || 0,
      netPay,
    });

    return res
    .status(201)
    .json(new ApiResponse(201, payroll, ""))
});

const getPayrolls = asyncHandeler(async(req, res) =>{
    const payrolls = Payroll.find().populate("employee", "name email role");

    if (!payrolls || payrolls.length === 0) {
        new ApiError(404, "No Payroll record found")
    }

    return res.status(200).json(new ApiResponse(200, payrolls, "Payroll records retrieved successfully"));
})

const getPayrollById = asyncHandler(async (req, res) => {
  const payroll = await Payroll.findById(req.params.id).populate(
    "employee",
    "name email role"
  );

  if (!payroll) {
    throw new ApiError(404, "Payroll record not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, payroll, "Payroll record retrieved successfully")
    );
});

const updatePayroll = asyncHandler(async (req, res) => {
  const { salary, bonuses, deductions, netPay, status } = req.body;

  const payroll = await Payroll.findByIdAndUpdate(
    req.params.id,
    { salary, bonuses, deductions, netPay, status },
    { new: true, runValidators: true }
  );

  if (!payroll) {
    throw new ApiError(404, "Payroll record not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, payroll, "Payroll updated successfully"));
});

// Delete Payroll
const deletePayroll = asyncHandler(async (req, res) => {
  const payroll = await Payroll.findByIdAndDelete(req.params.id);

  if (!payroll) {
    throw new ApiError(404, "Payroll record not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, payroll, "Payroll deleted successfully"));
});

export {
  createPayroll,
  getPayrolls,
  getPayrollById,
  updatePayroll,
  deletePayroll,
};