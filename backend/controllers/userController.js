const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

//Register User
exports.registerUser = catchAsyncErrors(async (req,res,next)=>{
    const {name, email, password} = req.body;
    const user = await User.create({
        name, 
        email, 
        password, 
        avatar:{
            public_id:"This is sample AvatarID",
            url:"AvatarURL"
        }
    });

    sendToken(user, 201, res);
})

// Login User
exports.loginUser = catchAsyncErrors(async(req,res,next) => {
    const {email, password} = req.body;
    
    //checking if user has given both email and pw
    if(!email || !password){
        console.log("fail");
        return next(new ErrorHandler("Please Enter Email & Password", 400));
    }

    //Find user and check if user exists for entered email and password
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    //check if password is correct
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    sendToken(user, 200, res);
});

//Log Out User
exports.logOut = catchAsyncErrors(async(req,res,next) => {

    res.cookie("token", null,{
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Logged Out"
    })
});

// Forgot Password
exports.forgotPassword = catchAsyncErrors(async(req,res,next) => {
    const user = await User.findOne({email:req.body.email}); 

    if(!user){
        return next(new ErrorHandler("User not found", 404));
    }

    // Get Reset Pw Token
    const resetToken = user.getResetPasswordToken();
    await user.save({validateBeforeSave: false});

    const resetPwURL = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    const message = `Your Password Reset Token is: \n\n ${resetPwURL}. \n\n
    If you have not requested this email then please ignore it.`;

    try {
        await sendEmail({
            email:user.email,
            subject:`Artyft Password Recovery`,
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully.`
        })
    } catch (error) {
        user.resrtPasswordToken = undefined;
        user.resrtPasswordExpire = undefined;
        
        await user.save({validateBeforeSave: false});

        return next(new ErrorHandler(error.message, 500));
    }
});

// Reset Password
exports.resetPassword = catchAsyncErrors(async(req,res,next)=>{
    // Creating token hash
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resrtPasswordExpire: { $gt: Date.now() }
    });

    if(!user){
        return next(new ErrorHandler("Reset Password Token is Invalid or Expired", 400));
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Passwords don't match", 400));
    }

    user.password = req.body.password;
    user.resrtPasswordToken = undefined;
    user.resrtPasswordExpire = undefined;

    await user.save();
    sendToken(user, 200, res);
});