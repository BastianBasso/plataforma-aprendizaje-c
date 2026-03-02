## Arranque rápido (Windows)

### 1) Backend (Express)

1. Crear el archivo `backend/.env` (no se versiona) usando como base `backend/.env.example`.
2. Instalar dependencias y levantar servidor:

```bash
cd backend
npm install
npm run dev
```

El backend escucha en `http://localhost:8080`.

### 2) Frontend (React SPA)

El backend sirve React desde `frontend/react-spa/dist` bajo `/react`.

```bash
cd frontend/react-spa
npm install
npm run build
```

Luego acceder a:

- `http://localhost:8080/react/`
- `http://localhost:8080/react/login`

### Nota sobre login

Si falta `backend/.env` (variables de BD), el backend no puede conectarse a PostgreSQL y el login/consulta de sesión fallan.
