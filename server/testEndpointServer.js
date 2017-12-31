var express = require('express');
var axios = require('axios');
var bodyParser = require('body-parser')

var app = express();
app.use(bodyParser.json());
app.listen(5000, function () { 
  console.log('Running test server: listening on port 5000!') 
});

/**** TESTING POSTS TO USERS *****/
	//testing if sending a put request to users correctly
	app.put('/prime/signup', function (req, res) {
		console.log('Client: got a request from transaction, user signed up for prime');
		res.end();
	});

	//testing if sending a unsubscribe request to users correctly
	app.put('/prime/cancel', function(req, res) {
		console.log('Client: got a request from transaction, user canceled prime trial');
		res.end();
	});
		

/**** TESTING POSTS TO INVENTORY *****/
	//testing if sending a put request to inventory correctly
	app.put('/inventory/update', function (req, res) {
		console.log('Inventory: got a request from transactions');
		console.log(req.body);
		res.send('success');
	});


/**** TESTING POSTS TO THE GHOST SERVICE *****/
	//testing if sending a post request to ghost service correctly
	app.post('/ghost/completeTransaction', function(req, res) {
	// { userId: 123,
	//   paymentId: 54321,
	//   vendors: 
	//    [ { vendorId: 1, vendorName: 'Enki', depositAmount: 9999990 },
	//      { vendorId: 2, vendorName: 'Someone else', depositAmount: 5 } ],
	//   cartTotal: 100 }
		console.log('GhostService: got a request from transactions');
		console.log(req.body);

		//try to generate users from 1-2000000 and make each of them
		// have two paymentIds.

		//have vendors, make each vendor have a account to deposit money into.

		res.send('trans done')
	})

/**** TESTING POSTS TO CLIENT? *****/
//Client stores the  ->
//maps userId to the paymentIds here.
