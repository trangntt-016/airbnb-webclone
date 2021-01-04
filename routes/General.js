const express = require("express"),
    app = express(),
    path = require('path'),
    router = express.Router(),
    generalController = require("../controllers/Generals.js"),
    links = require('../models/links'),
    utils = require("../utils/redirectMiddleware");

var general = links.general;
general.forEach(function (route) {
    router.get(route.url, (req, res) => {
        //reset user signup information when loading pages
        req.session.errors = "";
        // start rendering new pages
        res.render(route.render, {
            pageName: route.pageName,
            layout: false,
            css: route.css,
            script: route.script,
            user:req.session.user
        });
    });
});
router.get("/",generalController.getHomePage);
router.get("/rooms",generalController.getSearchResult);
router.get("/room/:id", generalController.getSingleRoom);
router.get("/book/:id",utils.redirectProtected, generalController.bookRoom);
router.get("/book/:id/confirmation", generalController.getBookingConf);


module.exports = router;