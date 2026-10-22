# Plan de migración y respaldo de datos

## 1. Introducción

**Objetivo.** Este documento planifica y documenta el proceso de migración y de respaldo de los datos del Sistema de Inventario SaaS para PyMEs, y define los instrumentos de recolección de información (listas de chequeo) necesarios para revisar las modificaciones realizadas durante un proceso de migración de software y las adaptaciones implementadas después de ella. Las listas de chequeo constituyen la evidencia objetiva de que cada paso de la migración y cada ajuste de configuración, código, datos o despliegue fue ejecutado, verificado y registrado.

**Alcance.** Aplica a: **bases de datos** (SQLite de desarrollo, PostgreSQL de producción y la instancia local de postgres 16 de `docker-compose.yml`); **aplicaciones** (backend Django 6 y frontend React 19); **documentación** (`AGENTS.md`, `README` y los planes del repositorio); y **despliegue** (backend en Render, SPA en Vercel). No incluye desarrollo de funcionalidades nuevas, salvo los registros de adaptación posteriores a la migración.

**Justificación.**

- **Pérdida de datos**: el contenedor del backend en Render usa disco efímero (~512 MB) que se resetea en cada despliegue; cualquier dato persistido solo en ese disco se pierde irremediablemente. La base de datos de producción es externa y debe respaldarse de forma independiente.
- **Continuidad del negocio**: ante un fallo, un error de migración o una restauración requerida, la organización debe poder recuperar los datos de inventario, contactos y transacciones dentro de un tiempo conocido y verificado.
- **Cumplimiento del aislamiento multi-tenancy**: el sistema es multiempresa y el aislamiento se implementa mediante filtrado manual por `request.user.company`. Una migración mal verificada (duplicación de registros, pérdida de unicidades o mezcla de datos de compañías) rompería la confianza del servicio y vulneraría la privacidad de los clientes.

**Referencia normativa.** La actividad de migración corresponde al proceso de mantenimiento de la norma **ISO/IEC 14764** (*Ingeniería del software — Mantenimiento de software*), actividad 5 (Migración), que exige planificar, ejecutar y verificar la migración para garantizar la integridad de los datos. Adicionalmente se adoptan las buenas prácticas operativas de respaldo: **frecuencia definida**, **política de retención**, **almacenamiento fuera de la instancia** y **restauración verificada** (un respaldo solo existe cuando se probó su restauración). Los detalles operativos y los umbrales de rendimiento se referencian de `docs/plan-mantenimiento.md` y `docs/plan-validacion-hardware.md` respectivamente, sin repetir su contenido.

## 2. Descripción de los entornos y del flujo de datos

El proyecto cuenta con tres entornos de datos verificados en la implementación:

| Entorno | Base de datos | Ubicación | Datos que aloja | Secretos |
| --- | --- | --- | --- | --- |
| DEV | SQLite (`backend/db.sqlite3`) | Backend local del desarrollador; seleccionada por `ENVIRONMENT=DEV` en `backend/core/settings.py` | Datos de pruebas y desarrollo | `backend/.env` local |
| Docker local | PostgreSQL 16 (`postgres:16-alpine`) | `docker-compose.yml`, puerto host 5433, usuario/contraseña `inventory`/`inventory_dev`, base `inventory_db`, volumen `pgdata:/var/lib/postgresql/data` | Réplica local del esquema y datos de PROD para validación | Variables del propio `docker-compose.yml` (solo desarrollo) |
| PROD | PostgreSQL externo | Proveedor vía `DATABASE_URL` (django-environ lee `backend/.env`), cuando `ENVIRONMENT=PROD`; p. ej. Supabase o Neon | Datos reales de las compañías cliente (inventario, contactos, transacciones) | Variables de entorno del dashboard de Render (`DATABASE_URL`, `SECRET_KEY`, `CORS_ALLOWED_ORIGINS`, `LANDING_*`) y de Vercel |

**Modelo de datos.** Todas las tablas usan claves primarias UUID y la mayoría lleva la clave foránea `company` que implementa el aislamiento multiempresa:

