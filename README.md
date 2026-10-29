# 🏛️ Past Portals Server

A robust, type-safe, and scalable backend RESTful API built with **Node.js, Express, TypeScript, and Mongoose (MongoDB)** to preserve, manage, and explore historical artifacts from civilizations across human history.

---

## 🌟 Key Highlights & Modern Architecture

- **Strict Type-Safety:** Fully written in **TypeScript** ensuring complete compile-time type-safety across controllers, services, and middlewares.
- **Robust Schema Validation:** Powered by **Zod** for incoming request validation, schema inference, and data integrity.
- **Modular MVC Architecture:** Strict separation of concerns across **Routes**, **Controllers**, **Services**, and **Models**.
- **High Performance:** Mongoose queries optimized with `.lean()` for high-throughput, low-latency reads.
- **Complex Aggregation Pipelines:** Advanced MongoDB Aggregation pipelines for dynamic like-counts, top-liked artifact rankings, and leaderboard calculations.
- **Secure Authentication:** JWT-based stateless authentication with HTTP-Only cookies, CORS protection, and route-level authorization guards.

---

## 🛠️ Tech Stack

- **Runtime & Language:** Node.js, TypeScript
- **Framework:** Express.js
- **Database:** MongoDB
- **ODM:** Mongoose
- **Validation:** Zod
- **Security & Auth:** JSON Web Tokens (JWT), Cookie-Parser, CORS, Dotenv
- **Dev Tooling:** `tsx` (TypeScript Execute & Watch)

---

## 📁 Project Structure

```text
past-portals-server/
├── src/
│   ├── config/             # Database connection & configurations
│   │   └── dbConnect.ts
│   ├── controllers/        # Request handling and HTTP response logic
│   │   ├── artifact.controller.ts
│   │   ├── jwt.controller.ts
│   │   └── likedArtifact.controller.ts
│   ├── middlewares/        # Express middlewares (JWT auth, error handlers)
│   │   └── verifyToken.middleware.ts
│   ├── model/              # Mongoose schemas and models
│   │   └── artifactSchema.ts
│   ├── routes/             # API route declarations
│   │   ├── artifact.route.ts
│   │   ├── jwt.route.ts
│   │   └── likedArtifact.route.ts
│   ├── services/           # Core business logic and database queries
│   │   ├── artifact.service.ts
│   │   └── likedArtifact.service.ts
│   ├── types/              # Ambient TypeScript declarations (express.d.ts)
│   │   └── express.d.ts
│   ├── validation/         # Zod validation schemas
│   │   └── artifact.validation.ts
│   ├── app.ts              # Express application setup & middleware assembly
│   └── server.ts           # Server bootstrap and entry point
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 API Endpoints Overview

### 🔐 Authentication (`/api/v1/auth`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/jwt` | Generate HTTP-Only JWT authentication cookie | ❌ |
| `POST` | `/logout` | Clear authentication cookie | ❌ |

---

### 🏺 Artifacts (`/api/v1/artifacts`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/` | Fetch all artifacts (Supports `?search=` query) | ❌ |
| `GET` | `/highest-liked` | Fetch top 6 highest-liked artifacts (Aggregation) | ❌ |
| `GET` | `/:id` | Fetch details of a single artifact by ID | ❌ |
| `GET` | `/my-added-artifacts`| Fetch artifacts added by the logged-in user |  |
| `POST` | `/` | Create a new artifact (Zod Validated) |  |
| `PATCH` | `/:id` | Update artifact information |  |
| `DELETE` | `/:id` | Delete an artifact by ID |  |
| `PATCH` | `/like/:id` | Toggle like/unlike an artifact (`$addToSet` / `$pull`) |  |

---

### ❤️ Liked Artifacts (`/api/v1/liked-artifacts`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/` | Fetch all artifacts with at least 1 like |  |
| `GET` | `/my-liked-artifacts`| Fetch artifacts liked by a specific user email |  |

---


## 🏃 Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/past-portals-server.git
cd past-portals-server
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
The server will start running at: `http://localhost:5000`

---

## 🛡️ License

This project is licensed under the [ISC License](LICENSE).
