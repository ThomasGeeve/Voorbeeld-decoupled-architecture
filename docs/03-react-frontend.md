# React Frontend

## Why React?

- Component-based: reusable, isolated UI blocks
- Virtual DOM for efficient rendering
- Large ecosystem (React Router, TanStack Query, etc.)
- Builds to static files that can be served by any web server
- Vite as build tool: fast HMR in development, optimized production builds

## Why Vite?

- Extremely fast cold start (ES modules, no bundling needed in dev)
- Hot Module Replacement without page refresh
- Optimized production builds with Rollup
- Minimal configuration required

## What this frontend does

A simple SPA (Single Page Application) that:
1. Fetches todos from `GET /api/todos` on load
2. Creates new todos via `POST /api/todos`
3. Toggles todos via `PUT /api/todos/{id}`
4. Deletes todos via `DELETE /api/todos/{id}`

## Why `API_URL = '/api/todos'`?

The frontend uses **relative paths** (`/api/todos`), not an absolute backend address. This is crucial for a decoupled architecture:

- **Without Nginx**: during development, you can configure Vite's proxy
- **With Nginx**: in production, Nginx catches `/api/*` and routes to the backend
- **No hardcoded URLs**: the frontend doesn't need to know where the backend runs

## Building for production

```bash
npm run build    # generates /dist with static files
```

The `dist/` folder is copied into an Nginx container via the Dockerfile.
