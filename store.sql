CREATE TABLE users (
    id serial PRIMARY KEY,
    staffid VARCHAR(50),
    title VARCHAR(10),
    password VARCHAR(50),
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    emailAddress VARCHAR(50),
    phonenumber VARCHAR(20),
    role SMALLINT,
    gender VARCHAR(10),
    avatar VARCHAR(50),
    contactAddress TEXT
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  productName VARCHAR(50),
  price INT(11),
  quantity INT(11),
  description TEXT,
  category VARCHAR(50),
  minimumAllowed INT(11),
  image VARCHAR(50),
  createdOn DATE
);

CREATE TABLE sales (
	id serial NOT NULL,
	buyername varchar(50) NOT NULL,
	buyeremail varchar(50) NOT NULL,
	buyeraddress text NOT NULL,
	buyerphone varchar(20) NULL,
	attendantid int NOT NULL,
	CONSTRAINT sales_pkey PRIMARY KEY (id),
	CONSTRAINT sales_users_fk FOREIGN KEY (attendantid) REFERENCES users(id)
);


CREATE TABLE sales_item (
	id serial NOT NULL,
	salesid int NULL,
	productid int NOT NULL,
	quantity int NOT NULL DEFAULT 1,
	price int NOT NULL,
	CONSTRAINT sales_item_pk PRIMARY KEY (id),
	CONSTRAINT sales_item_products_fk FOREIGN KEY (productid) REFERENCES products(id),
	CONSTRAINT sales_item_sales_fk FOREIGN KEY (salesid) REFERENCES sales(id) ON UPDATE CASCADE ON DELETE CASCADE
);