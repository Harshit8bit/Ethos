
const User = require("../models/user.js");

//singup
module.exports.signUp = async(req , res) => {
    try{
    let { username , email , password} = req.body;
    const newUser =  new User({ username , email});
    const registeredUSer =  await User.register(newUser , password);
    console.log(registeredUSer);

    req.login(registeredUSer , (err) =>{
        if(err) {
           return next(err);
        }
        req.flash("success" , "Welcome to Ethos!");
        res.redirect("/");
    });
    } catch(error) {
        req.flash("error", error.message);
        res.redirect("/signup");
    }
};

//login
module.exports.login =  async(req , res) => {
        req.flash("success" , " Welcome back to Ethos!");

        //empty url when we direct login
        let redirectUrl = res.locals.redirectUrl || "/"
        res.redirect(redirectUrl);
    }

    //logout
module.exports.logOut =  (req , res , next) => {
    req.logOut((err) =>{
        if(err) {
           return next(err);
        }
        req.flash("success" , "You are logged out!");
        res.redirect("/");
    });
}