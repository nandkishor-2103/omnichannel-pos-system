# Omnichannel POS System

Cloud-native retail POS and Inventory Management System built using MERN stack and TypeScript.

---

## Tech Stack

### Frontend
- React.js
- TypeScript
- Tailwind CSS
- Redux Toolkit

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- Redis

### DevOps
- Docker
- GitHub Actions
- Vercel
- AWS / Render

---

## Project Structure

```bash
omnichannel-pos-system/
│
├── apps/
│   ├── client/
│   └── server/
│
├── docker/
├── docs/
├── .github/
│
├── docker-compose.yml
└── README.md
```

---

## Features

- Real-time Inventory Tracking
- Multi-store POS Management
- Authentication & RBAC
- Product & Category Management
- Sales & Analytics Dashboard
- Redis Caching
- Dockerized Development Environment
- CI/CD Pipeline

---

## Development Workflow

- GitHub Flow Based Development
- Feature Branch Workflow
- Pull Request Based Collaboration
- Conventional Commit Messages
- Dockerized Local Setup
- CI/CD using GitHub Actions

---

## Branches

```bash
main
develop
feature/*
```

---

## Setup Instructions

### Clone Repository

```bash
git clone https://github.com/nandkishor-2103/omnichannel-pos-system.git
```

### Install Frontend Dependencies

```bash
cd apps/client
npm install
```

### Install Backend Dependencies

```bash
cd ../server
npm install
```

### Run Docker Services

```bash
docker compose up -d
```

### Start Backend Server

```bash
npm run dev
```

### Start Frontend Server

```bash
cd ../client
npm run dev
```

---

## Environment Variables

Create `.env` file inside:

```bash
apps/server
```

Example:

```env
PORT=5000

MONGO_URI=mongodb://localhost:27017/pos-system

JWT_SECRET=your_secret_key

REDIS_URL=redis://localhost:6379
```

---

## Current Status

🚧 Project Setup & Architecture Phase Completed

---

## License

This project is developed for the Infotact Technical Internship Program.
