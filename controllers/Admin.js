const {
    v1: uuidv1
} = require('uuid');
const path = require("path");
const {
    isNullInput,
    isPhoto
} = require('../utils/validators');
const Room = require('../models/Rooms');
const links = require("../models/links"),
    adminLinks = links.admin;
const fs = require("fs");

// exports.postHostPlace = (req,res,next)=>{
//     const files = req.files;
//     try {
//         if (files.length == 0) {
//             throw new Error("No file is selected");
//         }
//         files.forEach((file) => {
//             if (file.mimetype != 'image/jpeg') {
//                 throw new Error("File isn't of the right type")
//             }
//         })
//     } catch (error) {
//         return next(error.message);
//     }
//     res.redirect('/');
// }

// Utilities
function validateRoomInfo(data) {
    const errors = {};
    if (isNullInput(data.location)) {
        errors.location = "Please choose a location";
    }

    if (isNullInput(data.city)) {
        errors.city = "City cannot be null";
    }

    // if (isNullInput(data.file)) {
    //     errors.file = "You have to upload 4 images";
    // } else if (!isPhoto(data.file)||!isPhoto(data.file2)||!isPhoto(data.file3)||!isPhoto(data.file4)) {
    //     errors.file = "Images should be in .jpg or.png types"
    // }

    if (isNullInput(data.title)) {
        errors.title = "Title cannot be null";
    }

    if (isNullInput(data.price)) {
        errors.price = "Price cannot be null";
    } else if (isNaN(data.price) || data.price < 0) {
        errors.price = "Price must be a valid number";
    }

    if (isNullInput(data.description)) {
        errors.description = "Description cannot be null";
    }

    return errors;
}

// loop through admin links to find the url that match with the request and render the page
exports.getDashBoard = (req, res) => {
    Room.find({"userID":req.session.user._id}).then(rooms => {
        adminLinks.forEach((route) => {
            if (route.render === 'Admin_dashboard') {
                res.render(route.render, {
                    pageName: route.pageName,
                    layout: false,
                    css: route.css,
                    script: route.script,
                    signup: false,
                    login: false,
                    user: req.session.user,
                    rooms: rooms
                });
            }
        })
    })
}
// loop through admin links to find the url that match with the request and render the page
exports.getAddRoom = (req, res) => {
    adminLinks.forEach((route) => {
        if (route.render === 'Admin_addRoom') {
            res.render(route.render, {
                pageName: route.pageName,
                layout: false,
                css: route.css,
                script: route.script,
                user:req.session.user,
                errors: req.session.errors
            });
        }
    })
}

exports.getEditRoom = (req, res) => {
    Room.findById(req.params.id).then((room) => {
            if (room) {
                adminLinks.forEach((route) => {
                    if (route.render === 'Admin_editRoom') {
                        res.render(route.render, {
                            pageName: `Edit Room ${room._id} - User ${room.userID}`,
                            layout: false,
                            css: route.css,
                            script: route.script,
                            errors: req.session.errors,
                            user:req.session.user,
                            rooms: room,
                            _id: req.params.id
                        });
                    }
                })
            } else {
                res.redirect("Admin/dashboard");
            }
        })
        .catch((err) => {
            console.log(`Something went wrong: ${err}`);
            res.redirect("Admin/dashboard");
        })
}


