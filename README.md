<div align="center">
  <img src="frontend/public/logo.png" alt="CampusX Logo" width="110" height="110" style="border-radius: 50%; box-shadow: 0 4px 20px rgba(0,0,0,0.12);" />
  <h1>🎓 CampusX</h1>
  <p><strong>The Verified Peer-to-Peer Marketplace & Community Exclusively for College Students</strong></p>

  <p>
    <a href="https://campusx-ai.onrender.com"><strong>🌐 Live Web App (Frontend)</strong></a> •
    <a href="https://campusx-api-zuks.onrender.com"><strong>🚀 Live REST API (Backend)</strong></a> •
    <a href="https://campusx-api-zuks.onrender.com/docs"><strong>📖 Swagger API Docs</strong></a> •
    <a href="https://campusx-api-zuks.onrender.com/health"><strong>🩺 Health Check</strong></a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/status-production--ready-success.svg?style=flat-square" alt="Status" />
    <img src="https://img.shields.io/badge/frontend-Next.js%2016%20%7C%20React%2019-black.svg?style=flat-square&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/backend-Express%20%7C%20TypeScript-blue.svg?style=flat-square&logo=node.js" alt="Backend" />
    <img src="https://img.shields.io/badge/database-Firestore-FFA611.svg?style=flat-square&logo=firebase" alt="Firestore" />
    <img src="https://img.shields.io/badge/auth-Firebase%20Auth-FFCA28.svg?style=flat-square&logo=firebase" alt="Firebase Auth" />
    <img src="https://img.shields.io/badge/cache-Redis-DC382D.svg?style=flat-square&logo=redis" alt="Redis" />
    <img src="https://img.shields.io/badge/hosting-Render-46E3B7.svg?style=flat-square&logo=render" alt="Render" />
    <img src="https://img.shields.io/badge/license-ISC-green.svg?style=flat-square" alt="License" />
  </p>
