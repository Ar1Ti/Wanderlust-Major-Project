const mongoose = require("mongoose");
const Review = require("./review.js");
const Schema = mongoose.Schema;


const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        filename: String,
        url: {
            type: String,
            default: "https://lp-cms-production.imgix.net/features/2013/04/sunrise1_cs.jpg?auto=format,compress&q=72&w=1440&h=810&fit=crop",
            set: (v) => v === "" ? "https://lp-cms-production.imgix.net/features/2013/04/sunrise1_cs.jpg?auto=format,compress&q=72&w=1440&h=810&fit=crop" : v,
        }
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
        type: Schema.Types.ObjectId,
        ref: "Review",

        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

listingSchema.post("findOneAndDelete", async(listing) => {
    if(listing) {
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
});

//creating a model
const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing; // exporting listing module under app.js