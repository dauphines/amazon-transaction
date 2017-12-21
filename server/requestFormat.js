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

module.exports = {
	userId: 123,
	fullName: 'Name',
  phone: '978-786-4567',
	products: testProductsArr,
	paymentId: 54321,
	cartTotal: 105,
	primeTrialSignUp: true,
	shippingAddress: {
    addressLine1: 'address1',
    addressLine2: 'address2',
    city: 'somecity',
    state: 'CA',
    zip: 12345,
    country: 'USA'
  },
  billingAddress: {
    addressLine1: 'address1',
    addressLine2: 'address2',
    city: 'somecity',
    state: 'CA',
    zip: 12345,
    country: 'USA'
  }
}