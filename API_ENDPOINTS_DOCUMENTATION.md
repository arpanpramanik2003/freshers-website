# API Endpoints Documentation

This document lists all API endpoints used in the Freshers Website project.

## Total API Endpoints: 35

---

## 1. Health & Status Endpoints (2)

### GET /api/health
- **Purpose**: Health check for server status
- **Access**: Public
- **Response**: Server status, uptime, database info, environment

### GET /api/status
- **Purpose**: Basic status endpoint
- **Access**: Public
- **Response**: Status, uploads folder path, timestamp

---

## 2. Authentication Endpoints (2)

### POST /api/login
- **Purpose**: Admin login
- **Access**: Public
- **Body**: `{ username, password }`
- **Response**: `{ access_token }`

### POST /api/admin-password-reset
- **Purpose**: Reset admin password with confirmation code
- **Access**: Secured with RESET_CODE
- **Body**: `{ confirmCode, newUsername, newPassword }`
- **Response**: Success message and deleted count

---

## 3. Public Endpoints (8)

### GET /api/events
- **Purpose**: Get all events
- **Access**: Public
- **Response**: Array of events

### GET /api/schedule
- **Purpose**: Get schedule items
- **Access**: Public
- **Response**: Array of schedule items

### GET /api/team
- **Purpose**: Get team members
- **Access**: Public
- **Response**: Array of team members

### GET /api/freshers-titles
- **Purpose**: Get freshers titles for 2025
- **Access**: Public
- **Response**: Array of titles

### GET /api/tshirts-goodies
- **Purpose**: Get T-shirts and goodies information
- **Access**: Public
- **Response**: T-shirt photo, form URL, and goodies photo

### GET /api/gallery
- **Purpose**: Get gallery items
- **Access**: Public
- **Response**: Array of gallery items

### GET /api/sponsors
- **Purpose**: Get sponsors
- **Access**: Public
- **Response**: Array of sponsors

### POST /api/contact
- **Purpose**: Submit contact message
- **Access**: Public
- **Body**: `{ name, email, message }`
- **Response**: Success message

---

## 4. Admin Endpoints (23)

All admin endpoints require authentication via JWT token (adminRequired middleware).

### File Upload (1)
- **POST /api/admin/upload** - Upload file (with multer)

### Contact Messages (1)
- **GET /api/admin/contact-messages** - Get all contact messages

### Events CRUD (3)
- **POST /api/admin/events** - Create event
- **PUT /api/admin/events/:id** - Update event
- **DELETE /api/admin/events/:id** - Delete event

### Schedule CRUD (3)
- **POST /api/admin/schedule** - Create schedule item
- **PUT /api/admin/schedule/:id** - Update schedule item
- **DELETE /api/admin/schedule/:id** - Delete schedule item

### Team CRUD (3)
- **POST /api/admin/team** - Create team member
- **PUT /api/admin/team/:id** - Update team member
- **DELETE /api/admin/team/:id** - Delete team member

### Gallery CRUD (3)
- **POST /api/admin/gallery** - Create gallery item
- **PUT /api/admin/gallery/:id** - Update gallery item
- **DELETE /api/admin/gallery/:id** - Delete gallery item

### Freshers Titles CRUD (3)
- **POST /api/admin/freshers-titles** - Create freshers title
- **PUT /api/admin/freshers-titles/:id** - Update freshers title
- **DELETE /api/admin/freshers-titles/:id** - Delete freshers title

### T-Shirts and Goodies CRUD (3)
- **POST /api/admin/tshirts-goodies** - Create T-shirts and goodies record
- **PUT /api/admin/tshirts-goodies/:id** - Update T-shirts and goodies by ID
- **PUT /api/admin/tshirts-goodies** - Update or create T-shirts and goodies (upsert)

### Sponsors CRUD (3)
- **POST /api/admin/sponsors** - Create sponsor
- **PUT /api/admin/sponsors/:id** - Update sponsor
- **DELETE /api/admin/sponsors/:id** - Delete sponsor

---

## Endpoint Categories Summary

| Category | Count | Description |
|----------|-------|-------------|
| Health & Status | 2 | Server health and status checks |
| Authentication | 2 | Login and password reset |
| Public APIs | 8 | Publicly accessible data endpoints |
| Admin APIs | 23 | Protected admin endpoints for CRUD operations |
| **TOTAL** | **35** | **Total API endpoints** |

---

## HTTP Methods Used

- **GET**: 10 endpoints (read operations)
- **POST**: 12 endpoints (create operations)
- **PUT**: 11 endpoints (update operations)
- **DELETE**: 2 endpoints (delete operations)

---

## Security

- **Public Endpoints**: 12 endpoints (no authentication required)
- **Protected Endpoints**: 23 endpoints (require JWT authentication via adminRequired middleware)
- **Special Security**: 1 endpoint (admin-password-reset requires RESET_CODE)

---

## File Structure

- `backend/app.js` - Main application file with health/status endpoints
- `backend/routes/auth.js` - Authentication routes (2 endpoints)
- `backend/routes/public.js` - Public routes (8 endpoints)
- `backend/routes/admin.js` - Admin routes (23 endpoints)

---

**Last Updated**: November 17, 2025
**Project**: Freshers Website
**Repository**: arpanpramanik2003/freshers-website
