const EmployeeProfile = require('../models/employeeProfile.model');
const ApiResponse = require("../utils/apiResponse.js");
const ApiError = require("../utils/apiError.js");
const asyncHandeler = require('../utils/asyncHandeler.js');

// Get all employee profiles
const getAllProfiles =  asyncHandeler(async (req, res) => {
    const profiles = await EmployeeProfile.find();
    return res
    .status(200)
    .json(new ApiResponse(201, profiles, "Here are all Profiles" ))
    
});

// Get a single employee profile by ID
const getProfileById = asyncHandeler(async (req, res) => {
    const profile = await EmployeeProfile.findById(req.params.id);
    if (!profile) {
        throw new ApiError({ message: 'Profile not found' });
    }
    return res.status(200)
    .json(new ApiResponse(200, profile, "Profile is found!" ));
    
});

// Create a new employee profile
const createProfile = asyncHandeler(async (req, res) => {
    const profile = new EmployeeProfile(req.body);
    const newProfile = await profile.save();
    if(!newProfile){
        throw new ApiError(400, "Something went wrong while creating new Profile");
    }
    return res
    .status(200)
    .json(new ApiResponse(200, newProfile, "Profile created Successfully"))
    
});

// Update an existing employee profile
const updateProfile = asyncHandeler(async (req, res) => {
    const updatedProfile = await EmployeeProfile.findByIdAndUpdate(req.params, req.body, { new: true });
    if (!updatedProfile) {
        throw new ApiError(404, "Profile not found")
    }
    return res.status(200).json(new ApiResponse(202, "Profile updated successfully"));
    
});

// Delete an employee profile
const deleteProfile = asyncHandeler(async (req, res) => {
        const deletedProfile = await EmployeeProfile.findByIdAndDelete(req.params.id);
        if (!deletedProfile) {
            throw ApiError(404, "Profile not found")
        }
        return res.status(200).json(new ApiResponse(204, {}, "Profile deleted successfully"));
    
});

export {
    getAllProfiles,
    deleteProfile,
    updateProfile,
    getProfileById,
    createProfile
}