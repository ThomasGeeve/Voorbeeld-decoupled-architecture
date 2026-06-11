# React Router

## What is React Router?

React Router is a client-side routing library for React. It enables navigation between different views in a Single Page Application (SPA) without triggering a full page reload from the server.

In a traditional multi-page website, each navigation click requests a new HTML page from the server. In an SPA with React Router, the app loads once and JavaScript dynamically swaps components in and out as the user navigates — giving a faster, app-like experience.

## Key concepts

### BrowserRouter

Wraps the entire app and syncs the UI with the browser's URL bar using the [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API). It makes the app feel like a real website: the back/forward buttons work, bookmarks work, and the URL updates on every navigation.

```jsx
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
```

### Routes & Route

`Routes` is a container that holds individual `Route` components. Each `Route` maps a URL path to a React component. React Router matches the current URL against the defined paths and renders the corresponding component.

```jsx
import { Routes, Route } from 'react-router-dom'

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />
</Routes>
```

### NavLink

A special `<a>` tag replacement that knows whether its URL is currently active. This makes styling the active navigation link straightforward:

```jsx
<NavLink to="/" end style={({ isActive }) => isActive ? activeStyle : linkStyle}>
  Home
</NavLink>
```

The `end` prop ensures the link is only active when the URL is an exact match (e.g., `/` won't stay highlighted on `/about`).

### Link

A simpler version of `NavLink` for navigation without active-state styling:

```jsx
<Link to="/about">Over</Link>
```

## How it works in this project

```
┌─────────────┐       ┌──────────────┐
│ BrowserRouter│──────►│    App.jsx   │
│  (main.jsx)  │       │  Routes,     │
│              │       │  Route,      │
│              │       │  NavLink     │
└─────────────┘       └──────┬───────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
           Home.jsx       About.jsx      Contact.jsx
           path="/"       path="/about"  path="/contact"
```

1. **`main.jsx`** wraps the entire `<App />` in `<BrowserRouter>` — this activates client-side routing.
2. **`App.jsx`** defines a navigation bar with `<NavLink>` elements and a `<Routes>` block that declares three routes.
3. When a user clicks a link, React Router intercepts the click, updates the URL in the address bar, and swaps the page content — **no server request is made**.
4. The browser's back/forward buttons work as expected because React Router manages the history stack.

## Why client-side routing in a decoupled architecture?

- **The backend only serves JSON** — it has no HTML pages to return. Client-side routing is the only option for navigation.
- **No page flashes** — every transition happens instantly in the browser.
- **Nginx handles the fallback** — in production, `nginx.conf` has a `try_files $uri $uri/ /index.html` rule so that direct URL access (e.g., `/about`) serves the SPA correctly instead of returning a 404.

## The SPA fallback

Because React Router runs in the browser, the server must be configured to serve `index.html` for any path that isn't a static file. Otherwise, refreshing `/about` would result in a 404. This project's Nginx config handles this:

```nginx
location / {
    root   /usr/share/nginx/html;
    try_files $uri $uri/ /index.html;
}
```

In development, Vite's dev server handles this automatically.
