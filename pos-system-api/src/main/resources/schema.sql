-- =============================================================
-- Sistema POS — Tienda de Barrio
-- schema.sql (PostgreSQL)
-- PKs: BIGINT GENERATED ALWAYS AS IDENTITY
-- ENUMs: valores en MAYÚSCULAS
-- Booleanos: BOOLEAN para campos activo/inactivo
-- =============================================================

-- =============================================================
-- TIPOS ENUM (Idempotentes)
-- =============================================================

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'rol_usuario') THEN
        CREATE TYPE rol_usuario AS ENUM ('ADMIN', 'CAJA', 'INVENTARIO', 'CONTABILIDAD');
    END IF;
END $$^^

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'accion_auditoria') THEN
        CREATE TYPE accion_auditoria AS ENUM ('INSERT', 'UPDATE', 'DELETE');
    END IF;
END $$^^

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'estado_caja') THEN
        CREATE TYPE estado_caja AS ENUM ('ABIERTA', 'CERRADA');
    END IF;
END $$^^

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'estado_venta') THEN
        CREATE TYPE estado_venta AS ENUM ('PAGADA', 'CREDITO', 'ANULADA');
    END IF;
END $$^^

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'tipo_movimiento_caja') THEN
        CREATE TYPE tipo_movimiento_caja AS ENUM ('INGRESO', 'EGRESO', 'AJUSTE');
    END IF;
END $$^^

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'tipo_movimiento_inv') THEN
        CREATE TYPE tipo_movimiento_inv AS ENUM ('ENTRADA', 'SALIDA', 'AJUSTE');
    END IF;
END $$^^

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'tipo_notificacion') THEN
        CREATE TYPE tipo_notificacion AS ENUM (
            'STOCK_BAJO',
            'CREDITO_VENCIDO',
            'LIMITE_CREDITO',
            'CAJA_ABIERTA',
            'AJUSTE_INVENTARIO'
        );
    END IF;
END $$^^

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'rol_destino_notif') THEN
        CREATE TYPE rol_destino_notif AS ENUM ('ADMIN', 'CAJA', 'INVENTARIO', 'CONTABILIDAD', 'TODOS');
    END IF;
END $$^^

-- =============================================================
-- USUARIOS Y SEGURIDAD
-- =============================================================

CREATE TABLE IF NOT EXISTS Usuario (
    id_usuario     BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre         TEXT        NOT NULL,
    usuario        TEXT        NOT NULL UNIQUE,
    password       TEXT        NOT NULL,
    activo         BOOLEAN     NOT NULL DEFAULT TRUE,
    fecha_registro TIMESTAMPTZ NOT NULL DEFAULT NOW()
)^^

CREATE TABLE IF NOT EXISTS Usuario_Rol (
    id_usuario BIGINT      NOT NULL REFERENCES Usuario(id_usuario),
    rol        rol_usuario NOT NULL,
    PRIMARY KEY (id_usuario, rol)
)^^

CREATE TABLE IF NOT EXISTS Auditoria (
    id_auditoria   BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_usuario     BIGINT           NOT NULL REFERENCES Usuario(id_usuario),
    accion         accion_auditoria NOT NULL,
    tabla          TEXT             NOT NULL,
    id_registro    BIGINT,
    valor_anterior JSONB,
    valor_nuevo    JSONB,
    fecha          TIMESTAMPTZ      NOT NULL DEFAULT NOW()
)^^

-- =============================================================
-- CLIENTES Y PROVEEDORES
-- =============================================================

CREATE TABLE IF NOT EXISTS Cliente (
    id_cliente     BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre         TEXT          NOT NULL,
    telefono       TEXT          NOT NULL,
    limite_credito NUMERIC(10,2) NOT NULL DEFAULT 0,
    activo         BOOLEAN       NOT NULL DEFAULT TRUE
)^^

CREATE TABLE IF NOT EXISTS Proveedor (
    id_proveedor BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    empresa      TEXT    NOT NULL,
    vendedor     TEXT    NOT NULL,
    telefono     TEXT    NOT NULL,
    dia_visita   TEXT    NOT NULL,
    activo       BOOLEAN NOT NULL DEFAULT TRUE
)^^

-- =============================================================
-- IVA
-- =============================================================

CREATE TABLE IF NOT EXISTS IVA (
    id_iva      BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    descripcion TEXT         NOT NULL,
    porcentaje  NUMERIC(5,2) NOT NULL
)^^

