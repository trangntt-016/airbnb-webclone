const links = require("../models/links");
const generalLinks = links.general;
const Room = require("../models/Rooms");
const Booking = require("../models/Bookings");
const utils = require("../utils/converters");
const sendEmail = require("../utils/sendEmail");


exports.getHomePage = (req, res) => {
    generalLinks.forEach((route) => {
        if (route.render === 'index') {
            res.render(route.render, {
                pageName: route.pageName,
                layout: false,
                css: route.css,
                script: route.script,
                signup: false,
                login: false,
                user: req.session.user
            });
        }
    })
}

exports.getSearchResult = (req, res) => {
    let keywords = {};
    // display the search keywords in the search bar
    if (req.query.location) {
        keywords.location = req.query.location;
        keywords.checkIn = req.query.checkIn;
        keywords.checkOut = req.query.checkOut;
        keywords.noOfGuests = parseInt(req.query.noOfAdult) + parseInt(req.query.noOfChildren);
        keywords.noOfStays = utils.noOfDays(req.query.checkIn, req.query.checkOut);
        req.session.keywords = keywords;
    }

    Room.find({
        location: keywords.location
    }).then((room) => {
        //return a list of rooms, if no rooms are found, it still renders new page and displays no rooms
        if (room) {
            for (var i = 0; i < room.length; i++) {
                room[i].noOfStays = keywords.noOfStays;
            }
            generalLinks.forEach((route) => {
                if (route.render === 'Gen_searchResult') {
                    res.render(route.render, {
                        pageName: route.pageName,
                        layout: false,
                        css: route.css,
                        script: route.script,
                        rooms: room,
                        user: req.session.user,
                        keywords: req.session.keywords
                    });
                }
            })
        }
    }).catch((err) => {
        console.log(`Something went wrong: ${err}`);
        res.redirect('/');
    })
}

exports.getSingleRoom = (req, res) => {
    Room.findById(req.params.id)
        .then(room => {
            if (room) {
                generalLinks.forEach(function (route) {
                    if (route.render === 'detailedPlace') {
                        // start rendering new pages
                        res.render(route.render, {
                            pageName: route.pageName,
                            layout: false,
                            css: route.css,
                            script: route.script,
                            user: req.session.user,
                            rooms: room,
                            image: room.image,
                            keywords: req.session.keywords
                        });
                    }
                });

            } else {
                res.redirect("/");
            }
        })
        .catch(err => {
            console.log(`Something went wrong:\n${err}`);
            res.redirect("/");
        });
};

exports.bookRoom = (req, res) => {
    var index = req.params.id.lastIndexOf("/", req.params.id.length);
    var url = req.params.id.substr(index + 1);

    Room.findById(url)
        .then(room => {
            if (room) {
                const bookingData = {
                    userID: req.session.user._id,
                    roomID: room._id,
                    title: room.title,
                    price: room.price,
                    city: room.city,
                    checkIn:req.session.keywords.checkIn,
                    checkOut:req.session.keywords.checkOut,
                    noOfGuests:req.session.keywords.noOfGuests
                };
                const user = {
                    lname:req.session.user.lname,
                    email:req.session.user.email
                };
                const booking = new Booking(bookingData);
                booking.save().then(()=>{
                    console.log(`Booking with id ${booking._id} is created successfully!`);
                    sendEmail.sendEmail_booking(booking,user);
                    req.session.booking = booking;
                    req.session.room = room;
                    res.redirect(`/book/${room._id}/confirmation`);
                    
                }).catch(err => {
                    console.log(`Something went wrong when booking:\n${err}`);
                    res.redirect(`/room/${room._id}`);
                })
            } else {
                res.redirect("/");
            }
        })
        .catch(err => {
            console.log(`Something went wrong:\n${err}`);
            res.redirect("/");
        });
};

exports.getBookingConf = (req,res)=>{
    generalLinks.forEach(function (route) {
        if (route.render === 'Gen_bookingConfirm') {
            // start rendering new pages
            res.render(route.render, {
                pageName: route.pageName,
                layout: false,
                css: route.css,
                script: route.script,
                user: req.session.user,
                booking:req.session.booking,
                rooms: req.session.room,
                keywords: req.session.keywords
            });
        }
    })
};