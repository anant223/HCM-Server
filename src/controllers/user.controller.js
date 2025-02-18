const User  = require("../models/user.model.js");
const asyncHandler =  require("../utils/asyncHandler.js");
const ApiResponse = require("../utils/apiError.js");
const ApiError = require("../utils/apiError.js");

const generateRefreshToken = async (userID) => {
  try {
    const user = await User.findById(userID);
    // Generate refresh and access tokens
    const refreshToken = user.generateRefreshToken();

    // Save the refresh token in the user document
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access or refresh token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  // requed by user
  const { name, password, email, role } = req.body;

  // checking if user have filled the form or not
  if ([name, password, email, role].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  // checking if user exsit or not
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "username or email already exist");
  }

  // creating  new user
  const user = await User.create({ email, password, name, role});

  // selecting what to send
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );


  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while creating user");
  }

  // sending response
  return res
    .status(200)
    .json(new ApiResponse(201, createdUser, "User registred successfully"));
});

const login = asyncHandler(async (req, res) => {
  // login request
  const {email, password } = req.body;

  // Checking if all fields have been filled or not.
  if (!email) {
    throw new ApiError(400, "username or email required");
  }

  // Checking if user exist or not
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "Incorrect username or email");
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    throw new ApiError(404, "Wrong Password");
  }

  const { refreshToken } = await generateRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  };

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
        },
        "User logged in Successfully"
      )
    );
});

const logout = asyncHandler(async (req, res) => {
  if (!req.user?._id) {
    throw new ApiError(401, "User is not found");
  }

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
    path: "/",
  };

  return res
    .status(200)
    .clearCookie("refreshToken", options)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "Logged out successfully"));
});

const currentUser = asyncHandler(async (req, res) => {
  return await res
    .status(200)
    .json(new ApiResponse(200, req.user, "Here is the user"));
});


export {
  registerUser,
  login,
  logout,
  currentUser,
};
