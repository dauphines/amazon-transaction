var express = require('express');
var axios = require('axios');
var bodyParser = require('body-parser')

var app = express();
app.use(bodyParser.json());
app.listen(5000, function () { 
  console.log('Running test server: listening on port 5000!') 
});

//testing if sending a put request to users correctly
app.put('/prime/signup', function (req, res) {
	console.log('Client: got a request from transaction, user signed up for prime');
	res.send('success');
});

//testing if sending a put request to inventory correctly
app.put('/inventory/update', function (req, res) {
	console.log('Inventory: got a request from transactions');
	console.log(req.body);
	res.send('success');
});


//testing if sending a post request to ghost service correctly

app.post('/ghost/completeTransaction', function(req, res) {
// { userId: 123,
//   paymentId: 54321,
//   vendors: 
//    [ { vendorId: 1, vendorName: 'Enki', depositAmount: 9999990 },
//      { vendorId: 2, vendorName: 'Someone else', depositAmount: 5 } ],
//   cartTotal: 100 }
	console.log('GhostSErvice: got a request from transactions');
	console.log(req.body);
	res.send('trans done')
})