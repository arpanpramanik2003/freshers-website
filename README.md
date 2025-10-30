# ABHIGRAHA 2K25 — Freshers Website

<p align="center">
  <a href="https://vercel.com" target="_blank"><img alt="Vercel" src="https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white"></a>
  <a href="https://render.com" target="_blank"><img alt="Render" src="https://img.shields.io/badge/Deploy-Render-2A7FFF?logo=render&logoColor=white"></a>
  <a href="https://supabase.com" target="_blank"><img alt="Supabase" src="https://img.shields.io/badge/Database-Supabase-3FCF8E?logo=supabase&logoColor=white"></a>
  <a href="https://dropbox.com" target="_blank"><img alt="Dropbox" src="https://img.shields.io/badge/Storage-Dropbox-0061FF?logo=dropbox&logoColor=white"></a>
  <a href="https://github.com/arpanpramanik2003/freshers-website/actions" target="_blank"><img alt="CI" src="https://github.com/arpanpramanik2003/freshers-website/actions/workflows/ci.yml/badge.svg"></a>
  <a href="#license" target="_self"><img alt="License" src="https://img.shields.io/badge/License-MIT-yellow.svg"></a>
  <a href="https://github.com/arpanpramanik2003/freshers-website/stargazers"><img alt="Stars" src="https://img.shields.io/github/stars/arpanpramanik2003/freshers-website?style=social"></a>
  <a href="https://github.com/arpanpramanik2003/freshers-website/graphs/contributors"><img alt="Contributors" src="https://img.shields.io/github/contributors/arpanpramanik2003/freshers-website"></a>
</p>

A production-ready, cloud-native platform for ABHIGRAHA 2K25 that showcases events, schedules, teams, sponsors, media galleries, and secure registrations. The system is designed for high reliability, low latency, and smooth content operations through a modular architecture deployed across Vercel (frontend) and Render (backend), with Supabase (PostgreSQL) for relational data and Dropbox for asset delivery.

Highlights
- Purpose: Provide a polished, scalable, and easily maintainable website for college freshers with admin workflows, analytics-ready data, and delightful UI/UX.
- Cloud architecture: Edge-optimized static frontend on Vercel + containerized API on Render + managed PostgreSQL (Supabase) + Dropbox CDN-like delivery for media.
- Modular design: Clear separation of concerns between frontend (React/Vite/Tailwind), backend (Express/Node), data access (pg/Supabase client), and storage (Dropbox SDK/links).
- Advanced features: Admin dashboard foundations, secure registration (validation + server-side checks), media gallery with cloud image uploads, sponsor tiers, schedule planner, and extensible content types.

Quick Links
- Live site: https://<your-vercel-app>.vercel.app
- Backend API: https://<your-render-service>.onrender.com/api
- Issues: https://github.com/arpanpramanik2003/freshers-website/issues
- Discussions: https://github.com/arpanpramanik2003/freshers-website/discussions

## Technology Stack

| Layer     | Technologies | Hosting |
|---------- |--------------|---------|
| Frontend  | React, Vite, Tailwind CSS | Vercel |
| Backend   | Node.js, Express, pg, Zod/Joi (validation) | Render |
| Database  | Supabase (PostgreSQL) | Supabase |
| Storage   | Dropbox (raw links + API uploads) | Dropbox |
| CI/CD     | GitHub Actions (lint/test/build) | GitHub |

## Architecture Overview

- Frontend (SPA): Static assets served by Vercel with environment-injected VITE_* vars; communicates with backend via REST.
- Backend (API): Express server exposing /api routes; handles validation, auth (JWT-ready), and integrates with Supabase and Dropbox.
- Database: Normalized tables for events, schedules, teams, sponsors, media, registrations; uses SQL migrations and indexes for performance.
- Media: Dropbox shared links transformed to raw URLs for direct image hosting; optional backend upload endpoint with progress + moderation flags.
- Security: CORS whitelisting, input validation, rate limiting (suggested), JWT for admin routes, secrets confined to server envs.

### Logical Modules
- Events: CRUD, tagging, schedule mapping.
- Schedule: Day/time slots, stages/venues, highlights.
- Team: Roles, departments, social links.
- Sponsors: Tiered listing with logos and links.
- Media: Gallery with pagination, lazy loading; supports image/video.
- Registration: Public form -> server validation -> persistence -> optional email confirmation.
- Admin: Role-based access (JWT), dashboards for content ops and review queues.

