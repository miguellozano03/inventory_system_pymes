# Sistema de Inventario SaaS

Sistema de gestión de inventarios orientado a pequeñas y medianas empresas (PYMES), construido con Django, Django Ninja y React. Permite administrar productos, categorías, clientes, proveedores y movimientos de inventario desde una única aplicación web, con control de stock y seguimiento de compras y ventas por empresa.

## Características

- Gestión de productos y categorías.
- Control de stock en tiempo real: las transacciones de entrada y salida ajustan el inventario automáticamente.
- Registro de transacciones de entrada (compras) y salida (ventas), con detalle por producto.
- Administración de clientes y proveedores.
- Autenticación y autorización mediante JWT, con roles de usuario.
- Registro de empresas que crea automáticamente la compañía y su usuario administrador.
- Panel de control (dashboard) con módulos de productos, categorías, clientes, proveedores, transacciones, perfil y ajustes.
- Documentación Swagger de la API en `/api/docs`.

## Arquitectura SaaS (multiempresa)

Cada empresa aísla su información mediante un campo `company` (foreign key) presente en todos los modelos (usuarios, productos, categorías, clientes, proveedores y transacciones). Toda consulta de la API filtra por `request.user.company`, garantizando el aislamiento de datos entre empresas.

El modelo de usuario (`accounts.User`) se autentica con correo electrónico (campo `email` único) y define los roles `ADMIN`, `SELLER` y `VIEWER`.

## Stack tecnológico

### Backend

- Python 3.12
- Django 6
- Django Ninja con ninja-extra (controladores) y ninja-jwt (tokens)
- SQLite como base de datos local
- JWT Authentication

### Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- React Router v7
- Axios (cliente HTTP con interceptor de refresh de tokens)

## Estructura del repositorio

```
backend/
  apps/
    accounts/      # Usuarios, autenticación y registro
    companies/     # Empresa del usuario
    contacts/      # Clientes y proveedores
    inventory/     # Categorías y productos
    transactions/  # Compras y ventas con detalle
  core/
    api.py         # Instancia NinjaExtraAPI y registro de controladores
    settings.py    # Configuración de Django
frontend/
  src/
    api/           # Cliente Axios con manejo de tokens JWT
    services/      # Servicios tipados por dominio
    hooks/         # Hooks React por dominio
    pages/         # Vistas de autenticación e inventario
    router/        # Rutas protegidas y de acceso público
```

## API

Todos los endpoints viven bajo `/api/`. La documentación interactiva (Swagger) está en `/api/docs`.

- `/api/token/pair` — iniciar sesión y obtener tokens JWT (acceso y refresco).
- `/api/token/refresh` — renovar el token de acceso.
- `/api/token/verify` — verificar un token.
- `/api/accounts/register` — registrar una empresa con su usuario administrador.
- `/api/accounts/me` — consultar y actualizar el perfil; cambiar contraseña.
- `/api/companies/me` — consultar y actualizar la compañía (solo ADMIN).
- `/api/inventory/categories` — CRUD de categorías.
- `/api/inventory/products` — CRUD de productos (referencia interna única por empresa).
- `/api/contacts/customers` — CRUD de clientes.
- `/api/contacts/suppliers` — CRUD de proveedores.
- `/api/transactions` — listar, crear y eliminar transacciones.

Las transacciones de tipo entrada (`IN`, compra) requieren un proveedor; las de tipo salida (`OUT`, venta) requieren un cliente. Cada transacción actualiza el stock de los productos y guarda un detalle con precio unitario y subtotal; al eliminarla se revierte el stock.

## Ejecución local

### Backend (puerto 8000)

```bash
cd backend
source venv/bin/activate
python manage.py runserver
```

### Frontend (puerto 5173)

```bash
cd frontend
pnpm install
pnpm dev
```

El frontend consume `http://localhost:8000/api` por defecto (configurable mediante `VITE_API_URL`).