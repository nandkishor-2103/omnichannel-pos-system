# Omnichannel POS System

A full-stack Point of Sale (POS) and Inventory Management System for modern retail businesses.

Live Project: https://omnichannel-pos-system-rust.vercel.app  
GitHub Repository: https://github.com/nandkishor-2103/omnichannel-pos-system

---

## About The Project

Omnichannel POS System is a web-based retail management platform built to help store owners run their business from one place.

In simple words, this project helps a retail business manage sales, products, stock, employees, customers, branches, payments, refunds, subscriptions, and reports through a single dashboard.

The system is designed for businesses that have one store or multiple branches and want to move from manual work to a digital and organized workflow.

---

## Why I Built This Project

Many small and medium retail businesses still manage billing, inventory, employee records, and sales reports manually or through separate tools. This can create problems like:

- Wrong stock count
- Slow billing process
- Difficulty managing multiple branches
- No clear sales reports
- Manual refund tracking
- Poor visibility of daily business performance

This project solves these problems by providing a centralized POS system where every role has its own dashboard and permissions.

---

## Main Users Of The System

### Super Admin

The super admin can manage the overall platform, approve stores, monitor registered businesses, and manage subscription plans.

### Store Admin / Store Manager

Store users can manage branches, products, categories, employees, sales reports, subscription upgrades, and store-level analytics.

### Branch Admin / Branch Manager

Branch users can monitor branch performance, manage inventory, view orders, track employees, and check reports.

### Cashier

Cashiers can create orders, manage cart items, accept payments, handle customers, process refunds, and generate shift reports.

---

## Key Features

### Authentication And Security

- User signup and login
- OTP-based email verification
- JWT-based authentication
- Protected routes
- Role-based access control
- Secure password handling

### Store And Branch Management

- Create and manage stores
- Add and manage multiple branches
- Approve or block stores from the admin panel
- Manage store and branch details

### Product And Category Management

- Add, update, and delete products
- Organize products by category
- Search and view products easily
- Connect products with branch inventory

### Inventory Management

- Track available stock
- Manage branch-wise inventory
- Record inventory movements
- Help reduce stock mismatch and overselling

### POS And Billing

- Cashier-friendly POS screen
- Product selection and cart management
- Customer selection
- Discount and payment handling
- Order creation
- Invoice/bill support

### Payment And Subscription

- Razorpay payment integration
- Subscription plan management
- Store subscription upgrade flow
- Payment history
- Subscription invoice generation and download

### Customer Management

- Add and manage customers
- View customer details
- Track customer orders and purchase history

### Refund Management

- Process product returns
- Track refund amount and reason
- Connect refunds with orders and cashier activity

### Shift Reports

- Start, pause, resume, and close cashier shifts
- Track sales during a shift
- View payment summary
- View refunds and recent orders
- Generate cashier performance summary

### Analytics And Reports

- Store dashboard
- Branch dashboard
- Super admin dashboard
- Sales charts
- Revenue summary
- Payment method breakdown
- Product and branch performance insights

---

## Tech Stack

### Frontend

- React.js
- TypeScript
- Vite
- Tailwind CSS
- Shadcn UI
- Redux Toolkit
- React Router
- Recharts
- Axios

### Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- Redis
- JWT
- bcryptjs
- Razorpay
- Nodemailer / email services
- PDF invoice generation

### DevOps And Tools

- Docker
- Docker Compose
- GitHub Actions
- Vercel
- Render / cloud deployment ready setup
- ESLint
- TypeScript build checks

---

## Project Architecture

The project follows a clean full-stack structure with separate frontend and backend applications.

```bash
omnichannel-pos-system/
|
|-- apps/
|   |-- client/        # React frontend
|   |-- server/        # Node.js and Express backend
|
|-- docs/              # Project documents and schema references
|-- docker/            # Docker related files
|-- .github/           # GitHub Actions workflow
|-- docker-compose.yml # Local Docker setup
|-- README.md
```

### Simple Flow

```text
User
  |
React Frontend
  |
REST APIs
  |
Node.js + Express Backend
  |
MongoDB + Redis
```

---

## Backend Modules

