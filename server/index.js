var express = require('express');

var app = express();
app.listen(8000, function () { 
  console.log('listening on port 8000!') 
});

app.get('/', function(req, res) {
  console.log('Please');
  res.send('success');
});

// app.post('/processTrans', function() {
//   //cart gets sent
//   //check if the user signed up for free trial or not
//   //generate object to send to the ghost service,

//   //respond to client saying "in proccess"

//   //make a post request to inventory with quantity and products.

//   //make a post request to the ghost service.
//     //wait for response.
//     //if error, make a post request to inventory saying never mind
//     //else if success, send a completed/success response to client

//   //if signed up for free trial, send a post request to Users
// });



// //will recieve a post request from Client service.
// app.post('/unsubscribe', function() {
//   //user is unsubscribing
//   //send a post req to client
// });

// //will recieve a subscribe request from Client service.
// app.post('/subscribe', function() {
//   //user is subscribing.
//   //send a post req to client
// });


// //if you have more time, you can try to implement the activity log.


