var knex = require('knex')({
  client: 'pg',
  connection: {
    host     : '127.0.0.1',
    database : 'transaction',
    charset  : 'utf8'
  }
});

var bookshelf = require('bookshelf')(knex);

var usertrans = bookshelf.Model.extend({
	tableName: 'usertrans'
});

var purchasedproducts = bookshelf.Model.extend({
  tableName: 'purchasedproducts'
});

var paymentMethods = bookshelf.Model.extend({
	tableName: 'paymentmethods'
});

/* Updates the row corresponding to the userTransId to status (Completed or Failed) */
module.exports.update = function(userTransId, status) {
    console.log('userTransId: ', userTransId);
    //get the transaction with this id from UserTrans and edit the status to be Completed/Failed based on status
}

module.exports.storeTransaction = function(obj, callback) {
	console.log('trying to store to Database now, yaayyy');


	new usertrans({
	  date: new Date(),
	  userid: obj.userId,
	  paymentmethodid: obj.paymentId,    
	  status: 'pending',
	  fullname: obj.fullName,
	  addressline1: obj.shippingAddress.addressLine1,
	  addressline2: obj.shippingAddress.addressLine2, 
	  city: obj.shippingAddress.city,
	  state: obj.shippingAddress.state,
	  zip: obj.shippingAddress.zip,
	  country: obj.shippingAddress.country,
	  phone: obj.phone,
	  grandtotal: obj.cartTotal
	}).save().then(function(newRow) {

    console.log('here is the userTransId?: ', newRow.id);

    /**************** AFTER USER TRANS IS STORED *****************/
    var productsToInsert = [];
    for (var i = 0; i < obj.products.length; i++) {
        var product = obj.products[i];

        var productObj = {
        usertransid: newRow.id,
        vendorid: product.vendorId,
        vendorname: product.vendorName,
        productid: product.productId,
        productname: product.productName,
        productimgurl: 'MIGHT HAVE TO DELETE',
        isprimeproduct: product.isPrimeProduct,
        productquantity: product.quantity,
        priceperitem: product.price
      };
      productsToInsert.push(productObj);
    }

    // batch insert it into PurchasedProducts table. 
    knex.batchInsert('purchasedproducts', productsToInsert)
    .then(function(ids) {
        console.log('batch load successful');
        callback(newRow.id);
    })
    .catch(function(error) {
        console.log('batch load fail');
        console.log(error);
    });

  }).catch(function(err) {
    // Handle errors
    console.log('error in saving to DATABASE');
    console.log(err);
  });
}


 // newRow = ModelBase {
  // attributes: 
  //  { date: 2017-12-22T07:28:03.374Z,
  //    userid: 1,
  //    paymentmethodid: 1,
  //    status: 'pending',
  //    fullname: 'Enki',
  //    addressline1: 'address1',
  //    addressline2: 'address2',
  //    city: 'somecity',
  //    state: 'CA',
  //    zip: '12345',
  //    country: 'USA',
  //    phone: '978-786-4567',
  //    grandtotal: 105,
  //    id: 2000001 },
  // _previousAttributes: 
  //  { date: 2017-12-22T07:28:03.374Z,
  //    userid: 1,
  //    paymentmethodid: 1,
  //    status: 'pending',
  //    fullname: 'Enki',
  //    addressline1: 'address1',
  //    addressline2: 'address2',
  //    city: 'somecity',
  //    state: 'CA',
  //    zip: '12345',
  //    country: 'USA',
  //    phone: '978-786-4567',
  //    grandtotal: 105,
  //    id: 2000001 },
  // changed: {},
  // relations: {},
  // cid: 'c1',
  // _knex: null,
  // id: 2000001 }




  // purchasedproducts.query().where('id', 1).then(function(user) {
//   console.log('heeyyyy: ', user);
// }).catch(function(err) {
//   console.error(err);
// });
