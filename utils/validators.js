const isNullInput = input =>{
    return input === undefined || input === null || input === ""
};

const isNot18 = (month, day, year) =>{
    var string = month + ' ' + day + ', ' + year;
    var birthday = new Date(string);
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs);
    var age = Math.abs(ageDate.getUTCFullYear() - 1970);
    if(age < 18){
      return true;
    }
    return false;
};


//const isPhoto = file => file.mimetype.indexOf("jpg") != -1;

const isPhoto = file =>{
    var isPhoto = false;
    console.log(file.mimetype);
    if (file.mimetype==="image/jpeg") {
        isPhoto = true;
    }
    return isPhoto
}
module.exports = {
    isNullInput,
    isPhoto,
    isNot18
}