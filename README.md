# 💫 Geetika's Fullstack Portfolio Website

Welcome to the source code of my personal portfolio. This is a highly interactive, modern, and performant fullstack web application designed to showcase my journey, projects, thoughts, and skills.

Featuring a sleek dark-mode design, smooth animations (powered by GSAP & Framer Motion), real-time interactive widgets (Spotify, GitHub heatmaps, CLI terminal), and a robust Node.js backend.

---

## 🚀 Key Features

- **CLI Terminal**: An interactive command-line interface directly in the browser allowing users to navigate and query details.
- **Recruiter Mode**: A custom toggle that dynamically highlights recruiter-focused sections, summaries, and downloadable assets.
- **Interactive Home Page**: Features animated widgets, currently building status, Spotify integrations, and recent updates.
- **Dynamic AMA Section**: Allows visitors to submit questions directly to the owner.
- **Interactive Bookshelf**: A digital library displaying current reads and reviews.
- **Lab Notebook / Blogs**: A space for sharing deep dives into tech, engineering, and personal logs.
- **Clock Dropdown & System Tray**: Custom desktop-inspired navigation and system widgets.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/)
- **State Management**: [Zustand](https://zustand.docs.pmnd.rs/)
- **Data Fetching**: [TanStack React Query v5](https://tanstack.com/query/latest)

### Backend
- **Framework**: [Express.js](https://expressjs.com/) (Node.js)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)
- **Security**: [Helmet](https://helmetjs.github.io/), [Express Rate Limit](https://www.npmjs.com/package/express-rate-limit), CORS
- **Authentication**: JWT-based secure sessions
- **File Uploads**: [Cloudinary](https://cloudinary.com/) & [Multer](https://github.com/expressjs/multer)
- **Email Service**: [Nodemailer](https://nodemailer.com/)

---

## 📁 Repository Structure

```
Portfolio/
├── frontend/             # React SPA (Vite, TS, Tailwind)
│   ├── src/
│   │   ├── assets/       # Static assets & images
│   │   ├── components/   # Reusable UI widgets & layouts
│   │   ├── lib/          # API helpers & utilities
│   │   ├── pages/        # Portfolio views (Home, Work, Shelf, etc.)
│   │   ├── store/        # Zustand global state
│   │   └── types/        # TypeScript interfaces
│   └── index.html
├── backend/              # Node/Express API Server (TS, MongoDB)
│   ├── src/
│   │   ├── config/       # Database & Seeding config
│   │   ├── middleware/   # Auth & rate-limiting middleware
│   │   ├── models/       # Mongoose schemas (Projects, Blogs, AMAs)
│   │   └── routes/       # Express router endpoints
│   └── tsconfig.json
└── README.md             # Project documentation (this file)
```

---

## ⚙️ Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)
- npm or yarn

---

### Backend Configuration

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Populate the `.env` variables:
   ```env
   PORT=5000
   NODE_ENV=development
   DB_URI=your_mongodb_connection_uri
   JWT_SECRET=your_jwt_secret_key
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   ```

5. Seed the database with mock portfolio data (optional but recommended):
   ```bash
   npm run seed
   ```

6. Start the development backend server:
   ```bash
   npm run dev
   ```

---

### Frontend Configuration

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in `frontend/` (if API custom endpoints are needed, otherwise default config connects to local backend):
   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:5173](http://localhost:5173) in your browser to view your portfolio!

---

## 🛡️ License

This project is licensed under the ISC License. See [LICENSE](LICENSE) or package details for info.
