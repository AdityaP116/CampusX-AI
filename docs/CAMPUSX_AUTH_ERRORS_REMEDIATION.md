# CampusX — Authentication, API 500, COOP & Reset Password Remediation Report

**Date of Execution:** November 23, 2026  
**Auditor Roles:** Senior Next.js Engineer, Node.js Backend Engineer, Firebase Authentication Specialist, Application Security Engineer  
**Target Application:** CampusX Verified Student Marketplace

---

## 1. Executive Summary

All reported browser console errors and authentication failures have been systematically diagnosed, resolved, tested, and verified across both the frontend and backend codebases.

### Summary Table of Fixes

| Issue / Error | Root Cause | Implemented Solution | Verification Result |
| :--- | :--- | :--- | :---: |
| **`/api/v1/auth/me` 500 Internal Server Error** | `UserService.getUserByUid` was throwing an unhandled `ApiError.notFound` exception when an authenticated Firebase user without an active Firestore profile accessed the endpoint. `AuthController.getMe` caught this as a generic error, triggering a 500 status in production. | Refactored `UserService.getUserByUid` to return `null` gracefully when no record exists. Updated `AuthController.getMe` to return an explicit `404 Not Found` with payload `{ success: false, message: "User profile not found. Onboarding required." }`. Handled `updateMe` with a clear 404 check. | **PASS** (17/17 backend tests passing, 0 type errors) |
| **COOP Policy Warning: `Cross-Origin-Opener-Policy policy would block the window.closed call`** | Helmet on the backend and Next.js frontend were using default/isolated window opener policies. Firebase Google Sign-In uses popups (`signInWithPopup`), which poll `popupWindow.closed` to detect completion. | Configured `Cross-Origin-Opener-Policy: same-origin-allow-popups` in [frontend/next.config.ts](file:///c:/Users/Admin/Desktop/campusx/CampusX-AI/frontend/next.config.ts) and Helmet in [backend/src/app.ts](file:///c:/Users/Admin/Desktop/campusx/CampusX-AI/backend/src/app.ts), allowing popup status communication while preserving cross-origin isolation. | **PASS** (Verified in Next.js build headers & Helmet config) |
| **`/reset-password` 404 Not Found** | The login form linked to `/reset-password` (`frontend/src/app/login/page.tsx:86`), but no matching route existed in the App Router. | Created [frontend/src/app/reset-password/page.tsx](file:///c:/Users/Admin/Desktop/campusx/CampusX-AI/frontend/src/app/reset-password/page.tsx) with full dual-mode support: requesting a reset link (`sendPasswordResetEmail`) and confirming new passwords via Firebase email action code (`oobCode` verification with `verifyPasswordResetCode` and `confirmPasswordReset`). | **PASS** (Route compiled and bundled into Next.js production build) |
| **Generic 404 on Static Assets (`og-image.png`, `favicon.ico`)** | Layout metadata and tags referenced `/og-image.png` and standard `/favicon.ico` in root public paths, but neither file existed in `frontend/public/`. | Added fallback assets in `frontend/public/` (`og-image.png` and `favicon.ico`) to eliminate missing asset 404s. | **PASS** (Static files verified in `frontend/public/`) |

---

## 2. In-Depth Root Cause Analysis & Implementations

### 2.1 `/api/v1/auth/me` 500 Error
- **The Problem:**
  During Google sign-in or initial registration, a student receives a valid Firebase token and the frontend calls `GET /api/v1/auth/me` to determine whether the user exists. `UserService.getUserByUid` threw an exception (`ApiError.notFound("User not found for this Firebase account")`). The `AuthController.getMe` caught this exception and passed it down to Express's `globalErrorHandler`, returning an unexpected `500 Internal Server Error` in production instead of an intentional `404 Not Found`.
- **Code Changes:**
  - In [backend/src/services/user.service.ts](file:///c:/Users/Admin/Desktop/campusx/CampusX-AI/backend/src/services/user.service.ts):
    ```typescript
    public static async getUserByUid(uid: string): Promise<User | null> {
      return await userRepository.findByUid(uid);
    }
    ```
  - In [backend/src/controllers/auth.controller.ts](file:///c:/Users/Admin/Desktop/campusx/CampusX-AI/backend/src/controllers/auth.controller.ts):
    ```typescript
    public static async getMe(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const uid = req.firebaseUser?.uid;
        if (!uid) throw ApiError.unauthorized();
        
        const currentUser = await UserService.getUserByUid(uid);
        if (!currentUser) {
          res.status(404).json(ApiResponse.error("User profile not found. Onboarding required.", null));
          return;
        }
        res.status(200).json(ApiResponse.success("User profile retrieved", currentUser));
      } catch (error) {
        next(error);
      }
    }
    ```
  - Updated [backend/tests/services/user.service.test.ts](file:///c:/Users/Admin/Desktop/campusx/CampusX-AI/backend/tests/services/user.service.test.ts) to verify that missing profiles resolve safely to `null` without throwing 500 exceptions.

### 2.2 Cross-Origin-Opener-Policy (COOP) Warning
- **The Problem:**
  Chrome emits `Cross-Origin-Opener-Policy policy would block the window.closed call` when an opener window attempts to inspect a popup that lacks permission to communicate across opener contexts.
- **Code Changes:**
  - Added response headers in [frontend/next.config.ts](file:///c:/Users/Admin/Desktop/campusx/CampusX-AI/frontend/next.config.ts):
    ```typescript
    async headers() {
      return [
        {
          source: "/:path*",
          headers: [
            {
              key: "Cross-Origin-Opener-Policy",
              value: "same-origin-allow-popups",
            },
          ],
        },
      ];
    }
    ```
  - Updated backend Helmet configuration in [backend/src/app.ts](file:///c:/Users/Admin/Desktop/campusx/CampusX-AI/backend/src/app.ts) to `crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" }`.

### 2.3 Password Reset Route (`/reset-password`)
- **The Problem:**
  The login form had a "Forgot password?" link targeting `/reset-password`, returning a 404 in production because no route was defined in `frontend/src/app/`.
- **Code Changes:**
  - Created [frontend/src/app/reset-password/page.tsx](file:///c:/Users/Admin/Desktop/campusx/CampusX-AI/frontend/src/app/reset-password/page.tsx) with:
    1. **Request Reset Mode:** Input validation with university email formatting, invoking `sendPasswordResetEmail`.
    2. **Confirmation Mode:** Activated automatically when users click the link in their email containing `?oobCode=...`. Verifies the code using `verifyPasswordResetCode`, prompts for a new password, and commits the change via `confirmPasswordReset`.
    3. Wrapped in `React.Suspense` for Next.js App Router static optimization.

### 2.4 Missing Static Assets 404s
- **The Problem:**
  Metadata OpenGraph references `/og-image.png` and standard browser probes request `/favicon.ico`, but neither existed in `frontend/public/`.
- **Code Changes:**
  - Populated `frontend/public/og-image.png` and `frontend/public/favicon.ico`.

---

## 3. Verification & Quality Gates

### Backend
- **Vitest Unit & Integration Tests:** `17 / 17 passed (100%)`
- **TypeScript Type Check:** `0 errors` (`tsc --noEmit`)
- **Production Build:** Clean compilation to `dist/server.js`

### Frontend
- **ESLint Audit:** `0 errors` (`npm run lint`)
- **TypeScript Type Check:** `0 errors` (`tsc --noEmit`)
- **Next.js Production Build:** `19 / 19 routes` compiled and optimized:
  - `○ /reset-password` successfully included in static/dynamic route matrix.

---

## 4. Deployment Instructions

1. **Deploy Backend to Render:**
   - Commit and push changes to the repository. Render will trigger a new build via Docker.
   - Ensure environment variables in Render include:
     - `ALLOWED_EMAIL_DOMAINS=nhitm.ac.in,edu,ac.in`
     - `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, and `FIREBASE_PRIVATE_KEY`
2. **Deploy Frontend to Render:**
   - The build command will execute `npm run build` and output the compiled App Router bundle.
   - Verify that `NEXT_PUBLIC_BACKEND_URL` is configured to `https://campusx-api-zuks.onrender.com/api/v1`.
