const express = require('express');
const fs = require('fs')
const app = express();
const port = process.env.PORT || 8000;

// ### Challenge 1:
// Create a POST route for "/create/:name/:age" that creates an object that looks like this:
// {
//   "name": "troy",
//   "age": 20
// }
// Then take that object and insert it into storage.json

app.post('/create/:name/:age/:id', (req, res)=> {
let user = {
  name: req.params.name,
    age: req.params.age,
    id:req.params.id
  }
  //  let newUser = JSON.stringify(user)
  // fs.appendFileSync('./storage.json', newUser)

  let newUser=fs.readFileSync('./storage.json','utf8')
  let currArr=JSON.parse(newUser)
  currArr.push(user)
  fs.writeFileSync('./storage.json', JSON.stringify(currArr))
  res.send("successfully added data")

});

// ### Challenge 2:
// Create a Get route for "/" that returns all of the objects inside storage.json.

app.get('/',(req,res)=>{
  let data = fs.readFileSync('./storage.json', 'utf8')
  res.json(data)
})

// ### Challenge 3:
// Create a Get route for "/:name" that returns the first object in storage.json that matches the name.
// If there is no object in storage.json that matches then return a 400 status.

app.get('/:name', (req,res)=>{
let userData=fs.readFileSync('./storage.json', 'utf8')
let currData=JSON.parse(userData)
for(let i=0;i<currData.length;i++){
if(currData[i].name==req.params.name){
  res.json(currData[i]);
  return;
}
}
res.sendStatus(400)
})

// ### Challenge 4 (stretch):
// Modify your logic so every object has and id field that automatically goes up by one
// for every object inserted (first object has an id of 1, second object has an id of 2 ect).
//  Then modify challenge 3 so that it finds the object by an id instead of by name.

app.get('/:id', (req,res)=>{
let userId=fs.readFileSync('./storage.json', 'utf8')
let currId=JSON.parse(userId)
for(let i=0;i<currId.length;i++){
if(currId[i].id==req.params.id){
  res.json(currId[i]);
  return;
}
}
res.sendStatus(400)
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
