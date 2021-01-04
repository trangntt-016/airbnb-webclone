const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true
  },
  roomID: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  checkIn: {
    type: Date,
    required: true
  },
  checkOut: {
    type: Date,
    required: true
  },
  noOfGuests:{
    type:Number,
    required:true
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
});

const Booking = new mongoose.model("Booking", BookingSchema);

module.exports = Booking;