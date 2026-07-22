# Omnichannel POS Pro

A full-stack Point of Sale (POS), inventory, and retail management platform for modern single-store and multi-branch businesses.

[Live Demo](https://omnichannel-pos-system-rust.vercel.app/) | [GitHub Repository](https://github.com/nandkishor-2103/omnichannel-pos-system)

## About the Project

Omnichannel POS Pro helps retail businesses manage their daily operations from one centralized dashboard.

The platform brings sales, billing, products, inventory, customers, employees, branches, payments, refunds, subscriptions, shifts, and business reports into one system. Each user sees only the tools and information allowed for their role.

It is designed for businesses that want to replace manual records and disconnected tools with a more organized digital workflow.

## The Problem It Solves

Small and medium retail businesses often manage billing, stock, employees, and reports manually or through separate applications. This can lead to:

- Incorrect stock counts
- Slow checkout and billing
- Difficulty managing multiple branches
- Limited visibility into sales performance
- Manual payment and refund tracking
- Inconsistent employee and shift records

Omnichannel POS Pro provides one platform for managing these operations with role-based access and branch-level visibility.

## Project Status

The main business workflows are implemented, including:

- Authentication and role-based access
- Store and branch management
- Product and category management
- Branch-wise inventory tracking
- POS billing and order management
- Customer management
- Payments and refunds
- Cashier shift reports
- Subscription plans, upgrades, and invoices
- Role-based dashboards and analytics

Future improvements are listed in the [Roadmap](#roadmap).

## User Roles

| Role                          | Main Responsibilities                                                                                      |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Super Admin                   | Manages the platform, reviews stores, monitors registered businesses, and controls subscription plans.     |
| Store Admin / Store Manager   | Manages store details, branches, products, categories, employees, subscriptions, and store-level reports.  |
| Branch Admin / Branch Manager | Manages branch inventory, orders, employees, performance, and branch-level reports.                        |
| Cashier                       | Creates orders, manages carts and customers, accepts payments, processes refunds, and manages work shifts. |

## Key Features

### Authentication and Security

- User signup and login
- OTP-based email verification
- JWT-based authentication
- Secure password hashing
- Protected frontend and backend routes
- Role-based access control
- Request validation and centralized error handling

### Store and Branch Management

- Create and manage stores
- Add and manage multiple branches
- Approve, block, or review stores from the admin panel
- Maintain store and branch information
- Separate business data by store and branch

### Product and Category Management

- Add, update, view, and remove products
- Organize products into categories
- Search and filter the product catalog
- Connect products with branch inventory

### Inventory Management

- Track available stock by branch
- Record inventory movements
- Monitor stock changes caused by sales and adjustments
- Reduce stock mismatch and overselling risks

### POS and Billing

- Cashier-friendly POS interface
- Product search and selection
- Cart quantity management
- Customer selection
- Discount and payment handling
- Order creation and bill support

### Order and Customer Management

- View and manage orders
- Add and manage customers
- Review customer details
- Track customer orders and purchase history

### Payments and Subscriptions

- Razorpay payment integration
- Subscription plan management
- Store subscription upgrade flow
- Payment history
- Subscription invoice generation and download

### Refund Management

- Process product returns
- Record refund amounts and reasons
- Link refunds to orders and cashier activity
- Track refund history

### Cashier Shift Reports

- Start, pause, resume, and close shifts
- Track sales completed during a shift
- View payment summaries
- Review refunds and recent orders
- Generate cashier performance summaries

### Analytics and Reports

- Super admin dashboard
- Store dashboard
- Branch dashboard
- Sales and revenue summaries
- Payment-method breakdowns
- Product and branch performance insights
- Interactive charts and business reports

## Core Business Flow

```text
Store setup
-> Branch creation
-> Product and category setup
-> Branch inventory assignment
-> Cashier shift starts
-> Customer and products are added to the cart
-> Payment is completed
-> Order and inventory are updated
-> Sales data appears in reports and dashboards
```

## Tech Stack

### Frontend

- React.js
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Redux Toolkit
- React Router
- Axios
- Recharts

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
- Email services
- PDF invoice generation

### DevOps and Development Tools

- Docker
- Docker Compose
- Git and GitHub
- GitHub Actions
- Vercel
- Render / cloud-ready deployment
- Postman
- ESLint
- TypeScript build checks

## Architecture

The project uses a decoupled monorepo with separate frontend and backend applications.

```text
User
-> React frontend
-> REST API
-> Node.js and Express backend
-> MongoDB and Redis
```

### Architecture Goals

- Keep frontend and backend responsibilities separate
- Organize business logic into clear modules
- Protect features using authentication and role permissions
- Keep store and branch data properly scoped
- Reuse shared types, utilities, and UI components
- Support local and cloud-based deployments

## Project Structure

```text
omnichannel-pos-system/
|-- apps/
|   |-- client/                 # React, TypeScript, and Vite frontend
|   `-- server/                 # Node.js, Express, and TypeScript backend
|-- docs/                       # Project documents and schema references
|-- docker/                     # Docker-related configuration
|-- .github/                    # GitHub Actions workflows
|-- docker-compose.yml          # Local multi-container setup
|-- package.json
`-- README.md
```

## Backend Modules

- Authentication
- User profiles
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

## Frontend Modules

- Landing page
- Login, signup, and OTP verification
- Super admin dashboard
- Store dashboard
- Branch dashboard
- Cashier POS dashboard
- Product and category management
- Employee management
- Inventory screens
- Customer lookup and management
- Order history
- Refund workflows
- Shift reports
- Subscription and upgrade screens
- Analytics and reporting pages

## Getting Started

### Prerequisites

Install the following tools before running the project:

- Node.js and npm
- MongoDB or a MongoDB Atlas account
- Redis
- Git
- Docker Desktop (optional)

You will also need Razorpay credentials if you want to test payment features.

### 1. Clone the Repository

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

### 4. Configure Backend Environment Variables

Create an `.env` file inside `apps/server`.

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
MONGO_URI=mongodb://localhost:27017/pos-system
JWT_SECRET=replace_with_a_strong_secret
REDIS_URL=redis://localhost:6379
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

Use the repository's `.env.example`, if available, as the final source of truth for all required variables.

Never commit real secrets or production credentials to GitHub.

### 5. Configure Frontend Environment Variables

Create an `.env` file inside `apps/client` and set the backend API URL used by the frontend.

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Confirm the exact variable name and API prefix in the frontend configuration before running the application.

### 6. Start the Backend

From `apps/server`:

```bash
npm run dev
```

### 7. Start the Frontend

Open another terminal and run:

```bash
cd apps/client
npm run dev
```

The applications normally run at:

```text
Frontend: http://localhost:5173
Backend:  http://localhost:5000
```

## Run with Docker

From the repository root:

```bash
docker compose up -d
```

View running containers:

```bash
docker compose ps
```

View service logs:

```bash
docker compose logs -f
```

Stop the application:

```bash
docker compose down
```

## CI/CD

The repository includes GitHub Actions workflows for automated checks on pushes and pull requests.

The pipeline checks the frontend and backend by:

- Installing dependencies
- Running TypeScript checks
- Building the applications
- Detecting build failures before changes are merged

## Deployment

- Frontend: Vercel
- Backend: Render or another Node.js-compatible cloud service
- Database: MongoDB Atlas
- Cache: Managed Redis or a cloud Redis provider

Production deployment requires the frontend API URL, backend client origin, database connection, Redis connection, cookie/security settings, and payment credentials to match the deployed domains.

Live demo: [https://omnichannel-pos-system-rust.vercel.app](https://omnichannel-pos-system-rust.vercel.app/)

## My Contribution

I worked across the complete full-stack development lifecycle, including:

- Planning the project structure and module boundaries
- Designing frontend and backend architecture
- Building role-based dashboards with React and TypeScript
- Developing REST APIs using Node.js and Express
- Creating MongoDB models with Mongoose
- Implementing authentication and authorization
- Managing frontend state with Redux Toolkit
- Building POS, cart, order, inventory, refund, and shift workflows
- Integrating Razorpay payments
- Developing subscription and invoice features
- Creating dashboards, charts, and business reports
- Adding Docker-based local development
- Configuring GitHub Actions for build and TypeScript checks
- Preparing the frontend and backend for cloud deployment

## What This Project Demonstrates

- Full-stack MERN development with TypeScript
- Role-based business application design
- REST API development and frontend integration
- Complex state management using Redux Toolkit
- MongoDB data modeling for connected business workflows
- Multi-branch inventory and access-control logic
- Payment, refund, subscription, and invoice integration
- Dashboard and reporting development
- Docker and CI/CD fundamentals
- Product-focused problem solving

## Roadmap

- Add automated backend tests
- Add automated frontend tests
- Add barcode scanner support
- Add advanced invoice templates
- Add real-time inventory updates with WebSockets
- Add detailed profit-and-loss reports
- Improve mobile and tablet support for cashiers
- Add low-stock alerts and reorder suggestions

## Disclaimer

This project was created for learning, portfolio presentation, and internship evaluation. It should be reviewed and hardened further before being used for real financial or retail operations.

## License

This project is intended for educational and portfolio use. See the repository license, if included, for complete usage terms.

## Author

**Nandkishor Mandal**

- [Portfolio](https://devcanvas-portfolio.vercel.app/)
- [LinkedIn](https://www.linkedin.com/in/nandkishormandal/)
- [GitHub](https://github.com/nandkishor-2103)
- [Email](mailto:mandalnandkishorbk@gmail.com)