-- =============================================================
-- CATEGORIAS
-- =============================================================

CREATE TABLE IF NOT EXISTS Categoria (
    id_categoria BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre       TEXT NOT NULL UNIQUE,
    descripcion  TEXT
)^^

-- =============================================================
-- UNIDADES DE MEDIDA
-- =============================================================

CREATE TABLE IF NOT EXISTS UnidadMedida (
    id_unidad BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre    TEXT NOT NULL,
    simbolo   TEXT NOT NULL
)^^

-- =============================================================
-- INVENTARIO
-- =============================================================

CREATE TABLE IF NOT EXISTS Producto (
    id_producto     BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre          TEXT          NOT NULL,
    id_categoria    BIGINT        REFERENCES Categoria(id_categoria),
    costo           NUMERIC(10,2) NOT NULL DEFAULT 0,
    stock           NUMERIC(12,4) NOT NULL DEFAULT 0,
    es_fraccionable BOOLEAN       NOT NULL DEFAULT FALSE,
    activo          BOOLEAN       NOT NULL DEFAULT TRUE,
    id_unidad_base  BIGINT        NOT NULL REFERENCES UnidadMedida(id_unidad),
    id_iva          BIGINT        NOT NULL REFERENCES IVA(id_iva),
    id_proveedor    BIGINT        REFERENCES Proveedor(id_proveedor)
)^^

CREATE TABLE IF NOT EXISTS ProductoUnidad (
    id_producto_unidad BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_producto        BIGINT        NOT NULL REFERENCES Producto(id_producto),
    id_unidad          BIGINT        NOT NULL REFERENCES UnidadMedida(id_unidad),
    factor_conversion  NUMERIC(8,6)  NOT NULL DEFAULT 1.0,
    precio_venta       NUMERIC(10,2) NOT NULL,
    activo             BOOLEAN       NOT NULL DEFAULT TRUE,

    UNIQUE(id_producto, id_unidad)
)^^

CREATE TABLE IF NOT EXISTS MovimientoInventario (
    id_movimiento  BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_producto    BIGINT              NOT NULL REFERENCES Producto(id_producto),
    tipo           tipo_movimiento_inv NOT NULL,
    cantidad       NUMERIC(12,4)       NOT NULL,
    stock_anterior NUMERIC(12,4)       NOT NULL,
    stock_nuevo    NUMERIC(12,4)       NOT NULL,
    referencia     TEXT,
    fecha          TIMESTAMPTZ         NOT NULL DEFAULT NOW(),
    id_usuario     BIGINT              NOT NULL REFERENCES Usuario(id_usuario)
)^^

-- =============================================================
-- CAJA
-- =============================================================

CREATE TABLE IF NOT EXISTS Caja (
    id_caja             BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    fecha_apertura      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    fecha_cierre        TIMESTAMPTZ,
    saldo_inicial       NUMERIC(10,2) NOT NULL DEFAULT 0,
    saldo_final         NUMERIC(10,2),            -- NULL hasta el cierre
    estado              estado_caja   NOT NULL DEFAULT 'ABIERTA',
    id_usuario_apertura BIGINT        NOT NULL REFERENCES Usuario(id_usuario),
    id_usuario_cierre   BIGINT        REFERENCES Usuario(id_usuario)
)^^

CREATE TABLE IF NOT EXISTS MovimientoCaja (
    id_movimiento BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_caja       BIGINT               NOT NULL REFERENCES Caja(id_caja),
    tipo          tipo_movimiento_caja NOT NULL,
    descripcion   TEXT,
    monto         NUMERIC(10,2)        NOT NULL,
    fecha         TIMESTAMPTZ          NOT NULL DEFAULT NOW(),
    id_usuario    BIGINT               NOT NULL REFERENCES Usuario(id_usuario)
)^^

-- =============================================================
-- VENTAS
-- =============================================================

CREATE TABLE IF NOT EXISTS Venta (
    id_venta   BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_cliente BIGINT        REFERENCES Cliente(id_cliente),  -- NULL = consumidor final
    id_caja    BIGINT        NOT NULL REFERENCES Caja(id_caja),
    fecha      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    subtotal   NUMERIC(10,2) NOT NULL DEFAULT 0,
    impuestos  NUMERIC(10,2) NOT NULL DEFAULT 0,
    total      NUMERIC(10,2) NOT NULL DEFAULT 0,
    estado     estado_venta  NOT NULL DEFAULT 'PAGADA',
    id_usuario BIGINT        NOT NULL REFERENCES Usuario(id_usuario)
)^^

