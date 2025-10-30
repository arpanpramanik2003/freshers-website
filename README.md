# ABHIGRAHA 2K25 — Freshers Website

A full-stack web application for ABHIGRAHA 2K25 to showcase events, schedules, team, sponsors, galleries, and registrations. The stack is optimized for fast iteration, modern DX, and cloud-native hosting.

## Tech Stack
- Frontend: React + Vite + Tailwind CSS (deployed on Vercel)
- Backend: Express.js + Node.js (deployed on Render)
- Database: Supabase (PostgreSQL)
- Storage: Dropbox (static assets/images)
- Auth: JWT-based session handling (if applicable in backend)

Note: This project uses PostgreSQL via Supabase. Any previous references to MongoDB are obsolete and have been removed.

## Monorepo Structure
- frontend/ — React app scaffolded with Vite, styled with Tailwind CSS
- backend/ — Express API server, integrates with Supabase PostgreSQL and Dropbox

## Features
- Dynamic events listing with detail pages
- Day-wise schedule and highlights
- Team and sponsors sections
- Media gallery (images/videos served via Dropbox links)
- Contact and registration flows (forms with validation)
- Admin-ready foundations (routes and components) for content management

## Environments and Deployments
- Vercel (Frontend)
  - Builds the frontend from frontend directory
  - Exposes environment variables to the browser as VITE_*
  - Configure project root to frontend and set build command: `npm run build` (inside frontend) and output: `dist`
- Render (Backend)
  - Runs the Express server from backend
  - Configure start command: `node server.js` or `npm start` (as defined)
  - Add required environment variables
- Supabase (PostgreSQL)
  - Provides the Postgres database connection string and API keys
  - Use Supabase JS client for any direct client-side reads (if needed) and secure server-side operations via the backend
- Dropbox (Static Assets)
  - Host images/media; store and reference shared/public links from the backend or frontend config

## Environment Variables
Create .env files for each package. Do not commit secrets.

Frontend (.env for Vite — variables must start with VITE_):
- VITE_API_BASE_URL=https://<your-render-backend>.onrender.com
- VITE_PUBLIC_ASSETS_BASE=https://dl.dropboxusercontent.com/… (or a folder link transformed for direct access)
- VITE_SUPABASE_URL=https://<your-supabase-project>.supabase.co (optional if frontend uses client)
- VITE_SUPABASE_ANON_KEY=<anon-key> (optional; use only if needed on client)

Backend (.env):
- PORT=8080
- NODE_ENV=production
- DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<db>?sslmode=require (from Supabase)
- SUPABASE_URL=https://<your-supabase-project>.supabase.co
- SUPABASE_SERVICE_ROLE_KEY=<service-role-key> (server-only)
- DROPBOX_ACCESS_TOKEN=<dropbox-token> (server-only, if performing API operations)
- JWT_SECRET=<strong-secret> (if JWT auth is used)
- CORS_ORIGIN=https://<your-vercel-frontend>.vercel.app

## Local Development
Prerequisites: Node.js LTS, npm, Supabase project (for DB creds), optional Dropbox token.

1) Install dependencies
- npm install
- cd frontend && npm install
- cd ../backend && npm install

2) Configure env files
- Create frontend/.env and backend/.env as shown above

3) Start services
- Backend: in backend, run `npm run dev` or `npm start`
- Frontend: in frontend, run `npm run dev` (Vite dev server)

4) Access app
- Frontend: http://localhost:5173 (default Vite)
- Backend: http://localhost:8080 (or PORT you set)

## Build and Deploy
Frontend (Vercel):
- Root directory: frontend
- Build command: npm run build
- Output directory: dist
- Environment variables: add the VITE_* vars

Backend (Render):
- Root directory: backend
- Build command (optional): npm install
- Start command: node server.js or npm start
- Environment variables: DATABASE_URL, SUPABASE_*, DROPBOX_ACCESS_TOKEN, JWT_SECRET, CORS_ORIGIN

## Data and Storage Design
- Database (Supabase/PostgreSQL):
  - Tables: events, schedules, teams, sponsors, media, registrations (adjust to your schema)
  - Access: Prefer server-side queries via backend using pg or @supabase/postgres-js. Avoid exposing service role keys to the client.
- Storage (Dropbox):
  - Use shared links transformed to raw URLs for direct image hosting
  - For programmatic uploads, use Dropbox API via backend with token stored in env

## API Overview (Backend)
- Base URL: /api
- Examples:
  - GET /api/events — list events
  - GET /api/events/:id — event details
  - GET /api/schedule — day-wise schedule
  - GET /api/team — organizers and roles
  - GET /api/sponsors — sponsors and tiers
  - GET /api/media — gallery list (Dropbox URLs)
  - POST /api/register — registration submission
  - Admin routes can be secured with JWT if implemented

## Frontend Overview
- React + Vite app with Tailwind CSS
- Pages: Home, Events, Schedule, Team, Sponsors, Gallery, Contact
- State/data fetching via fetch/axios from backend API
- Environment-driven API base URL (VITE_API_BASE_URL)

## Sample Event JSON
```json
{
  "title": "Hackathon",
  "date": "2025-01-10",
  "venue": "Main Auditorium",
  "tags": ["tech", "coding"],
  "description": "24-hour build sprint for freshers"
}
```

## Roadmap
- [ ] Admin dashboard UI polish and analytics
- [ ] Rich text editor for event descriptions
- [ ] Media upload with progress and moderation (Dropbox API)
- [ ] Notifications and RSVP integration
- [ ] i18n and accessibility audits

## Credits
- Core: React, Vite, Tailwind CSS, Express, pg, Supabase, JWT
- Infra: Vercel (frontend), Render (backend), Dropbox (assets)
- Contributors: College organizing committee and volunteers

## Support
- Issues: https://github.com/arpanpramanik2003/freshers-website/issues
- Discussions: https://github.com/arpanpramanik2003/freshers-website/discussions
- Security: Please report privately via issues with [security] tag

## License
MIT License — see LICENSE if present. Content and assets belong to their respective owners.

—
Built with passion for ABHIGRAHA 2K25 🎉
