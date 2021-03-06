const cron = require("node-cron");
const express = require("express");
const nodeMailer = require('nodemailer');
const crypto = require('crypto');
const path = require('path');
const EventEmitter = require('events');
const myEmitter = new EventEmitter();

const PORT = process.env.PORT || 8000;

var queue = []
var counter = 0;

app = express();

// schedule tasks to be run on the server to create entries after every minutes
cron.schedule("15 * * * *", function () {

    console.log("Running Cron Job creating");
    ++counter;

        // creates an object with token with random digits & alphabets
    // startTime from Now,
    // endTime from random() 
    var obj = {};
    var token = crypto.randomBytes(64).toString('hex');
    var startTime =  new Date().getTime();
    var endTime = 1 + Math.floor(Math.random() * Math.floor(76));

    obj.title = "Entry No " + counter;
    obj.token = token;
    obj.startTime = startTime;
    obj.endTime = endTime;
    queue.push(obj);    
    console.log(obj);

    //scheduler to run after every 6 hours that creates a webhook get/post request
    cron.schedule("* 6 * * *", function() {
            console.log("Running nested Cron Job creating routes");

            app.get('/', function (req, res) {
            
                var endTime = new Date().getTime();
                var duration = (endTime - (obj.startTime)) / (1000 * 60 * 60);
                console.log("duration [hrs] = " + duration);

                // checks if duration of the startTime and endTime are greater than 23 or 23.5 hrs
                if(duration >= 23 || duration >=23.5)
                {
                    myEmitter.on('emailNotification', function(data) {

                        // emails will be sent 
                        let transporter = nodeMailer.createTransport({
                            service: "gmail",
                            auth: {
                              user: "faisalbasha.andd@gmail.com",
                              pass: "fbcrs28$$"
                            }
                          });
            
                        const mailOptions = {
                            from: '"Faisal Basha" <faisalbasha.andd@gmail.com>', // sender address
                            to: 'faisalbasha1982@gmail.com', // list of receivers
                            subject: 'Hello there!', // Subject line
                            text: 'A Message from Node Cron App', // plain text body
                            html: '<b>A Message from Node Cron App</b>' // html body
                        };
            
                        transporter.sendMail(mailOptions, function (error, info) {
                            console.log(info);
                            if (error) {
                                console.log(error);
                            }
                        });
                });
               }
            });
            
            app.post('/entries', function (req, res) {
                console.log(req.body);    
                myEmitter.emit('emailNotification', obj)    
                res.end();
            });
        
        });
        
});

app.listen(PORT,() => { `Listening to ${PORT}` });
