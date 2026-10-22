# Plan y cronograma de mantenimiento preventivo y correctivo

[Nombre del aprendiz] — Proyecto formativo SENA

## 1. Introducción, alcance y referencia normativa

**Objetivo.** Establecer el plan de mantenimiento y su cronograma para el Sistema de Inventario SaaS para PyMEs, definiendo las actividades de mantenimiento preventivo y correctivo, sus responsabilidades, criterios de aceptación y procedimientos de retiro, alineados con el proceso de mantenimiento de software de la norma **ISO/IEC 14764:2006** (*Ingeniería del software — Mantenimiento de software*). En algunas guías del programa se cita erróneamente la referencia "ISO 14724"; se asume que corresponde a ISO/IEC 14764:2006, que es la norma que define explícitamente el proceso de mantenimiento empleado en este documento.

**Alcance.** Aplica a todo el ciclo de vida operativo de la solución: backend Django (API REST), frontend SPA React, base de datos (SQLite en DEV, PostgreSQL en PROD), despliegues en Render y Vercel, documentación del repositorio y pruebas automatizadas. No incluye desarrollo de funcionalidades nuevas fuera de solicitudes de modificación (MR), que se gestionan por el mismo proceso.

**Tipos de mantenimiento.**

- **Mantenimiento preventivo:** actividades planificadas y periódicas para evitar fallas, degradación o vulnerabilidades (backups, revisiones de seguridad, auditoría de pruebas y documentación, actualización de dependencias).
- **Mantenimiento correctivo:** intervenciones bajo demanda para corregir defectos detectados en producción o en pruebas (reportes de problema, PR), con triage, análisis, corrección y despliegue.

**Referencia normativa.** ISO/IEC 14764:2006 estructura el proceso de mantenimiento en seis actividades, que se emplean como apartados de este plan: (1) Implementación del proceso de mantenimiento, (2) Análisis de problemas y de modificaciones, (3) Implementación de la modificación, (4) Aceptación y revisión del mantenimiento, (5) Migración, y (6) Retiro. La numeración de este documento sigue ese orden.

## 2. Descripción del sistema

El **Sistema de Inventario SaaS para PyMEs** es una solución multiempresa en la que cada compañía aísla sus datos: todos los modelos de persistencia llevan una clave foránea `company` y el aislamiento se logra mediante filtrado manual por `request.user.company` en cada consulta de los controllers (listado, detalle, creación). Este patrón es manual, no lo garantiza una librería, por lo que constituye un riesgo latente si se omite el filtro en una nueva consulta.

**Arquitectura.** Dos aplicaciones independientes en un repositorio, sin manifiesto raíz compartido:

| Componente | Tecnologías verificadas |
| --- | --- |
| Backend | Python 3.12, Django 6.0.6, django-ninja 1.6.2, django-ninja-extra 0.31.5, django-ninja-jwt 5.4.4, Pydantic 2.13.4, gunicorn 26, WhiteNoise 6.12, django-cors-headers, django-environ, psycopg 3 (PROD) |
| Base de datos | SQLite en DEV (`ENVIRONMENT=DEV`); PostgreSQL externo vía `DATABASE_URL` en PROD (`ENVIRONMENT=PROD`) |
| Frontend | React 19, TypeScript ~6.0.2, Vite ^8, pnpm, Tailwind v4, React Router v7, axios con JWT en `localStorage` y refresco *single-flight* en `src/api/axiosClient.ts` |
| Despliegue | Backend como servicio Docker en Render (`render.yaml`, plan free; *entrypoint*: `migrate` + `collectstatic` + gunicorn con 2 workers); frontend SPA estática en Vercel (`VITE_API_URL`); `docker-compose.yml` local con postgres 16 + backend + frontend |

**Aplicaciones del backend.** `accounts` (Usuario personalizado con PK UUID y correo único; roles ADMIN/SELLER/VIEWER), `companies`, `inventory` (categorías y productos), `contacts` (clientes y proveedores), `transactions` (compras/ventas tipo IN/OUT con ajuste atómico de stock) y `landing`. Los controllers se registran explícitamente en `core/api.py`; todas las rutas viven bajo `/api/` y la documentación Swagger en `/api/docs`. La autenticación es JWT por ruta (`JWTAuth()`), con emisión en `/api/token/pair|refresh|verify`.

**Interfaz y usuarios.** Interfaz web (SPA responsive) consumida desde navegador; no requiere instalación en el cliente. Roles: administrador (gestión de compañía, usuarios y configuración), vendedor (operación de ventas e inventario) y observador (consulta). Los mensajes de error del API se emiten en español (`HttpError(400/409, ...)`) con localización `es-co`; esta convención se mantiene en cualquier corrección.

