const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const RoomSchema = new Schema({
    userID: {
        type: String,
        required: true
    },
    title:{
        type:String,
        required:true
    },
    image:{
        type:Array,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
});

const Room = new mongoose.model("Rooms",RoomSchema);

module.exports = Room;