CREATE DATABASE module_b;
USE module_b;

CREATE TABLE companies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(255),
    company_address TEXT,
    company_telephone VARCHAR(50),
    company_email VARCHAR(255),
    owner_name VARCHAR(255),
    owner_mobile VARCHAR(50),
    owner_email VARCHAR(255),
    contact_name VARCHAR(255),
    contact_mobile VARCHAR(50),
    contact_email VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT,
    gtin VARCHAR(14) UNIQUE,
    name_en VARCHAR(255),
    name_fr VARCHAR(255),
    description_en TEXT,
    description_fr TEXT,
    brand VARCHAR(255),
    country_of_origin VARCHAR(100),
    gross_weight DECIMAL(10,2),
    net_weight DECIMAL(10,2),
    weight_unit VARCHAR(10),
    image VARCHAR(255),
    is_hidden BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (company_id) REFERENCES companies(id)
);

CREATE INDEX idx_gtin ON products(gtin);