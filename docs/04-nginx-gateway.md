# Nginx as API Gateway / Reverse Proxy

## Why a reverse proxy?

In a decoupled architecture, you don't expose your backend(s) directly to the outside world. A gateway layer like Nginx provides:

| Benefit | Explanation |
|----------|--------|
| **Single entry-point** | 1 URL for the outside world, regardless of how many services run behind it |
| **Abstraction** | Internal addresses (`backend:5000`) are invisible from the outside |
| **Routing** | Path-based routing: `/api/*` → backend, `/*` → frontend |
| **Flexibility** | You can replace, split, or move backends without changing the client |
| **Load balancing** | Nginx can distribute requests across multiple backend instances |

## Configuration explained

```nginx
events {}

http {
  # upstream blocks define internal services
  upstream backend {
    server backend:5000;    # Docker service name + internal port
  }

  upstream frontend {
    server frontend:80;     # Nginx serving static frontend
  }

  server {
    listen 80;              # Gateway listens on port 80

    location /api/ {
      proxy_pass http://backend;     # Forward to .NET API
      proxy_set_header Host $host;
    }

    location / {
      proxy_pass http://frontend;    # Forward to React frontend
      proxy_set_header Host $host;
    }
  }
}
```

**Important**: the order of `location` blocks matters. Nginx picks the most specific path, so `/api/` is matched before `/*`.
