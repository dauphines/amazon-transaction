CREATE TABLE paymentMethods (
    id integer primary key,
    userId integer         
);

CREATE TABLE UserTrans (
    id serial primary key,
    date timestamp with time zone,
    userId integer,
    paymentMethodId integer references paymentMethods(id),    
    status varchar(10),
    fullName text,
    addressLine1 text,
    addressLine2 text, 
    city text,
    state text,
    zip VARCHAR(16),
    country text,
    phone text,
    grandTotal money
);

CREATE TABLE PurchasedProducts ( 
	id serial primary key,
    userTransId integer references UserTrans(id),
    vendorId integer,
    vendorName text,
    productId integer,
    productName text,
    productImgUrl text,
    isPrimeProduct boolean,
    productQuantity integer,
    pricePerItem money
);