## 3. Proceso de implementación (del mantenimiento)

Esta actividad, según ISO/IEC 14764, establece y opera el proceso de mantenimiento antes de ejecutar cualquier intervención puntual.

**Procedimientos de recepción.** El mantenimiento se inicia por dos vías:

- **MR (solicitud de modificación):** requerimiento de cambio funcional o no funcional (nuevo filtro, mejora de seguridad, documentación). Se registra con justificación, impacto estimado y prioridad.
- **PR (reporte de problema):** defecto confirmado o incidente en operación (error HTTP, fuga de datos, degradación). Se registra con pasos de replicación, severidad y entorno (DEV/PROD).

**Gestión de configuración.** Todo el cambio pasa por Git: rama principal `main`, ramas de feature (por ejemplo `dev`, `feat/docs`) y *pull requests* hacia `main`. Las migraciones Django hacen parte de la configuración versionada. Los artefactos de despliegue (`render.yaml`, `Dockerfile`, `entrypoint.sh`, `frontend/.env.example`) también se versionan; los secretos (claves JWT, `DATABASE_URL`, tokens) residen únicamente en las variables de entorno de Render/Vercel, nunca en el repositorio.

**Asignación de responsabilidades.** Para cada intervención se designan: responsable de análisis, responsable de implementación y revisor del PR (rol distinto al implementador cuando el equipo lo permite). En mantenimiento preventivo, cada frecuencia del cronograma (sección 9) tiene un responsable asignado.

**Herramientas.**

| Área | Herramienta |
| --- | --- |
| Pruebas backend | `python -m pytest -q` desde `backend/` (pytest + pytest-django) |
| Calidad frontend | `pnpm lint` (ESLint) y `pnpm build` (`tsc -b && vite build`) — esta es la compuerta de tipos |
| Contrato API | Swagger en `/api/docs` |
| Despliegue y monitoreo | Render (backend), Vercel (frontend), logs de gunicorn y del dashboard de cada plataforma |
| Análisis estático backend | `ruff` disponible en el venv, sin gate configurado (sin `pyproject.toml`) |

## 4. Análisis de problemas y de modificaciones

Recibido el PR o el MR, se clasifica y se analiza su impacto.

**Clasificación.** Un PR corresponde a mantenimiento **correctivo** (defecto existente); un hallazgo de las actividades periódicas (revisiones de seguridad, auditoría de pruebas, revisión de dependencias) corresponde a mantenimiento **preventivo** y se convierte en MR cuando se decide intervenir proactivamente.

**Análisis de impacto (ejemplos del proyecto).** El análisis identifica las unidades afectadas — modelos, schemas Pydantic, services/controllers, migraciones, servicios frontend y documentación — y evalúa el riesgo:

| Cambio analizado | Unidades afectadas | Riesgo si no se hace |
| --- | --- | --- |
| Asegurar el filtro de tenancy en toda consulta nueva | controllers de inventory/contacts/transactions | Fuga de datos entre compañías |
| Reemplazar `PASSWORD_HASHERS = [MD5PasswordHasher]` | `settings.py`, cuentas existentes | Hash débil en producción |
| Crear pruebas para `apps/transactions` y `apps/contacts` | `tests.py` (hoy placeholders vacíos) | Regresión silenciosa en el ajuste atómico de stock |
| Eliminar código muerto (`views.py`/`urls.py` obsoletos; `transactions/urls.py` importa `router` inexistente) | apps contacts/inventory/transactions | Confusión, errores de importación |
| Eliminar el uso de `.dict()` de Pydantic v2 (deprecado) | schemas y controllers | Rotura en futuras actualizaciones |
| Corregir `ALLOWED_HOSTS="*"` en `render.yaml` y revisar tokens en `localStorage` | despliegue y cliente | Superficies de ataque (host header, XSS) |
| Actualizar `AGENTS.md` y docs desfasadas | documentación | Decisiones técnicas basadas en información errónea |

**Viabilidad y priorización.** Se descarta lo inviable (por ejemplo, exigir rate limiting completo en plan free sin presupuesto) y se prioriza por severidad × impacto: primero aislamiento de datos, seguridad de contraseñas y pruebas de transacciones; luego deuda técnica y documentación. Se valida la replicación del problema en DEV antes de aprobar el análisis.

## 5. Implementación de la modificación

