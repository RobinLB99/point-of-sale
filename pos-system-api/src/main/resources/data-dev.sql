-- =============================================================
-- data-dev.sql
-- Datos iniciales de prueba para el entorno de desarrollo
-- =============================================================

-- 0. USUARIOS
INSERT INTO Usuario (nombre, usuario, password) VALUES
('Administrador', 'admin', '$2b$12$lrlzmiG6u3yVhnClT2VHeu0JkKkEk5CNwk2G6SBOPH6haODJv5S6C'),
('Cajero Principal', 'cajero', '$2b$12$LrlVz/cNWRPHf0hSGMwwfuRofQC62ASdGSw9UtAzhk4E/PkUhPzCy'),
('Bodeguero', 'bodega', '$2b$12$QWeEqDhdLL7a1s2bxzNXGOrS51LWSbQMnwBJvank4RPMoeBiYsXva'),
('Contador', 'conta', '$2b$12$O1MQ221WRqQfK55RZ9Lnb.Efjhzf..kRiAwSd/Fv.zZRu4dnDO0ea')^^

INSERT INTO Usuario_Rol (id_usuario, rol) VALUES
(1, 'ADMIN'),
(2, 'CAJA'),
(3, 'INVENTARIO'),
(4, 'CONTABILIDAD')^^

-- 1. CLIENTES
INSERT INTO Cliente (nombre, telefono, limite_credito, activo) VALUES
('Consumidor Final', '00000000', 0, TRUE),
('Juan Pérez', '555123456', 500.00, TRUE),
('María García', '555987654', 1000.00, TRUE),
('Tienda La Bendición', '555112233', 2000.00, TRUE)^^

-- 2. PROVEEDORES
INSERT INTO Proveedor (empresa, vendedor, telefono, dia_visita, activo) VALUES
('Coca-Cola FEMSA', 'Carlos Slim', '555111222', 'Lunes y Jueves', TRUE),
('Nestlé México', 'Ana Julia', '555333444', 'Miércoles', TRUE),
('Bimbo S.A.', 'Roberto Gómez', '555555666', 'Diario', TRUE),
('Lácteos del Valle', 'Sofía Reyes', '555777888', 'Martes', TRUE)^^

-- 3. IVA
INSERT INTO IVA (descripcion, porcentaje) VALUES
('Exento', 0.00),
('IVA 12%', 12.00),
('IVA 13%', 13.00),
('IVA 14%', 14.00),
('IVA 15%', 15.00)^^

-- 4. CATEGORIAS
INSERT INTO Categoria (nombre, descripcion) VALUES
('Bebidas', 'Refrescos, jugos y aguas naturales'),
('Lácteos', 'Leche, quesos, cremas y yogures'),
('Snacks', 'Papas, galletas y frituras variadas'),
('Abarrotes', 'Productos básicos de despensa'),
('Limpieza', 'Artículos para el hogar')^^

-- 5. UNIDADES DE MEDIDA
INSERT INTO UnidadMedida (nombre, simbolo) VALUES
('Unidad', 'un'),
('Kilogramo', 'kg'),
('Litro', 'lt'),
('Gramo', 'gr'),
('Paquete', 'paq')^^

-- 6. PRODUCTOS
-- IDs asumidos por orden de inserción:
-- Categorías: 1:Bebidas, 2:Lácteos, 3:Snacks
-- Unidades: 1:un, 2:kg, 3:lt
-- IVA: 2:16%
INSERT INTO Producto (nombre, id_categoria, costo, stock, es_fraccionable, activo, id_unidad_base, id_iva, id_proveedor) VALUES
('Coca Cola 600ml', 1, 12.50, 100.00, FALSE, TRUE, 1, 2, 1),
('Leche Entera 1L', 2, 18.00, 50.00, FALSE, TRUE, 3, 2, 4),
('Papas Sabritas Original 45g', 3, 11.00, 40.00, FALSE, TRUE, 1, 2, 3),
('Arroz Blanco 1kg', 4, 22.00, 60.00, TRUE, TRUE, 2, 2, NULL),
('Queso Manchego', 2, 140.00, 10.50, TRUE, TRUE, 2, 2, 4)^^

-- 7. PRODUCTO_UNIDAD (Precios de Venta y Factores de Conversión)
INSERT INTO ProductoUnidad (id_producto, id_unidad, factor_conversion, precio_venta, activo) VALUES
(1, 1, 1.0, 18.00, TRUE),   -- Coca 600ml -> Unidad
(2, 3, 1.0, 26.00, TRUE),   -- Leche 1L -> Litro
(3, 1, 1.0, 17.00, TRUE),   -- Papas -> Unidad
(4, 2, 1.0, 28.50, TRUE),   -- Arroz -> Kilogramo
(4, 4, 0.001, 0.03, TRUE),  -- Arroz -> Gramo (fraccionado)
(5, 2, 1.0, 210.00, TRUE),  -- Queso -> Kilogramo
(5, 4, 0.001, 0.22, TRUE)^^  -- Queso -> Gramo (fraccionado)
