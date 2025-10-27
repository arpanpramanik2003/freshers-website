# ABHIGRAHA 2K25 – Freshers Website

A comprehensive web app for organizing, managing, and displaying information for the college freshers event **ABHIGRAHA 2K25**. Includes event schedules, dynamic displays, team showcase, image gallery, sponsor listings, goodies/prizes, and a full-featured admin panel for CRUD operations.

---

## 🚀 Features

- **Live Event Countdown & Info:** Animated countdown, event display, live updates
- **Team & Participants Dashboard:** Display of team members, sponsors, prize details, and event photos
- **Admin Panel:** Full CRUD for events, schedule, gallery, prizes, team, goodies, sponsors (JWT-secured)
- **Contact Form:** Query collector for attendees and users
- **File Uploads:** Admin panel allows direct image uploads for gallery/events
- **Modern UI:** React, TailwindCSS, and smooth interactive animations

---

## 🛠️ Tech Stack

**Frontend:**
- React 19, Vite, React Router DOM
- TailwindCSS, ESLint
- Vercel SPA deployment

**Backend:**
- Node.js, Express.js
- Sequelize ORM (PostgreSQL or SQLite)
- JWT authentication
- Multer file uploads, dotenv, nodemon
- Render app cloud deployment

---

## 📁 Directory Structure

```
freshers-website/
├── backend/          # Express backend (API, models, admin, render.yaml)
│   ├── app.js
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── render.yaml
├── frontend/         # React frontend (src/, vite.config.js, vercel.json)
│   ├── src/
│   │   ├── App.jsx
│   │   ├── pages/
│   │   ├── components/
│   │   └── config/api.js
│   ├── vite.config.js
│   └── vercel.json
├── .gitignore
└── package.json      # Monorepo (meta)
```

---

## ⚡ Quickstart

### 1. Clone
```bash
git clone https://github.com/arpanpramanik2003/freshers-website.git
cd freshers-website
```

### 2. Backend
```bash
cd backend
npm install
# Create .env with:
# PORT=10000
# DATABASE_URL=your_postgres_url
# JWT_SECRET_KEY=...
# FRONTEND_URL=...
# ADMIN_RESET_CODE=...
npm run dev
```
Production deploy with Render.com (see `render.yaml`).

### 3. Frontend
```bash
cd frontend
npm install
# Optional: .env for API URL
npm run dev
```
Production deploy with Vercel (auto-detects from `vercel.json`).

---

## 🧩 API (Major Endpoints)

| Route           | Method | Auth   | Purpose                |
|-----------------|--------|--------|------------------------|
| `/api/events`   | CRUD   | Admin  | Manage/view events     |
| `/api/schedule` | CRUD   | Admin  | Manage/view schedule   |
| `/api/team`     | CRUD   | Admin  | Manage/view team       |
| `/api/gallery`  | CRUD   | Admin  | Manage/view gallery    |
| `/api/sponsors` | CRUD   | Admin  | Manage/view sponsors   |
| `/api/tshirts-goodies` | CRUD | Admin | Goodies/prizes |
| `/api/auth`     | POST   | Public | Login/reset admin      |
| `/api/contact`  | POST   | Public | Send contact messages  |

All major admin APIs require JWT tokens. Regular site users only use GET endpoints.

---

## 🌐 Deployment

- **Backend:** Render cloud (Node.js) using `render.yaml` auto-provisions the app
- **Frontend:** Vercel deployment (SPA, rewrites all routes to `index.html`)

---

## 🤝 Contributing

1. Fork the repo, work in feature branches
2. Open PRs for review
3. Use Issues to report bugs
4. Formatted code contributions are welcome!

---

## 📜 License

Feel free to use/adapt for your college event. Provided as open educational event software.

---

**Keywords:** ABHIGRAHA 2K25, freshers, React, Express, Vite, college event, CRUD, admin, Render, Vercel

---

*Auto-generated via Comet Assistant.*
