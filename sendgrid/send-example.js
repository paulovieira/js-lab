var Sendgrid = require("sendgrid-promise")

var email = new Sendgrid.Email();

// a) from
email["from"] = "pnvieira@fc.ul.pt";
email["fromname"] = "Paulo Vieira Abc"


// b) to (one or more)
email["to"] = [];
email["toname"] = [];

email["to"].push("paulovieira@gmail.com");
email["toname"].push("paulo one")

email["to"].push("paulovieira.ml@gmail.com");
email["toname"].push(" ")


// c) cc (one or more)
email["cc"] = [];
email["ccname"] = [];
// NOTE: the "ccname" field is not documented in the github page but is in the web api:
// https://sendgrid.com/docs/API_Reference/Web_API/mail.html
// to make it work we had to monkey patch the toWebFormat method

email["cc"].push("manuelcarlossilva2014@gmail.com");
email["ccname"].push("manuel silva")

email["cc"].push("joaopocasvieira2014@gmail.com");
email["ccname"].push("joao pocas vieira")


// d) bcc (one or more)
email["bcc"] = [];
email["bccname"] = [];
// NOTE: the "bccname" field is not documented in the github page, but is in the web api 

email["bcc"].push("joaquimanselmo2014@gmail.com");
email["bccname"].push("anselmo")


// e) reply-to
email["replyto"] = "anaipocas@gmail.com";


// f) subject
email["subject"] = "Hello World with a setter, without delay " + Date.now();


// g) message body
email["text"] = `
Hello,

This is a test message from SendGrid.  We have sent this to you because you requested a test message be sent from your account.

This is a link to google.com: http://www.google.com
This is a link to apple.com: http://www.apple.com
This is a link to sendgrid.com: http://www.sendgrid.com

Thank you for reading this test message.

Love,
Your friends at SendGrid
`;


Sendgrid.sendAsync(email)
    .then(function(response){
        console.log(response);
    })
    .catch(function(err){
        throw err;
    });

