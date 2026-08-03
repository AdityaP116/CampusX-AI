<div align="center">
  <img src="frontend/public/logo.png" alt="CampusX Logo" width="120" height="120" style="border-radius: 50%" />
  <h1>CampusX</h1>
  <p>A premium, verified student-only marketplace for buying, selling, renting, and exchanging items on campus.</p>
</div>

---

## Overview

**CampusX** is an exclusive, enterprise-grade marketplace designed explicitly for verified college students. It solves the problem of unsafe, unverified peer-to-peer campus trading by strictly restricting access to verified student identities. The platform empowers students to safely buy, sell, rent, and exchange items directly within their trusted campus community.

---

## Features

### Authentication
- **Firebase Authentication:** Secure login and registration flows.
- **Identity Verification:** Endpoint stubs for Student ID and `.edu` email verification.
- **Session Management:** Persisted client-side sessions integrated with Zustand.

### Marketplace (Products)
- **Product Listings:** Browse items via cursor-based pagination.
- **CRUD Operations:** Verified students can create, read, update, and delete their own products.
- **Seller Filtering:** View products explicitly by specific sellers.
- **Trending:** Highlighted popular products.

### Chat
- **Real-time Conversations:** Dedicated messaging interfaces between buyers and sellers.
- **Message History:** Paginated access to past conversations.
- **Read Receipts:** Track unread message counts.

### Security
- **Strict Authorization:** Server-side ownership checks before mutations (e.g., you can only delete your own products; you can only read chats you participate in).
- **Rate Limiting:** Redis-backed request throttling to prevent abuse.
- **Data Validation:** Zod schema validation applied to all incoming API requests.
- **Firebase Security Rules:** Highly granular Firestore and Storage rules restricting payload sizes and document access.

---

## Tech Stack

### Frontend
- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Styling:** Tailwind CSS 4, Framer Motion
- **State Management:** Zustand (Global State), React Query (Server State)
- **Forms & Validation:** React Hook Form, Zod

### Backend
- **Framework:** Node.js (v22+), Express.js
- **Language:** TypeScript
- **Architecture:** Clean Architecture (Controllers -> Services -> Repositories)
- **API Documentation:** Swagger UI / JSDoc
- **Logging:** Pino (Structured JSON logging)

### Database & Storage
- **Database:** Firebase Firestore (NoSQL)
- **Storage:** Firebase Cloud Storage
- **Cache / Rate Limiting:** Redis (ioredis)

### DevOps & Deployment
- **Containerization:** Docker (Multi-stage builds, Alpine Linux)
- **Process Management:** dumb-init
- **Target Platform:** Google Cloud Run (Backend), Vercel (Frontend)

---

## Project Architecture

The repository is structured as a monorepo containing distinct `frontend` and `backend` directories.

```text
CampusX-AI/
├── frontend/
│   ├── public/              # Static assets (logo.png, icons)
│   ├── src/
│   │   ├── app/             # Next.js App Router pages
│   │   ├── features/        # Feature-sliced modules (auth, products)
│   │   ├── lib/             # Utility functions and API clients
│   │   └── shared/          # Shared UI components and layouts
│   └── package.json
│
└── backend/
    ├── src/
    │   ├── config/          # Firebase & env configuration
    │   ├── controllers/     # Express route handlers
    │   ├── middlewares/     # Auth, rate-limiting, and validation layers
    │   ├── models/          # TypeScript interfaces (DTOs)
    │   ├── repositories/    # Firestore data access layer
    │   ├── routes/          # API route definitions
    │   └── services/        # Core business logic
    ├── Dockerfile           # Cloud Run deployment config
    └── package.json
```

---

## Installation

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
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
FIREBASE_PROJECT_ID=campusx-ai
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@...
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_STORAGE_BUCKET=campusx-ai.firebasestorage.app
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```
Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```
Create a `.env.local` file in the `frontend/` directory:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=campusx-ai.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=campusx-ai
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=campusx-ai.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```
Start the frontend server:
```bash
npm run dev
```

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Purpose | Required | Example |
|----------|---------|----------|---------|
| `PORT` | API listening port | Yes | `5000` |
| `NODE_ENV` | Environment context | Yes | `development` |
| `CORS_ORIGIN` | Allowed client origin | Yes | `http://localhost:3000` |
| `FIREBASE_PROJECT_ID` | GCP Project ID | Yes | `campusx-ai` |
| `FIREBASE_CLIENT_EMAIL` | Service Account Email | Yes | `admin@...` |
| `FIREBASE_PRIVATE_KEY` | Service Account Key | Yes | `"-----BEGIN..."` |
| `FIREBASE_STORAGE_BUCKET`| Cloud Storage Bucket | Yes | `campusx-ai.appspot.com`|
| `REDIS_URL` | Redis connection string| No | `redis://localhost:6379`|

### Frontend (`frontend/.env.local`)

| Variable | Purpose | Required | Example |
|----------|---------|----------|---------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Client SDK Key | Yes | `AIzaSy...` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | GCP Project ID | Yes | `campusx-ai` |

---

## Available Scripts

