const Listing = require("../models/listing.js");


module.exports.index = async(req,res)=> {
    const allListing = await Listing.find({});
    res.render("listings/index.ejs",{allListing});
}

module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new.ejs");
}

module.exports.showListings = async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({path:"reviews", populate: {path: "author"},}).populate("owner");
    if(!listing){
      req.flash("error", "Listing you requested for does not exist!");
      return res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing,currUser: req.user})
}

module.exports.createNewlistings = async(req,res,next) => {
  
    let url = req.file.path;
    let filename = req.file.filename;
    console.log(url, "..", filename);
    let listing = req.body.listing;
    const newListing = new Listing(listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
   
}

module.exports.renderEdit = async (req,res) => {
    
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
      req.flash("error", "Listing you requested for does not exist!");
      return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", {listing})
}

module.exports.updateListings = async(req,res) => {
  
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    req.flash("success", "Listing Updated");
    res.redirect(`/listings/${id}`);
}

module.exports.deleteListings = async (req,res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing is deleted!");
    res.redirect("/listings");
}