CREATE TABLE IF NOT EXISTS DetalleVenta (
    id_detalle         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_venta           BIGINT        NOT NULL REFERENCES Venta(id_venta),
    id_producto        BIGINT        NOT NULL REFERENCES Producto(id_producto),
    id_producto_unidad BIGINT        NOT NULL REFERENCES ProductoUnidad(id_producto_unidad),
    cantidad           NUMERIC(12,4) NOT NULL,
    cantidad_base      NUMERIC(12,4) NOT NULL,  -- cantidad * factor_conversion
    precio_unitario    NUMERIC(10,2) NOT NULL,
    costo_unitario     NUMERIC(10,2) NOT NULL,
    iva_porcentaje     NUMERIC(5,2)  NOT NULL,  -- snapshot histórico
    total_linea        NUMERIC(10,2) NOT NULL   -- cantidad * precio_unitario
)^^

-- =============================================================
-- PAGOS
-- =============================================================

CREATE TABLE IF NOT EXISTS Pago (
    id_pago     BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_venta    BIGINT        NOT NULL REFERENCES Venta(id_venta),
    id_caja     BIGINT        NOT NULL REFERENCES Caja(id_caja),
    monto       NUMERIC(10,2) NOT NULL,
    fecha       TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    observacion TEXT,
    id_usuario  BIGINT        NOT NULL REFERENCES Usuario(id_usuario)
)^^

-- =============================================================
-- NOTIFICACIONES
-- =============================================================

CREATE TABLE IF NOT EXISTS Notificacion (
    id_notificacion  BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tipo             tipo_notificacion NOT NULL,
    mensaje          TEXT              NOT NULL,
    rol_destino      rol_destino_notif NOT NULL,
    id_referencia    BIGINT,
    tabla_referencia TEXT,
    fecha            TIMESTAMPTZ       NOT NULL DEFAULT NOW()
)^^

CREATE TABLE IF NOT EXISTS NotificacionUsuario (
    id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_notificacion BIGINT      NOT NULL REFERENCES Notificacion(id_notificacion),
    id_usuario      BIGINT      NOT NULL REFERENCES Usuario(id_usuario),
    leida           BOOLEAN     NOT NULL DEFAULT FALSE,
    fecha_lectura   TIMESTAMPTZ,

    UNIQUE(id_notificacion, id_usuario)
)^^

-- =============================================================
-- ÍNDICES
-- =============================================================

CREATE INDEX IF NOT EXISTS idx_usuario_activo        ON Usuario(activo)^^
CREATE INDEX IF NOT EXISTS idx_usuarioRol_usuario    ON Usuario_Rol(id_usuario)^^
CREATE INDEX IF NOT EXISTS idx_usuarioRol_rol        ON Usuario_Rol(rol)^^
CREATE INDEX IF NOT EXISTS idx_auditoria_usuario     ON Auditoria(id_usuario)^^
CREATE INDEX IF NOT EXISTS idx_auditoria_tabla       ON Auditoria(tabla)^^
CREATE INDEX IF NOT EXISTS idx_cliente_activo        ON Cliente(activo)^^
CREATE INDEX IF NOT EXISTS idx_proveedor_activo      ON Proveedor(activo)^^
CREATE INDEX IF NOT EXISTS idx_producto_categoria    ON Producto(id_categoria)^^
CREATE INDEX IF NOT EXISTS idx_producto_proveedor    ON Producto(id_proveedor)^^
CREATE INDEX IF NOT EXISTS idx_producto_activo       ON Producto(activo)^^
CREATE INDEX IF NOT EXISTS idx_movInv_producto       ON MovimientoInventario(id_producto)^^
CREATE INDEX IF NOT EXISTS idx_movInv_fecha          ON MovimientoInventario(fecha)^^
CREATE INDEX IF NOT EXISTS idx_movCaja_caja          ON MovimientoCaja(id_caja)^^
CREATE INDEX IF NOT EXISTS idx_venta_cliente         ON Venta(id_cliente)^^
CREATE INDEX IF NOT EXISTS idx_venta_caja            ON Venta(id_caja)^^
CREATE INDEX IF NOT EXISTS idx_venta_fecha           ON Venta(fecha)^^
CREATE INDEX IF NOT EXISTS idx_venta_estado          ON Venta(estado)^^
CREATE INDEX IF NOT EXISTS idx_detalleVenta_venta    ON DetalleVenta(id_venta)^^
CREATE INDEX IF NOT EXISTS idx_detalleVenta_producto ON DetalleVenta(id_producto)^^
CREATE INDEX IF NOT EXISTS idx_pago_venta            ON Pago(id_venta)^^
CREATE INDEX IF NOT EXISTS idx_notifUsr_usuario      ON NotificacionUsuario(id_usuario)^^
CREATE INDEX IF NOT EXISTS idx_notifUsr_leida        ON NotificacionUsuario(leida)^^