</div>

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Live Deployments](#-live-deployments)
- [Key Features](#-key-features)
- [Architecture & Tech Stack](#-architecture--tech-stack)
- [Security & Authentication](#-security--authentication)
- [Marketplace Categories](#-marketplace-categories)
- [Repository Structure](#-repository-structure)
- [Getting Started Locally](#-getting-started-locally)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#1-backend-setup)
  - [Frontend Setup](#2-frontend-setup)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Testing & Quality Assurance](#-testing--quality-assurance)
- [Deployment Guide](#-deployment-guide)
- [Contributing](#-contributing)
- [License](#-license)

---

## 📖 Overview

**CampusX** is a modern, student-exclusive marketplace designed to eliminate the fraud, safety hazards, high fees, and friction of generic public platforms (such as Craigslist or Facebook Marketplace).

Trading is restricted to **verified students** using university emails (`.edu`, `.ac.in`), on-campus designated pickup safe zones (e.g. Student Union, Science Library), real-time peer messaging, and zero student listing fees.

Students can buy, sell, exchange, and rent:
- Course textbooks and study materials.
- Laptops, tablets, monitors, and gadgets.
- Dorm furniture and room essentials.
- Campus event tickets and student services.

---

## 🌐 Live Deployments

| Component | Production URL | Description | Health Status |
| :--- | :--- | :--- | :---: |
| **Frontend Web App** | [https://campusx-ai.onrender.com](https://campusx-ai.onrender.com) | Next.js 16 App Router UI with React 19 & Tailwind CSS | 🟢 Online |
| **Backend REST API** | [https://campusx-api-zuks.onrender.com](https://campusx-api-zuks.onrender.com) | Express + TypeScript Clean Architecture API Server | 🟢 Online |
| **Interactive API Docs** | [https://campusx-api-zuks.onrender.com/docs](https://campusx-api-zuks.onrender.com/docs) | Interactive Swagger UI API Explorer | 🟢 Active |
| **Health Check Endpoint** | [https://campusx-api-zuks.onrender.com/health](https://campusx-api-zuks.onrender.com/health) | Uptime & environment monitor (`{"status":"UP"}`) | 🟢 `200 OK` |

---

## ✨ Key Features

### 🛡️ Verified Student Community
- **University Email Domain Enforcement:** Accounts require verified `.edu`, `.ac.in`, or approved institutional email addresses.
- **Dual Authentication Modes:** Seamless Google OAuth (with university account picker) and secure Email/Password.
- **Cryptographic Token Verification:** Backend strictly verifies Firebase ID tokens via the Firebase Admin SDK.

### 🛍️ Smart Campus Marketplace
- **AI-Powered Query Handling:** Search input recognizes course codes, professor abbreviations, and campus slang.
- **8 Dedicated Category Hubs:** Electronics, Books/Textbooks, Furniture, Clothing, Services, Tickets, Sports & Fitness, Other.
- **Multimodal Listings:** Multi-image upload to Firebase Storage with thumbnail generation.
- **Cursor-Based Pagination & Filters:** Instant filtering by category, condition, price range, and keywords.

### 📍 On-Campus Safe Hubs & Pay-on-Delivery
- Meetups are anchored to verified campus safe zones (Student Union, Campus Library, Dining Hall).
- In-person inspection before payment guarantees student safety and zero counterfeit risks.

### 💬 Real-Time Student Messaging
- Integrated buyer-seller chat with unread counters and optimistic UI updates.
- Conversation history linked directly to listings for clear context.

### ⚡ Performance & Polish
- Animated dynamic hero gradients and live campus pulse indicators.
- Instant responsive layouts across mobile, tablet, and ultra-wide screens.
- Server-Side Rendering (SSR) and Static Site Generation (SSG) with Next.js App Router.

---

## 🏗️ Architecture & Tech Stack

```
   ┌────────────────────────────────────────────────────────┐
   │                  Next.js 16 Frontend                   │
   │  React 19 • Tailwind CSS • Zustand • TanStack Query    │
   └───────────────────────────┬────────────────────────────┘
                               │ HTTPS / JSON & Bearer JWT
                               ▼
   ┌────────────────────────────────────────────────────────┐
   │               Node.js / Express Backend                │
   │   TypeScript • Layered Clean Architecture • Zod        │
   └───────┬───────────────────┬────────────────────┬───────┘
           │                   │                    │
           ▼                   ▼                    ▼
   ┌──────────────┐    ┌──────────────┐     ┌──────────────┐
   │   Firebase   │    │  Firestore   │     │ Redis Cache  │
   │  Admin Auth  │    │  Database    │     │ & Rate Limit │
   └──────────────┘    └──────────────┘     └──────────────┘
```

### Frontend Stack
- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS (Modern tokenized design system) + Lucide Icons + Framer Motion
- **State Management:** Zustand (Persisted auth store, marketplace filters)
- **Data Fetching:** TanStack React Query v5
- **Forms & Validation:** React Hook Form + Zod
- **SDKs:** Firebase Web SDK v12 (Client Authentication, Storage, Firestore fallback)

### Backend Stack
- **Runtime:** Node.js + Express + TypeScript
- **Architecture:** Layered Controller-Service-Repository Pattern
- **Security:** Helmet (COOP: `same-origin-allow-popups`), CORS, express-rate-limit, Zod request sanitization
- **Database:** Firebase Cloud Firestore (NoSQL document store)
- **Identity:** Firebase Admin SDK (Cryptographic ID Token verification)
- **Caching & Throttling:** Redis (ioredis) with in-memory fallback for local development
- **Documentation:** OpenAPI 3.0 / Swagger UI (`/docs`)
- **Testing:** Vitest (17/17 passing unit and contract tests)

---

## 🔒 Security & Authentication

1. **Zero Client Trust:** All sensitive mutations (listing creation, user profile updates, chat initiation) require a valid `Bearer <Firebase_ID_Token>` in the `Authorization` header. Client-provided UIDs are ignored in favor of verified token claims.
2. **COOP Header Compliance:** Configured `Cross-Origin-Opener-Policy: same-origin-allow-popups` to support Google OAuth popups without browser cross-origin policy violations.
3. **Session Cookies:** Secure `SameSite=Lax` cookies (`campusx-token`, `campusx-authed`) synchronize server-side middleware route guards with client authentication state.
4. **Input Sanitization:** 100% of incoming request payloads are validated via strict Zod schemas that strip unknown fields.
5. **Rate Limiting:** Global rate limiters (100 req/15 min) and dedicated auth rate limiters prevent brute force and DDoS abuse.

---

## 🗂️ Marketplace Categories

| Category | Icon | Theme | Sample Items |
| :--- | :---: | :---: | :--- |
| **Electronics** | 📱 | `bg-blue-100` | Laptops, iPads, chargers, headphones, scientific calculators |
| **Books** | 📖 | `bg-green-100` | STEM textbooks, humanities readers, study guides, exam preps |
| **Furniture** | 🛋️ | `bg-yellow-100` | Dorm desks, ergonomic chairs, mini-fridges, lamps, book shelves |
| **Clothing** | 👕 | `bg-purple-100` | University merch, winter jackets, formalwear, lab coats |
| **Services** | 🔧 | `bg-red-100` | Peer tutoring, bike repair, dorm moving help, photography |
| **Tickets** | 🎟️ | `bg-indigo-100` | College fest tickets, sports passes, campus theater events |
| **Sports** | 🏀 | `bg-orange-100` | Commuter bicycles, gym gear, basketballs, skateboards |
| **Other** | 📦 | `bg-gray-100` | Storage bins, dorm decor, kitchen supplies, art tools |

---

## 📁 Repository Structure

```
CampusX-AI/
├── backend/
│   ├── src/
│   │   ├── config/          # Firebase Admin, Redis, Env validation
│   │   ├── controllers/     # HTTP request handlers (auth, products, chat)
│   │   ├── dtos/            # Data Transfer Objects
│   │   ├── middlewares/     # Auth verification, rate limiting, error handling
│   │   ├── repositories/    # Firestore database access layer
│   │   ├── routes/          # Express route declarations (/auth, /products, /chat)
│   │   ├── services/        # Business logic layer
│   │   ├── utils/           # Logger (Pino), standard API responses, errors
│   │   ├── validators/      # Zod validation schemas
│   │   ├── app.ts           # Express application setup & middleware chain
│   │   └── server.ts        # Server entry point & graceful shutdown
│   ├── tests/               # Vitest unit, service, and contract tests
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── app/             # Next.js 16 App Router pages
│   │   │   ├── (auth)/      # /login, /register, /reset-password
│   │   │   ├── marketplace/ # /marketplace catalog & layout
│   │   │   ├── product/     # /product/[id] detail view
│   │   │   ├── create/      # /create listing stepper wizard
│   │   │   ├── messages/    # /messages real-time chat
│   │   │   ├── profile/     # /profile student dashboard
│   │   │   ├── safety/      # /safety guidelines
│   │   │   └── page.tsx     # Landing page (hero, categories, testimonials)
│   │   ├── features/        # Feature-sliced modules (auth, marketplace, chat)
│   │   ├── shared/          # UI components, layout (Navbar, Footer), stores
│   │   ├── lib/             # Firebase Client initialization & utilities
│   │   └── middleware.ts    # Route guarding middleware
│   ├── public/              # Static assets (logo, og-image, favicon)
│   ├── package.json
│   └── tsconfig.json
│
├── docs/                    # Technical audit & deployment fix guides
└── README.md
```

---

## 🚀 Getting Started Locally

### Prerequisites

- **Node.js:** `v20.x` or `v22.x`
- **npm:** `v10.x+`
- **Git**
- A **Firebase Project** with Authentication, Firestore, and Storage enabled.
- *(Optional)* Local or hosted **Redis** instance for rate-limiting.

---

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file from template
cp .env.example .env

# Edit .env with your Firebase and server credentials
# (See Environment Variables section below)

# Run type-check and test suite
npm run type-check
npm test

# Start development server with live reload
npm run dev
```

The backend API will be available at `http://localhost:5000`.  
Swagger documentation will be available at `http://localhost:5000/docs`.

---

### 2. Frontend Setup

```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Run type check
npx --no-install tsc --noEmit

# Start Next.js development server
npm run dev
```

The web application will be available at `http://localhost:3000`.

---

## 🔐 Environment Variables

### Backend (`backend/.env`)

```ini
# Server
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000,https://campusx-ai.onrender.com
ALLOWED_EMAIL_DOMAINS=nhitm.ac.in,edu,ac.in

# Firebase Admin SDK (Firebase Console -> Project Settings -> Service accounts)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-service-account@your-project-id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour-key\n-----END PRIVATE KEY-----\n"
FIREBASE_STORAGE_BUCKET=your-project-id.firebasestorage.app

# Redis (Optional in local development; in-memory fallback is active)
# REDIS_URL=redis://default:password@localhost:6379

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Email Delivery (For Student OTPs)
RESEND_API_KEY=re_your_resend_api_key
SMTP_FROM=verify@campusx.ai
```

### Frontend (`frontend/.env.local`)

```ini
# Backend API Base URL
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Firebase Client SDK Configuration (Firebase Console -> Project Settings -> General)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

## 📖 API Documentation

The backend features an interactive OpenAPI (Swagger) explorer at:
```
https://campusx-api-zuks.onrender.com/docs
```

### Primary Endpoints Overview

| Method | Endpoint | Protection | Description |
| :--- | :--- | :---: | :--- |
| `GET` | `/health` | Public | System uptime, timestamp, and environment status |
| `POST` | `/api/v1/auth/register` | Authenticated | Create a verified student profile linked to Firebase UID |
| `GET` | `/api/v1/auth/me` | Authenticated | Retrieve profile for currently logged-in student |
| `PATCH` | `/api/v1/auth/me` | Authenticated | Update user bio, avatar, and campus preferences |
| `POST` | `/api/v1/auth/send-otp` | Authenticated | Send single-use 6-digit verification code to university email |
| `POST` | `/api/v1/auth/verify-otp` | Authenticated | Verify OTP and link verified university credentials |
| `GET` | `/api/v1/products` | Public | Query listings with cursor pagination and category filters |
| `GET` | `/api/v1/products/:id` | Public | Fetch product details by ID |
| `POST` | `/api/v1/products` | Authenticated | Publish a new product listing |
| `PATCH` | `/api/v1/products/:id` | Authenticated | Edit existing listing (Owner only) |
| `DELETE` | `/api/v1/products/:id` | Authenticated | Remove listing (Owner only) |
| `GET` | `/api/v1/chat/conversations` | Authenticated | List all active student conversations |
| `POST` | `/api/v1/chat/conversations` | Authenticated | Initiate a new conversation for a product |
| `POST` | `/api/v1/chat/conversations/:id/messages` | Authenticated | Send a direct message |
| `PATCH` | `/api/v1/chat/conversations/:id/read` | Authenticated | Mark conversation messages as read |

---

## 🧪 Testing & Quality Assurance

Both frontend and backend codebases are backed by automated quality gates:

```bash
# Run backend test suite
cd backend
npm test

# Expected Output:
# ✓ src/tests/health.test.ts (2 tests)
# ✓ tests/services/user.service.test.ts (6 tests)
# ✓ tests/validators/contracts.test.ts (9 tests)
# Test Files  3 passed (3)
# Tests       17 passed (17)

# Run backend static analysis
npm run type-check
npm run lint

# Run frontend static analysis & production build
cd ../frontend
npx --no-install tsc --noEmit
npm run lint
npm run build
```

---

## 🚢 Deployment Guide

### Deploying to Render

1. **Frontend Web Service:**
   - **Environment:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Root Directory:** `frontend`
   - Configure all `NEXT_PUBLIC_*` environment variables in the Render dashboard.

2. **Backend Web Service:**
   - **Environment:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Root Directory:** `backend`
   - Configure `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, and `FIREBASE_PRIVATE_KEY`.

3. **Firebase Console Configuration:**
   - Under **Authentication > Sign-in method**, enable **Email/Password** and **Google**.
   - Under **Authentication > Settings > Authorized domains**, add your frontend domain:  
     `campusx-ai.onrender.com`

---

## 🤝 Contributing

Contributions from the student and open-source developer communities are warmly welcomed:

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes with clear messages (`git commit -m 'feat: add amazing feature'`).
4. Ensure all unit tests pass (`npm test`) and types check cleanly (`tsc --noEmit`).
5. Push to your branch (`git push origin feature/amazing-feature`).
6. Open a Pull Request.

---

## 📄 License

This project is licensed under the **ISC License**.

---

<div align="center">
  <p>Built with ❤️ for universities and college students.</p>
  <p><strong>CampusX Engineering Team</strong></p>
</div>
