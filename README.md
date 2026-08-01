# CampusX 🎓

**The Premium Student Marketplace**

CampusX is a secure, high-end ecosystem for verified student-to-student trading. Buy, sell, rent, and exchange within your verified university community.

![CampusX Overview](frontend/public/logo.png)

## 🌟 Features

- **Verified Student Community**: Built-in `.edu` email verification to ensure a safe trading environment.
- **Real-Time Chat**: Negotiate prices and coordinate meetups instantly using our integrated WebSocket-based chat.
- **Buyer Protection**: Secure transactions and campus-based meetups.
- **Modern UI/UX**: A beautiful, responsive interface built with Next.js, Tailwind CSS v4, and Framer Motion animations.
- **Robust Backend**: Fast and scalable Express API with Firebase Firestore and Firebase Authentication.

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 16 (App Router) + React 19
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand (Global), TanStack React Query (Server State)
- **Forms & Validation**: React Hook Form + Zod
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Real-Time**: Socket.io-client
- **Auth**: Firebase Auth (Google OAuth + Email/Password)

### Backend
- **Framework**: Node.js + Express
- **Language**: TypeScript
- **Database**: Firebase Firestore (via Firebase Admin SDK)
- **Real-Time**: Socket.io
- **Validation**: Zod
- **Security**: Helmet, Express Rate Limit
- **Logging**: Pino

### Infrastructure
- **Containerization**: Docker
- **CI/CD**: GitHub Actions

## 🚀 Getting Started

### Prerequisites
- Node.js (v22+)
- npm or pnpm
- Firebase Project (with Authentication and Firestore enabled)

### Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AdityaP116/CampusX-AI.git
   cd CampusX-AI
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   ```
   - Copy `.env.example` to `.env` and fill in your Firebase Admin credentials and configuration.
   - Start the development server:
   ```bash
   npm run dev
   ```
   The API will be available at `http://localhost:5000`.

3. **Frontend Setup:**
   ```bash
   cd ../frontend
   npm install
   ```
   - Create a `.env.local` file with your Firebase Client configuration (API keys, project ID, etc.).
   - Start the development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

## 🐳 Docker Deployment

Both frontend and backend include Dockerfiles for easy containerization.

**Build and Run Backend:**
```bash
cd backend
docker build -t campusx-backend .
docker run -p 5000:5000 --env-file .env campusx-backend
```

**Build and Run Frontend:**
```bash
cd frontend
docker build -t campusx-frontend .
docker run -p 3000:3000 --env-file .env.local campusx-frontend
```

## 🔄 CI/CD Pipeline

The project uses GitHub Actions for continuous integration and deployment. The pipeline automatically:
- Checks out the code
- Installs dependencies
- Runs TypeScript type checking (`tsc --noEmit`)
- Runs ESLint
- Verifies the production build

See `.github/workflows/ci-cd.yml` for details.

## 🤝 Contributing

Contributions are welcome! Please follow the established code style and architecture patterns.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.