Una vez aprobado el análisis, la implementación sigue un flujo único para correctivo y preventivo:

1. **Identificar unidades afectadas:** backend (`models.py`, `schemas.py`, `service.py`, `controller.py`, `tests.py`), frontend (`src/services/*`, `src/hooks/*`, `src/pages/*`, `src/api/axiosClient.ts`) y/o despliegue.
2. **Crear rama feature** desde `main` (por ejemplo `fix/tenancy-filter` o `feat/transaction-tests`).
3. **Cambios backend:** mantener la estructura por app (models + schemas Pydantic + service + controller + tests); registrar rutas nuevas en `core/api.py`; conservar el filtrado por `request.user.company` y los mensajes en español (`HttpError`).
4. **Migraciones Django** si el modelo cambia: `makemigrations` en DEV, revisar el SQL generado, `migrate` local antes de commitear.
5. **Cambios frontend** si la interfaz o el contrato cambian: servicio tipado, hook `useState`/`useEffect` correspondiente y página; sin introducir dependencias nuevas sin justificación.
6. **Pruebas:** `python -m pytest -q` en backend y, si se toca frontend, `pnpm lint` y `pnpm build`.
7. **Commit con mensaje descriptivo** y **pull request** hacia `main`; el revisor verifica aislamiento multi-tenant, convención de idioma y cobertura del cambio.

## 6. Aceptación y revisión del mantenimiento

La modificación se acepta cuando cumple todos los criterios aplicables:

- **Pruebas backend:** `python -m pytest -q` en verde; para cambios en `inventory` debe incluirse la prueba de aislamiento multi-tenant; para cambios en `transactions` o `contacts`, se debe crear o ampliar la prueba correspondiente (hoy sus archivos están vacíos).
- **Calidad frontend:** `pnpm lint` sin errores y `pnpm build` (typecheck + bundle) exitoso.
- **Revisión de aislamiento multi-tenant:** toda consulta nueva filtra por `request.user.company`.
- **Rendimiento:** cumplimiento de los umbrales del *plan de validación de hardware* (`docs/plan-validacion-hardware.md`): p95 < 500 ms, tasa de error < 1 %, RAM < 70 %, CPU < 80 %.
- **Seguridad y convención:** no exponer secretos, mensajes en español, rutas bajo `/api/` documentadas en Swagger.

Con la aprobación del PR se establece una **baseline nueva**: versión del código en `main`, conjunto de pruebas vigentes y, si aplica, estado de las dependencias. Cada intervención queda registrada en el historial de Git (commit + PR) con fecha, clasificación (MR/PR), prioridad y responsable.

## 7. Migración

La migración cubre cambios de esquema, de entorno y de plataforma:

- **Migraciones de base de datos:** `python manage.py makemigrations` en DEV, revisión del plan generado y `python manage.py migrate` tanto en DEV como en PROD (el *entrypoint* de Render ejecuta `migrate` en cada despliegue). Se recomienda respaldar antes de migrar en PROD.
- **Migración DEV → PROD (SQLite a PostgreSQL):** verificar compatibilidad de tipos (UUID, campos de texto), de transacciones atómicas y de la secuencia de migraciones; probar el flujo completo de compras/ventas contra postgres 16 local (`docker compose up -d db backend frontend`) antes del despliegue.
- **Transferencia de conocimiento documental:** mantener `AGENTS.md`, `README` y este plan sincronizados con la implementación; corregir documentación desfasada como parte del mantenimiento preventivo.
- **Migración de plataforma:** si Render o Vercel cambian de condiciones (por ejemplo, salida del plan free), documentar pasos: recrear servicio, volcar variables de entorno, actualizar `render.yaml`/build del frontend, repuntar DNS y validar con las pruebas de la sección 6.
- **Rollback y backups:** plan de reversión = redeploy del *release* anterior en Render y reintento de la última migración aplicable; backups periódicos de PostgreSQL (ver cronograma) para restauración point-in-time. El disco de Render es efímero, por lo que los backups deben residir fuera de la instancia.

## 8. Retiro

El retiro se activa cuando la solución llega a fin de vida, se reemplaza por otra plataforma o la compañía cliente solicita baja:

