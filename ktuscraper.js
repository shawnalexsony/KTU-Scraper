
var request = require("request");
var cheerio = require("cheerio");
var resu="";

var nodemailer = require('nodemailer');

var smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'email id for alert',//gmail account for sending alert mails
        pass: 'password'
    }
  };
  
function sendmail(message){

    var transporter = nodemailer.createTransport(smtpConfig);
    var mailOptions = {
      from: 'email id for alert',
      to: 'recipient email id',
      subject: 'KTU-scraper  Alert',
      text: message + '\n Please visit KTU website for further details'
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email successfully sent!!');
      }
    });
    

}


const express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  console.log('notification request received');
  var noti="";
request({
    uri: "https://ktu.edu.in/home.htm",
    }, function(error, response, body) {
    var $ = cheerio.load(body);
    $(".annuncement li a").each(function() {
        var link = $(this);
        var text = link.text() ;
        noti=noti+"<li>"+text+"</li>\n <br>";
        var str=text.toLowerCase();
        if(str.includes("btech")||str.includes("b.tech")||str.includes("b tech"))
        {
          if(str.includes("result"))
          {
            flag=1;
            console.log("check results");
            resu=resu+"Check Results <br>\n";
          }
          if(str.includes("timetable")||str.includes("time table"))
          {
            flag=1;
            console.log("check timetable");
            resu=resu+"Check Timetable <br>\n";
          }
          if(str.includes("registration"))
          {
            flag=1;
            console.log("check for any registration");
            resu=resu+"Check for any registration <br>\n";
          }
          
        }
        if(str.includes("exam")&&str.includes("postponed"))
        {
          flag=1;
          console.log("exam postponed or rescheduled");
          resu=resu+"Some Exams Postponed or Rescheduled <br>\n";
        }

    });  
    noti=noti.replace("<br><li>View All >></li>"," ");
    noti=noti.replace("<br><li></li>"," ");
    noti=noti+"<br><a href='https://ktu.edu.in/eu/core/announcements.htm'>Visit KTU website for more details</a>"
    if(resu=="")
    res.send("<h2>No important Alerts</h2> <br>Notifications from site are:<br><br><ul>"+noti);
    else
    res.send("<h2>"+resu+"</h2><br>Notifications from site are:<br><br><ul>"+noti);
    
}); resu="";
    
});

  
app.get('/emergency', (req, res) => {
    console.log('emergency request received'); var str;
  request({
      uri: "https://ktu.edu.in/home.htm",
      }, function(error, response, body) {
      var $ = cheerio.load(body);
      $(".annuncement li a").each(function() {
          var link = $(this);
          var text = link.text() ;
          str+=text.toLowerCase();
        
      });  
      if(str.includes("exam")&&str.includes("postpone"))
      {
        console.log("exam postponed or rescheduled");
        res.send("Some Exams Postponed or Rescheduled \n");
      }
      else
      {
        res.send('<!DOCTYPE html><html><head><title>Emergency Alert</title><meta http-equiv="refresh" content="20;url=http://ktualert.now.sh/emergency" /></head><body>No important notifications...Checking again...Please wait....</body></html>');
      }

  });
      
  });
  






 var schedule = require('node-schedule');
 var rule = new schedule.RecurrenceRule();
 //rule.second = new schedule.Range(0, 59, 15); 
 rule.hour=1; //time for alerts
 rule.minute = 0;
 rule.second=0; 
 

app.listen(8080, () => {
  var now = new Date();
  var jsonDate = now.toJSON();
  console.log('Server is up on port 8080 \n');
  console.log('Start time : '+jsonDate); //server time

  schedule.scheduleJob(rule, function(){
    console.log("Daily checking starts \n");
    resu="";
    var noti="";
    request({
        uri: "https://ktu.edu.in/home.htm",
        }, function(error, response, body) {
        var $ = cheerio.load(body);
        $(".annuncement li a").each(function() {
            var link = $(this);
            var text = link.text() ;
            noti=noti+"=> "+text+"\n";
            var str=text.toLowerCase();
            if(str.includes("btech")||str.includes("b.tech")||str.includes("b tech"))
            {
              if(str.includes("result"))
              {
                flag=1;
                console.log("check results");
                resu=resu+"Check Results \n";
              }
              if(str.includes("timetable")||str.includes("time table"))
              {
                flag=1;
                console.log("check timetable");
                resu=resu+"Check Timetable \n";
              }
              if(str.includes("registration"))
              {
                flag=1;
                console.log("check for any registration");
                resu=resu+"Check for any registration \n";
              }
              
            }
            if(str.includes("examination")&&str.includes("postponed"))
            {
              flag=1;
              console.log("exam postponed or rescheduled");
              resu=resu+"Some Exams Postponed or Rescheduled \n";
            }

        });  
        if(resu!="")
        {noti="Notifications are\n"+noti;
         noti=noti.replace("=> View All >>\n=>","\n ");
         sendmail(resu+"\n"+noti); 
         resu="";}

    });   
    
    resu="";
}); resu="";

});
