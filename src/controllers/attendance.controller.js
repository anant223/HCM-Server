const asyncHandler = require("../utils/asyncHandler.js");
const ApiResponse = require("../utils/apiResponse.js");
const ApiError = require("../utils/apiError.js");

// Mock database
const attendanceRecords = [];

// Get all attendance records
const getAllAttendence = asyncHandler(async (req, res) =>{
    
})


// Get attendance record by ID
exports.getAttendanceById = asyncHandler(async (req, res, next) => {
    const record = attendanceRecords.find(r => r.id === parseInt(req.params.id));
    if (!record) {
        return next(new ApiError(404, "Attendance record not found"));
    }
    res.status(200).json(new ApiResponse(200, "Success", record));
});

// Create new attendance record
exports.createAttendance = asyncHandler(async (req, res, next) => {
    const newRecord = {
        id: attendanceRecords.length + 1,
        ...req.body
    };
    attendanceRecords.push(newRecord);
    res.status(201).json(new ApiResponse(201, "Attendance record created", newRecord));
});

// Update attendance record by ID
exports.updateAttendance = asyncHandler(async (req, res, next) => {
    const record = attendanceRecords.find(r => r.id === parseInt(req.params.id));
    if (!record) {
        return next(new ApiError(404, "Attendance record not found"));
    }
    Object.assign(record, req.body);
    res.status(200).json(new ApiResponse(200, "Attendance record updated", record));
});

// Delete attendance record by ID
exports.deleteAttendance = asyncHandler(async (req, res, next) => {
    const index = attendanceRecords.findIndex(r => r.id === parseInt(req.params.id));
    if (index === -1) {
        return next(new ApiError(404, "Attendance record not found"));
    }
    attendanceRecords.splice(index, 1);
    res.status(204).json(new ApiResponse(204, "Attendance record deleted"));
});