## Monorepo Structure
- frontend/ — React app scaffolded with Vite, styled with Tailwind CSS
- backend/ — Express API server, integrates with Supabase PostgreSQL and Dropbox

## Environments and Deployments

- Vercel (Frontend)
  - Root directory: frontend
  - Build command: npm run build
  - Output directory: dist
  - Environment variables: VITE_* only
- Render (Backend)
  - Root directory: backend
  - Start command: node server.js or npm start
  - Env: DATABASE_URL, SUPABASE_*, DROPBOX_ACCESS_TOKEN, JWT_SECRET, CORS_ORIGIN
- Supabase (PostgreSQL)
  - Connection string (DATABASE_URL) with sslmode=require
  - Prefer server-side queries; avoid exposing service role keys to client
- Dropbox (Assets)
  - Use transformed raw URLs for direct display
  - Perform programmatic uploads from backend using access token

## Environment Variables

Frontend (.env)
- VITE_API_BASE_URL=https://<render-service>.onrender.com
- VITE_PUBLIC_ASSETS_BASE=https://dl.dropboxusercontent.com/... (raw folder link)
- VITE_SUPABASE_URL=https://<project>.supabase.co (optional)
- VITE_SUPABASE_ANON_KEY= (optional)

Backend (.env)
- PORT=8080
- NODE_ENV=production
- DATABASE_URL=postgresql://user:pass@host:5432/db?sslmode=require
- SUPABASE_URL=https://<project>.supabase.co
- SUPABASE_SERVICE_ROLE_KEY=
- DROPBOX_ACCESS_TOKEN=
- JWT_SECRET=
- CORS_ORIGIN=https://<your-vercel-app>.vercel.app

## API Reference

Base URL: /api

Public endpoints
- GET /api/events — List events
- GET /api/events/:id — Event details
- GET /api/schedule — Day-wise schedule
- GET /api/team — Organizers and roles
- GET /api/sponsors — Sponsors and tiers
- GET /api/media — Gallery list (Dropbox URLs)
- POST /api/register — Registration submission

Admin (secured via JWT; suggest Authorization: Bearer <token>)
- POST /api/admin/events
- PATCH /api/admin/events/:id
- DELETE /api/admin/events/:id

## Local Development

Prerequisites: Node.js LTS, npm, Supabase project, optional Dropbox token

1) Install dependencies
- npm install
- cd frontend && npm install
- cd ../backend && npm install

2) Configure env files
- Create frontend/.env and backend/.env as above

3) Start services
- Backend: cd backend && npm run dev (or npm start)
- Frontend: cd frontend && npm run dev (Vite)

4) Access
- Frontend: http://localhost:5173
- Backend: http://localhost:8080

## Build and Deploy

Frontend (Vercel)
- Root: frontend
- Build: npm run build
- Output: dist
- Env: VITE_* vars

Backend (Render)
- Root: backend
- Build (optional): npm install
- Start: node server.js or npm start
- Env: DATABASE_URL, SUPABASE_*, DROPBOX_ACCESS_TOKEN, JWT_SECRET, CORS_ORIGIN

## Workflows (CI/CD and Ops)

- GitHub Actions: ci.yml to run install, lint, type-check, build, and optional tests on PRs and main.
- Preview Deployments: Vercel auto-previews per PR for frontend; Render can deploy from main or branches for backend.
- Release: Tag semantic versions; use conventional commits; docs changes use docs: prefix.

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

## Authors & Contributors

- Maintainer: @arpanpramanik2003
- Contributors: College organizing committee and volunteers

Badges
- Commits: https://img.shields.io/github/commit-activity/m/arpanpramanik2003/freshers-website
- Issues: https://img.shields.io/github/issues/arpanpramanik2003/freshers-website
- PRs: https://img.shields.io/github/issues-pr/arpanpramanik2003/freshers-website

## Credits
- Core: React, Vite, Tailwind CSS, Express, pg, Supabase, JWT
- Infra: Vercel (frontend), Render (backend), Dropbox (assets)

## Security
- Report vulnerabilities privately via GitHub Issues tagged [security]
- Never commit secrets. Rotate keys on suspicion. Enforce least privilege on Supabase and Dropbox tokens.

## Support
- Issues: https://github.com/arpanpramanik2003/freshers-website/issues
- Discussions: https://github.com/arpanpramanik2003/freshers-website/discussions

## License
MIT License — see LICENSE if present. Content and assets belong to their respective owners.

— Built with passion for ABHIGRAHA 2K25 🎉
