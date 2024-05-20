CREATE DATABASE postgres;

-- Cria a tabela 'customer'
CREATE TABLE customer (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    cpf VARCHAR(11) NOT NULL UNIQUE
);

-- Cria a tabela 'product'
CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL
);
