CREATE TABLE users (
    id serial PRIMARY KEY,
    staffid VARCHAR(50),
    title VARCHAR(10),
    password VARCHAR(100),
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
  productname VARCHAR(50),
  price INTEGER,
  quantity INTEGER,
  description TEXT,
  category VARCHAR(50),
  minimumallowed INTEGER,
  image VARCHAR(50),
  createdon DATE
);

CREATE TABLE sales (
  id SERIAL PRIMARY KEY,
  saleAttendant VARCHAR(50),
  staffId VARCHAR(20) REFERENCES users(staffid),
  productId INTEGER REFERENCES products(id),
  productName VARCHAR(50),
  category VARCHAR(50),
  quantity INTEGER,
  price INTEGER,
  totalAmount INTEGER,
  description TEXT,
  minimumAllowed INTEGER,
  createdOn DATE
  
);

CREATE TABLE sales_item (
	id serial NOT NULL,
	salesid INTEGER NULL,
	productid INTEGER NOT NULL,
	quantity INTEGER NOT NULL DEFAULT 1,
	price INTEGER NOT NULL,
	CONSTRAINT sales_item_pk PRIMARY KEY (id),
	CONSTRAINT sales_item_products_fk FOREIGN KEY (productid) REFERENCES products(id),
	CONSTRAINT sales_item_sales_fk FOREIGN KEY (salesid) REFERENCES sales(id) ON UPDATE CASCADE ON DELETE CASCADE
);

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