const sendEmail = require("../utils/sendEmail");
const validators = require("../utils/validators");
const User = require("../models/Users");
const Booking = require("../models/Bookings");
const links = require("../models/links"),
    userLinks = links.user;

// Handle login on post request
exports.postLogIn =  async (req, res) => {
    // catch errors from previous middleware
    User.loginUser(req.body.email, req.body.password).then(user => {
            req.session.user = user;

            if (user.isAdmin) {
                return res.json({
                    status: 'Success',
                    isAdmin:true,
                    redirect: '/admin/dashboard'
                })
            } else {
                return res.json({
                    status: 'Success',
                    isAdmin:false,
                    redirect: '/user/dashboard'
                })
            }
        })
        .catch(err => {
            console.log(`Something went wrong when login:\n${err.email}`);
            if (err.code === 2912) {
                var errors_form = {
                    email: err.email,
                    password: err.password
                }
            } else {
                var errors_form = {
                    email: `Server got some internal error. Please try again later`
                }
            }
            // return errors object to the ajax login form
            console.log(errors_form);
            return res.json({
                errors: errors_form
            })
        })
};

exports.postSignUp = async (req, res) => {
    // error objects to pass to ajax form
    // validate server side
     var errors = {};
    if (validators.isNullInput(req.body.fname)) {
        errors.fname = "First name cannot be null"
    };
    if (validators.isNullInput(req.body.lname)) {
        errors.lname = "Last name cannot be null";
    }
    if (validators.isNullInput(req.body.password)) {
        errors.password = "Password cannot be null";
    }
    if (validators.isNullInput(req.body.email)) {
        errors.email = "Email cannot be null";
    }
    if (validators.isNot18(req.body.month, req.body.day, req.body.year)) {
        errors.birthday = "Must be 18+ to sign up";
    }

    User.findOne({
        email: req.body.email
    }).then(user => {
        if (user) {
            errors.email = 'This account already exists';
            throw errors;
        }
    }).then(() => {
        var string = req.body.month + ' ' + req.body.day + ', ' + req.body.year;
        var birthday = new Date(string).toISOString().substring(0, 10);
        const user = {
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email.toLowerCase(),
            password: req.body.password,
            birthday: birthday
        };
        const newUser = new User(user);

        newUser.save().then(() => {
            console.log(`Account with email ${user.email} is created successfully`);
            sendEmail.sendEmail_signUp(newUser);
            // have to declare user before assigning it to session
            req.session.user = user;

            return res.status(202).json({
                status: "Success",
                user: newUser,
                redirect:"/user/dashboard",
                roomID: req.params.id
            });
        }).catch(err => {
            console.log(err);
            if (err.code === 11000) {
                console.log(`Error: ${err.code}`);
                var errors_SvData = {
                    email: `It looks like there's already an account with ${user.email}.`
                }
                req.session.errors = errors_SvData;
                req.session.user = user;
                return res.json({
                    status: "Failed",
                    redirect:"/",
                    roomID: req.params.id
                });
            }
        })
    }).catch(err => {
        console.log(err);
        return res.json({
            errors: err
        });
    })

}


exports.getUserDashBoard = (req, res) => {
    Booking.find({
        "userID": req.session.user._id
    }).then(booking => {
        console.log(booking);
        userLinks.forEach((route) => {
            if (route.render === 'User_dashboard') {
                res.render(route.render, {
                    pageName: route.pageName,
                    layout: false,
                    css: route.css,
                    script: route.script,
                    signup: false,
                    login: false,
                    user: req.session.user,
                    bookings: booking
                });
            }
        })
    })
}


exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect("/")
}