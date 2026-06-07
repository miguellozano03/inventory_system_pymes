# Sistema de Inventario SaaS

Sistema de gestión de inventarios orientado a pequeñas y medianas empresas (PYMES), desarrollado con Django Ninja, React y PostgreSQL.

La plataforma permite administrar productos, clientes, proveedores y movimientos de inventario desde una única aplicación web, facilitando el control de existencias y el seguimiento de compras y ventas.

## Características principales

- Gestión de productos y categorías.
- Control de stock en tiempo real.
- Registro de entradas y salidas de inventario.
- Administración de clientes y proveedores.
- Gestión de usuarios con diferentes niveles de acceso.
- Dashboard con métricas e información relevante para la operación.
- Arquitectura SaaS (multiempresa).

## Arquitectura SaaS

El sistema está diseñado para soportar múltiples empresas dentro de una misma plataforma.

Cada empresa dispone de sus propios usuarios, productos, clientes, proveedores y transacciones, garantizando el aislamiento de la información mediante tenancy a nivel de base de datos.

## Tecnologías

### Backend

- Python
- Django
- Django Ninja
- PostgreSQL
- JWT Authentication

### Frontend

- React
- TypeScript
- Vite

## Módulos

- Autenticación y autorización.
- Gestión de usuarios y roles.
- Gestión de categorías.
- Gestión de productos.
- Gestión de proveedores.
- Gestión de clientes.
- Gestión de transacciones.
- Dashboard administrativo.

## Objetivo

Brindar a las pequeñas y medianas empresas una herramienta sencilla para centralizar la gestión de inventario, mejorar el control de existencias y optimizar el registro de operaciones comerciales.

## Estado del proyecto

🚧 En desarrollo.
