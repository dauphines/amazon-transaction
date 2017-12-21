var express = require('express');
var axios = require('axios');
var bodyParser = require('body-parser');
var pg = require('../database-Postgres/index.js');
var processTransTestInput = require('./requestFormat.js');

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

//REQ FROM CLIENT
app.post('/processTrans', function(req, res) {
	var obj = processTransTestInput; //change to req.body later
	var userId = obj.userId;
	var products = obj.products;
	var cartTotal = obj.cartTotal;
	var primeTrialSignUp = obj.primeTrialSignUp;
	var paymentId = obj.paymentId;

  //send a post request to Inventory with the products and quantity.
  axios.put('http://localhost:5000/inventory/update', products)
  .then(function (response) {
    console.log('inventory updated');
  })
  .catch(function (error) {
  	console.log('inventory error');
  });
  res.send('Proccessing Transaction');


  var vendors = getVendors(products);
  var paymentData = {
  	userId: userId, 
  	paymentId: paymentId,
  	cartTotal: cartTotal,
  	vendors: vendors
  };
  axios.post('http://localhost:5000/ghost/completeTransaction', paymentData)
  .then(function (response) {
  	if (primeTrialSignUp) {
	  	var date = new Date();  //Wed Dec 20 2017 15:08:02 GMT-0800 (PST) in ISO Format
	    axios.put('/prime/signup', {userId: userId, primeStartDate: date, primeTrialSignUp: true, totalSpentAtTrialStart: cartTotal});
	  }
	  //on success from ghost service, store the transaction to the database
	  pg.storeTransaction(obj);
  	//send a post request to client saying, transaction was completed
	  axios.post('http://localhost:5000/client/transStatus', "Transaction completed");
  })
  .catch(function (error) {
		//if fails, send a post request to client saying, transaction failed
		 axios.post('http://localhost:5000/client/transStatus', "Transaction failed");
		//an undo request to Inventory
		axios.put('http://localhost:5000/inventory/undo', products);
  });
});

//REQUEST FROM CLIENT TO UNSUBSCRIBE
app.post('/unsubscribe', function(req, res) {
  var date = new Date();
  axios.put('/prime/cancel', {userId: userId, primeTrialEndDate: date});
});

//REQUEST FROM CLIENT TO SUBSCRIBE, 0 PURCHASES
app.post('/subscribe', function(req, res) {
	/*** ask Tim what the subscribe request will contain *******/
	var test = {
		userId: 123,
		primeStartDate: new Date(),
		primeTrialSignUp: true,
		totalSpentAtTrialStart: 0
	}
  axios.put('/prime/signup', {userId: userId, primeStartDate: date, primeTrialSignUp: true, totalSpentAtTrialStart: cartTotal});
});

// if you have more time, you can try to implement the activity log.


/* FOR LATER WITH STRIPE */
//map each userId to customerId? ("id": "cus_BzBgLmtEOltAtv")
// create 10Million customers
// add to each customer a fake payment method in the source property



