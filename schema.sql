DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
product_name VARCHAR(50) NOT NULL,
department_name VARCHAR(50) NOT NULL,
price DECIMAL(10,2) DEFAULT 0,
stock_quantity INT DEFAULT 0
);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("Tic Tacs", "Food", 1.50, 100),
	("T-shirt","Clothing",12.40,50),
       ("PS4","Entertainment",300.00,30),
       ("Recipe Book","Cooking",9.95,75),
       ("Heaphones","Audio", 19.99,20),
       ("Flat-Screen TV","Entertainment",400.00,10),
       ("Boxing Gloves","Fitness",15.00,8),
       ("TV Dinner","Food",6.00,50),
       ("Bananas","Food",2.00,500),
       ("Electric Razor","Toiletries",50.00,18);

SELECT * FROM products;