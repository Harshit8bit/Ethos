const mongoose = require("mongoose");
const reviews = require("./reviews");
const { required } = require("joi");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title : {
        type :String,
        required : true,
    },
    description : String,
    
image: {
    url: {
        type: String,
        default: "https://images.unsplash.com/photo-1759509326921-c6f022d58136?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
        set: (v) => 
            v === "" 
            ? "https://images.unsplash.com/photo-1759509326921-c6f022d58136?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687" 
            : v,
    },
    filename: {
        type: String,
    }
},

    price : {
    
        type : Number,
        required: true,
         default: 0
    },
    location :String,
    country : String,

    reviews : [
        {
            type : Schema.Types.ObjectId,
            ref : "Review",
        }
    ] ,

    owner : {
        type : Schema.Types.ObjectId,
        ref : "User",
    },
    
    geometry :{
         type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
    },
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;