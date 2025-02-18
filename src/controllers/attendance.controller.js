const asyncHandler = require("../utils/asyncHandler.js");
const ApiResponse = require("../utils/apiResponse.js");
const ApiError = require("../utils/apiError.js");
const  Attendance  = require("../models/attendance.model.js");

const getAllAttendance = asyncHandler(async (req, res) =>{
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limti) || 10
    const skip = (page -1) * limit
    const attendance = await Attendance.find().populate("employee").sort({date: -1}).skip(skip).limit(limit);
    if(!attendance){
        throw ApiError(404, "No record")
    }

    return res.status(200).json(
      new ApiResponse(
        201,
        {
          attendance,
          pagination: {
            total,
            page,
            pages: Math.ceil(total / limit),
          },
        },
        "All attendance found"
      )
    );
})

const getAttendanceById = asyncHandler(async(req, res) =>{
    const getAttendance = await Attendance.find
})