-- =============================================================
-- FUNCIONES Y TRIGGERS
-- =============================================================

-- -------------------------------------------------------------
-- 1. Validar stock antes de insertar DetalleVenta
-- -------------------------------------------------------------
CREATE OR REPLACE FUNCTION fn_validar_stock()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT stock FROM Producto WHERE id_producto = NEW.id_producto) < NEW.cantidad_base THEN
        RAISE EXCEPTION 'Stock insuficiente para realizar la venta';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql^^

DROP TRIGGER IF EXISTS trg_validar_stock ON DetalleVenta^^
CREATE TRIGGER trg_validar_stock
BEFORE INSERT ON DetalleVenta
FOR EACH ROW EXECUTE FUNCTION fn_validar_stock()^^

-- -------------------------------------------------------------
-- 2. Descontar stock y registrar movimiento de inventario
-- -------------------------------------------------------------
CREATE OR REPLACE FUNCTION fn_descontar_stock()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE Producto
    SET stock = stock - NEW.cantidad_base
    WHERE id_producto = NEW.id_producto;

    INSERT INTO MovimientoInventario (
        id_producto, tipo, cantidad,
        stock_anterior, stock_nuevo,
        referencia, id_usuario
    )
    SELECT
        NEW.id_producto,
        'SALIDA',
        NEW.cantidad_base,
        p.stock + NEW.cantidad_base,
        p.stock,
        'venta #' || NEW.id_venta,
        (SELECT id_usuario FROM Venta WHERE id_venta = NEW.id_venta)
    FROM Producto p
    WHERE p.id_producto = NEW.id_producto;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql^^

DROP TRIGGER IF EXISTS trg_descontar_stock ON DetalleVenta^^
CREATE TRIGGER trg_descontar_stock
AFTER INSERT ON DetalleVenta
FOR EACH ROW EXECUTE FUNCTION fn_descontar_stock()^^

-- -------------------------------------------------------------
-- 3. Recalcular subtotal, impuestos y total en Venta
-- -------------------------------------------------------------
CREATE OR REPLACE FUNCTION fn_recalcular_venta()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE Venta
    SET
        subtotal  = (
            SELECT ROUND(SUM(cantidad * precio_unitario), 2)
            FROM DetalleVenta WHERE id_venta = NEW.id_venta
        ),
        impuestos = (
            SELECT ROUND(SUM(cantidad * precio_unitario * iva_porcentaje / 100), 2)
            FROM DetalleVenta WHERE id_venta = NEW.id_venta
        ),
        total     = (
            SELECT ROUND(SUM(cantidad * precio_unitario * (1 + iva_porcentaje / 100)), 2)
            FROM DetalleVenta WHERE id_venta = NEW.id_venta
        )
    WHERE id_venta = NEW.id_venta;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql^^

DROP TRIGGER IF EXISTS trg_recalcular_venta_insert ON DetalleVenta^^
CREATE TRIGGER trg_recalcular_venta_insert
AFTER INSERT ON DetalleVenta
FOR EACH ROW EXECUTE FUNCTION fn_recalcular_venta()^^

-- -------------------------------------------------------------
-- 4. Restaurar stock si una Venta se anula
-- -------------------------------------------------------------
CREATE OR REPLACE FUNCTION fn_restaurar_stock_anulacion()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.estado = 'ANULADA' AND OLD.estado != 'ANULADA' THEN

        UPDATE Producto p
        SET stock = p.stock + dv.cantidad_base
        FROM DetalleVenta dv
        WHERE dv.id_venta    = NEW.id_venta
          AND dv.id_producto = p.id_producto;

        INSERT INTO MovimientoInventario (
            id_producto, tipo, cantidad,
            stock_anterior, stock_nuevo,
            referencia, id_usuario
        )
        SELECT
            dv.id_producto,
            'ENTRADA',
            dv.cantidad_base,
            p.stock - dv.cantidad_base,
            p.stock,
            'anulacion venta #' || NEW.id_venta,
            NEW.id_usuario
        FROM DetalleVenta dv
        JOIN Producto p ON p.id_producto = dv.id_producto
        WHERE dv.id_venta = NEW.id_venta;

    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql^^

