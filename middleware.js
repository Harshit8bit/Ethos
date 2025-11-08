const Listing = require("./models/listing");
const Review = require("./models/reviews.js");
const {listingSchema , reviewSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");
const reviews = require("./models/reviews.js");

//authentication 

module.exports.isLoggedIn = (req , res , next) =>{
        
    if(!req.isAuthenticated()) {

        //redirect URL
        req.session.redirectUrl = req.originalUrl;
        req.flash("errorLogin" , "You must be logged in to create new listing!");
       return res.redirect("/listings");
    }
    next();
};

module.exports.saveRedirectUrl = (req , res , next) =>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

//is owner for listing deleting or editing
module.exports.isOwner = async (req , res , next ) => {
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error" , "You are not the owner of this listing");
        return res.redirect(`/listings/${id}`);
    };
    next();
};

//is Author for Review deleting or editing
module.exports.isReviewAuthor = async (req , res , next ) => {
    let { id , reviewId} = req.params;
    let review = await Review.findByIdAndUpdate(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error" , "You are not the author of this review");
        return res.redirect(`/listings/${id}`);
    };
    next();
};

//validate listing
module.exports.validateListing = (req , res , next) => {
        
    let { error } = listingSchema.validate(req.body);

    if(error){
        let errMsg = error.details.map((el) =>
            el.message).join(",");
        throw new ExpressError(400 , errMsg);
    }else{
        next();
    }
};

//validate Review
module.exports.validateReview = (req , res , next) => {
        
    let { error } = reviewSchema.validate(req.body);

    if(error){
        let errMsg = error.details.map((el) =>
            el.message).join(",");
        throw new ExpressError(400 , errMsg);
    }else{
        next();
    }
};