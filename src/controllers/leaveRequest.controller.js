const asyncHandler = require("../utils/asyncHandler.js");
const ApiResponse = require("../utils/apiError.js");
const ApiError = require("../utils/apiError.js");
const { default: LeaveRequest } = require("../models/leaveRequest.model.js");

const createLeaveRequest = asyncHandler(async(req, res) =>{
    const {employee, leaveType, startDate, endDate, reason, status} = req.body
    const requestLeave = await LeaveRequest.create({
        employee,
        leaveType,
        startDate,
        endDate,
        reason
    })
    if(!requestLeave){
        throw new ApiError(402, "Something went wrong while createing new leave request")
    }
    return res.status(200).json(new ApiResponse(201, "Leave created successfully"))
});

const getAllLeaveRequest = asyncHandler(async(req, res) =>{
    const leaveRequests = LeaveRequest.find().populate("");
    if(!leaveRequests){
        throw new ApiError(401, "No record found")
    }
    return res.status(200).json(new ApiResponse(201,"All leave request"))
})

const getLeaveRequestById = asyncHandler(async(req, res) =>{
    const leaveRequestById = LeaveRequest.findById(req.params._id)
    if(!leaveRequestById){
        throw new ApiError(404, "Leave request not found")
    }
    return res.status(200).json(new ApiResponse(200, "all leave request"))
})

const updateLeaveRequestById = asyncHandler(async(req, res) =>{
    const { employee, leaveType, startDate, endDate, reason, status } = req.body;
    const updateLeaveRequest = await LeaveRequest.findByIdAndUpdate(
      req.params.id,
      { employee, leaveType, startDate, endDate, reason, status },
      { new: true, runValidators: true }
    );
    if (!updateLeaveRequest) {
        throw new ApiError(404, "Leave request not found");
    }
    return res.status(200).json(new ApiResponse(200, "Leave request updated successfully", updateLeaveRequest));
});

export {
    createLeaveRequest,
    updateLeaveRequestById,
    getAllLeaveRequest,
    getLeaveRequestById,
}