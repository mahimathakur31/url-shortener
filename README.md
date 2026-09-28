# URL Shortner

Starter monorepo for a URL shortener with a Next.js frontend and NestJS API.

## Requirements

- Node.js 20+
- npm 10+

## Run locally

```bash
npm install
npm run dev
```

- Frontend: http://localhost:3000
- API: http://localhost:4000

The API stores links in memory for now. Restarting the API clears the links.

## API

- `GET /api/health`
- `POST /api/urls` with `{ "url": "https://example.com" }`
- `GET /api/urls/:code` redirects to the original URL
