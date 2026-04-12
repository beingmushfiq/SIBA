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
- **Impact Metrics**: Public transparency of mentor performance, including student reach and benchmark ratings.

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
   git clone https://github.com/beingmushfiq/siba.git
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
- **Trainer**: `sarah@siba.academy` / `password`
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
├── siba-api/               # Laravel Backend Engine
│   ├── app/                # Models & Controllers
│   ├── routes/             # API Endpoints
│   └── database/           # Migrations & Seeders
├── siba-frontend/          # React Single Page App
│   ├── src/
│   │   ├── components/     # UI System & Atomic Layouts
│   │   ├── pages/          # View Layer (Public/Protected)
│   │   └── lib/            # Utilities (Axios, PWA handlers)
└── README.md
```

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
