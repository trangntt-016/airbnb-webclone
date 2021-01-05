const nodemailer = require("nodemailer");

// email setup
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'web322.trangnguyen@gmail.com',
        pass: '*abcABC123456'
    }
})

const sendEmail_signUp = user => {
    var emailInfo = {
        from: 'web322.trangnguyen@gmail.com',
        to: user.email,
        subject: 'Web322-AirBnB Registration Successfully',
        text: `Dear ${user.lname},You have registered successfully at AirBnB.Thank you for choosing us!Best regards,WEB322 - AirBnB Registration Admin`,
        html: `
            <p>Dear ${user.lname},</p>
            <p>
            &nbsp;&nbsp;&nbsp;&nbsp;You have registered successfully at AirBnB.<br>
            
            &nbsp;&nbsp;&nbsp;&nbsp;Thank you for choosing us!<br>
            </p>
            <p>    
              Best regards,<br>
              WEB322 - AirBnB Registration Admin
            </p>
        `
    }
    transporter.sendMail(emailInfo, (err, data) => {
        if (err) {
            console.log("Error: " + err);
        } else {
            console.log("SUCCESS: " + data.response);
        }
    })
}

const sendEmail_booking = (booking, user) => {
    var emailInfo = {
        from: 'web322.trangnguyen@gmail.com',
        to: user.email,
        subject: `Web322-AirBnB Booking Confirmation ID: ${booking.roomID}`,
        html: `
            <p>Dear ${user.lname},</p>
            <p>
            &nbsp;&nbsp;&nbsp;&nbsp;We are pleased to inform you that your reservation request has been received and confirmed.<br>
            &nbsp;&nbsp;&nbsp;&nbsp;Summary about your journey<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Check-in:${booking.checkIn}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Check-out:${booking.checkOut}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of Guests: ${booking.noOfGuests}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;Thank you for choosing us and wish you have a wonderful journey!<br>
            </p>
            <p>    
              Best regards,<br>
              WEB322 - AirBnB Registration Admin<br>
            </p>
        `
    }
    transporter.sendMail(emailInfo, (err, data) => {
        if (err) {
            console.log("Error: " + err);
        } else {
            console.log("SUCCESS: " + data.response);
        }
    })
}

module.exports = {
    sendEmail_signUp,
    sendEmail_booking
};