// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({
    optionSuccessStatus: 200
})); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('./public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", (req, res) => {
    res.json({
        greeting: 'hello API'
    });
});


//main part "/api/whoami"
app.get("/api/whoami", (req, res) => {
    var ip_add = req.headers['x-forwarded-for']
    var language_b = req.headers["accept-language"]
    var sys_info = req.headers["user-agent"]

    var result = {
        "ipaddress": ip_add,
        "language": language_b,
        "software": sys_info
    }

    res.json(result)
})

var Port = process.env.PORT || 3000
// listen for requests :)
var listener = app.listen(Port, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});