| Tabla (app) | Registro | Unicidad verificada | Aislamiento |
| --- | --- | --- | --- |
| `users` (accounts) | Usuario con correo único y rol (ADMIN/SELLER/VIEWER) | `email` único | FK `company` (null para superusuarios) |
| `companies` (companies) | Compañía cliente | `nit` único | — (tabla raíz) |
| `categories` (inventory) | Categoría de producto | `(company, name)` | FK `company` |
| `products` (inventory) | Producto con `stock`, `cost_price`, `sale_price` | `(company, internal_reference)` | FK `company` |
| `suppliers` (contacts) | Proveedor | — | FK `company` |
| `customers` (contacts) | Cliente | `(company, identification)` | FK `company` |
| `transactions` (transactions) | Movimiento IN/OUT con total | — | FK `company` |
| `transaction_details` (transactions) | Detalle por producto (nombre, cantidad, precio, subtotal) | — | Heredada de la transacción |

**Flujo típico de datos.** Durante el desarrollo, el dato maestro vive en DEV (SQLite) con datos sintéticos. Al lanzar el sistema, PROD (PostgreSQL externo) se convierte en la fuente de verdad: compañías, usuarios, productos, contactos y transacciones reales se operan allí. A partir de ese momento el flujo DEV→PROD es solo de **esquema y código** (migraciones Django y despliegues versionados); los datos de producción nunca se copian hacia DEV sin una política de anonimización previa. Este plan cubre el tránsito inicial DEV→PROD (datos) y los tránsitos posteriores de esquema, entorno y hosting.

## 3. Estrategia de respaldo (backup)

**¿Qué respaldar?**

| Elemento | Herramienta | Detalle |
| --- | --- | --- |
| Base PROD (PostgreSQL externo) | `pg_dump` formato custom (`-Fc`) | Respaldos lógicos comprimidos, restaurables con `pg_restore`; herramienta del proveedor/contenedor PostgreSQL |
| Base DEV (SQLite) | `sqlite3 .backup` | Copia consistente; nunca copiar `db.sqlite3` directamente |
| Secretos (`backend/.env`) | Copia cifrada en repositorio externo | `.env` y `db.sqlite3` están en `.gitignore`; se respaldan cifrados con acceso restringido |
| Código fuente | Git (remoto con tags de release) | Incluye migraciones Django, `render.yaml`, `Dockerfile`, `entrypoint.sh`, `frontend/.env.example` |
| Estáticos generados (`collectstatic`) | Regenerables | No se respaldan; se regeneran con `collectstatic --noinput` en cada despliegue |

**¿Cuánto?** Frecuencia diaria para PROD con retención rotativa de **7 respaldos diarios** (una semana) más **un respaldo mensual de retención larga** (p. ej. 12 meses). DEV se respalda semanalmente solo si contiene datos de trabajo no reproducibles.

**¿Dónde?** En **almacenamiento externo a Render**: un bucket de almacenamiento objeto (S3 o compatible), o la opción de respaldos automáticos del proveedor de PostgreSQL gestionado (p. ej. Supabase/Neon) cuando esté disponible en el plan. **Nunca** en el disco efímero del contenedor (512 MB, se resetea en cada deploy) ni en la misma instancia que los datos.

**Procedimiento de respaldo (PROD).**

1. Conectar a la base PROD con credenciales de la `DATABASE_URL`.
2. Ejecutar `pg_dump -Fc` (sección 9) y transferir el archivo al almacenamiento externo cifrado.
3. Validar el archivo: tamaño mayor a cero y lectura con `pg_restore --list`.
4. Registrar fecha, tamaño y ubicación en la bitácora (sección 6).

**Procedimiento de restauración verificada.** La prueba de que el respaldo funciona:

1. Levantar postgres 16 local con `docker compose up -d db` (entorno aislado de PROD).
2. Restaurar el respaldo con `pg_restore` (sección 9).
3. Ejecutar `python manage.py check` contra esa base y comparar conteos por tabla contra el origen (sección 9).
4. Registrar el resultado en la bitácora. Se ejecuta como mínimo **trimestralmente** (sección 8), en línea con `docs/plan-mantenimiento.md`.

## 4. Estrategia de migración

Se distinguen cuatro tipos de migración, todos cubiertos por las listas de chequeo de la sección 5:

- **Migración de esquema**: cambios en los modelos Django. Flujo: `makemigrations` en DEV, revisión manual del SQL generado, `migrate` en DEV y luego en PROD (el `entrypoint.sh` de Render ejecuta `migrate --noinput` en cada despliegue). Las migraciones se versionan en Git.
- **Migración de datos/plataforma**: tránsito DEV (SQLite) → PROD (PostgreSQL). Verifica compatibilidad de tipos (UUID, decimales, texto), unicidades, integridad referencial y tiempos de ejecución en volumen real.
- **Migración de entorno/código**: actualización del backend o del frontend con sus compuertas `python -m pytest -q`, `pnpm lint` y `pnpm build`.
- **Migración entre plataformas de hosting**: p. ej. salida del plan free de Render o cambio de proveedor PostgreSQL; implica recrear servicios, volcar variables de entorno y validar con las listas PL-03 y PL-04.

**Regla de oro**: toda migración que toque datos o esquema exige **respaldo previo obligatorio y verificado** mediante la lista de chequeo PL-01, incluyendo al menos una restauración de prueba antes de iniciar el cambio en PROD.

**Rollback.** Ante fallo, el plan de reversión (definido en `docs/plan-mantenimiento.md`) se ejecuta en este orden: (1) redeploy del *release* anterior en Render (o del commit previo), (2) reintento o reversión de la última migración aplicada y, si la integridad de datos está comprometida, (3) restauración del respaldo previo en la base PROD siguiendo PL-05.

## 5. Listas de chequeo (instrumentos de recolección)

Esta es la sección central del plan. Las listas de chequeo son instrumentos de recolección de información estructurada: cada ítem se verifica ejecutando el criterio indicado, se marca el resultado, se adjunta la evidencia y se firma con responsable y fecha. Cada lista se aplica en su fase respectiva; ningún ítem queda vacío: si no aplica, se marca **N/A** y se justifica en la columna de evidencia.

**Plantilla general del instrumento** (una fila por cada ítem):

| Ítem | Criterio de verificación | Resultado (OK / FALLO / N/A) | Evidencia | Responsable | Fecha |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

### PL-01 — Pre-migración

| Ítem | Criterio de verificación | Resultado (OK / FALLO / N/A) | Evidencia | Responsable | Fecha |
| --- | --- | --- | --- | --- | --- |
| Inventario de tablas | Se lista el esquema completo del origen: `users`, `companies`, `categories`, `products`, `suppliers`, `customers`, `transactions`, `transaction_details`, y ninguna tabla pendiente de migración |  | Salida de `SELECT table_name FROM information_schema.tables ...` | Analista de datos |  |
| Conteo de registros por tabla | Se registra `count(*)` de cada tabla del origen como línea base de comparación |  | Registro de conteos firmado | Analista de datos |  |
| Respaldos completos previos | Se ejecutó el respaldo íntegro del origen (SQLite con `.backup` o PostgreSQL con `pg_dump -Fc`) antes de cualquier cambio |  | Archivo de respaldo + hash | Operador de BD |  |
| Restauración de prueba del respaldo | El respaldo se restauró y leyó sin errores en entorno aislado (postgres 16 local del `docker compose` para PROD) |  | Bitácora de restauración | Operador de BD |  |
| `DATABASE_URL` verificada | La variable `DATABASE_URL` de PROD apunta a la instancia correcta y es alcanzable con las credenciales actuales |  | Prueba de conexión con `pg_dump --list` | Operador de BD |  |
| Versión de PostgreSQL en PROD | Se conoce la versión mayor del PostgreSQL del proveedor (p. ej. 15/16/17) y es compatible con las migraciones planificadas |  | Consulta `SELECT version();` registrada | Analista de datos |  |
| Espacio en disco para respaldos | El destino externo y el origen tienen espacio libre ≥ 2× el tamaño de la base (umbral de `docs/plan-validacion-hardware.md`) |  | Salidas de `df -h` e informe de tamaño del bucket | Operador de BD |  |
| Variables de entorno completas | Están definidas en Render/Vercel: `DATABASE_URL`, `SECRET_KEY`, `CORS_ALLOWED_ORIGINS` y `LANDING_*`, sin valores vacíos |  | Captura del dashboard (sin revelar valores) | Administrador |  |
| Migraciones revisadas | Las migraciones nuevas (`0001_initial.py` u otras) se revisaron en DEV con `sqlite3`/`migrate` y su SQL fue inspeccionado |  | Salida de `python manage.py migrate` en DEV + revisión de PR | Desarrollador |  |
| Congelación de cambios | Se declara ventana de congelación: sin despliegues ni escrituras manuales en PROD durante la migración |  | Acta de congelación firmada | Líder técnico |  |
| Comunicación a usuarios | Los usuarios de las compañías fueron informados de la ventana de mantenimiento y del impacto esperado |  | Comunicado archivado | Líder técnico |  |

