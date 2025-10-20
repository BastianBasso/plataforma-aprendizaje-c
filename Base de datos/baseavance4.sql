CREATE DATABASE inventario; 

USE inventario;

    UPDATE Usuario SET
    Usuario = 'Homero simpson',
            Correo = 'homer@gmail.com',
            Rol = 'Usuario',
              Estado = 'Activo'
           WHERE ID = '11';
UPDATE Usuario SET Rol = 'Administrador' WHERE ID = 35;

DELETE FROM Usuario WHERE ID = '33';
SELECT * FROM Usuario;

CREATE TABLE Usuario
CREATE TABLE Usuario (
    ID SERIAL PRIMARY KEY,
    Usuario VARCHAR(45) UNIQUE NOT NULL,
    Correo VARCHAR(100) UNIQUE NOT NULL,
    Contraseña VARCHAR(300) NOT NULL,
    Rol VARCHAR(45) NOT NULL DEFAULT 'Usuario',
    Fecha_creacion TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    Ultimo_acceso TIMESTAMP WITHOUT TIME ZONE
);


CREATE TABLE tokens_recuperar_contraseña (
    id_ocurrencia INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token VARCHAR(255) NOT NULL UNIQUE,
    expira DATETIME NOT NULL,
    creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Usuario(ID) ON DELETE CASCADE
);

UPDATE Usuario
SET Rol = 'Super Administrador'
WHERE ID = '43';

SELECT * FROM tokens_recuperar_contraseña;
DROP TABLE tokens_recuperar_contraseña;

CREATE TABLE Producto(
	id_producto INT AUTO_INCREMENT PRIMARY KEY,
    sku varchar(50) UNIQUE,
    nombre_producto VARCHAR(50) UNIQUE NOT NULL,
    marca_producto VARCHAR(50) NOT NULL,
    categoria_producto VARCHAR(50) NOT NULL,
    color_producto VARCHAR(50) NOT NULL,
    precio_venta_producto INT NOT NULL,
    precio_compra_producto INT NOT NULL,
    stock_producto INT NOT NULL,
    estado_producto VARCHAR(50) NOT NULL,
    fecha_compra_producto DATETIME NOT NULL,
    disponibilidad_producto VARCHAR(50) NOT NULL
);

CREATE TABLE Porcentajes(
id_porcentajes INT AUTO_INCREMENT KEY NOT NULL,
iva INT NOT NULL,
categoria_1 INT NOT NULL,
categoria_2 INT NOT NULL,
categoria_3 INT NOT NULL,
categoria_4 INT NOT NULL
);

INSERT INTO Porcentajes (iva, categoria_1, categoria_2, categoria_3, categoria_4)
VALUES (19, 35, 40, 45, 40);

SELECT * FROM Porcentajes;

SELECT id_producto, precio_compra_producto, categoria_producto FROM Producto;
SELECT * FROM Producto;

SELECT * FROM Producto WHERE estado_producto = 'Sin stock';

DELETE FROM Usuario WHERE ID = '62';

DROP TABLE Producto;

SELECT COUNT(id_producto) AS stockOut FROM Producto WHERE stock_producto = 0;

CREATE TABLE historial_compra (
    id_movimiento INT AUTO_INCREMENT PRIMARY KEY,
    id_producto INT NOT NULL,                     
    precio_compra int NOT NULL,        
    cantidad_afectada INT NOT NULL,              
    tipo_movimiento varchar(45) not null DEFAULT 'Entrada', 
    fecha_movimiento DATE NOT NULL,             
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 

FOREIGN KEY (id_producto) REFERENCES producto(id_producto)
ON DELETE RESTRICT ON UPDATE CASCADE 
);

CREATE TABLE historial_venta (
    id_movimiento INT AUTO_INCREMENT PRIMARY KEY,
    id_producto INT NOT NULL,                     
    cantidad_afectada INT NOT NULL,              
    tipo_movimiento varchar(45) not null DEFAULT 'salida', 
    fecha_movimiento DATE NOT NULL,             
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 

FOREIGN KEY (id_producto) REFERENCES producto(id_producto)
ON DELETE RESTRICT ON UPDATE CASCADE 
);