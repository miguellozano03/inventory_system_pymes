# AGENTS.md

SaaS inventory system for SMBs. Two independent, self-contained apps in one repo — no root manifest or tooling:

- `backend/` — Django 6 + Django Ninja / ninja-extra / ninja-jwt API with its own venv.
- `frontend/` — React 19 + Vite + pnpm + Tailwind v4 SPA.

## Backend

Run commands from `backend/` with the venv activated:

```bash
source venv/bin/activate
python manage.py runserver          # dev server (http://localhost:8000)
python -m pytest -q                 # all tests (pytest.ini already sets DJANGO_SETTINGS_MODULE)
python -m pytest apps/accounts/tests.py -q          # one file
python -m pytest apps/accounts/tests.py::TestAccountEndpoints::test_register -q
```

- pytest wraps ninja-extra's `TestClient(api)` via `from core.api import api`; tests hit module paths like `/accounts/register`.
- `apps/transactions/tests.py` is an empty placeholder.
- ruff/mypy/binaries exist in the venv but there are **no config files** (no `pyproject.toml`); `ruff check apps/ core/` currently reports ~9 fixable errors — don't assume a lint gate exists.

### Architecture (hard-won rules)

- Each Django app is `models.py` + `schemas.py` (Pydantic) + `service.py` (business logic) + `controller.py` + `tests.py`. **But** `contacts` and `inventory` put logic in controllers (no `service.py`). The `views.py`/`urls.py` files lingering in `contacts`, `inventory`, and `transactions` are stale — controllers are the live API.
- Every controller is a ninja-extra `@api_controller` registered **explicitly in `core/api.py`** (`api.register_controllers(...)`). Adding an app/endpoint means registering it there. All routes live under `/api/`; Swagger docs at `/api/docs`.
- Auth is `JWTAuth()` per route; tokens come from ninja-jwt at `/api/token/pair|refresh|verify`.
- Tenancy is **not** a library — it's manual filtering. Every model carries a `company` FK, and every list/get/create must scope by `request.user.company` (see `apps/inventory/controller.py`). You must add this filter to any new query or you leak data across companies.
- Custom `User` (`accounts.User`, `AUTH_USER_MODEL`): login via unique `email`, UUID PK. All model PKs are UUIDs — endpoints take `uuid.UUID` path params.
- The codebase is in **Spanish**: `LANGUAGE_CODE='es-co'`, error strings from services/controllers are Spanish and raised as `HttpError(400/409, "...")`. Keep that convention.

### settings.py gotchas (do NOT "fix" these)

- `DATABASES` is **hardcoded SQLite** (`db.sqlite3`) in `core/settings.py`; the `DATABASE_URL` in `.env`/`.env.example` is ignored locally.
- `PASSWORD_HASHERS = [MD5PasswordHasher]` is an intentional dev-speed choice.
- Settings are loaded from `backend/.env` via django-environ.

## Frontend

Package manager is **pnpm** (lockfile: `pnpm-lock.yaml`). Run from `frontend/`:

```bash
pnpm install
pnpm dev        # Vite dev server (http://localhost:5173)
pnpm lint       # eslint . (flat config, eslint.config.js)
pnpm build      # tsc -b && vite build  ← this is the typecheck gate (no separate typecheck script)
```

- No `node_modules` is currently checked out; install first.
- Backend base URL: `src/api/axiosClient.ts` uses `VITE_API_URL || http://localhost:8000/api`; there is no frontend `.env`.
- `@` aliases `./src` (both `vite.config.ts` and tsconfigs).
- `axiosClient` handles JWT attach + single-flight refresh via localStorage (`access_token`/`refresh_token`) and dispatches an `auth_logout` event on failure.
- Pattern: thin typed services in `src/services/*` + React Query hooks in `src/hooks/*`, consumed by pages under `src/pages/`.

## Git

The project targets `main` but work-in-progress branches often live under feature names (current: `feat/docs`); PRs are merged into `main` (`origin/...` per-feature branches exist).