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

// Get User Details
exports.getUserDetails = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success:true,
        user    
    });
});

// Update Password
exports.updatePassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Old Password is Incorrect.", 400));
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("Both Passwords not same.", 400));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);
});

// Update User Profile
exports.updateProfile = catchAsyncErrors(async(req,res,next)=>{
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    }
    // TODO Add avatar when I add it to cloud

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success:true
    })
});

//Get All Users -- Admin
exports.getAllUsers = catchAsyncErrors(async(req,res,next) => {
    const users = await User.find();

    res.status(200).json({
        success:true,
        users
    });
});

//Get Single User Details -- Admin
exports.getSingleUsers = catchAsyncErrors(async(req,res,next) => {
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User doesn't exist ${req.body.params}`, 400));
    }

    res.status(200).json({
        success:true,
        user
    });
});

// Update User Role -- Admin
exports.updateUserRole = catchAsyncErrors(async(req,res,next)=>{
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success:true
    })
});

// Delete User -- Admin
exports.deleteUser = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.params.id);
    // TODO-- We will remove cloudinary later
    if(!user){
        return next(new ErrorHandler(`User with id: ${req.params.id} doesn't exist.`));
    }

    await user.remove();

    res.status(200).json({
        success:true,
        message: "User Deleted Successfully."
    })
});