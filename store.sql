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

ALTER TABLE users OWNER TO abolajifemi;
GRANT ALL ON TABLE users TO abolajifemi;


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

ALTER TABLE products OWNER TO abolajifemi;
GRANT ALL ON TABLE products TO abolajifemi;
GRANT INSERT, SELECT, UPDATE, REFERENCES(productname) ON products TO abolajifemi;
GRANT INSERT, SELECT, UPDATE, REFERENCES(createdon) ON products TO abolajifemi;

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

ALTER TABLE sales OWNER TO abolajifemi;
GRANT ALL ON TABLE sales TO abolajifemi;


-- Drop table

-- DROP TABLE category

CREATE TABLE categories (
	catid varchar(50) NOT NULL,
	catname varchar(50) NOT NULL,
	CONSTRAINT categories_un UNIQUE (catname)
);
GRANT ALL ON TABLE categories TO abolajifemi;

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

ALTER TABLE sales_item OWNER TO abolajifemi;
GRANT ALL ON TABLE sales_item TO abolajifemi;
GRANT INSERT, SELECT, UPDATE, REFERENCES(salesid) ON sales_item TO abolajifemi;

INSERT INTO users (id,staffid,title,"password",firstname,lastname,emailaddress,phonenumber,"role",gender,avatar,contactaddress) VALUES 
('cjobbz2i70000gwsd6cpwwx7','SM001','Miss','$2b$10$B4RDZ2IhVzc/xhPijuP7QunAF8jtVmaK/m5RQrOQnprhWZo5A4n4K','Afolayan','Isaiah','kun@kun.com','08032167944',1,'Male','null','Olunlade')
,('cjobbz2i70000gwsd6cpwwx7y','SM002','Miss','$2b$10$ztopqc.8x.hxyPVPIGVHVeKUav1t0SbGdX7cmwiRWchGicX4pB2v.','Afolayan','Isaiah','olu@olu.com','07132564844',2,'Male','defaultimage.jpg','opomalu')
,('cjoas4z9e0000ycsd47jffnp5','SM490','Miss','$2b$10$DbH0dthHCQ55Ssg52FPaj.FNgfDOUAx16DhkWGeKpw0zhE5As50vy','qertyuinvbm','wertyui','me@myge.com','08022167911',2,'Female','defaultimage.jpg','32jhgdwjhgfjc dcjhvjv')
,('cjob79zq300005wsdb5i5jg1t','SX001','Chief','$2b$10$N6Xo9tnMIWQASqDGTieb9.LgKZWVOPb67fNqTEsRGzjDjaeYF1pSe','Isaiah','AFOLAYAN','iafolayaunle@gmail.com','08032267911',2,'1','defaultimage.jpg','Lagos
Lagos')
,('cjobbz2i70000gwsd6cpwwx7v','SX002','Mr.','$2b$10$4mwoeGXrPRJOxQgUBerR2.cfSLhWtaR5.qoRj6bJN8v9989eLaSBK','Isaiah','AFOLAYAN','olayanibikunle@gmail.com','08032367911',2,'1','defaultimage.jpg','Lagos
Lagos')
,('cjobdlrhr00046osd6k8u6ptc','SX003','Chief','$2b$10$lb4.H1w9uHLp5CWqvCPqk.PldDHK/8ZiVbtE38vqFhi03HHHPfsAe','Isaiah','AFOLAYAN','iafolaibikunle@gmail.com','08052167911',2,'2','defaultimage.jpg','Lagos
Lagos')
,('cjoe8qlha00000mx536s8qjsk','S0010','Chief','$2b$10$Xfsi.4../N2QweBumCh0Z.xSUbKUz4aIRcrZzktQXqIedMS/DUre.','Ayoide','Oluide','oluide.ayoide@gail.co','08214145211',2,'1','defaultimage.jpg','Opomalu')
;
/*
INSERT INTO products (id,productname,price,quantity,description,category,minimumallowed,image,createdon) VALUES 
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