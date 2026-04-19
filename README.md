# 🏷️ SIBA | Sherazi IT Business Academy
### Modernizing professional systems through elite IT integration and scalable business architectures.

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](#)
[![PWA](https://img.shields.io/badge/PWA-Certified-emerald)](#)
[![Frontend](https://img.shields.io/badge/frontend-React%2018-blue)](#)
[![Backend](https://img.shields.io/badge/backend-Laravel%2011-red)](#)
[![Stability](https://img.shields.io/badge/stability-production--ready-orange)](#)

---

# 📖 Overview
SIBA (Sherazi IT Business Academy) is a high-performance, AI-integrated Training Management System designed to bridge the gap between traditional education and modern business execution. As **Bangladesh's first Non-profit Academy specialized in business development and exponential growth**, we modernize traditional systems through elite IT integration, scalable architectures, and automated revenue engines.

The system addresses the fundamental fragmentation in professional training by unifying course delivery, mentor coordination, and authenticated skill validation into a single, cohesive digital ecosystem.

---

# 🚀 Key Features

### 🎓 Learner Experience & Hall of Fame
- **The Global Tribe**: A dedicated learners portal featuring verified success stories and high-performance testimonials.
- **Hall of Achievers**: Real-world impact tracking across global hubs (London, Dubai, New York, etc.).
- **Progress Synchronization**: Real-time tracking of learning milestones and achievement logs.

### 👨‍🏫 Architects Council (Mentors)
- **Direct Engagement**: Streamlined "Contact via WhatsApp" protocol for immediate expert situational guidance.
- **Practitioner Led**: Not academics — all mentors are high-performance operators currently scaling real infrastructures.
- **Sovereign Authority**: Direct integration of practitioner expertise into the learning flow, prioritizing execution over theory.

### 🛡️ Administrative Control & Verification
- **RBAC Infrastructure**: Granite-tight Role-Based Access Control for Students, Mentors, and Administrators.
- **Cryptographic Proof**: Automated issuance of certificates with immutable, searchable serial numbers.
- **Richer PWA Interface**: Full Progressive Web App support with a custom high-fidelity install UI, offline navigation, and mobile-native look.

### 💎 Core System Capabilities
- **Public Verification**: A high-trust, serial-based certificate verification engine for global credential validation.
- **Adaptive UI**: Premium glassmorphism-heavy interface optimized for high-density information display.
- **Mobile-First Navigation**: Dedicated bottom tab-bar architecture for production-grade mobile accessibility.

---

# 🧱 System Architecture
SIBA follows a **Decoupled Monolith** architecture pattern, separating concerns between a robust API engine and a high-performance Single Page Application (SPA).

- **Frontend**: A React-based SPA that communicates with the API layer via a secured gateway.
- **Backend**: A Laravel-powered API engine handling state transitions, cryptographic logic, and data orchestration.
- **Authentication**: Stateless authentication using **JWT (JSON Web Token)** via `php-open-source-saver/jwt-auth`, providing secure, cross-platform token-based access.
- **Security**: Custom Middleware for RBAC, Symfony-grade request validation, and Bearer token verification.

---

# 🛠️ Tech Stack

### Frontend
- **Core**: React 18, TypeScript, Vite 8
- **PWA**: `vite-plugin-pwa` with Rich Install UI and Service Worker integration
- **Styling**: Tailwind CSS (v4), Lucide React Icons
- **State/Data**: TanStack Query, Zustand, Axios
- **Animation**: Framer Motion, CSS Mesh Gradients

### Backend
- **Framework**: Laravel 11 (PHP 8.2+)
- **Authentication**: JWT (Stateless / Token-based)
- **Security**: Custom Middleware for RBAC, Eloquent-level data protection, and JWT-Auth guards

### Database & Storage
- **Primary**: MySQL 8.0
- **Indexing**: Optimized serial lookups for the verification engine

---

# ⚙️ Installation & Setup

### Prerequisites
- **PHP** >= 8.2
- **Node.js** >= 18.x
- **Composer** (PHP dependency manager)
- **Web Server** (Nginx/Apache) or Laragon for local development

### Local Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Sherazi-IT-Ltd/SIBA.git
   cd siba
   ```

2. **Backend Configuration**
   ```bash
   cd siba-api
   composer install
   cp .env.example .env
   php artisan key:generate
   php artisan jwt:secret
   php artisan migrate --seed
   php artisan serve
   ```

3. **Frontend Configuration**
   ```bash
   cd ../siba-frontend
   npm install --legacy-peer-deps
   cp .env.example .env
   npm run dev
   ```

---

# 🔐 Environment Variables

### Backend (`siba-api/.env`)
| Variable | Description | Default |
| :--- | :--- | :--- |
| `DB_DATABASE` | MySQL database name | `siba_database` |
| `JWT_SECRET` | Secret key for JWT signing | `(generate via artisan)` |
| `JWT_TTL` | Token expiration time (min) | `60` |

### Frontend (`siba-frontend/.env`)
| Variable | Description | Default |
| :--- | :--- | :--- |
| `VITE_API_BASE_URL` | Backend API Endpoint | `http://localhost:8000` |

---

### Default Access (Seeded)
- **Admin**: `admin@siba.academy` / `password`
- **Industry Expert**: `sarah@siba.academy` / `password`
- **Student**: `nadia@student.siba.academy` / `password`

### Workflows
1. **Initial Access**: Navigate to `http://localhost:5173`.
2. **Explore Excellence**: Browse premium tracks like *Full-Stack Web Development* or *AI-Powered Business Automation*.
3. **Verification**: Enter a valid serial (e.g., `SIBA-2026-X8Y1`) in the Verification Page to see the cryptographic validation engine in action.
4. **Admin Access**: Utilize the expert dashboard to manage the curriculum and certificate registry.

---

# 📡 API Documentation
Auth: **Bearer Token (JWT)**

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/certificates` | Retrieve issued certificates |
| `GET` | `/api/certificate/verify/{no}` | Public cryptographic verification |
| `POST` | `/api/login` | Authenticate user session |

---

# 📁 Project Structure
```text
Training Platform/
├── README.md
├── .gitignore
│
├── siba-api/                           # 🔧 Laravel API (Backend)
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/Api/        # 12 API controllers
│   │   │   └── Middleware/
│   │   │       └── CheckRole.php       # RBAC middleware
│   │   ├── Models/                     # 21 Eloquent models
│   │   └── Providers/
│   ├── config/                         # App, auth, JWT config
│   ├── database/
│   │   ├── migrations/                 # Schema definitions
│   │   └── seeders/                    # Demo data
│   └── routes/
│       ├── api.php                     # All API endpoints
│       └── web.php                     # Health check
│
└── siba-frontend/                      # ⚛️ React SPA (Frontend)
    ├── .env.example                    # Environment template
    ├── public/                         # Static assets & PWA
    │   └── images/mentors/             # Mentor photos
    └── src/
        ├── App.tsx                     # Router — all routes defined here
        ├── main.tsx                    # Entry point
        ├── index.css                   # Design tokens & global styles
        │
        ├── types/                      # Shared TypeScript interfaces
        │   └── index.ts                # User, Course, Enrollment, etc.
        │
        ├── lib/                        # Utilities
        │   ├── axios.ts                # API client (JWT interceptor)
        │   └── utils.ts                # Helpers
        │
        ├── store/                      # Global state (Zustand)
        │   └── useAuthStore.ts         # Auth state & token management
        │
        ├── constants/                  # Navigation configs
        │   └── index.ts                # ADMIN_NAV, TRAINER_NAV, etc.
        │
        ├── layouts/                    # Route layout shells
        │   ├── DashboardLayout.tsx     # Dashboard wrapper (all roles)
        │   └── PublicLayout.tsx        # Public pages (navbar + footer)
        │
        ├── components/                 # Shared components
        │   ├── auth/                   # ProtectedRoute
        │   ├── dashboard/              # Dashboard shell, stat cards
        │   ├── layout/                 # PublicNavbar, PublicFooter
        │   └── ui/                     # Primitives (button, card, badge...)
        │
        └── pages/
            ├── public/                 # No auth required
            │   ├── HomePage.tsx
            │   ├── auth/               # LoginPage, RegisterPage
            │   ├── courses/            # CatalogPage, CourseDetailPage
            │   └── info/               # Mentors, Learners, About, etc.
            │
            └── protected/              # Auth + role required
                ├── admin/              # 🔴 Admin pages
                │   ├── AdminDashboard.tsx
                │   ├── UsersPage.tsx
                │   ├── CoursesPage.tsx
                │   ├── CertificateControl.tsx
                │   ├── EnrollmentsPage.tsx
                │   ├── RevenuePage.tsx
                │   ├── AnalyticsPage.tsx
                │   └── SettingsPage.tsx
                │
                ├── trainer/            # 🔵 Trainer pages
                │   ├── TrainerDashboard.tsx
                │   ├── CoursesPage.tsx
                │   ├── CourseEditor.tsx
                │   ├── StudentsPage.tsx
                │   ├── SubmissionsPage.tsx
                │   ├── SessionsPage.tsx
                │   └── AnalyticsPage.tsx
                │
                ├── student/            # 🟢 Student pages
                │   ├── StudentDashboard.tsx
                │   ├── CoursesPage.tsx
                │   ├── AssignmentsPage.tsx
                │   ├── Certificates.tsx
                │   ├── BusinessTracker.tsx
                │   ├── ProgressPage.tsx
                │   └── LearningPlatform.tsx
                │
                └── mentor/             # 🟣 Mentor pages
                    ├── MentorDashboard.tsx
                    ├── StudentsPage.tsx
                    ├── SessionsPage.tsx
                    └── FeedbackPage.tsx
```

### 📌 Where to Add New Features
| What | Where |
|:---|:---|
| New page for a role | `src/pages/protected/<role>/` → then add route in `App.tsx` |
| Shared UI component | `src/components/ui/` |
| API endpoint handler | `siba-api/app/Http/Controllers/Api/` → register in `routes/api.php` |
| Shared TypeScript type | `src/types/index.ts` |
| Global state | `src/store/` |
| Navigation link | `src/constants/index.ts` (role-specific nav arrays) |

---

# 🚢 Deployment Guide

SIBA is designed to be highly portable, but follow these steps to ensure peak performance in a production environment.

### 🔌 1. Backend (Laravel API)
The API can be deployed on any VPS (DigitalOcean, AWS, Linode) or Managed Laravel Hosting.

1.  **Infrastructure**: Ensure PHP 8.2+, MySQL 8.0+, and Nginx are installed.
2.  **Environment**: 
    - Set `APP_ENV=production` & `APP_DEBUG=false`.
    - Run `php artisan key:generate` and `php artisan jwt:secret`.
    - Set `APP_URL` to your api subdomain (e.g., `https://api.siba.academy`).
3.  **Optimization**:
    ```bash
    composer install --optimize-autoloader --no-dev
    php artisan config:cache
    php artisan route:cache
    php artisan view:cache
    ```
4.  **Storage**: Run `php artisan storage:link` to ensure mentor images and assets are accessible.
5.  **CORS**: Update `config/cors.php` to allow your frontend domain.

### ⚛️ 2. Frontend (React SPA)
The frontend is a static build that can be hosted on Vercel, Netlify, or Nginx.

1.  **Environment**: Create `.env` and set `VITE_API_URL` to your production API URL.
2.  **Build**:
    ```bash
    npm run build
    ```
3.  **Hosting**:
    - **Static Hosting**: Upload the contents of the `dist` folder.
    - **SPA Routing**: Ensure your host is configured to redirect all requests to `index.html` (standard for SPA).
4.  **PWA**: Ensure the site is served over **HTTPS**; otherwise, the Service Worker will not register.

---

# 🛡️ Security Practices
- **Middleware Guarding**: Protected routes sanitized through `CheckRole` and `JWT.auth`.
- **Cryptographic Validation**: Public certificates verified against unique ledger signatures.
- **PWA Integrity**: Validated icons, manifest, and screenshots for secure installation.

---

# 📜 License
Distributable under the **MIT License**.

---

# 📬 Contact
**Sherazi IT Business Academy**  
*Strategic IT Integration & Scalable Growth*  
