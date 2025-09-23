# Post Application ✨📝

A modern full‑stack posts platform with authentication, image uploads, and a sleek dark UI. Built with Next.js (App Router), Node.js, and Prisma. 🚀

---

## ✨ Features
- 🔐 Auth: Register, Login, Protected routes
- 📝 Posts: Create, Edit, View, List
- 🖼️ Media: Image uploads (Cloudinary)
- 👤 Profile: View and Edit profile with avatar
- ⚡ Dashboard: Quick glance at your recent posts
- 🎯 API v1: Clean REST endpoints with validation
- 🌓 Modern dark theme with accessible colors

---

## 🧰 Tech Stack
- 🌐 Frontend: Next.js 14, React, Tailwind CSS
- 🧠 State/Context: React Context for auth
- 🗄️ Backend: Express.js, Prisma ORM, PostgreSQL (or any Prisma provider)
- ☁️ Uploads: Cloudinary
- 🔒 Security: JWT, bcrypt
- 🧪 Linting: ESLint

---

## 📦 Monorepo Structure
```
Post Application/
├─ frontend/                # Next.js app (App Router)
│  └─ src/
│     ├─ app/               # Routes, layouts, pages
│     ├─ components/        # UI + forms + layout
│     ├─ context/           # Auth context
│     ├─ hooks/             # Custom hooks
│     └─ lib/               # API client, utils
└─ backend/                 # Express API
   ├─ src/
   │  ├─ api/v1/            # Routes/controllers/services/validation
   │  ├─ config/            # DB, Redis, Cloudinary
   │  └─ middleware/        # Auth, CORS, errors
   └─ prisma/               # Prisma schema
```

---

## 🚀 Getting Started

### 1) Prerequisites
- Node.js 18+ and npm
- A PostgreSQL (or your chosen Prisma) database
- Cloudinary account (for image uploads)

### 2) Clone & Install
```bash
# Clone
git clone <your-repo-url>
cd "Post Application"

# Install frontend and backend
cd frontend && npm install && cd ..
cd backend && npm install && cd ..
```

### 3) Environment Variables
Create `.env` files in both `frontend` and `backend` with the following keys (adjust as needed):

Frontend `.env.local`:
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
```

Backend `.env`:
```bash
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/postapp
JWT_SECRET=super-secret-jwt
CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx
PORT=5000
```

### 4) Database & Prisma
```bash
cd backend
# Generate Prisma client
npx prisma generate
# Apply migrations (create DB schema)
npx prisma migrate dev
```

### 5) Run Dev Servers
```bash
# Backend
cd backend
npm run dev

# Frontend (in a second terminal)
cd frontend
npm run dev
```

- Frontend: http://localhost:3000
- Backend:  http://localhost:5000

---

## 📜 Available Scripts

Frontend:
```bash
npm run dev         # Start Next.js dev server
npm run build       # Build for production
npm run start       # Start production server
npm run lint        # Lint
```

Backend:
```bash
npm run dev         # Start Express server (nodemon)
npm run start       # Start production server
npm run lint        # Lint
```

---

## 🔌 API Overview (v1)
- Auth: `/api/v1/auth/login`, `/api/v1/auth/register`, `/api/v1/auth/me`
- Posts: `/api/v1/posts` (GET/POST), `/api/v1/posts/:id` (GET/PATCH/DELETE)
- Upload: `/api/v1/upload/image` (POST)
- Users: `/api/v1/users/me` (GET/PATCH)

All responses follow a consistent JSON structure with success flag and data/error. ✅

---

## 🧭 UI Highlights
- Sidebar with active route highlight ✅
- Dark cards for forms and details 🖤
- White/foreground text for readability ✍️
- Responsive grids for inputs and media 📱

---

## 🖼️ Screenshots (Optional)
Add screenshots to `frontend/public/` and reference them here:

```md
![Dashboard](./frontend/public/window.svg)
```

---

## 🤝 Contributing
1. Fork the repo 🍴
2. Create a feature branch: `git checkout -b feat/awesome`
3. Commit changes: `git commit -m "feat: add awesome thing"`
4. Push and open a PR 🚀

---

## 📄 License
This project is licensed under the MIT License. 📌

---

## 🙌 Acknowledgements
- Tailwind CSS, Next.js, Prisma, Express
- Cloudinary for simple media uploads

Happy building! 💙
