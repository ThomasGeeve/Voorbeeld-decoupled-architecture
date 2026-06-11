# Decoupled Architecture Demo

A todo application demonstrating a **decoupled architecture** with a .NET backend, React frontend, and Nginx API gateway — all orchestrated with Docker Compose.

## Architecture

```
Browser ──► Nginx (port 8080)
               ├── /api/* ──► .NET Backend (port 5000)
               └── /*     ──► React Frontend (port 80)
```

## Quick start

```bash
docker compose up --build
```

Open [http://localhost:9090](http://localhost:9090).

## Project structure

```
├── Backend/          # .NET 10 Web API (REST)
│   ├── Controllers/
│   ├── Models/
│   ├── Data/
│   ├── Program.cs
│   └── Dockerfile
├── frontend/         # React + Vite SPA
│   ├── src/
│   ├── Dockerfile
│   └── package.json
├── nginx/            # Reverse proxy config
│   └── nginx.conf
├── docs/             # Architecture documentation
│   ├── 01-architectuur.md
│   ├── 02-dotnet-backend.md
│   ├── 03-react-frontend.md
│   ├── 04-nginx-gateway.md
│   ├── 05-docker-opzet.md
│   └── 06-bestaand-project.md
└── docker-compose.yml
```

## What it demonstrates

| Principle | How it's shown |
|-----------|---------------|
| **Decoupled layers** | Backend and frontend are independent containers with no shared code |
| **API contract** | Frontend only knows `/api/todos`, not the backend implementation |
| **API gateway** | Nginx provides a single entry-point and hides internal services |
| **Container isolation** | Each service has its own dependencies and lifecycle |

## Documentation

See the [`docs/`](./docs/) folder for detailed explanations of each component and how to apply this pattern to existing projects.
