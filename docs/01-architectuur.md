# Architecture Overview

## Decoupled Architecture

In a **decoupled architecture**, the frontend and backend are developed, built, and deployed as completely independent units. They communicate exclusively through a well-defined API contract.

## How it works

```
Browser ──► Nginx (port 9090)
               ├── /api/* ──► .NET Backend (port 5000)
               └── /*     ──► React Frontend (port 80)
```

## Why decoupled?

| Property | Monolith | Decoupled |
|----------|----------|-----------|
| Deployment | Frontend + backend together | Each layer independently |
| Scalability | Whole app must scale | Only the busy layer scales |
| Technology | 1 stack (e.g. only .NET) | Best tool per layer |
| Changes | Risk of regression across entire app | Impact limited to 1 layer |
| Team work | 1 team at a time | Parallel development possible |

## What each layer does

- **React Frontend**: user interface, browser rendering, no database knowledge
- **.NET Backend**: REST API, business logic, data storage
- **Nginx**: reverse proxy / API gateway, routing, abstraction of internal services
