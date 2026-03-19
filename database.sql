CREATE DATABASE qr_storage;
USE qr_storage;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    clave VARCHAR(100)
);

CREATE TABLE contenedores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES usuarios(id)
);

CREATE TABLE articulos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    cont_id INT,
    FOREIGN KEY (cont_id) REFERENCES contenedores(id)
);