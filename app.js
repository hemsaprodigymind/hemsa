const express = require("express");
const app = express();
const path = require("path");
//const catchAsync = require("./utils/catchAsync");
const ExpressError = require("./utils/ExpressError");
const methodOverride = require("method-override");
// const mongoose = require("mongoose");
// const Place = require("./models/places");
// const Review = require("./models/review");
const joi = require("joi");
const { reviewSchema } = require("./schema.js");
const ejsMate = require("ejs-mate");
//const { findById } = require("./models/places");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
//app.use(methodOverride('_method'))

// for validation

// const validatePlace = (res, req, next) => {
//   const placeSchema = joi.object({
//     place: joi
//       .object({
//         title: joi.string().required(),
//         days: joi.number().required().min(0),
//         image: joi.string().required(),
//         location: joi.string().required(),
//         description: joi.string().required(),
//       })
//       .required(),
//   });
//   const { error } = placeSchema.validate(req.body);
//   if (error) {
//     const msg = error.details.map((el) => el.message).join(",");
//     throw new ExpressError(msg, 400);
//   } else {
//     next();
//   }
// };

// const validateReview = (req, res, next) => {
//   const { error } = reviewSchema.validate(req.body);
//   if (error) {
//     const msg = error.details.map((el) => el.message).join(",");
//     throw new ExpressError(msg, 400);
//   } else {
//     next();
//   }
// };

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/our-projects", (req, res) => {
  res.render("our-projects");
});

app.get("/about-us", (req, res) => {
  res.render("about-us");
});
/*
app.get('/places', async(req, res) =>{
    const places = await Place.find({});
    res.render('index', {places})
})
*/

app.all("*", (req, res, next) => {
  next(new ExpressError("page not found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "something went wrong";
  res.status(statusCode).render("error", { err });
});

app.listen(3000, () => {
  console.log("Serving on port 3000");
});