### PL-02 — Migración de esquema y datos

| Ítem | Criterio de verificación | Resultado (OK / FALLO / N/A) | Evidencia | Responsable | Fecha |
| --- | --- | --- | --- | --- | --- |
| Migraciones aplicadas en orden | `python manage.py migrate` aplica las pendientes sin errores en DEV y luego en PROD, en el orden de los archivos versionados |  | Salida del comando en ambos entornos | Desarrollador |  |
| `manage.py check` en verde | `python manage.py check` no reporta errores de configuración ni de modelos tras migrar |  | Salida del comando | Desarrollador |  |
| Unicidad de NIT en `companies` | No existen dos compañías con el mismo `nit` en el destino |  | `SELECT nit, count(*) FROM companies GROUP BY nit HAVING count(*) > 1;` sin filas | Analista de datos |  |
| Unicidad de email en `users` | No existen dos usuarios con el mismo `email` en el destino |  | Consulta de duplicados con `GROUP BY email` sin filas | Analista de datos |  |
| Unicidad de referencia de producto por compañía | No se viola `(company, internal_reference)` en `products` |  | Consulta de duplicados sin filas | Analista de datos |  |
| Unicidad de identificación de cliente por compañía | No se viola `(company, identification)` en `customers` |  | Consulta de duplicados sin filas | Analista de datos |  |
| Unicidad de categoría por compañía | No se viola `(company, name)` en `categories` |  | Consulta de duplicados sin filas | Analista de datos |  |
| Integridad de UUID | Claves primarias y foráneas UUID migradas completas (36 caracteres, sin truncamientos ni regeneraciones) |  | Consulta de longitud y comparación contra origen | Analista de datos |  |
| Conteos origen/destino por tabla | El `count(*)` de cada una de las 8 tablas coincide entre origen y destino |  | Comparativa de conteos impresa | Analista de datos |  |
| Integridad referencial | Toda fila de `products.category`, `products.supplier`, `transactions.customer`, `transactions.supplier`, `transactions.user` y `transaction_details.product` resuelve a un registro existente |  | Consultas `LEFT JOIN` sin nulos inesperados | Analista de datos |  |
| Ajuste atómico de stock | El stock de cada producto en destino es consistente con el origen (entradas IN suman, salidas OUT restan) |  | Recalculo de stock por producto comparado con origen | Analista de datos |  |
| Verificación de `transaction_details` | Toda transacción tiene sus detalles y la suma de subtotales por transacción coincide con `transactions.total` |  | Consulta de agregación por transacción | Analista de datos |  |

### PL-03 — Post-migración / verificación funcional

| Ítem | Criterio de verificación | Resultado (OK / FALLO / N/A) | Evidencia | Responsable | Fecha |
| --- | --- | --- | --- | --- | --- |
| Emisión de JWT | `POST /api/token/pair` con credenciales de un usuario de prueba devuelve `access` y `refresh` |  | Respuesta HTTP 200 registrada | QA |  |
| Perfil autenticado | `GET /api/accounts/me` con JWT válido devuelve el usuario correcto |  | Respuesta y claim del token | QA |  |
| Listado de productos | `GET /api/inventory/products` con JWT devuelve solo productos de la compañía del usuario |  | Respuesta registrada | QA |  |
| Ciclo de transacción | Se crea una transacción IN/OUT vía `POST /api/transactions`, se verifica el ajuste de stock y luego se elimina; el stock vuelve al valor previo |  | Respuestas de la API + estados de stock antes/después | QA |  |
| Aislamiento multi-tenancy | Logueado como usuario de la compañía A, no se observa ningún registro de la compañía B en listados ni en detalle de ninguna ruta |  | Evidencia de listados de A sin datos de B | QA |  |
| Swagger disponible | `GET /api/docs` responde 200 y expone las rutas esperadas (`/api/token/*`, `/api/accounts/*`, `/api/companies/*`, `/api/inventory/*`, `/api/contacts/*`, `/api/transactions/*`) |  | Captura de `/api/docs` | QA |  |
| Frontend: login | El flujo de login en la SPA autentica y persiste el JWT en `localStorage` |  | Captura de pantalla | QA |  |
| Frontend: listados y formularios | Las páginas de inventario, contactos y transacciones cargan datos del nuevo entorno y los formularios crean registros |  | Capturas de pantalla | QA |  |
| Suites de pruebas backend | `python -m pytest -q` desde `backend/` termina sin errores |  | Salida de pytest | QA |  |
| Compuertas del frontend | `pnpm lint` (ESLint) y `pnpm build` (`tsc -b && vite build`) terminan sin errores |  | Salidas de ambas herramientas | QA |  |
| Rendimiento | Se cumplen los umbrales de `docs/plan-validacion-hardware.md`: p95 < 500 ms, tasa de error < 1 %, RAM < 70 %, CPU < 80 % |  | Medición de carga registrada | Operador |  |

