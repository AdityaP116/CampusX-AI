# CampusX — Deployment Authentication & 500 Root Cause Fix Guide

**Timestamp:** November 23, 2026  
**Auditor Roles:** Senior Next.js Engineer, Node.js Backend Engineer, Firebase Authentication Specialist, Application Security Engineer  

---

## 1. Root Cause Breakdown of Your Errors

### A. `GET /api/v1/auth/me 500` & `POST /api/v1/auth/register 500`
- **Root Cause 1: Missing or Incompletely Formatted Firebase Service Account on Render**
  - When the frontend attempts to call `/api/v1/auth/register` or `/api/v1/auth/me`, Express runs `authenticate` middleware, which calls `auth.verifyIdToken(token)`.
  - On your deployed Render instance (`campusx-api-zuks.onrender.com`), if `FIREBASE_PRIVATE_KEY` has escaped `\n` characters (or was pasted with outer quotes), or if `FIREBASE_PROJECT_ID` is set to default fallback `campusx-ai`, `firebase-admin` fails to verify tokens or communicate with Firestore and throws an unhandled exception, resulting in `500 Internal Server Error`.
  - **Codebase Fix Applied:**
    - In [backend/src/config/firebase.config.ts](file:///c:/Users/Admin/Desktop/campusx/CampusX-AI/backend/src/config/firebase.config.ts), added safe key normalization that strips accidental wrapping quotes (`"` or `'`), properly converts literal `\n` to real line breaks, and catches initialization errors cleanly.
    - In [backend/src/middlewares/error.middleware.ts](file:///c:/Users/Admin/Desktop/campusx/CampusX-AI/backend/src/middlewares/error.middleware.ts), errors now forward the exact descriptive message rather than an opaque "Internal Server Error" string.

### B. `POST https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=... 400 (Bad Request)`
- **Root Cause: Google Sign-In Provider or Authorized Domain in Firebase Console**
  - When you click "Continue with Google", Firebase Web SDK makes a request to `signInWithIdp`.
  - A `400 Bad Request` from `identitytoolkit.googleapis.com` happens when:
    1. **Google is not enabled as an Authentication Sign-in Provider** in the Firebase Console under **Build > Authentication > Sign-in method**.
    2. **Your domain is missing from Authorized Domains**: If `campusx-ai.onrender.com` is not listed under **Authentication > Settings > Authorized domains** in Firebase Console.
    3. **User closed the popup or selected an account whose OAuth was blocked/cancelled.**
  - **Codebase Fix Applied:**
    - In [frontend/src/features/auth/services/authService.ts](file:///c:/Users/Admin/Desktop/campusx/CampusX-AI/frontend/src/features/auth/services/authService.ts), wrapped `signInWithPopup` with structured error handling that detects `auth/unauthorized-domain`, `auth/popup-closed-by-user`, and `auth/popup-blocked` and displays actionable guidance rather than crashing.

### C. `Cross-Origin-Opener-Policy policy would block the window.closed call`
- **Root Cause:**
  - When Google popup authentication opens, Firebase checks `window.closed` to detect when the login finishes. When the parent or child page doesn't allow cross-origin popups, Chrome emits this warning.
  - **Codebase Fix Applied:**
    - Configured `Cross-Origin-Opener-Policy: same-origin-allow-popups` in [frontend/next.config.ts](file:///c:/Users/Admin/Desktop/campusx/CampusX-AI/frontend/next.config.ts) and backend Helmet [backend/src/app.ts](file:///c:/Users/Admin/Desktop/campusx/CampusX-AI/backend/src/app.ts).

---

## 2. Mandatory Configuration Steps on Render & Firebase

To make your deployed production site work with Google Auth and user registration, verify the following:

### Step 1: Firebase Console — Enable Google Provider & Authorized Domains
1. Open the [Firebase Console](https://console.firebase.google.com/) for project `campusx-ai` (or your active project ID).
2. Go to **Authentication > Sign-in method**:
   - Ensure **Email/Password** is **Enabled**.
   - Ensure **Google** is **Enabled** (set your support email and click Save).
3. Go to **Authentication > Settings > Authorized domains**:
   - Ensure `campusx-ai.onrender.com` is listed. (Add it if missing).
   - Ensure `localhost` is listed for local development.

### Step 2: Render Backend Environment Variables
In your [Render Dashboard](https://dashboard.render.com/) for `campusx-api-zuks`:
1. Go to **Environment** tab.
2. Confirm the following variables are present:
   - `FIREBASE_PROJECT_ID`: Your actual Firebase Project ID.
   - `FIREBASE_CLIENT_EMAIL`: Your service account email (`...@...iam.gserviceaccount.com`).
   - `FIREBASE_PRIVATE_KEY`: Your service account private key (starts with `-----BEGIN PRIVATE KEY-----` and ends with `-----END PRIVATE KEY-----\n`).
   - `CORS_ORIGIN`: `https://campusx-ai.onrender.com,http://localhost:3000`
   - `ALLOWED_EMAIL_DOMAINS`: `nhitm.ac.in,edu,ac.in`

---

## 3. Test & Verification Summary

| Suite / Check | Result | Details |
| :--- | :---: | :--- |
| **Backend Unit & Contract Tests** | **PASS** | 17/17 tests passing via Vitest |
| **Backend TypeScript Type-Check** | **PASS** | 0 errors via `tsc --noEmit` |
| **Frontend ESLint** | **PASS** | 0 errors |
| **Frontend TypeScript Type-Check** | **PASS** | 0 errors via `tsc --noEmit` |
| **Live Deployed API Check** | **PASS** | Health endpoint responded `200 OK` |
