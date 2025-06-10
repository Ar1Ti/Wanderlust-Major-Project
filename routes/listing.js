const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedin, isOwner} = require("../middleware.js");
const {validateListing} = require("../middleware.js");
const Review = require("../models/review");

const listingController = require("../controllers/listings.js")

const multer  = require('multer')
const {storage} = require("../cloudConfig.js")
const upload = multer({storage})

// index route ,Create route
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedin,
    upload.single("listing[image][url]"),
    validateListing,
    wrapAsync(listingController.createNewlistings));
  
  // New route 
  router.get("/new", isLoggedin, listingController.renderNewForm);
  
  //show route update route and delete route
  router.route("/:id")
    .get(wrapAsync(listingController.showListings))
    .put(isLoggedin,isOwner, validateListing, wrapAsync(listingController.updateListings))
    .delete(isLoggedin,isOwner, wrapAsync(listingController.deleteListings));
  
  
  //Edit route
  router.get("/:id/edit", isLoggedin,isOwner, wrapAsync(listingController.renderEdit));
  
  module.exports = router;