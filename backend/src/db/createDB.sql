-- Active: 1680633828681@@localhost@3306@TrybeWalletDB
USE TrybeWalletDB;

CREATE TABLE usuario (
usuario_id INT PRIMARY KEY AUTO_INCREMENT,
email VARCHAR(255) NOT NULL,
nome VARCHAR(100) NOT NULL
);

CREATE TABLE moeda (
moeda_id INT PRIMARY KEY AUTO_INCREMENT,
sigla VARCHAR(10) NOT NULL
);

CREATE TABLE tag (
tag_id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(255) NOT NULL
);

CREATE TABLE metodo_pagamento (
metodo_pagamento_id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(255) NOT NULL
);

CREATE TABLE despesas (
despesa_id INT PRIMARY KEY AUTO_INCREMENT,
valor DECIMAL(10,2) NOT NULL,
descricao VARCHAR(255) NOT NULL,
tag_id INT,
moeda_id INT,
metodo_pagamento_id INT,
usuario_id INT,
FOREIGN KEY (tag_id) REFERENCES tag (tag_id),
FOREIGN KEY (moeda_id) REFERENCES moeda (moeda_id),
FOREIGN KEY (metodo_pagamento_id) REFERENCES metodo_pagamento (metodo_pagamento_id),
FOREIGN KEY (usuario_id) REFERENCES usuario (usuario_id)
);