exports.postAddRoom = (req, res) => {
    // validate Room Information that admin posts, using req.body
    const errors = validateRoomInfo(req.body);
    // validate the Room images using req.files, without checking null -> errors because req.files.file cannot access .file
    if (req.files == null) {
        errors.file = "You have to upload at least 4 images";
    } else {
        let files = req.files.file;
        if (files.length < 4) {
            errors.file = "You have to upload at least 4 images";
        } else {
            for (var i = 0; i < files.length; i++) {
                if (!isPhoto(files[i])) {
                    errors.file = "Images should be in image/png/jpeg/jpg types"
                }
            }
        }
    }

    // check if there are any errors in validating
    if (Object.keys(errors).length > 0) {
        req.session.errors = errors;
        res.redirect("/admin/add");
    } else {
        // creating images ID
        const newImages = [];
        for (var i = 0; i < req.files.file.length; i++) {
            newImages[i] = `room-${uuidv1()}${path.parse(req.files.file[i].name).ext}`
        }
        // creating new Room
        const formData = {
            userID:req.session.user._id,
            title: req.body.title,
            price: req.body.price,
            location: req.body.location,
            city: req.body.city,
            description: req.body.description,
            image: newImages
        }
        // Use the mv() method to place the file in upload directory
        for (var i = 0; i < req.files.file.length; i++) {
            req.files.file[i].mv(`public/img/rooms/${formData.image[i]}`)
        }

        // create a new place in the database
        const newRoom = Room(formData);
        console.log('can be here:'+newRoom);
        newRoom.save()
            .then(room => {
                console.log('A new place is added successfully');
                res.redirect(`/admin/dashboard`);
            })
            .catch(err => {
                console.log(`Something went wrong: ${err}`);
                res.redirect("/admin/add");
            })

    }
}

exports.putEditRoom = (req, res) => {
    // validate Room Information that admin updates, using req.body
    const errors = validateRoomInfo(req.body);
    // validate the Room images using req.files, without checking null -> errors because req.files.file cannot access .file
    if (req.files != null) {
        let files = req.files.file;
        if (files.length < 4 && files.length > 0) {
            errors.file = "You have to upload at least 4 images";
        } else {
            for (var i = 0; i < files.length; i++) {
                if (!isPhoto(files[i])) {
                    errors.file = "Images should be in image/png/jpeg/jpg types"
                }
            }
        }
    }

    // check if there are any errors in validating
    if (Object.keys(errors).length > 0) {
        req.session.errors = errors;
        adminLinks.forEach((route) => {
            if (route.render === 'Admin_editRoom') {
                res.render(route.render, {
                    pageName: route.pageName,
                    layout: false,
                    css: route.css,
                    script: route.script,
                    errors: req.session.errors,
                    _id: req.params.id
                });
            }
        })

    } else {
        // store oldImages to unlink later
        var oldImages = [];
        Room.findById(req.params.id).then((room) => {
                for (var i = 0; i < room.image.length; i++) {
                    oldImages[i] = room.image[i];
                }
                return oldImages;
            })
            .then(() => {
                var newImages = [];

                // find the ROom id to update
                Room.findById(req.params.id).then(room => {
                        // if user make any updates on images
                        if (req.files) {
                            // creating images ID
                            for (var i = 0; i < req.files.file.length; i++) {
                                newImages[i] = `room-${uuidv1()}${path.parse(req.files.file[i].name).ext}`;
                                // Move the new images to folder
                                req.files.file[i].mv(`public/img/rooms/${newImages[i]}`)
                            }
                            // unlink the old images
                            for (var i = 0; i < oldImages.length; i++) {
                                console.log(oldImages[i]);
                                fs.unlink(`public/img/rooms/${oldImages[i]}`, (err) => {
                                    if (err != null) {
                                        console.log(`Something wrong while unlinking\n ${err}`)
                                    }
                                });
                            }
                        }
                        else if(!req.files){
                            newImages = oldImages
                        }
                        if (room) {
                            room.title = req.body.title;
                            room.price = req.body.price;
                            room.city = req.body.city;
                            room.location = req.body.location;
                            room.description = req.body.description
                            room.image = newImages;
                        }
                        return room.save();
                    }).then(() => {
                        req.session.errors = {};
                        console.log('Update successfully!');
                        res.redirect('/admin/dashboard');
                    })
                    .catch((err) => {
                        console.log(`Something went wrong ${err}`);
                        res.redirect(`/admin/${req.params.id}`);
                    })
            })
    }
}

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect("/")
}