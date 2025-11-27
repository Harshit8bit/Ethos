
 if(process.env.NODE_ENV != "production"){
  require('dotenv').config();
 };

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const Review = require("./models/reviews.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const multer  = require('multer');

const user = require("./models/user.js");

const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended : true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

//MongoAtlas connection
      const dbUrl = "mongodb://127.0.0.1:27017/ethos" //previous
     // const dbUrl = process.env.ATLASDB_URL; 

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", () => {
  console.log("error in mongo session store",err);
});

const sessionOptions = {
  store : store,
  secret : process.env.SECRET,
  resave : false ,
  saveUninitialized : true,
  cookie: {
    expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
     maxAge : 7 * 24 * 60 * 60 * 1000,
     httpOnly : true,
  }
};



app.use(session(sessionOptions));
app.use(flash());

//passport initialize
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(user.authenticate()));

//something went wrong here
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());




main()
    .then(() =>{
        console.log("connected to DB");
    })
    .catch(err => console.log(err));
    
    async function main() {
    await mongoose.connect(dbUrl);
    };


//middleware for flash
app.use((req , res , next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.errorLogin = req.flash('errorLogin');
  res.locals.currUser = req.user;

  next();
});

//main line for listings
app.use("/listings" , listingsRouter);

//line for reviews
app.use("/listings/:id/reviews" , reviewsRouter);

//line for userAutorisation
app.use("/", userRouter);


//homepage route
app.get("/", wrapAsync (async (req , res) =>{
   const allListing =  await Listing.find({});
   res.render("listings/homepage.ejs", {allListing});
}));


app.get("/privacy", (req, res) => {
    res.render("privacy.ejs");
});

app.get("/terms", (req, res) => {
    res.render("terms.ejs");
});



// Catch-all 404 route
app.use((req , res , next) => {
  next(new ExpressError(404, "Page not found!!"));
});


// Error handling middleware
app.use((err , req , res , next) => {
  let { statusCode = 500 , message = "chud"} = err;
   res.status(statusCode).render("listings/error.ejs" , {message})

});


//server listening
app.listen(8080 , () =>{
    console.log("listening to 8080");
})