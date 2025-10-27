# ABHIGRAHA 2K25 — Freshers Website

[![Build](https://img.shields.io/badge/build-passing-brightgreen)](#) [![Deploy-Frontend](https://img.shields.io/badge/vercel-frontend-blue)](#) [![Deploy-Backend](https://img.shields.io/badge/render-backend-purple)](#) [![License](https://img.shields.io/badge/license-MIT-black)](#) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-orange)](#)

Inspire, inform, and onboard first-year students with a modern, responsive event portal. This mono-repo hosts a React SPA frontend and an Express.js API backend for managing events, schedule, team, gallery, sponsors, and goodies.

---

## ✨ Highlights
- Full-stack JS: React (Vite) + Express + MongoDB (via models)
- Clean separation: frontend/ and backend/ workspaces
- Admin-ready: JWT-protected CRUD for all dynamic sections
- Mobile-first UI with fast dev build (Vite) and SPA routing
- Cloud-native deploys: Vercel (frontend) + Render (backend)

---

## 🗂️ Repository Structure
```
freshers-website/
├─ backend/
│  ├─ app.js                 # Express app bootstrap (API + middleware)
│  ├─ routes/
│  │  ├─ admin.js            # Admin endpoints (protected)
│  │  ├─ auth.js             # Login/reset for admin
│  │  └─ public.js           # Public read endpoints
│  ├─ models/                # Mongo/Mongoose models (Events, Team, etc.)
│  └─ package.json
├─ frontend/
│  ├─ index.html             # SPA entry
│  ├─ src/
│  │  ├─ pages/              # Views (Home, Events, Schedule…)
│  │  └─ components/         # Reusable UI blocks
│  └─ package.json
├─ package.json              # Root tooling
└─ README.md
```

---

## 🧭 User Scenarios
- Freshers browse events, schedule, team, sponsors, and gallery with smooth SPA navigation
- Admin logs in, creates/updates events, uploads gallery items, manages team/sponsors
- Visitors submit inquiries via contact; admins receive and respond efficiently

---

## 🔐 Authentication & Roles
- Public: Read-only GET endpoints (events, schedule, team, sponsors, gallery)
- Admin: JWT-protected CRUD on all content domains and admin session management

---

## 🔌 API Overview (Sample)
Base URL: https://<your-backend-host>/api

```
GET   /events                # List events (public)
GET   /events/:id            # Event details
POST  /events                # Create (admin)
PUT   /events/:id            # Update (admin)
DELETE /events/:id            # Delete (admin)

GET   /schedule              # Daily/overall schedule
GET   /team                  # Core team & volunteers
GET   /sponsors              # Sponsor listings
GET   /gallery               # Media gallery

POST  /auth/login            # Admin login → JWT
POST  /auth/reset            # Reset flow (if enabled)
POST  /contact               # Send contact message
```

Notes:
- Provide Authorization: Bearer <token> on admin routes
- Validation errors return 4xx with details; unexpected errors return 5xx

---

## 🧱 Data Flow (ASCII Diagram)
```
[Browser SPA]
   |   fetch JSON (GET)
   v
[Frontend (React/Vite)]  -- axios/fetch -->  [Backend (Express)] -- ODM --> [DB]
   ^                              |                    |
   |             JWT (Bearer) on admin routes         |
   +-------------- Protected admin UI <----------------+
```

---

## 🚀 Quick Start (Local)

Prerequisites: Node 18+, npm, MongoDB URL

1) Clone
```
git clone https://github.com/arpanpramanik2003/freshers-website
cd freshers-website
```

2) Install
```
# root optional
npm install

# backend
cd backend && npm install && cd ..

# frontend
cd frontend && npm install && cd ..
```

3) Environment
Create .env files:
```
backend/.env
  PORT=5000
  MONGO_URI=mongodb+srv://...
  JWT_SECRET=supersecret
  CORS_ORIGIN=http://localhost:5173

frontend/.env
  VITE_API_BASE=http://localhost:5000/api
```

4) Run (two terminals)
```
# backend
cd backend && npm run dev

# frontend
cd frontend && npm run dev
```

5) Open
- Frontend: http://localhost:5173
- API: http://localhost:5000/api

---

## 🛠️ Scripts
Check package.json in each workspace. Typical scripts:
- Backend: dev, start, lint, test
- Frontend: dev, build, preview, lint

---

## 🧪 Advanced Usage
- Seed data: add a seed script to populate events/team for demos
- Image uploads: configure storage (e.g., Cloudinary or S3) in gallery routes
- Role expansion: introduce roles (organizer, editor) via JWT claims
- Caching: add HTTP cache headers for public GETs; CDN on Vercel for assets
- Observability: add request logging and error tracking (pino/winston + Sentry)

---

## 🔍 Example: Admin Event Lifecycle
```
Login → Receive JWT → Create Event → Update Details → Publish → Feature on Home
```
Request example:
```
POST /api/events
Authorization: Bearer <token>
Content-Type: application/json
{
  "title": "Hackathon",
  "date": "2025-01-10",
  "venue": "Main Auditorium",
  "tags": ["tech", "coding"],
  "description": "24-hour build sprint for freshers"
}
```

---

## 🧭 Frontend Pages
- Home: Hero, highlights, CTA to register/explore
- Events: Filterable list + detail views
- Schedule: Day-wise agenda
- Team: Organizers + roles
- Sponsors: Tiers and logos
- Gallery: Photos/videos from events
- Contact: Form with validation

---

## 🗺️ Roadmap
- [ ] Admin dashboard UI polish and analytics
- [ ] Rich text editor for event descriptions
- [ ] Media upload with progress and moderation
- [ ] Notifications and RSVP integration
- [ ] i18n and accessibility audits

---

## 🙌 Credits
- Core: React, Vite, Express, MongoDB, JWT
- Infra: Vercel (frontend), Render (backend)
- Contributors: College organizing committee and volunteers

---

## 💬 Support
- Issues: https://github.com/arpanpramanik2003/freshers-website/issues
- Discussions: https://github.com/arpanpramanik2003/freshers-website/discussions
- Security: Please report privately via issues with [security] tag

---

## 📄 License
MIT License — see LICENSE if present. Content and assets belong to their respective owners.

—
Built with passion for ABHIGRAHA 2K25 🎉
