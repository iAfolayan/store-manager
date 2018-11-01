-- Drop table

-- DROP TABLE users

CREATE TABLE users (
	id serial NOT NULL,
	staffid varchar(25) NOT NULL,
	title varchar(20) NULL,
	password varchar(100) NOT NULL,
	firstname varchar(50) NOT NULL,
	lastname varchar(50) NOT NULL,
	emailaddress varchar(50) NOT NULL,
	phonenumber varchar(20) NOT NULL,
	role int2 NOT NULL,
	gender varchar(20) NULL,
	avatar varchar(50) NOT NULL,
	contactaddress text NOT NULL,
	CONSTRAINT users_pk PRIMARY KEY (id)
);
CREATE INDEX users_emailaddress_idx ON users USING btree (emailaddress);

-- Permissions

ALTER TABLE users OWNER TO postgres;
GRANT ALL ON TABLE users TO postgres;


-- Drop table

-- DROP TABLE products

CREATE TABLE products (
	id serial NOT NULL,
	productname varchar(20) NOT NULL,
	price int4 NOT NULL,
	quantity int4 NOT NULL,
	description text NULL,
	category varchar(20) NOT NULL,
	minimumallowed int4 NOT NULL,
	image bpchar(20) NOT NULL,
	createdon date NOT NULL,
	CONSTRAINT products_pkey PRIMARY KEY (id)
);

-- Permissions

ALTER TABLE products OWNER TO postgres;
GRANT ALL ON TABLE products TO postgres;
GRANT INSERT, SELECT, UPDATE, REFERENCES(productname) ON products TO postgres;
GRANT INSERT, SELECT, UPDATE, REFERENCES(createdon) ON products TO postgres;

-- Drop table

-- DROP TABLE sales

CREATE TABLE sales (
	id serial NOT NULL,
	buyername varchar(50) NOT NULL,
	buyeremail varchar(50) NOT NULL,
	buyeraddress text NOT NULL,
	buyerphone varchar(20) NULL,
	attendantid int4 NOT NULL,
	CONSTRAINT sales_pkey PRIMARY KEY (id),
	CONSTRAINT sales_users_fk FOREIGN KEY (attendantid) REFERENCES users(id)
);

-- Permissions

ALTER TABLE sales OWNER TO postgres;
GRANT ALL ON TABLE sales TO postgres;

-- Drop table

-- DROP TABLE sales_item

CREATE TABLE sales_item (
	id serial NOT NULL,
	salesid int2 NULL,
	productid int2 NOT NULL,
	quantity int4 NOT NULL DEFAULT 1,
	price int4 NOT NULL,
	CONSTRAINT sales_item_pk PRIMARY KEY (id),
	CONSTRAINT sales_item_products_fk FOREIGN KEY (productid) REFERENCES products(id),
	CONSTRAINT sales_item_sales_fk FOREIGN KEY (salesid) REFERENCES sales(id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Permissions

ALTER TABLE sales_item OWNER TO postgres;
GRANT ALL ON TABLE sales_item TO postgres;
GRANT INSERT, SELECT, UPDATE, REFERENCES(salesid) ON sales_item TO postgres;

INSERT INTO users (id,staffid,title,password,firstname,lastname,emailAddress,phoneNumber,role,gender,avatar,contactAddress) VALUES 
(1,'SM001','Miss','$2b$10$B4RDZ2IhVzc/xhPijuP7QunAF8jtVmaK/m5RQrOQnprhWZo5A4n4K','Afolayan','Isaiah','iafolayanibikunle@gmail.com','08032167911',1,'Male','admin.png','41, Osholake street, Ebute-meta, Lagos')
,(2,'SM005','Mrs.','qwerty','admin','Admin','iafolayan@gmail.com','08032167911',1,'Female','me.jpg','43 Olowosoki')
,(3,'SM0035','Mrs.','m<hJ{NcTSU','admin','Admin','iafolayanii@gmail.com','08032167911',1,'Female','me.jpg','43 Olowosoki')
,(4,'SM035','Mrs.','xcf[JKMBGC','admin','Admin','iafolayii@gmail.com','08032167911',1,'Female','me.jpg','43 Olowosoki')
;

INSERT INTO products (id,productName,price,quantity,description,category,minimumAllowed,image,createdOn) VALUES 
(1,'Wireless bluetooth',3000,780,'Wireless cord bluetooth','Mobile',25,' image.jpg','2018-10-25 00:00:00.000')
,(2,'Wireless bluetooth',30,780,'Wireless cord bluetooth','Mobile',25,' image.jpg','2018-10-25 11:20:26.314')
,(3,'new products',50,780,'Wirdfdfdeless bluetooth','Mooobile',255,' image.jpg','2018-10-25 11:23:16.525')
;

INSERT INTO sales (id,saleAttendant,staffId,productId,productName,category,quantity,price,totalAmount,description,minimumAllowed,createdOn) VALUES 
(1,'Afolayan Isaiah','SM005',2,'wireless','Mobile',20,50,1000,'wireless phone book',10,'2018-10-25 11:23:16.525'),
(1,'Afolayan Isaiah','SM005',2,'wireless','Mobile',20,50,1000,'wireless phone book',10,'2018-10-25 11:23:16.525'),
(1,'Afolayan Isaiah','SM035',1,'wireless','Mobile',20,50,1000,'wireless phone book',10,'2018-10-25 11:23:16.525'),
(1,'Afolayan Isaiah','SM045',2,'wireless','Mobile',20,50,1000,'wireless phone book',10,'2018-10-25 11:23:16.525'),
(1,'Afolayan Isaiah','SM005',1,'wireless','Mobile',20,50,1000,'wireless phone book',10,'2018-10-25 11:23:16.525'),
(1,'Afolayan Isaiah','SM005',2,'wireless','Mobile',20,50,1000,'wireless phone book',10,'2018-10-25 11:23:16.525');

INSERT INTO sales_item (id,salesid,productid,quantity,price) VALUES 
(1,1,3,20,300)
,(2,1,1,120,400)
,(3,1,11,20,300)
,(4,2,3,20,300)
,(5,2,1,120,400)
,(6,2,11,20,300)
,(7,3,3,20,300)
,(8,3,1,120,400)
,(9,3,11,20,300)
,(10,4,3,20,300)
;
INSERT INTO sales_item (id,salesid,productid,quantity,price) VALUES 
(11,4,1,120,400)
,(12,4,11,20,300)
,(13,5,3,20,300)
,(14,5,1,120,400)
;