testProductsArr = [
	{	
		productId: 12345,
		productName: "Enkis fabulous product",
		price: 10,
		vendorId: 1,
		vendorName: 'Enki',
		quantity: 10,
		isPrimeProduct: true
	},
	{	
		productId: 12346,
		productName: "some product",
		price: 5,
		vendorId: 2,
		vendorName: 'Someone else',
		quantity: 1,
		isPrimeProduct: false
	}
]

// Object that will be sent to transactions upon purchase:
module.exports.processTransTestInput = {
	userId: 1,
	fullName: 'Enki',
  phone: '978-786-4567',
	products: testProductsArr,
	paymentId: 1,
	cartTotal: 105,
	primeTrialSignUp: true,
	shippingAddress: {
    addressLine1: 'address1',
    addressLine2: 'address2',
    city: 'somecity',
    state: 'CA',
    zip: '12345',
    country: 'USA'
  },
  billingAddress: {
    addressLine1: 'address1',
    addressLine2: 'address2',
    city: 'somecity',
    state: 'CA',
    zip: '12345',
    country: 'USA'
  }
}

// Object that will be sent to transactions upon subscription:
module.exports.subscribeTestInput = {
  userId: 123, // this is a string of a userId
};

// Object that will be sent to transactions upon unsubscribe:
module.exports.unsubscribeTestInput = {
  userId: 123, // this is a string of a userId
};
