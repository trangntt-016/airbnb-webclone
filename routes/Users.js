const express = require("express"),
    router = express.Router(),
    userController = require('../controllers/Users');


// set up post routes for log in
router.post("/login", userController.postLogIn);

// set up post routes for sign up and send email
router.post("/signup",userController.postSignUp);

// setup post for getting user dashboard
router.get("/dashboard",userController.getUserDashBoard);

router.get("/logout",userController.logout);

module.exports = router;