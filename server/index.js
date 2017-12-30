// Add this to the VERY top of the first file loaded in your app
// var apm = require('elastic-apm-node').start();
var express = require('express');
var axios = require('axios');
var bodyParser = require('body-parser');
var pg = require('../database-Postgres/index.js');
var inputs = require('./requestFormat.js');

var app = express();
app.use(bodyParser.json());

app.listen(8000, function () { 
  console.log('listening on port 8000!') 
});



//calculate how much to charge each vendors based on the product quantity and price to send to the Ghost Service
function getVendors(products) {
	var vendors = [];
	for (var i = 0; i < products.length; i++) {
		var productObj = products[i];
		var total = productObj.price * productObj.quantity;
		var vendorObj = {
			vendorId: productObj.vendorId,
			vendorName: productObj.vendorName,
			depositAmount: total
		}
		vendors.push(vendorObj);
	}
	return vendors;
}


//*********************REQ FROM CLIENT************************************
app.post('/processTrans', function(req, res) {
	// var obj = inputs.processTransTestInput; //change to req.body later
	console.log('calling processTrans hereee', req.body);
	var obj = req.body;

	/* Uncomment this if not load testing. */
	obj.products = JSON.parse(obj.products);
	obj.shippingAddress = JSON.parse(obj.shippingAddress);
	obj.billingAddress = JSON.parse(obj.billingAddress);

	var userId = obj.userId;
	var products = obj.products;
	var cartTotal = obj.cartTotal;
	var primeTrialSignUp = obj.primeTrialSignUp;
	var paymentId = obj.paymentId;

  /****** send a post request to Inventory with the products and quantity.*********/
  axios.put('http://localhost:5000/inventory/update', products)
  .then(function (response) {
    console.log('inventory updated');
  })
  .catch(function (error) {
  	console.log('inventory error');
  });


  /****** Insert a new transaction to the DB with status, 'pending' *********/
	pg.storeTransaction(obj, function(userTransId, err) {
		//AFTER TRANS IS STORED SUCCESSFULLY
		if (err) {
			res.send('error...');
		}
		console.log('Stored Trans and the products to their tables');
	  var vendors = getVendors(products);
	  var paymentData = {
	  	userId: userId, 
	  	paymentId: paymentId,
	  	cartTotal: cartTotal,
	  	vendors: vendors
	  };
	  /******************* Telling ghost service to complete the transaction **********************/
	  axios.post('http://localhost:5000/ghost/completeTransaction', paymentData)
	  .then(function (response) {
	  	/********************* Things to do when trans successful *******************************/
	  	res.send("Successful Transaction\n");
	  	if (primeTrialSignUp) {
		  	var date = new Date();  //Wed Dec 20 2017 15:08:02 GMT-0800 (PST) in ISO Format
		    axios.put('/prime/signup', {userId: userId, primeStartDate: date, totalSpentAtTrialStart: cartTotal});
		  }
	  	
		  //on success from ghost service, update the status of the transaction in DB to completed
	  	pg.update(userTransId, 'completed', function(status) {
	  		if (status === 'Failed') {
		 		};
	  	});
	  })
	  .catch(function (error) {
	  	// ******************** Things to do when trans Fails ******************************
			res.send("Error in Transaction\n");
			axios.put('http://localhost:5000/inventory/undo', products)
			.catch(function(error) {
				console.log('inventory could not undo request');
			});
			//on error from ghost service, update the status of the transaction in DB to failed
	  	pg.update(userTransId, 'failed', function(status) {
	  		if (status === 'Failed') {
		 		};
	  	});
	  });
	});  //

});




//**********************REQUEST FROM CLIENT TO UNSUBSCRIBE********************
app.post('/unsubscribe', function(req, res) {
	/********* CHANGE INPUTS.UNBSCRIBETESTINPUT TO REQ.BODY LATER *********/
	var userId = inputs.unsubscribeTestInput.userId; // object with a userId key
  var date = new Date();
  //cancel charging card monthly.
  //if a person already had a free trial and canceled, don't give it to them again.
  axios.put('http://localhost:5000/prime/cancel', {userId: userId, primeTrialEndDate: date})
  .then(function(response) {
  	console.log('canceled the trial');
  	//send client a res saying that the unsubscription was successful
  	res.send("Successful unsubscription\n");
  })
  .catch(function(error) {
  	console.log('error in unsubscribe');
  	res.send("Error in unsubscription\n");
  	//send client a res saying that the unsubscription was not successful
  });
});





//********************REQUEST FROM CLIENT TO SUBSCRIBE, 0 PURCHASES************
app.post('/subscribe', function(req, res) {
	/********* CHANGE INPUTS.SUBSCRIBETESTINPUT TO REQ.BODY LATER *********/
	 
	//if a person already had a free trial and canceled, don't give it to them again.
	//send a response that says, free trial not available.
	userId = inputs.subscribeTestInput.userId;
	var date = new Date();
	//Tell users that a prime trial sign up has occured
  axios.put('http://localhost:5000/prime/signup', {userId: userId, primeStartDate: date, totalSpentAtTrialStart: 0})
  .then(function(response) {
  	console.log('signed the user up for trial');
  	//send client a res saying that the subscription was successful
  	res.send('Successful subscription\n');
  })
  .catch(function(error) {
  	console.log('error in subscribe');
  	res.send('Error in subscription\n');
  	//send the client a res saying that the subscription was not successful
  });
});







// if you have more time, you can try to implement the activity log.


/* FOR LATER WITH STRIPE */
//map each userId to customerId? ("id": "cus_BzBgLmtEOltAtv")
// create 10Million customers
// add to each customer a fake payment method in the source property



