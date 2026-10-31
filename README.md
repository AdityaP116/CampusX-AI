<div align="center">
  <img src="frontend/public/logo.png" alt="CampusX Logo" width="120" height="120" style="border-radius: 50%" />
  <h1>CampusX</h1>
  <p><strong>A premium, verified student-only marketplace for buying, selling, renting, and trading items safely on campus.</strong></p>

  <p>
    <a href="https://campusx-ai.onrender.com"><strong>🌐 Live Web App (Frontend)</strong></a> •
    <a href="https://campusx-api-zuks.onrender.com"><strong>🚀 Live REST API (Backend)</strong></a> •
    <a href="https://campusx-api-zuks.onrender.com/docs"><strong>📖 Swagger API Docs</strong></a> •
    <a href="https://campusx-api-zuks.onrender.com/health"><strong>🩺 Health Check</strong></a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/status-active-success.svg" alt="Status" />
    <img src="https://img.shields.io/badge/frontend-Next.js%2016-black.svg" alt="Next.js" />
    <img src="https://img.shields.io/badge/backend-Express%20%7C%20TypeScript-blue.svg" alt="Backend" />
    <img src="https://img.shields.io/badge/database-Firestore-orange.svg" alt="Firestore" />
    <img src="https://img.shields.io/badge/hosting-Render-46E3B7.svg" alt="Render" />
    <img src="https://img.shields.io/badge/license-ISC-green.svg" alt="License" />
  </p>
</div>

---

## 🌐 Live Deployments (Render)

