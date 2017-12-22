'use strict';

const nodemailer = require('nodemailer');

var Mail = function() {
    
        let sendMail = function(form, res, pageData) {

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                        user: "<gmail address>",
                        pass: "<gmail password>"
                   }
            });

            var body = `Name: ${form.fullname} <br/> 
                        Email: ${form.email} <br/>
                        Message: ${form.message} `; 
            
            let mailOptions = {
                from: form.email, 
                to: "hello@dddwales.com", 
                subject: 'Contact form submission', 
                html:  body
            };
        
            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    dddwales['contactForm'] = {
                        message: "There was a problem sending the form. Please try again.",
                        messageCls: "bg-danger"   
                    };
                    res.redirect('/contact');
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);

                dddwales['contactForm'] = {
                    message: "Message sent successfully, thank you. We will be in contact shortly.",
                    messageCls: "bg-success"   
                };

                res.redirect('/contact');
            });

        };
    
        return {
            sendMail: sendMail
        };
    } () ;
    
module.exports = Mail;