DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

Use bamazonDB;

CREATE TABLE products (
    id INT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (id)
);

SELECT * FROM products;