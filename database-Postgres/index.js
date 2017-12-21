var knex = require('knex')({
  client: 'pg',
  connection: {
    host     : '127.0.0.1',
    database : 'transactionsdb',
    charset  : 'utf8'
  }
});

var bookshelf = require('bookshelf')(knex);

var UserTrans = bookshelf.Model.extend({
	tableName: 'UserTrans'
});

var purchasedproducts = bookshelf.Model.extend({
  tableName: 'purchasedproducts'
});

var paymentMethods = bookshelf.Model.extend({
	tableName: 'paymentMethods'
});

// purchasedproducts.query().where('id', 1).then(function(user) {
//   console.log('heeyyyy: ', user);
// }).catch(function(err) {
//   console.error(err);
// });


module.exports.storeTransaction = function storeTransaction(obj) {
	//paymentId
	//userId
	//cartTotal
	console.log('trying to store to Database now, yaayyy');
// 	new paymentMethods({
// 		id: paymentId,
// 		// lastFourDigits:,
// 		// type:,
// 		userId: userId
// 	}).save().then(function(newRow) {

// 	}).catch(function(err) {
// 		// Handle errors
// 	});;

// 	new UserTrans({
// 	  date: new Date(),
// 	  userId: userId,
// 	  paymentMethodId: paymentId,    
// 	  status:,
// 	  fullName: 'Enki',
// 	  addressLine1: 'address1',
// 	  addressLine2: 'address2', 
// 	  city: 'Sacramento',
// 	  state: 'CA',
// 	  zip: '12345',
// 	  country: 'USA',
// 	  phone: '916-490-7856',
// 	  grandTotal: cartTotal
// 	}).save().then(function(newRow) {

// 	}).catch(function(err) {
// 		// Handle errors
// 	});;

// 	new purchasedproducts({
// 	  userTransId: ,
// 	  vendorId: 123456789,
// 	  vendorName: 'Someone',
// 	  productName: 'someproduct',
// 	  productImgUrl: 'someurl',
// 	  isPrimeProduct: true,
// 	  productQuantity: '',
// 	  pricePerItem: ''
// 	}).save().then(function(newRow) {
// 		console.log(newRow.id); // Returns ID of new row
// 		// Code executed after row successfully created
// 	}).catch(function(err) {
// 		// Handle errors
// });

}
