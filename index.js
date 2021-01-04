const express = require("express"),
    app = express(),
    path = require("path"),
    hbs = require('hbs'),
    bodyParser = require('body-parser'),
    mongoose = require("mongoose"),
    expressSession = require("express-session"),
    cookieParser = require("cookie-parser"),
    fileUpload = require("express-fileupload"),
    methodOverride = require("method-override");


//Configure your Express.js to use express-session as middleware and pass the cookies secret keys https://learning-oreilly-com.libaccess.senecacollege.ca/library/view/get-programming-with/9781617294747/kindle_split_038.html
app.use(cookieParser("keyboard cat"));
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: 'keyboard cat',
}))

// Set up file uploading
app.use(fileUpload());
app.use(methodOverride("_method"));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.json());
// important - set to false
app.use(bodyParser.urlencoded({
    extended: true
}))


// Set up views
app.set('views', path.join(__dirname, "/views/layouts"));
app.set("view engine", ".hbs");
hbs.registerPartials(path.join(__dirname + '/views/partials'));
hbs.registerHelper('ifMatched', function (string, options) {
    // options.hash.values are 'AB', 'ON', etc.
    if (string === options.hash.value) {
        //return selected
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

hbs.registerHelper('convertStr', function (string) {
    // options.hash.values are 'AB', 'ON', etc.
    let Str = "";
    if (string === "AB") {
        Str = "Alberta";
    } else if (string === "ON") {
        Str = "Ontario";
    } else if (string === "QC") {
        Str = "Quebec";
    }
    else if(string ==="BC"){
        Str = "British Columbia";
    }
    return Str;
});

hbs.registerHelper('convertDate', function (str) {
    var Str = "";
    // check if it's of type string
    if(typeof str ==='string'||str instanceof String){
        Str = str.substr(str.indexOf(' ')+1,str.indexOf(',')-str.indexOf(' ')-1)+str.substr(str.indexOf(',')+1,4)+' '+str.substr(-2);
    }
    //check if it is of type Date
    else{
        Str = str.toISOString();
        Str = Str.substr(0,10);
    }
    return Str;
});

hbs.registerHelper('doMath', function (num1, operator,num2) {
    var result = 0;
    if(operator == '*'){
        result = num1*num2;
        return result;
    }
    return result;

});

// Set up static files
app.use(express.static('public'));
app.use('/', express.static('public'));
app.use('/user', express.static('public'));
app.use('/admin', express.static('public'));
app.use('/room', express.static('public'));




//set up and using routes
const adminRouter = require("./routes/Admin.js");
app.use("/admin/", adminRouter);
const userRouter = require("./routes/Users.js");
app.use("/user/", userRouter);
const generalRouter = require("./routes/General.js");
app.use("/", generalRouter);

app.set("port", process.env.PORT || 8080);

//set up database
const config = require("./utils/config.js");
const {
    route
} = require("./routes/General.js");

mongoose.connect(config.dbconn, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("Database is connected");
}).catch((err) => {
    console.log(`Something went wrong ${err}`);
})


// setup http server to listen on HTTP_PORT
app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});