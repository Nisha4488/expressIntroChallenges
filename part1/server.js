
var express = require('express');
var app = express();
var path = require('path');
var port = process.env.PORT || 8000;

// ### Challenge 1:
// Create a GET route for "/hello" that returns the response "Hello!".

app.get('/hello', function(req, res) {
  res.send("Hello");
});

// ### Challenge 2:
// Create a POST route for "/create/:name" that returns a json object that looks like this:
// {
//   "id":1,
//   "name":"the name they pass in the route"
// }


app.post('/create/:name', (req, res)=> {
  let user = {
    id: 2,
    name: req.params.name
  }
  res.json(user)
});


// ### Challenge 3:
// Create a GET route for "/" that returns the index.html file.
app.get('/', function(req,res){
res.sendFile(path.join(__dirname + '/index.html'));
})

//challenge 4
// Create a GET route for "/verify/:age" that checks if the age is greater than 13.
// If it is then it sends a 200 status response (for all good). If it is not greater than 13 then send a 403 status code.
// For more information on what status codes mean refer to this - https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
app.get('/verify/:age', function(req,res){

  let personAge =  req.params.age;


// res.json(personAge)
  if(personAge>13){
    res.sendStatus(200)
  }
  res.sendStatus(403)
})



app.get('/yourroute', function(req, res) {
  res.send("stuff");
});

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
