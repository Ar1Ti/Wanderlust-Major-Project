const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const {validateReview, isReviewAuthor}= require("../middleware.js");
const {isLoggedin} = require("../middleware.js");
const Review = require("../models/review.js");


const reviewController = require("../controllers/reviews.js")



//Reviews
//(POST route)
router.post("/",isLoggedin, validateReview, wrapAsync(reviewController.createReviews))

//Delete Review route
router.delete(
  "/:reviewId",isLoggedin, isReviewAuthor,
  wrapAsync(reviewController.deleteReviews))

module.exports = router;