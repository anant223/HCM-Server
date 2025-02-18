const jwt = require("jsonwebtoken")
const ApiError = require("../utils/apiError.js")
const asyncHandler = require("../utils/asyncHandeler.js")
const User = require("../models/user.model.js")

export default verifyUsesr = asyncHandler(async(req, res, next) =>{
    try {
        const token =
          req.cookies.refreshToken ||
          req.header("Authorization")?.replace("Bearer ", "");
        if(!token){
            new ApiError(401, "User is not vaild")
        }
        const decodedToken = jwt.verify(
          (token, process.env.REFRESH_TOKEN_SECRET)
        );
         const user = await User.findById(decodedToken._id).select(
           "-refreshToken -password"
         );

         if (!user) {
           throw new ApiError(404, "Invaild Access Token");
         }

         req.user = user;

         next();

         
    } catch (error) {
        throw new ApiError(401, error.message);   
    }
})

