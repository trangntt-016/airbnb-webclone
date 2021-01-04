const noOfDays = (checkIn, checkOut)=>{
    var checkInDate = new Date(checkIn);
    var checkOutDate = new Date(checkOut);
    var milliseconds = checkOutDate - checkInDate;
    var days = new Date(milliseconds);
    return parseInt(days.getDate());
}

module.exports = {
    noOfDays
}