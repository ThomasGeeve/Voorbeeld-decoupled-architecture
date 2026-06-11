# Docker Setup

## Why Docker?

Each layer (backend, frontend, gateway) runs in its own container. This provides:

- **Isolation**: each service has its own dependencies, independent of the host
- **Reproducibility**: the same environment on any machine (dev, CI, production)
- **Scalability**: services can be scaled up and down independently
- **Development**: no more "it works on my machine" problems

## Services in docker-compose.yml

```yaml
services:
  backend:
    build: ./Backend     # .NET API
    expose:
      - "5000"                # only reachable internally (via Docker network)

  frontend:
    build: ./frontend            # React (Nginx serving static files)
    expose:
      - "80"

  nginx:
    image: nginx:alpine
    ports:
      - "9090:80"                # only open port to the outside world
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - backend
      - frontend
```

## Docker network

Docker Compose automatically places all services in a shared network. This allows them to find each other using the **service name** as hostname:

- Backend is reachable at `http://backend:5000`
- Frontend is reachable at `http://frontend:80`
- Nginx references these in its configuration

## How to start

```bash
# Build and start
docker compose up --build

# Run in background
docker compose up -d --build

# Stop
docker compose down

# Rebuild after changes
docker compose up --build
```

After `docker compose up`, the app is available at `http://localhost:9090`.
