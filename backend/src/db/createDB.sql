-- Active: 1680633828681@@localhost@3306@TrybeWalletDB
USE TrybeWalletDB;

CREATE TABLE users (
`user_id` INT PRIMARY KEY AUTO_INCREMENT,
email VARCHAR(255) NOT NULL UNIQUE,
`password` VARCHAR(255) NOT NULL
);

CREATE TABLE currencies (
currency_id INT PRIMARY KEY AUTO_INCREMENT,
initials VARCHAR(10) NOT NULL
);

CREATE TABLE tags (
tag_id INT PRIMARY KEY AUTO_INCREMENT,
`name` VARCHAR(255) NOT NULL
);

CREATE TABLE payment_method (
payment_method_id INT PRIMARY KEY AUTO_INCREMENT,
`name` VARCHAR(255) NOT NULL
);

CREATE TABLE expenses (
expense_id INT PRIMARY KEY AUTO_INCREMENT,
`value` DECIMAL(10,2) NOT NULL,
`description` VARCHAR(255) NOT NULL,
tag_id INT,
currency_id INT,
payment_method_id INT,
`user_id` INT,
exchange_rate DECIMAL(4,2) NOT NULL,
currency_name VARCHAR(150) NOT NULL,
FOREIGN KEY (tag_id) REFERENCES tags (tag_id),
FOREIGN KEY (currency_id) REFERENCES currencies (currency_id),
FOREIGN KEY (payment_method_id) REFERENCES payment_method (payment_method_id),
FOREIGN KEY (`user_id`) REFERENCES users (`user_id`)
);

INSERT INTO currencies (initials) 
VALUES ('USD'), ('CAD'), ('GBP'), ('ARS'), ('BTC'), ('LTC'), ('EUR'), ('JPY'), ('CHF'), ('AUD'), ('CNY'),
('ILS'), ('ETH'), ('XRP'), ('DODGE');

INSERT INTO payment_method (`name`)
VALUES ('Dinheiro'), ('Cartao de credito'), ('Cartao de debito');

INSERT INTO tags (`name`)
VALUES ('Alimentacao'), ('Lazer'), ('Trabalho'), ('Transporte'), ('Saude');

INSERT INTO users (email, `name`) VALUES ('brunoalvimduarte@gmail.com', 'Bruno');