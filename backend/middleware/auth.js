const { JsonWebTokenError } = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors( async(req,res,next) => {
    const {token} = req.cookie;

    if(!token){
        return next(new ErrorHandler("Please Login to Access this Resource.", 401));
    }

    const decodedData = JsonWebTokenError.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);
    next();
});

exports.authorizeRoles = (...roles) => {
    
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next( new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource.`, 403));
        }
        next();
    };
};