### PL-04 — Adaptaciones realizadas

| Ítem | Criterio de verificación | Resultado (OK / FALLO / N/A) | Evidencia | Responsable | Fecha |
| --- | --- | --- | --- | --- | --- |
| Cambios en `settings.py` | Toda modificación de configuración (bases de datos, `ALLOWED_HOSTS`, `PASSWORD_HASHERS`, CORS, WhiteNoise, `LANGUAGE_CODE`) quedó registrada y justificada |  | Diff del PR | Desarrollador |  |
| Variables de entorno ajustadas | Los cambios de `DATABASE_URL`, `SECRET_KEY`, `CORS_ALLOWED_ORIGINS` y `LANDING_*` en los dashboards de Render/Vercel están documentados (sin revelar valores) |  | Nota de cambio firmada | Administrador |  |
| `ALLOWED_HOSTS` verificado | El hostname de Render (`RENDER_EXTERNAL_HOSTNAME`) se refleja en `ALLOWED_HOSTS` sin `"*"` en PROD |  | Revisión de `settings.py` y `render.yaml` | Administrador |  |
| Contrato API y Swagger | Los endpoints nuevos o modificados están registrados en `core/api.py` y aparecen en `/api/docs`; el frontend consume los mismos nombres y tipos de campo |  | Comparativa de Swagger contra servicios frontend (`src/services/*`) | Desarrollador |  |
| Migraciones versionadas | Las migraciones creadas están en Git, en orden numérico y son idempotentes en DEV y PROD |  | Historial de `git log` y estado de `migrate --plan` | Desarrollador |  |
| Documentación actualizada | `AGENTS.md`, `README` y los planes (`docs/plan-mantenimiento.md`, `docs/plan-validacion-hardware.md`) reflejan el estado posterior a la migración |  | PR documental | Líder técnico |  |
| Infraestructura versionada | Los cambios en `render.yaml`, `Dockerfile`, `entrypoint.sh` y `docker-compose.yml` están en Git y fueron desplegados |  | Commits asociados | Desarrollador |  |
| Registro de la adaptación | La adaptación queda trazada en Git (commit + PR con revisión) y en la bitácora de la sección 6 |  | Enlace del PR y acta | Líder técnico |  |

### PL-05 — Restauración ante fallo / rollback

| Ítem | Criterio de verificación | Resultado (OK / FALLO / N/A) | Evidencia | Responsable | Fecha |
| --- | --- | --- | --- | --- | --- |
| Orden de rollback definido | Se conoce el orden de ejecución: (1) redeploy del release anterior, (2) reintento/reversión de la migración, (3) restauración del respaldo |  | Acta del simulacro | Líder técnico |  |
| Restauración en entorno aislado | El respaldo elegido se restaura primero en postgres 16 local (`docker compose`) o en una base temporal, sin tocar PROD |  | Bitácora de restauración | Operador de BD |  |
| Integridad post-restauración | Tras restaurar, los conteos por tabla y el `manage.py check` son correctos; no hay duplicados de `nit`, `email`, referencia de producto ni identificación de cliente |  | Comparativa de conteos y consultas de unicidad | Analista de datos |  |
| Decisión: rollback vs. corrección en vivo | Se aplican los criterios: fallo estructural o pérdida de datos → rollback; defecto funcional aislado y reversible → corrección en vivo con respaldo reciente |  | Acta de decisión firmada | Líder técnico |  |
| Responsables y tiempos | Cada rol tiene responsable nombrado y SLA conocido (según sección 9 de `docs/plan-mantenimiento.md`) para ejecutar la restauración |  | Acta de asignación | Líder técnico |  |
| Notificación del incidente | El incidente y la decisión tomada quedan registrados en la bitácora (sección 6) y comunicados a los usuarios afectados |  | Registro de incidente | Líder técnico |  |

## 6. Bitácora / registro de hallazgos

