// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const moment = require('moment');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api/timestamp/", (req, res) => {
  res.json({ unix: Date.now(), utc: Date() });
});



  app.get('/api/timestamp/:date?', (req,res) => {
    let data = req.params;
    const dateFromQuery = data.date;
    let ans = Number(dateFromQuery);
 


       if(!dateFromQuery.includes('-')){
        let unixtoDate = moment(ans).format('YYYY-MM-DD').toString()
      

        res.json({
          unix:  Number(dateFromQuery),
          utc:   new Date(Date.UTC(Number(unixtoDate.split('-')[0]) - 1,Number(unixtoDate.split('-')[1]) - 1, Number(unixtoDate.split('-')[2]) - 1, 0, 0, 0)).toUTCString()
        });
      }else{
        const objII ={
          unix: Date.parse(data.date).toString(),
          utc:  new Date(Date.UTC(Number(dateFromQuery.split('-')[0]),Number(dateFromQuery.split('-')[1]) - 1, Number(dateFromQuery.split('-')[2]) - 1, 0, 0, 0)).toUTCString()
        }
        if(objII.unix === "NaN"){
          res.json({
            "error":"Invalid Date"
          })
        }
        else res.json(objII);
      }
    });





// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
