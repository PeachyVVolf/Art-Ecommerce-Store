const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");


//Create Product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    req.body.user = req.user.id;    

    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    })
});

//Get All Products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
    const resultsPerPage = 6;
    const productCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultsPerPage);

    const products = await apiFeature.query;
    res.status(200).json({
        success: true,
        products,
        productCount
    });
});

//Update Product -- Admin
exports.updateProduct = catchAsyncErrors(async (req,res) => {
    let product = Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product Not Found.", 404));
        
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new:true, runValidators:true, useFindAndModify:false});

    res.status(200).json({
        success:true,
        product
    })
});

//Delete Product
exports.deleteProduct = catchAsyncErrors(async(req,res,next) => {
    const product =  await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product Not Found.", 404));
        
    }

    await product.remove();
    res.status(200).json({
        success:true,
        message: "Product Deleted."
    });
});

//Get Product Details
exports.getProductDetails = catchAsyncErrors(async(req,res,next) => {
    const product =  await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product Not Found.", 404));
        
    }

    res.status(200).json({
        success:true,
        product
    });    
});

// Create New Review or Update Review
exports.createProductReview = catchAsyncErrors(async(req,res,next)=>{
    
    const { rating, comment, productId } = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    };

    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find(rev => rev.user.toString()===req.user._id.toString());

    if(isReviewed){
        product.reviews.forEach(rev => {
            if(rev.user.toString()===req.user._id.toString()){
                rev.rating=rating,
                rev.comment=comment   
            }
        });
    }
    else{
        product.reviews.push(review);
        product.numberOfReviews = product.reviews.length;
    }

    let avg = 0;
    product.ratings = product.reviews.forEach(rev => {
        avg = avg + rev.rating;
    })
    
    product.ratings = avg/product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success:true
    });
});

// Get All Reviews
exports.getProductReviews = catchAsyncErrors(async(req, res, next)=>{
    const product = await Product.findById(req.query.id);
    if(!product){
        return next(new ErrorHandler("Product not Found", 404));
    }

    res.status(200).json({
        success:true,
        reviews: product.reviews
    });
});

// Delete Review
exports.deleteReview = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.query.productId);
    if(!product){
        return next(new ErrorHandler("Product not Found", 404));
    }

    const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString()
    );

    let avg = 0;
    reviews.forEach((rev) => {
        avg += rev.rating;
    })
    
    let ratings = 0;
    if(avg > 0){
        ratings = avg/reviews.length;
    }
    
    const numberOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId,{
        ratings,
        reviews,
        numberOfReviews
    },{
        new:true,
        runValidators:true,
        useFindAndModify: false
    })

    res.status(200).json({
        success:true,
    });
});