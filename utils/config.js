require('dotenv').config();
module.exports = {
    dbconn:`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@senecaweb322.rved9.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`
    //dbconn: "mongodb://localhost:27017"
}

// OTHER accounts
//sendEmail: web322.trangnguyen@gmail.com - pass:krazytracy
// user: web322.seneca.user@gmail.com - pass: abcABC123456
// admin: admin1@gmail.com - pass:abcABC123456
// admin: admin2@gmail.com - pass:abcABC123456