1. **Criterios de fin de vida:** obsolescencia tecnológica no remediable, decisión de negocio o riesgo de seguridad no mitigable dentro del plan.
2. **Backup/export final:** exportar los datos por compañía (categorías, productos, contactos, transacciones y usuarios) preservando el aislamiento por `company`; verificar integridad del archivo antes de continuar.
3. **Desactivación de servicios:** retirar el servicio backend en Render y el sitio en Vercel, desconectar la base de datos PostgreSQL externa y actualizar o eliminar registros DNS asociados. Documentar fecha y responsable.
4. **Eliminación segura de datos:** borrar primero los datos de producción (borrado lógico con retención definida o físico certificado según política), luego destruir claves/variables de entorno y finalmente eliminar el repositorio o archivarlo en solo lectura.
5. **Documentación de archivo:** congelar este plan, el plan de validación de hardware, el historial de PRs y el *release* final como evidencia del ciclo de vida.

## 9. Cronograma de mantenimiento

**Mantenimiento preventivo (planificado):**

| Frecuencia | Actividad | Responsable | Evidencia |
| --- | --- | --- | --- |
| Diaria | Verificar estado del servicio en Render y Vercel (despliegues, errores 5xx en logs de gunicorn) | Responsable de operación | Registro diario |
| Diaria | Verificar backups automáticos de PostgreSQL y notificaciones de error del dashboard | Responsable de operación | Confirmación de backup |
| Semanal | Revisar logs de aplicación y seguridad (intentos de login, `HttpError` inesperados) | Responsable de operación | Informe semanal |
| Semanal | Ejecutar `python -m pytest -q`, `pnpm lint` y `pnpm build`; registrar cobertura y pendientes | Responsable de QA | Salida de las herramientas |
| Mensual | Auditoría de dependencias (Django, React, django-ninja-jwt, gunicorn) y actualización controlada | Responsable técnico | PR de actualización |
| Mensual | Revisión de seguridad: `ALLOWED_HOSTS`, manejo de tokens en `localStorage`, `PASSWORD_HASHERS`, CORS | Responsable de seguridad | Checklist firmado |
| Trimestral | Revisión de documentación (`AGENTS.md`, README, este plan, Swagger) y de código muerto (`views.py`/`urls.py` obsoletos) | Responsable técnico | PR documental |
| Trimestral | Ejecución de pruebas de carga según `docs/plan-validacion-hardware.md` y revisión de umbrales p95/RAM/CPU | Responsable de operación | Informe de validación |
| Trimestral | Revisión del plan de retiro/rollback y de la estrategia de backups (prueba de restauración) | Responsable de operación | Acta de prueba |

**Mantenimiento correctivo (bajo demanda — SLA):**

| Fase | Actividad | SLA objetivo |
| --- | --- | --- |
| Recepción | Registro del reporte de problema (PR) con replicación | 1 día hábil |
| Triage | Clasificación de severidad y asignación de responsable | 1 día hábil |
| Análisis | Estudio de impacto, viabilidad y priorización (sección 4) | 2 días hábiles |
| Corrección | Implementación en rama feature + pruebas (sección 5) | Según severidad: crítico 2 días, mayor 5 días, menor 10 días |
| Aceptación | Revisión del PR y criterios de la sección 6 | 2 días hábiles |
| Despliegue | Merge a `main` y despliegue automático en Render/Vercel | 1 día hábil tras aprobación |

## 10. Matriz resumen: preventivo vs. correctivo

| Criterio | Mantenimiento preventivo | Mantenimiento correctivo |
| --- | --- | --- |
| Disparador | Calendario (cronograma de la sección 9) | Reporte de problema (PR) en operación o pruebas |
| Ejemplo en este proyecto | Auditar que toda consulta filtre por `request.user.company`; revisar `PASSWORD_HASHERS`; actualizar dependencias; probar backups de PostgreSQL | Corregir un endpoint que devuelve datos de otra compañía; arreglar el ajuste atómico de stock en `transactions`; reparar error de build del frontend |
| Impacto típico | Ninguno visible para el usuario; reduce probabilidad de falla | Error visible: HTTP 400/409, fuga de datos, degradación |
| Pruebas de aceptación | `pytest -q`, `pnpm lint`, `pnpm build`, auditoría de seguridad | Mismas pruebas + prueba de regresión específica del defecto |
| Herramientas | pytest, ESLint, Swagger, dashboards de Render/Vercel, `ruff` | Mismo stack + Git/PR + entorno docker compose para replicación |
| Costo/riesgo | Bajo y predecible; evita correctivos mayores | Mayor si se posterga (p. ej. deuda de multi-tenancy o de tests de transacciones) |
| Responsable | Roles de operación/seguridad según cronograma | Implementador + revisor asignados en el PR |
| Registro | Checklist y fechas en el cronograma | Historial de Git (commit, PR) y baseline nueva tras aprobación |
