const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "please enter movie title"],
  },
  description: {
    type: String,
    required: [true, "please enter descreption"],
  },
  imageurl:{
    type:String,
    // required:[true,"please enter image url"]
  }
  ,
  vediourl: {
    type: String,
    // required: [true, "please enter url"],
  },
  views: {
    type: Number,
    default: 0,
  },
  savedbyusers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      text: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  ratings: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      value: {
        type: Number,
        required: [true, "please enter ratings"],
        min: 1,
        max: 5,
      },
    },
  ],
  overallrating:{
    type:Number,
    default:0
  }
});
const Movie = mongoose.model("Movie",movieSchema );
module.exports = Movie;