### Frontend
- `npm run dev` - Starts the Next.js development server.
- `npm run build` - Builds the application for production.
- `npm run start` - Runs the compiled production server.
- `npm run lint` - Executes ESLint to verify code quality.

### Backend
- `npm run dev` - Starts the Express server with hot-reloading (`tsx watch`).
- `npm run build` - Compiles TypeScript to JavaScript in the `/dist` directory.
- `npm run start` - Runs the compiled Node.js production server.
- `npm run type-check` - Runs the TypeScript compiler without emitting files.
- `npm run lint` - Executes ESLint checks.
- `npm run test` - Runs the Vitest test suite.

---

## API Overview

All API endpoints are prefixed with `/api/v1`. 

### Authentication (`/auth`)
- `POST /register` - Register a new verified student.
- `GET /me` - Retrieve current user profile.
- `PATCH /me` - Update current user profile.

### Products (`/products`)
- `GET /` - Paginated product discovery.
- `GET /:id` - Fetch single product details.
- `POST /` - Create a new listing (Auth required).
- `PATCH /:id` - Update a listing (Owner required).
- `DELETE /:id` - Delete a listing (Owner required).

### Chat (`/chat`)
- `GET /conversations` - List user's active chats.
- `POST /conversations` - Start a new chat.
- `GET /conversations/:id/messages` - Fetch messages for a specific chat.
- `POST /conversations/:id/messages` - Send a new message.
- `PATCH /conversations/:id/read` - Mark a conversation as read.

---

## Firebase Configuration

### Authentication
CampusX leverages Firebase Authentication for seamless client-side authentication and JWT generation. The backend strictly verifies these ID tokens using the `firebase-admin` SDK before allowing sensitive operations.

### Firestore
A NoSQL document database utilizing Collections: `users`, `products`, `conversations`, and `messages`. 

### Security Rules
Custom `.rules` files enforce strict data governance directly at the database layer, ensuring that even direct client SDK usage remains highly secure.

---

## Google Cloud Run Deployment

The backend is fully containerized and production-ready for Google Cloud Run.

### Docker
The `Dockerfile` employs a multi-stage Alpine build to minimize image size and attack surface. It utilizes `dumb-init` to handle PID 1 responsibilities and graceful shutdowns. The container runs entirely as a non-root `node` user.

### Build & Deploy
```bash
cd backend
docker build -t gcr.io/campusx-ai/backend .
docker push gcr.io/campusx-ai/backend
gcloud run deploy campusx-backend --image gcr.io/campusx-ai/backend --platform managed
```
*Note: Ensure all environment variables (including the Firebase Private Key) are securely injected using Google Cloud Secret Manager.*

---

## Security

- **Authentication:** Cryptographically verified Firebase ID Tokens.
- **Authorization:** Strict controller-level ownership checks (e.g., verifying `sellerId === req.user.id`).
- **Validation:** 100% of incoming request payloads are validated and stripped of unknown fields using Zod schemas.
- **Helmet:** HTTP headers are secured against common web vulnerabilities.
- **Rate Limiting:** Global rate limiting is applied via Redis to prevent brute-force and DDoS attacks.
- **CORS:** Restricted strictly to authorized frontend origins.

---

## Performance

- **Pagination:** Cursor-based pagination (`lastDocId`) implemented in Firestore queries to guarantee consistent read performance regardless of collection size.
- **Lazy Loading:** Frontend components use Next.js dynamic imports where appropriate.
- **Lean Architecture:** The backend utilizes thin controllers and dedicated repository classes to minimize memory overhead.

---

## Development Workflow

1. **Run Locally:** Start Redis (if applicable), followed by the backend and frontend dev servers.
2. **Create Features:** Adhere to the Feature-Sliced Design in the frontend, and the Controller-Service-Repository pattern in the backend.
3. **Commit Code:** Ensure all code passes `npm run type-check` and `npm run lint`.
4. **Deploy:** Backend to Cloud Run, Frontend to Vercel.

---

## Contributing

We welcome contributions from the open-source community!
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/amazing-feature`).
3. Ensure your code passes all linting and type checks.
4. Commit your changes (`git commit -m 'feat: add amazing feature'`).
5. Push to the branch (`git push origin feature/amazing-feature`).
6. Open a Pull Request.

---

## Code Quality

This project enforces strict code quality standards:
- **TypeScript:** 100% strict type safety across both frontend and backend.
- **ESLint:** Enforced linting rules to prevent anti-patterns and unused variables.
- **Architecture:** Predictable separation of concerns ensuring high maintainability.

---

## Deployment Checklist

- [ ] Environment variables configured in Secret Manager
- [ ] Redis instance provisioned and connected
- [ ] Firestore Composite Indexes deployed
- [ ] Firebase Storage Rules deployed
- [ ] Docker build passes successfully
- [ ] Cloud Run container deployed
- [ ] `/health` endpoint verified returning `200 OK`

---

## License

This project is licensed under the ISC License.

---

## Author

**CampusX Core Engineering Team**  
Built with a passion for robust developer experiences and secure, scalable architectures.

## Support

For issues, bug reports, or feature requests, please [open an issue](https://github.com/AdityaP116/CampusX-AI/issues) on GitHub.