| Component | Production URL | Description | Health Status |
| :--- | :--- | :--- | :---: |
| **Frontend Web App** | [https://campusx-ai.onrender.com](https://campusx-ai.onrender.com) | Next.js 16 (React 19) Marketplace UI | 🟢 Online |
| **Backend REST API** | [https://campusx-api-zuks.onrender.com](https://campusx-api-zuks.onrender.com) | Express + TypeScript API Server | 🟢 Online |
| **API Documentation** | [https://campusx-api-zuks.onrender.com/docs](https://campusx-api-zuks.onrender.com/docs) | Interactive Swagger UI Explorer | 🟢 Active |
| **API Health Check** | [https://campusx-api-zuks.onrender.com/health](https://campusx-api-zuks.onrender.com/health) | Uptime & System Metrics Endpoint | 🟢 `200 OK` |

---

## 📖 Overview

**CampusX** is an exclusive, enterprise-grade marketplace designed explicitly for verified college and university students. It eliminates the fraud, safety hazards, and fee exploitation of generic platforms (e.g. Craigslist, Facebook Marketplace) by requiring university institutional email verification (`.edu`, `.ac.in`) and restricting trading to trusted campus peers.

Students can buy and sell textbooks, electronics, dorm furniture, and gear with on-campus safe-zone exchanges, real-time messaging, and zero platform fees.

---

## ✨ Features

### 🔐 Verified Authentication & Zero-Trust Security
- **Firebase Auth + Server ID Token Verification:** Strict token verification on every mutation endpoint via `firebase-admin`.
- **Institutional Email Validation:** Dynamic `.edu` and approved domain verification with OTP challenge-response.
- **Brute-Force & Flood Protection:** Multi-tiered rate limiting (global IP limit, 10-req/15-min auth throttling, 20-post/hour listing quotas).
- **HSTS & HTTPS Enforced:** Automatic 301 redirection on insecure connections, preloaded `Strict-Transport-Security`, and hardened Helmet headers.
- **Granular Storage Rules:** Dedicated `/listings/{id}/{file}` rules rejecting files over 10MB or non-image MIME types.

### 🛍️ Campus Marketplace (Products & Listings)
- **Harmonized Data Layer:** Full dual-mode resilience — queries the backend REST API with fallback to Firestore SDK.
- **Comprehensive Filtering:** Real-time search, category classification, condition badges, and price range sliders.
- **Bento Media Gallery:** Drag-and-drop multiple image uploads, preview strips, cover photo selection, and WebP/AVIF compression.
- **Owner-Protected Mutations:** `sellerId` is securely resolved server-side from verified tokens (`req.firebaseUser.uid`), ensuring students can only edit or delete their own items.

### 💬 Real-Time Peer Chat & Negotiations
- **WebSocket Handshakes:** Socket.IO authenticated via Firebase Bearer tokens with origin restriction.
- **Atomic Unread Badges:** Uses Firestore atomic `FieldValue.increment(1)` per conversation to eliminate concurrency race conditions.
- **Contextual Inquiries:** Starts conversations directly pre-populated with the target product thumbnail, title, and asking price.

### 🔍 Production SEO & Accessibility (20-Point Checklist)
- **100% Valid Semantics:** Single `<h1>` per route, structured `<h2>` hierarchies, and descriptive image `alt` tags.
- **Dynamic Sitemap & Robots:** `/sitemap.xml` and `/robots.txt` automatically reflect canonical live routes.
- **Rich Structured Data:** JSON-LD `Organization` schema and `Product` schemas for Google Rich Snippets.
- **Custom Branded 404:** Streamlined fallback page redirecting students back into the marketplace.

---

## 🛠️ Tech Stack

```text
Frontend: Next.js 16 (App Router) • React 19 • Tailwind CSS 4 • Zustand • React Query • Lucide Icons
Backend:  Node.js 22 • Express.js • TypeScript • Socket.IO • Pino Logger • Helmet • Zod
Cloud:    Render (Docker & Web Services) • Firebase Firestore • Firebase Storage • Redis
```

---

## 📂 Repository Structure

```text
CampusX-AI/
├── frontend/                     # Next.js 16 Web Application
│   ├── src/
│   │   ├── app/                  # App Router pages (SSR, layouts, sitemap, robots)
│   │   ├── features/             # Feature modules (auth, marketplace, chat)
│   │   ├── lib/                  # Firebase client configuration
│   │   └── shared/               # Reusable UI primitives, stores, and providers
│   ├── next.config.ts            # Image domains, formats (AVIF/WebP), and 301 redirects
│   └── package.json
│
├── backend/                      # Express + TypeScript REST API
│   ├── src/
│   │   ├── config/               # Environment, Firebase Admin, and Redis configs
│   │   ├── controllers/          # Request handlers with clean architecture
│   │   ├── docs/                 # Swagger / OpenAPI documentation
│   │   ├── middlewares/          # Auth JWT, rate limiters, Zod validators, audit logger
│   │   ├── models/               # TypeScript data models and DTO interfaces
│   │   ├── repositories/         # Firestore database access layer
│   │   ├── routes/               # API endpoint definitions
│   │   ├── services/             # Core business and authorization logic
│   │   └── validators/           # Zod schema definitions
│   ├── Dockerfile                # Production multi-stage Alpine build
│   └── package.json
│
├── firestore.rules               # Firestore security rules
└── storage.rules                 # Cloud Storage upload security rules
```

---

## 🚀 Local Development Setup

### 1. Clone the repository
```bash
git clone https://github.com/AdityaP116/CampusX-AI.git
cd CampusX-AI
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create `backend/.env`:
```env
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000,https://campusx-ai.onrender.com
ALLOWED_EMAIL_DOMAINS=nhitm.ac.in,edu
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
# Optional: Real Firebase Admin credentials (defaults to campusx-ai project emulator)
# FIREBASE_PROJECT_ID=campusx-ai
# FIREBASE_CLIENT_EMAIL=firebase-adminsdk@...
# FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
# FIREBASE_STORAGE_BUCKET=campusx-ai.firebasestorage.app
```
Start backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```
Create `frontend/.env.local`:
```env
NEXT_PUBLIC_BACKEND_URL=https://campusx-api-zuks.onrender.com/api/v1
NEXT_PUBLIC_SITE_URL=https://campusx-ai.onrender.com
```
Start frontend:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚢 Render Deployment Guide

### Backend Service (Web Service via Docker)
1. In the [Render Dashboard](https://dashboard.render.com), create a **New Web Service**.
2. Connect `https://github.com/AdityaP116/CampusX-AI`.
3. Set **Root Directory** to: `backend`.
4. Set **Runtime** to: `Docker`.
5. Add the following **Environment Variables**:
   - `NODE_ENV`: `production`
   - `PORT`: `8080` (or `5000`)
   - `CORS_ORIGIN`: `https://campusx-ai.onrender.com`
   - `ALLOWED_EMAIL_DOMAINS`: `nhitm.ac.in,edu`
   - `FIREBASE_PROJECT_ID`: Your Firebase Project ID
   - `FIREBASE_CLIENT_EMAIL`: Your Firebase Service Account Email
   - `FIREBASE_PRIVATE_KEY`: Your Firebase Service Account Private Key (with newlines)
   - `FIREBASE_STORAGE_BUCKET`: Your Firebase Storage Bucket URL
   - `REDIS_URL`: *(Optional)* Your Redis connection string

### Frontend Service (Web Service via Node)
1. Create a **New Web Service** (Node runtime).
2. Connect `https://github.com/AdityaP116/CampusX-AI`.
3. Set **Root Directory** to: `frontend`.
4. Set **Build Command** to: `npm install && npm run build`
5. Set **Start Command** to: `npm run start`
6. Add the following **Environment Variables**:
   - `NEXT_PUBLIC_BACKEND_URL`: `https://campusx-api-zuks.onrender.com/api/v1`
   - `NEXT_PUBLIC_SITE_URL`: `https://campusx-ai.onrender.com`
   - `NEXT_PUBLIC_FIREBASE_API_KEY`: Your Firebase Web API Key
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`: `your-app.firebaseapp.com`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`: `your-app-id`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`: `your-app.firebasestorage.app`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`: Your Sender ID
   - `NEXT_PUBLIC_FIREBASE_APP_ID`: Your Firebase Web App ID

---

## 🧪 Testing & Code Quality

```bash
# Run backend unit & integration tests
cd backend && npm run test

# Run TypeScript strict type-check
cd backend && npm run type-check
cd ../frontend && npm run type-check
```

---

## 📄 License
This project is licensed under the **ISC License**.

---

<div align="center">
  <sub>Built for students, by students. CampusX Core Engineering.</sub>
</div>
