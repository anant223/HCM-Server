const ApiResponse = require("../utils/apiResponse.js");
const ApiError = require("../utils/apiError.js");
const asyncHandeler = require("../utils/asyncHandeler.js");
const ExpenssClaim = require("../models/expenssClaim.model.js");

// Create a new expense claim
const createExpenssClaim = asyncHandeler(async (req, res, next) => {
    const { title, amount, description, date } = req.body;
    const newClaim = await ExpenssClaim.create({ title, amount, description, date });
    res.status(201).json(new ApiResponse.success("Expense claim created successfully", newClaim));
});

// Get all expense claims
const getAllExpenssClaims = asyncHandeler(async (req, res, next) => {
    const claims = await ExpenssClaim.find();
    res.status(200).json(new ApiResponse.success("Expense claims retrieved successfully", claims));
});

// Get a single expense claim by ID
const getExpenssClaimById = asyncHandeler(async (req, res, next) => {
    const claim = await ExpenssClaim.findById(req.params.id);
    if (!claim) {
        return next(new ApiError("Expense claim not found", 404));
    }
    res.status(200).json(new ApiResponse.success("Expense claim retrieved successfully", claim));
});

// Update an expense claim by ID
const updateExpenssClaimById = asyncHandeler(async (req, res, next) => {
    const { title, amount, description, date } = req.body;
    const updatedClaim = await ExpenssClaim.findByIdAndUpdate(
        req.params.id,
        { title, amount, description, date },
        { new: true, runValidators: true }
    );
    if (!updatedClaim) {
        return next(new ApiError("Expense claim not found", 404));
    }
    res.status(200).json(new ApiResponse.success("Expense claim updated successfully", updatedClaim));
});

// Delete an expense claim by ID
const deleteExpenssClaimById = asyncHandeler(async (req, res, next) => {
    const deletedClaim = await ExpenssClaim.findByIdAndDelete(req.params.id);
    if (!deletedClaim) {
        return next(new ApiError("Expense claim not found", 404));
    }
    res.status(200).json(new ApiResponse.success("Expense claim deleted successfully", deletedClaim));
});

export {
    createExpenssClaim,
    deleteExpenssClaimById,
    getAllExpenssClaims,
    getExpenssClaimById,
    updateExpenssClaimById
}