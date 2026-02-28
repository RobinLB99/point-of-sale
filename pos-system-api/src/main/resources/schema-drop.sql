-- =============================================================
-- schema-drop.sql
-- LIMPIEZA TOTAL: Solo para desarrollo
-- Elimina todos los objetos para recrearlos desde cero
-- =============================================================

-- 1. Vistas
DROP VIEW IF EXISTS v_notificaciones_pendientes CASCADE^^
DROP VIEW IF EXISTS v_cierre_caja CASCADE^^
DROP VIEW IF EXISTS v_stock_producto CASCADE^^
DROP VIEW IF EXISTS v_deuda_cliente CASCADE^^

-- 2. Tablas (El orden importa por FKs, pero CASCADE se encarga)
DROP TABLE IF EXISTS NotificacionUsuario CASCADE^^
DROP TABLE IF EXISTS Notificacion CASCADE^^
DROP TABLE IF EXISTS Pago CASCADE^^
DROP TABLE IF EXISTS DetalleVenta CASCADE^^
DROP TABLE IF EXISTS Venta CASCADE^^
DROP TABLE IF EXISTS MovimientoCaja CASCADE^^
DROP TABLE IF EXISTS Caja CASCADE^^
DROP TABLE IF EXISTS MovimientoInventario CASCADE^^
DROP TABLE IF EXISTS ProductoUnidad CASCADE^^
DROP TABLE IF EXISTS Producto CASCADE^^
DROP TABLE IF EXISTS UnidadMedida CASCADE^^
DROP TABLE IF EXISTS Categoria CASCADE^^
DROP TABLE IF EXISTS IVA CASCADE^^
DROP TABLE IF EXISTS Proveedor CASCADE^^
DROP TABLE IF EXISTS Cliente CASCADE^^
DROP TABLE IF EXISTS Auditoria CASCADE^^
DROP TABLE IF EXISTS Usuario_Rol CASCADE^^
DROP TABLE IF EXISTS Usuario CASCADE^^

-- 3. Tipos ENUM
DROP TYPE IF EXISTS rol_destino_notif CASCADE^^
DROP TYPE IF EXISTS tipo_notificacion CASCADE^^
DROP TYPE IF EXISTS tipo_movimiento_inv CASCADE^^
DROP TYPE IF EXISTS tipo_movimiento_caja CASCADE^^
DROP TYPE IF EXISTS estado_venta CASCADE^^
DROP TYPE IF EXISTS estado_caja CASCADE^^
DROP TYPE IF EXISTS accion_auditoria CASCADE^^
DROP TYPE IF EXISTS rol_usuario CASCADE^^
