const catchasyncerrors = require("../middleware/catchasyncerrors.js");
const Errorhandler = require("../utils/errorhandler.js");
const Movie = require("../models/movieModel.js");
const { io } = require("../app.js");
const ratingcalculator = require("../utils/movieratingcalculator.js");
const uploadOnCloudinary=require('../utils/claudinary.js')
exports.createmovie = catchasyncerrors(async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const imageurl = req.files["imageurl"][0].path;
    const vediourl = req.files["vediourl"][0].path;
    const cloudinary=await uploadOnCloudinary(vediourl)
    const newmovie = await Movie.create({
      title,
      description,
      imageurl,
      // vediourl,
      vediourl:cloudinary.secure_url,
    });
    res.status(200).json({
      success: true,
      message: "movie created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
});

exports.getallmovies = catchasyncerrors(async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 4;
  const page = parseInt(req.query.page) || 1;

  // we are implementing he searchbar in this controller
  const SearchTerm = req.query.search || "";
  const query = SearchTerm
    ? {
        $or: [
          { title: { $regex: SearchTerm, $options: "i" } },
          { description: { $regex: SearchTerm, $options: "i" } },
        ],
      }
    : {};

  let startindex = (page - 1) * limit;
  let endindex = startindex + limit - 1;

  const movies = await Movie.find(query).skip(startindex).limit(limit).lean();

  const totalnoofmovies = SearchTerm
    ? await Movie.countDocuments(query)
    : await Movie.countDocuments();

  const totalpages = Math.ceil(totalnoofmovies / limit);
  const hasnextpage = endindex < totalnoofmovies;

  res.status(200).json({
    success: true,

    movies,

    pagination: {
      totalnoofmovies,
      hasnextpage,
      totalpages,
    },
  });
});
exports.getmoviedetail = catchasyncerrors(async (req, res, next) => {
  const moviesdetail = await Movie.findById(req.params.id);
  if (!moviesdetail) {
    return next(new Errorhandler("movie not found", 404));
  }
  res.status(200).json({
    success: true,
    moviesdetail,
  });
});

exports.deletemovie = catchasyncerrors(async (req, res, next) => {
  try {
    let movietodelte = await Movie.findById(req.params.id);
    if (!movietodelte) {
      return next(new Errorhandler("movie not  found"));
    }
    movietodelte = await Movie.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      movietodelte,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error ",
    });
  }
});

// add rating by users
// exports.addratings = catchasyncerrors(async (req, res, next) => {
//   try {
//     const movieid = req.params.id;

//     const { value } = req.body;
    
//     const movie = await Movie.findById(movieid);
//     if (!movie) {
//       return next(new Errorhandler("movie not found", 404));
//     }
//     let existinguser = movie.ratings.find((rating) =>
//       rating.user.equals(req.user._id)
//     );
//     if (existinguser) {
//       existinguser.value = value;
//     }
//     movie.ratings.push({
//       user: req.user._id,
//       value: value,
//     });

//     movie.overallrating = await ratingcalculator.calculaterating(movie.ratings);
//     await movie.save();
//     res.status(200).json({
//       success: true,
//       movie,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "internal server error",
//     });
//   }
// });
exports.addratings = catchasyncerrors(async (req, res, next) => {
  
    const movieid = req.params.id;
    const { value } = req.body;

    const movie = await Movie.findById(movieid);
    if (!movie) {
      return next(new Errorhandler("movie not found", 404));
    }

    let existinguser = movie.ratings.find((rating) =>
      rating.user.equals(req.user._id)
    );

    if (existinguser) {
      existinguser.value = value;
    } else {
      movie.ratings.push({
        user: req.user._id,
        value: value,
      });
    }
     let val=  await ratingcalculator.calculaterating(movie.ratings);
     let finalval=parseInt(val)
     movie.overallrating=finalval
    await movie.save();
    res.status(200).json({
      success: true,
      movie,
    });

});


exports.addComment = catchasyncerrors(async (req, res, next) => {
  try {
    const { text } = req.body;
    console.log("this is text" + text + req.params.id);
    const id = req.params.id;
    const movie = await Movie.findById(id);
    if (!movie) {
      return next(new Errorhandler("movie not found", 404));
    }

    movie.comments.push({
      user: req.user._id,
      text: text,
    });
    await movie.save();
    res.status(200).json({
      success: true,
      movie,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      messsage: "internal server error",
    });
  }
});
