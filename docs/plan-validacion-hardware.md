# Plan de validación de requisitos mínimos de hardware

Documento que define los requisitos mínimos de hardware para desplegar el **Sistema de Inventario SaaS** y el plan para validarlos. El despliegue inicial se realizará en **Render free tier**; este plan establece también las características que deberá cubrir el **VPS** objetivo.

## 1. Contexto

- **Backend**: API Django 6 + Django Ninja (ninja-extra, ninja-jwt), servida con Gunicorn.
- **Frontend**: SPA estática React 19 + Vite, consumida desde el navegador.
- **Base de datos**: SQLite en desarrollo; PostgreSQL previsto para producción (driver `psycopg` ya instalado).
- **Carga esperada**: operación de PYMES — concurrencia baja a moderada (unidades a decenas de usuarios simultáneos) con operaciones CRUD de inventario. La operación más costosa es la creación/eliminación de transacciones, que ajusta el stock de varios productos de forma atómica.

## 2. Plan de validación

El objetivo del plan es confirmar que un VPS con determinadas características soporta la carga real de la aplicación antes de migrar desde Render.

### 2.1 Inventario de referencias

| Referencia | Funcionalidad | Recursos usados |
| --- | --- | --- |
| `/api/token/pair` | Login | CPU ligero (hash de contraseña) |
| `/api/inventory/products` | Listado de productos | CPU + lectura |
| `/api/transactions` (crear/eliminar) | Movimientos de stock | CPU + escritura atómica + ajuste de stock |
| Frontend (build estático) | SPA React | Servido por webserver/CDN, sin carga de proceso |

### 2.2 Requisitos de validación de carga

1. **Prueba de concurrencia (lista + login)** — simular N usuarios concurrentes contra `/api/token/pair` y `/api/inventory/products`.
   - Herramienta sugerida: `hey`, `ab` o `k6` sobre la URL de la API.
   - Ejemplo: `hey -n 500 -c 25 http://<dominio>/api/inventory/products` (con token JWT).
2. **Prueba de transacciones** — crear lotes de transacciones con varios items (lógica más costosa) y medir respuesta.
3. **Prueba de estabilidad (24 h)** — mantener tráfico de fondo y observar memoria y swap.
4. **Validación de almacenamiento** — comprobar crecimiento de la base de datos y espacio para backups.

### 2.3 Herramientas de medición en el VPS

| Métrica | Comando |
| --- | --- |
| CPUs | `nproc` / `lscpu` |
| Memoria RAM | `free -h` |
| Disco | `df -h` |
| Carga del servidor | `uptime` / `vmstat 1` |
| Procesos y memoria por proceso | `top` / `htop` |

### 2.4 Criterios de aceptación

| Métrica | Umbral aceptable |
| --- | --- |
| Tiempo de respuesta (p95) | < 500 ms |
| Tasa de error | < 1 % |
| Uso de memoria RAM promedio | < 70 % (con algo de margen para el SO) |
| Uso de CPU sostenido | < 80 % |
| Espacio en disco | Margen para base de datos + backups (recomendado ≥ 2× el tamaño de la base) |

## 3. Requisitos de hardware recomendados

### 3.1 Despliegue inicial — Render free tier

Render free tier impone los límites mínimos con los que debe funcionar la aplicación:

| Recurso | Render free tier |
| --- | --- |
| vCPU | 0.1 (procesos limitados) |
| RAM | 512 MB |
| Disco | 512 MB (efímero, se resetea en cada deploy) |
| Base de datos | PostgreSQL free (limitada por plan) |
| Comportamiento | Apagado automático por inactividad (spin-down) |

Este plan valida que el software **funciona** dentro de estos límites (benchmark de referencia), aunque su rendimiento puede degradarse ante concurrencia sostenida.

### 3.2 VPS objetivo

Características mínimas con las que se debe desplegar el VPS:

| Recurso | Mínimo | Recomendado |
| --- | --- | --- |
| vCPU | 1 | 2 |
| RAM | 1 GB | 2 GB |
| Disco SSD | 20 GB | 40 GB |
| Sistema operativo | Linux (64 bits) | Linux + swap configurado |
| Red | Conexión estable | Banda ancha simétrica |

Justificación:
- **RAM (1 GB mínimo)**: Gunicorn con 2–3 workers ocupa ~200–400 MB; el resto queda para el SO y la base de datos. Con 512 MB/0.1 vCPU ya corre en Render free, pero sin margen.
- **vCPU (1 mínimo)**: suficiente para CRUD con concurrencia baja; se recomienda 2 para picos de transacciones y compilación/builds ocasionales.
- **Disco (20 GB mínimo)**: el sistema operativo (~5–10 GB), la base de datos y backups. PostgreSQL crece con productos, transacciones y detalle de transacciones (tabla `transaction_details`).
- **Swap**: recomendado para absorber picos de memoria sin matar procesos (OOM-killer).

Número de usuarios estimados soportados con los recursos mínimos: decenas de usuarios simultáneos (operación típica de una PYME). El dimensionamiento depende de la concurrencia real, por eso se ejecuta el plan de validación de la sección 2.

## 4. Requisitos para los clientes (usuarios finales)

Como la plataforma es una **aplicación web**, los requisitos del cliente son mínimos:

- **Navegador web moderno**: última versión (o las dos últimas) de Chrome, Edge, Firefox o Safari. No requiere instalación de software adicional.
- **JavaScript y almacenamiento local habilitados**: el frontend es una SPA y guarda los tokens JWT en `localStorage`.
- **Conexión a internet**: conexión estable; recomendable al menos 1–2 Mbps.
- **Pantalla**: funciona en equipos de escritorio, portátiles, tabletas y celulares (interfaz responsive). Tamaño recomendado ≥ 768 px de ancho para una experiencia cómoda.
- **Estructura de la URL**: acceso vía HTTPS desde el navegador, sin cliente de escritorio.

De este modo, cualquier computadora de oficina o dispositivo móvil con un navegador actualizado es suficiente para operar la plataforma.