const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
var Schema = mongoose.Schema;


// define a user schema
var UserSchema = new Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

UserSchema.pre("save", function(next) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(this.password, salt, (err, hash) => {
        if (err) {
          console.log(`Something went wrong while hashing: \n${err}`);
        } else {
          this.password = hash;
        }
        next();
      });
    });
  });
  
// register the user model using the UserSchema
var User = mongoose.model("Users", UserSchema);

User.loginUser = (email, password) => {
    let _user;
    const error = {
      code: 2912 // Authentication Error
    };
    return new Promise((resolve, reject) => {
      User.findOne({ email })
        .then(user => {
          if (user) {
            _user = user;
            return bcrypt.compare(password, user.password);
          } else {
            error.email = "Email not found";
            reject(error);
          }
        })
        .then(isAuthenticated => {
          if (isAuthenticated) {
            resolve(_user);
          } else {
            error.password = "Password does not match";
            reject(error);
          }
        })
        .catch(err => reject(err));
    });
  };

  


module.exports = User;