DROP TRIGGER IF EXISTS trg_restaurar_stock_anulacion ON Venta^^
CREATE TRIGGER trg_restaurar_stock_anulacion
AFTER UPDATE OF estado ON Venta
FOR EACH ROW EXECUTE FUNCTION fn_restaurar_stock_anulacion()^^

-- -------------------------------------------------------------
-- 5. Notificar stock bajo
-- -------------------------------------------------------------
CREATE OR REPLACE FUNCTION fn_notificar_stock_bajo()
RETURNS TRIGGER AS $$
DECLARE
    v_simbolo  TEXT;
    v_notif_id BIGINT;
BEGIN
    IF NEW.stock <= 5 AND NEW.activo = TRUE THEN

        SELECT simbolo INTO v_simbolo
        FROM UnidadMedida WHERE id_unidad = NEW.id_unidad_base;

        INSERT INTO Notificacion (tipo, mensaje, rol_destino, id_referencia, tabla_referencia)
        VALUES (
            'STOCK_BAJO',
            'Stock bajo: ' || NEW.nombre || ' — quedan ' || ROUND(NEW.stock, 2) || ' ' || v_simbolo,
            'ADMIN',
            NEW.id_producto,
            'Producto'
        )
        RETURNING id_notificacion INTO v_notif_id;

        INSERT INTO NotificacionUsuario (id_notificacion, id_usuario)
        SELECT DISTINCT v_notif_id, u.id_usuario
        FROM Usuario u
        JOIN Usuario_Rol ur ON ur.id_usuario = u.id_usuario
        WHERE ur.rol = 'ADMIN' AND u.activo = TRUE;

    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql^^

DROP TRIGGER IF EXISTS trg_notificar_stock_bajo ON Producto^^
CREATE TRIGGER trg_notificar_stock_bajo
AFTER UPDATE OF stock ON Producto
FOR EACH ROW EXECUTE FUNCTION fn_notificar_stock_bajo()^^

-- -------------------------------------------------------------
-- 6. Distribuir notificacion a usuarios al insertarla
--    ADMIN se maneja en fn_notificar_stock_bajo y funciones
--    específicas. Este trigger cubre CAJA, INVENTARIO,
--    CONTABILIDAD y TODOS.
-- -------------------------------------------------------------
CREATE OR REPLACE FUNCTION fn_distribuir_notificacion()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.rol_destino = 'TODOS' THEN
        INSERT INTO NotificacionUsuario (id_notificacion, id_usuario)
        SELECT NEW.id_notificacion, id_usuario
        FROM Usuario
        WHERE activo = TRUE;

    ELSIF NEW.rol_destino != 'ADMIN' THEN
        INSERT INTO NotificacionUsuario (id_notificacion, id_usuario)
        SELECT DISTINCT NEW.id_notificacion, u.id_usuario
        FROM Usuario u
        JOIN Usuario_Rol ur ON ur.id_usuario = u.id_usuario
        WHERE u.activo = TRUE
          AND ur.rol::text = NEW.rol_destino::text;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql^^

DROP TRIGGER IF EXISTS trg_distribuir_notificacion ON Notificacion^^
CREATE TRIGGER trg_distribuir_notificacion
AFTER INSERT ON Notificacion
FOR EACH ROW EXECUTE FUNCTION fn_distribuir_notificacion()^^

-- -------------------------------------------------------------
-- 7. Validar que la Caja esté abierta antes de registrar Venta
-- -------------------------------------------------------------
CREATE OR REPLACE FUNCTION fn_validar_caja_venta()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT estado FROM Caja WHERE id_caja = NEW.id_caja) != 'ABIERTA' THEN
        RAISE EXCEPTION 'No se puede registrar una venta en una caja cerrada';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql^^

DROP TRIGGER IF EXISTS trg_validar_caja_venta ON Venta^^
CREATE TRIGGER trg_validar_caja_venta
BEFORE INSERT ON Venta
FOR EACH ROW EXECUTE FUNCTION fn_validar_caja_venta()^^

