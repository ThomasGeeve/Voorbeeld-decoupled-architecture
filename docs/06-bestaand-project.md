# Applying Decoupled Architecture to Existing Projects

## Scenario 1: Existing monolith .NET project with Razor Views

You have a .NET app with server-side rendering (Razor/Blazor) and want to add a React frontend.

### Steps

1. **Add an API layer** to the existing .NET solution:
   ```csharp
   // Convert existing controllers to API controllers
   [ApiController]
   [Route("api/[controller]")]
   public class TodoController : ControllerBase { ... }
   ```

2. **Create a separate React project** (alongside the .NET solution):
   ```bash
   npm create vite@latest frontend -- --template react
   ```

3. **Configure Vite proxy** for development (in `vite.config.js`):
   ```js
   export default defineConfig({
     server: {
       proxy: {
         '/api': 'http://localhost:5000'  // points to your .NET API
       }
     }
   })
   ```

4. **For production**: serve React's `dist/` via Nginx or via ASP.NET's `UseStaticFiles()`.

## Scenario 2: Existing project without Docker

You have a .NET backend and a React frontend but want to apply the decoupled setup.

### Steps

1. **Set up the .NET backend** with controllers and a database.
2. **Create a separate React app** (or use an existing one).
3. **Ensure the frontend uses `/api/` endpoints** (relative paths).
4. **Place Nginx in front** - or another reverse proxy (IIS ARR, YARP, Caddy).

### Option A: Without Docker (local)

```bash
# Terminal 1 - Backend
cd backend
dotnet run --urls http://localhost:5000

# Terminal 2 - Frontend (development)
cd frontend
npm run dev

# Terminal 3 - Nginx (via Docker or local install)
docker run -p 8080:80 -v nginx.conf:/etc/nginx/nginx.conf nginx:alpine
```

### Option B: Backend only in Docker

Adjust `docker-compose.yml` to only containerize the backend while running the frontend locally:

```yaml
services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"    # Now also externally reachable for local frontend
```

## Scenario 3: Existing project with a different stack

The principle remains the same regardless of technology:

| Component | Replace with |
|-----------|-------------|
| Backend | Java Spring Boot, Python FastAPI, Node.js Express, Go Gin |
| Frontend | Vue, Svelte, Angular, or plain HTML/JS |
| Gateway | Nginx, Traefik, Caddy, YARP (.NET), HAProxy |

**The only fixed rule**: communication happens through a fixed API contract (REST/GraphQL/gRPC), not through shared code or direct service calls.

## Best practices for migration

1. **Start with a new API contract** - define the endpoints before writing code
2. **Convert one endpoint at a time** - not everything at once
3. **Use feature flags** - toggle between old (monolith) and new (decoupled) implementation
4. **Keep the API contract stable** - backwards compatibility is essential
5. **Test the contract** - use contract testing (e.g. Pact) or API-level integration tests


## TL;DR
**Backend (.NET)** — says "who can talk to me" via CORS (WithOrigins). It defines the API endpoints and whitelists the frontend's origin.
**Frontend (React)** — says "who I want to talk to" via fetch() or axios. It sends HTTP requests to the backend's URL.
Frontend calls the API, backend allows the call through CORS. That's the core link.