The backend is divided into clear modules so the code is easier to understand and maintain.

- Authentication
- User profile
- Store management
- Branch management
- Product management
- Category management
- Inventory management
- Inventory movements
- Employee management
- Customer management
- Order management
- Payment management
- Refund management
- Shift reports
- Store analytics
- Branch analytics
- Admin dashboard
- Subscription plans
- Subscription payments
- Subscription invoices

---

## Frontend Modules

The frontend is organized by user role and business area.

- Landing page
- Login and signup pages
- OTP verification
- Super admin dashboard
- Store dashboard
- Branch dashboard
- Cashier POS dashboard
- Product management screens
- Category management screens
- Employee management screens
- Inventory screens
- Customer lookup screens
- Order history screens
- Refund screens
- Shift report screens
- Subscription and upgrade screens
- Analytics and report pages

---

## My Contribution

This project was fully developed by me.

### Responsibilities

- Planned the complete project structure
- Designed the frontend and backend architecture
- Built the React frontend with role-based dashboards
- Developed REST APIs using Node.js and Express.js
- Created MongoDB models using Mongoose
- Implemented authentication and authorization
- Added Redux Toolkit for frontend state management
- Built POS billing, cart, order, refund, and shift report flows
- Integrated Razorpay payments
- Added subscription and invoice features
- Created dashboards, charts, and reports
- Added Docker setup for local development
- Configured GitHub Actions for build and TypeScript checks

### Technologies Used By Me

React.js, TypeScript, Tailwind CSS, Redux Toolkit, Node.js, Express.js, MongoDB, Mongoose, Redis, JWT, Razorpay, Docker, GitHub Actions, and Vercel.

### Parts Developed Personally

I personally developed the complete frontend, backend, database models, API routes, authentication system, role-based access, dashboards, POS order flow, inventory flow, payment flow, refund flow, subscription flow, invoice flow, and deployment setup.

---

## How To Run The Project Locally

### 1. Clone The Repository

```bash
git clone https://github.com/nandkishor-2103/omnichannel-pos-system.git
cd omnichannel-pos-system
```

### 2. Install Frontend Dependencies

```bash
cd apps/client
npm install
```

### 3. Install Backend Dependencies

```bash
cd ../server
npm install
```

### 4. Create Backend Environment File

Create a `.env` file inside `apps/server`.

Example:

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
MONGO_URI=mongodb://localhost:27017/pos-system
JWT_SECRET=your_jwt_secret
REDIS_URL=redis://localhost:6379
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

### 5. Start Backend Server

```bash
npm run dev
```

### 6. Start Frontend Server

Open another terminal:

```bash
cd apps/client
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

Backend will run on:

```text
http://localhost:5000
```

---

## Run With Docker

You can also run the project using Docker Compose.

```bash
docker compose up -d
```

This starts the frontend and backend in containers for local development.

---

## CI/CD

This project includes a GitHub Actions workflow that checks the project on push and pull request.

The workflow:

- Installs frontend dependencies
- Builds the frontend
- Runs TypeScript checks for the frontend
- Installs backend dependencies
- Builds the backend
- Runs TypeScript checks for the backend

This helps keep the codebase clean and reduces the chance of broken code being merged.

---

## Deployment

The frontend is deployed on Vercel.

Live Link: https://omnichannel-pos-system-rust.vercel.app

The backend is prepared for cloud deployment using services like Render or AWS.

---

## What This Project Shows

This project shows my ability to:

- Build a complete full-stack MERN application
- Work with TypeScript in both frontend and backend
- Design role-based business software
- Create real-world dashboards and reports
- Manage complex state using Redux Toolkit
- Build secure APIs with authentication and authorization
- Work with MongoDB data modeling
- Integrate payment and invoice workflows
- Set up Docker and CI/CD workflow
- Think like a product developer, not only a coder

---

## Future Improvements

- Add automated backend tests
- Add automated frontend tests
- Add barcode scanner support
- Add advanced invoice templates
- Add real-time stock updates using WebSockets
- Add more detailed profit and loss reports
- Add mobile-friendly cashier mode

---

## License

This project is developed for learning, portfolio, and internship evaluation purposes.