-- -------------------------------------------------------------
-- 8. Validar límite de crédito del cliente antes de Venta
-- -------------------------------------------------------------
CREATE OR REPLACE FUNCTION fn_validar_limite_credito()
RETURNS TRIGGER AS $$
DECLARE
    v_deuda_actual NUMERIC(10,2);
    v_limite       NUMERIC(10,2);
BEGIN
    IF NEW.id_cliente IS NOT NULL AND NEW.estado = 'CREDITO' THEN

        SELECT COALESCE(SUM(v.total) - COALESCE(SUM(p.monto), 0), 0)
        INTO v_deuda_actual
        FROM Venta v
        LEFT JOIN Pago p ON p.id_venta = v.id_venta
        WHERE v.id_cliente = NEW.id_cliente
          AND v.estado     = 'CREDITO';

        SELECT limite_credito INTO v_limite
        FROM Cliente WHERE id_cliente = NEW.id_cliente;

        IF v_deuda_actual >= v_limite THEN
            RAISE EXCEPTION 'El cliente ha superado su límite de crédito';
        END IF;

    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql^^

DROP TRIGGER IF EXISTS trg_validar_limite_credito ON Venta^^
CREATE TRIGGER trg_validar_limite_credito
BEFORE INSERT ON Venta
FOR EACH ROW EXECUTE FUNCTION fn_validar_limite_credito()^^

-- =============================================================
-- VISTAS
-- =============================================================

CREATE OR REPLACE VIEW v_deuda_cliente AS
SELECT
    c.id_cliente,
    c.nombre,
    c.limite_credito,
    ROUND(COALESCE(SUM(v.total), 0) - COALESCE(SUM(p.monto), 0), 2) AS deuda_actual,
    ROUND(c.limite_credito - (COALESCE(SUM(v.total), 0) - COALESCE(SUM(p.monto), 0)), 2) AS credito_disponible
FROM Cliente c
LEFT JOIN Venta v ON v.id_cliente = c.id_cliente AND v.estado = 'CREDITO'
LEFT JOIN Pago  p ON p.id_venta   = v.id_venta
GROUP BY c.id_cliente, c.nombre, c.limite_credito^^

CREATE OR REPLACE VIEW v_stock_producto AS
SELECT
    p.id_producto,
    p.nombre,
    cat.nombre AS categoria,
    p.stock,
    u.nombre   AS unidad_base,
    u.simbolo  AS simbolo_base,
    p.es_fraccionable,
    p.activo
FROM Producto p
LEFT JOIN Categoria    cat ON cat.id_categoria = p.id_categoria
JOIN      UnidadMedida u   ON u.id_unidad      = p.id_unidad_base^^

CREATE OR REPLACE VIEW v_cierre_caja AS
SELECT
    c.id_caja,
    c.fecha_apertura,
    c.fecha_cierre,
    c.saldo_inicial,
    ROUND(SUM(CASE mc.tipo WHEN 'INGRESO' THEN mc.monto ELSE 0 END), 2) AS total_ingresos,
    ROUND(SUM(CASE mc.tipo WHEN 'EGRESO'  THEN mc.monto ELSE 0 END), 2) AS total_egresos,
    ROUND(c.saldo_inicial
        + SUM(CASE mc.tipo WHEN 'INGRESO' THEN mc.monto ELSE 0 END)
        - SUM(CASE mc.tipo WHEN 'EGRESO'  THEN mc.monto ELSE 0 END), 2) AS saldo_esperado,
    c.saldo_final,
    c.estado
FROM Caja c
LEFT JOIN MovimientoCaja mc ON mc.id_caja = c.id_caja
GROUP BY c.id_caja, c.fecha_apertura, c.fecha_cierre,
         c.saldo_inicial, c.saldo_final, c.estado^^

CREATE OR REPLACE VIEW v_notificaciones_pendientes AS
SELECT
    nu.id_usuario,
    u.nombre AS usuario,
    n.id_notificacion,
    n.tipo,
    n.mensaje,
    n.tabla_referencia,
    n.id_referencia,
    n.fecha
FROM NotificacionUsuario nu
JOIN Notificacion n ON n.id_notificacion = nu.id_notificacion
JOIN Usuario      u ON u.id_usuario      = nu.id_usuario
WHERE nu.leida = FALSE
ORDER BY n.fecha DESC^^

-- =============================================================
-- FIN DEL SCHEMA
-- =============================================================