Esta bitácora registra los hallazgos de cada migración y respaldo, y sirve de evidencia de auditoría de las modificaciones y adaptaciones realizadas.

| Hallazgo | Severidad (Crítica/Alta/Media/Baja) | Acción | Responsable | Fecha | Estado |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## 7. Seguridad del resguardo

- **Cifrado en repositorio externo**: los respaldos se almacenan cifrados en repositorio externo (cifrado del bucket o de cliente). El formato custom (`-Fc`) de `pg_dump` comprime pero no cifra; el cifrado del destino es obligatorio.
- **Acceso restringido a secretos**: los respaldos que contienen `.env` o credenciales de base de datos solo son accesibles para los roles de operación; las credenciales de la base PROD no se comparten con entornos de desarrollo.
- **Nunca commitear secretos**: `.env` y `db.sqlite3` están en `.gitignore`; esta exclusión se verifica antes de cada PR con un repaso del `git status --porcelain`.
- **Rotación de credenciales de la BD**: la contraseña de la base PROD se rota periódicamente y después de cualquier fuga o salida de personal; el respaldo automático del proveedor debe seguir funcionando tras la rotación.
- **Aislamiento entre compañías**: los respaldos son por instancia completa (todas las compañías), pero el aislamiento por `company` debe mantenerse durante la migración: no se permite mezclar, duplicar ni reasignar registros de una compañía a otra en ningún paso; las verificaciones de unicidad de PL-02 lo confirman.

## 8. Cronograma de respaldos

| Frecuencia | Actividad | Responsable | Evidencia esperada |
| --- | --- | --- | --- |
| Diaria (automática) | Respaldo PostgreSQL de PROD con `pg_dump -Fc` y transferencia al almacenamiento externo | Operador de BD | Confirmación del respaldo (registro y tamaño) |
| Diaria | Verificación de que el respaldo del día se generó sin errores (en línea con `docs/plan-mantenimiento.md`) | Operador de BD | Registro diario |
| Semanal | Respaldo de DEV (SQLite) si contiene datos no reproducibles | Desarrollador | Archivo `.sqlite3` + fecha |
| Mensual | Respaldo de retención larga de PROD (archivo mensual inmutable) | Operador de BD | Archivo mensual archivado |
| Trimestral | Prueba de restauración verificada del respaldo en postgres 16 local | Operador de BD | Acta de prueba con conteos |
| Por evento | Respaldo adicional antes de cada migración de esquema o datos en PROD (regla de oro de la sección 4) | Operador de BD | Respaldo + registro en bitácora |

## 9. Anexo: comandos

Comandos verificados para la operación de respaldo, migración y verificación de este plan:

```bash
# Respaldo de la base de desarrollo (SQLite) — copia consistente
sqlite3 backend/db.sqlite3 ".backup '/tmp/respaldo.sqlite3'"

# Respaldo de la base PROD (PostgreSQL externo) — formato custom comprimido
pg_dump -d "$DATABASE_URL" -Fc -f respaldo_prod.dump

# Respaldo de la base local del docker-compose (postgres 16 en puerto host 5433)
pg_dump -U inventory -h localhost -p 5433 -Fc -f respaldo.dump inventory_db

# Listar contenido de un respaldo (validación mínima del archivo)
pg_restore --list respaldo.dump

# Restauración en la base local del docker-compose (prueba de restauración)
# Asegurar antes que la base destino esté vacía o sobrescribir con --clean
pg_restore -U inventory -h localhost -p 5433 -d inventory_db respaldo.dump

# Migraciones de esquema Django (DEV primero, revisar SQL, luego PROD)
python manage.py makemigrations
python manage.py migrate
python manage.py check
python manage.py migrate --plan   # revisar las migraciones pendientes

# Conteos por tabla para comparar origen contra destino (en PostgreSQL)
SELECT count(*) FROM users;
SELECT count(*) FROM companies;
SELECT count(*) FROM categories;
SELECT count(*) FROM products;
SELECT count(*) FROM suppliers;
SELECT count(*) FROM customers;
SELECT count(*) FROM transactions;
SELECT count(*) FROM transaction_details;
```

**Nota operativa**: la prueba de restauración se ejecuta contra el **postgres 16 del `docker-compose` local** (entorno aislado), nunca directamente contra PROD; así el procedimiento se valida con la misma versión mayor de PostgreSQL que el entorno de contenedores del proyecto.