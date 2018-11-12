DROP DATABASE IF EXISTS storetestdb;
CREATE DATABASE storetestdb;

\connect storetestdb;


-- Drop table

-- DROP TABLE users

CREATE TABLE users (
	id varchar(50) NOT NULL,
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
	CONSTRAINT users_pk PRIMARY KEY (id),
	CONSTRAINT users_un UNIQUE (staffid, emailaddress, phonenumber)
);

-- Permissions

ALTER TABLE users OWNER TO postgres;
GRANT ALL ON TABLE users TO postgres;


-- Drop table

-- DROP TABLE products

CREATE TABLE products (
	id varchar(50) NOT NULL,
	productname varchar(20) NOT NULL,
	price int4 NOT NULL,
	quantity int4 NOT NULL,
	description text NULL,
	category varchar(20) NOT NULL,
	minimumallowed int4 NOT NULL,
	image bpchar(20) NOT NULL,
	createdon date NOT NULL,
	CONSTRAINT products_pk PRIMARY KEY (id)
);

-- Permissions

ALTER TABLE products OWNER TO postgres;
GRANT ALL ON TABLE products TO postgres;
GRANT INSERT, SELECT, UPDATE, REFERENCES(productname) ON products TO postgres;
GRANT INSERT, SELECT, UPDATE, REFERENCES(createdon) ON products TO postgres;

-- Drop table

-- DROP TABLE sales

CREATE TABLE sales (
	id varchar(50) NOT NULL,
	buyername varchar(50) NOT NULL,
	buyeremail varchar(50) NOT NULL,
	buyeraddress text NOT NULL,
	buyerphone varchar(20) NULL,
	attendantid varchar(50) NOT NULL,
	CONSTRAINT sales_pkey PRIMARY KEY (id),
	CONSTRAINT sales_users_fk FOREIGN KEY (attendantid) REFERENCES users(id)
);


-- Permissions

ALTER TABLE sales OWNER TO postgres;
GRANT ALL ON TABLE sales TO postgres;

-- Drop table

-- DROP TABLE sales_item

CREATE TABLE sales_item (
	id varchar(50) NOT NULL,
	salesid varchar(50) NULL,
	productid varchar(50) NOT NULL,
	quantity int4 NOT NULL DEFAULT 1,
	price int4 NOT NULL,
	CONSTRAINT sales_item_pk PRIMARY KEY (id),
	CONSTRAINT sales_item_products_fk FOREIGN KEY (productid) REFERENCES products(id),
	CONSTRAINT sales_item_sales_fk FOREIGN KEY (salesid) REFERENCES sales(id)
);

-- Permissions

ALTER TABLE sales_item OWNER TO postgres;
GRANT ALL ON TABLE sales_item TO postgres;
GRANT INSERT, SELECT, UPDATE, REFERENCES(salesid) ON sales_item TO postgres;

INSERT INTO users (id,staffid,title,password,firstname,lastname,emailaddress,phonenumber,role,gender,avatar,contactaddress) VALUES 
(1,'SM001','Miss','$2b$10$B4RDZ2IhVzc/xhPijuP7QunAF8jtVmaK/m5RQrOQnprhWZo5A4n4K','Afolayan','Isaiah','undefined','undefined',1,'Male','null','undefined')
,(2,'SM002','Miss','$2b$10$ztopqc.8x.hxyPVPIGVHVeKUav1t0SbGdX7cmwiRWchGicX4pB2v.','Afolayan','Isaiah','undefined','undefined',2,'Male','defaultimage.jpg','undefined')
,(3,'SM003','Miss','$2b$10$bkX9dpsyj3WvIP6KvPugNeZ3zJe8V9u7xcSR/CyLQVp19hDfTL.Re','Afolayan','Isaiah','undefined','undefined',2,'Male','defaultimage.jpg','undefined')
,(7,'SM0058','Miss','$2b$10$bR22qMAYgxiWNfeYhFPQYeV5qZtCoizr.icvsKnu4SqaIiazXWPRK','Afolayan','Isaiah','iafolakunle@gmail.com','08032167911',1,'Male','defaultimage.jpg','41, Osholake street, Ebute-meta, Lagos')
;

/* INSERT INTO products (id,productname,price,quantity,description,category,minimumallowed,image,createdon) VALUES 
(1,'Wireless bluetooth',3000,780,'Wireless cord bluetooth','Mobile',25,' image.jpg','2018-10-25')
,(3,'new products',50,780,'Wirdfdfdeless bluetooth','Mooobile',255,' image.jpg','2018-10-25')
,(11,'Wireless-Phone',3000,780,'Tis is s ihfh kjf fhcff h gcu hi g iuwf gkf eufg j g jjbjc','Mobile',25,' image.jpg','2018-10-28');

INSERT INTO sales (id,buyername,buyeremail,buyeraddress,buyerphone,attendantid) VALUES 
(1,'Afolayan Isaiah','afolayan@gmil.com','41 gfjhgjg dgkfilu giug km bkkb bjdkjcl','08032167911',3)
,(2,'Afolayan Isaiah','afolayan@gmil.com','41 gfjhgjg dgkfilu giug km bkkb bjdkjcl','08032167911',3)
,(3,'Afolayan Isaiah','afolayan@gmil.com','41 gfjhgjg dgkfilu giug km bkkb bjdkjcl','08032167911',3)
,(4,'Afolayan Isaiah','afolayan@gmil.com','41 gfjhgjg dgkfilu giug km bkkb bjdkjcl','08032167911',3)
,(5,'Afolayan Isaiah','afolayan@gmil.com','41 gfjhgjg dgkfilu giug km bkkb bjdkjcl','08032167911',3)
;
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
,(11,4,1,120,400)
,(12,4,11,20,300)
,(13,5,3,20,300)
,(14,5,1,120,400)
; */