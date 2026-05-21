# **Product Requirements Document (PRD)**

---

# **1. Product Overview**

---

## **Product Name**

---

POS (Point of Sale) System

## **Version**

---

1.0.0

## **Project Alignment**

---

This project is fully aligned with:

- MERN architecture requirements
- Omnichannel retail workflows
- Enterprise-grade software engineering practices

---

# **2. Executive Problem Statement**

---

Retail businesses transitioning from offline to digital operations often face:

- Inventory mismatches
- Slow billing systems
- Overselling problems
- Lack of centralized analytics
- Manual inventory management
- Poor synchronization between stores

The objective of this system is to provide:

- Real-time inventory synchronization
- Fast POS billing
- Multi-store management
- Subscription-based SaaS onboarding
- Analytics dashboards

---

# **3. Business Objectives**

---

## **Primary Goals**

---

- Automate retail billing operations
- Maintain inventory consistency
- Support omnichannel retail operations
- Provide centralized business dashboards
- Enable multi-store scalability

## **Secondary Goals**

---

- Improve cashier efficiency
- Reduce operational errors
- Improve reporting accuracy

---

# **4. Tech Stack**

---

| **Layer** | **Technology** |
| --- | --- |
| Frontend | React.js |
| Styling | Tailwind CSS |
| Backend | Node.js |
| API Framework | Express.js |
| Language | TypeScript |
| Database | MongoDB |
| ODM (Object-Document Mapper) | Mongoose |
| Cache Layer | Redis |
| Authentication | JWT + bcryptjs |
| State Management | Redux Toolkit |
| Testing | Postman |
| Deployment | Docker |
| CI/CD | GitHub Actions |
| Hosting | AWS / Render / Vercel |

---

# **5. System Architecture**

---

## **High-Level Architecture**

---

```
Frontend (React + Tailwind)
        ↓
    REST APIs
        ↓
Backend Services (Node.js + Express + TypeScript)
        ↓
MongoDB + Redis
```

---

# **6. Core Features**

---

## **POS Features**

---

- POS terminal
- Product search
- Cart management
- Discounts
- Tax calculations
- Invoice generation
- Refund management
- Shift summary
- Download bill

## **Inventory Features**

---

- Real-time inventory tracking
- Stock synchronization
- Inventory updates

## **Store Features**

---

- Multi-store suppor
- Branch dashboard
- Store dashboard
- Employee management
- Store onboarding
- Subscription plans

## **Analytics Features**

---

- Sales charts
- Revenue reports
- Product performance analytics

## **Authentication Features**

---

- Login
- Signup
- Forgot password
- JWT authentication
- Role-based access control

---

# **7. Authentication Module**

---

## **Endpoints**

---

| **Method** | **Endpoint** | **Description** |
| --- | --- | --- |
| `POST`✅ | `/auth/signup` | Register a new user (e.g. admin, cashier) |
| `POST`✅ | `/auth/login`  | Login with email & password |
| `POST`❌ | `/auth/forgot-password` | Forgot Password |
| `POST`❌ | `/auth/reset-password` | Reset Password |
| `POST` ✅ | `/auth/logout` | Logout user profile |
| `POST` ✅ | `/auth/verify-otp` | Verify email using OTP |

---

# **8. User Module**

---

## **Endpoints**

---

| **Method** | **Endpoint** | **Description** |
| --- | --- | --- |
| `GET`✅ | `/api/user/profile` | Get current looged in user profile |
| `GET`✅ | `/api/users/:id` | Get user by ID |

---

# **9. Store Module**

---

## **Endpoints:** 🔐 Protected Routes (some with role restrictions)

---

| Method | Endpoint | Description | Access |
| --- | --- | --- | --- |
| `POST` ✅ | `/api/stores/` | ✅ **Create a store** – Requires JWT token | `STORE_ADMIN` |
| `GET` ✅ | `/api/stores/:id` | 🔍 **Get store by ID** | `SUPER_ADMIN` , `STORE_ADMIN` , `STORE_MANAGER` , `BRANCH_MANAGER` , `BRANCH_ADMIN` |
| `PUT` ✅ | `/api/stores/:id` | ✏️ **Update store info** | `STORE_ADMIN` |
| `DELETE` ✅ | `/api/stores/` | ❌ **Delete store of the logged-in admin** | `STORE_ADMIN` |
| `GET` ✅ | `/api/stores/admin` | 🧑‍💼 **Get store created by current admin** | `STORE_ADMIN` |
| `GET` ✅ | `/api/stores/employee` | 👥 **Get store associated with logged-in employee** | `STORE_MANAGER` , `BRANCH_MANAGER` , `BRANCH_ADMIN` , `BRANCH_CASHIER` |
| `GET` ✅ | `/api/stores/:storeId/employee/list` | 📋 **List all employees in a store** (Only Manager/Admin) | `STORE_ADMIN` , `STORE_MANAGER` |
| `POST` ✅ | `/api/stores/add/employee` | ➕ **Add employee to store** (Only Manager/Admin) | `STORE_ADMIN` , `STORE_MANAGER` |
| `GET` ✅ | `/api/stores/` | 🌍 **Get all stores** (optional filter by status) | `SUPER_ADMIN` |
| `PUT` ✅ | `/api/stores/:storeId/moderate?action=APPROVED` | ⚖️ **Approve or decline a store** | `SUPER_ADMIN` |

---

# **10. Product Module**

---

## **Product Endpoints**

---

| Method | Endpoint | Purpose | Access |
| --- | --- | --- | --- |
| `POST` ✅ | `/api/products/` | Create new product *(Store Admin, Store Manager)* | `STORE_MANAGER`, `STORE_ADMIN` |
| `GET` ✅ | `/api/products/:id` | Get product by ID (authenticated user can access) | Only authenticated user can access |
| `PATCH` ✅ | `/api/products/:id` | Update product by ID *(Store Admin, Store Manager)* | `STORE_MANAGER`, `STORE_ADMIN` |
| `DELETE` ✅ | `/api/products/:id` | Delete product by ID *(Store Admin, Store Manager)* | `STORE_MANAGER`, `STORE_ADMIN` |
| `GET` ✅ | `/api/products/store/:storeId` | Get all products of a store (authenticated user can access) | Only authenticated user can access |
| `GET` ✅ | `/api/products/store/:storeId/search?q=xyz` | Search products in a store (authenticated user can access) | Only authenticated user can access |

---

# **11. Category Module**

---

## **Category Endpoints**

---

| HTTP Method | Endpoint | Description | Access |
| --- | --- | --- | --- |
| `POST` ✅ | `/api/categories/` | Create a new category for a store. | `STORE_MANAGER`, `STORE_ADMIN` |
| `GET` ✅ | `/api/categories/store/:storeId` | Fetch all categories belonging to a specific store. | Public |
| `PUT` ✅ | `/api/categories/:id` | Update category details by category ID. | `STORE_MANAGER`, `STORE_ADMIN` |
| `DELETE` ✅ | `/api/categories/:id` | Delete a category by ID. | `STORE_MANAGER`, `STORE_ADMIN` |

---

# 12. Branch **Module**

---

## Branch Endpoints

---

| Method | Endpoint | Description | Access |
| --- | --- | --- | --- |
| `POST` ✅ | `/api/branches/` | Create a new branch (requires authorization). | `STORE_MANAGER`, `STORE_ADMIN` |
| `GET` ✅ | `/api/branches/:id` | Retrieve details of a branch by its ID. | Only authenticated user can access |
| `GET` ✅ | `/api/branches/store/:storeId` | Get all branches associated with a specific store. | `STORE_MANAGER`, `STORE_ADMIN` |
| `PUT` ✅ | `/api/branches/:id` | Update an existing branch (requires authorization). | `STORE_MANAGER`, `STORE_ADMIN` |
| `DELETE` ✅ | `/api/branches/:id` | Delete a branch by its ID. | `STORE_MANAGER`, `STORE_ADMIN` |

---

# **13. Inventory Module**

---

## **Inventory Endpoints**

---

| HTTP Method | Endpoint | Description | Access |
| --- | --- | --- | --- |
| `POST` ✅ | `/api/inventories/` | Create a new inventory record (Store Manager only). | `STORE_MANAGER` |
| `PUT` ✅ | `/api/inventories/:id` | Update inventory quantity for a specific record (Store Manager only). | `STORE_MANAGER` |
| `DELETE` ✅ | `/api/inventories/:id` | Delete an inventory record (Store Manager only). | `STORE_MANAGER` |
| `GET` ✅ | `/api/inventories/:id` | Get inventory details by inventory ID. | Authenticated user can access |
| `GET` ✅ | `/api/inventories/product/:productId` | Get inventory record for a specific product (across all branches). | Authenticated user can access |
| `GET` ✅ | `/api/inventories/branch/:branchId` | Get all inventory records for a specific branch. | Authenticated user can access |

---

# 14. Employee Module

---

## **Employee Endpoints**

---

| Method | Endpoint | Description | Access Roles |
| --- | --- | --- | --- |
| `POST` ✅ | `/api/employees/store/:storeId` | Create an employee and assign to a store | `ROLE_STORE_ADMIN`, `ROLE_STORE_MANAGER` |
| `POST` ✅ | `/api/employees/branch/:branchId` | Create an employee and assign to a branch | `ROLE_BRANCH_ADMIN`, `ROLE_BRANCH_MANAGER` |
| `PUT` ✅ | `/api/employees/:employeeId:` | Update employee details | Store/Branch Admins and Managers |
| `DELETE` ✅ | `/api/employees/:employeeId` | Delete an employee by ID | `ROLE_STORE_ADMIN`, `ROLE_BRANCH_ADMIN` |
| `GET` ✅ | `/api/employees/:employeeId` | Get employee details by ID | Store/Branch Admins and Managers |
| `GET` ✅ | `/api/employees/store/:storeId` | List all employees under a store | `ROLE_STORE_ADMIN`, `ROLE_STORE_MANAGER` |
| `GET` ✅ | `/api/employees/branch/:branchId?role=MANAGER` | List all employees under a branch, optionally filter by role | `ROLE_BRANCH_ADMIN`, `ROLE_BRANCH_MANAGER` |

---

# 15. Customer Module

---

## Customer Endpoints

---

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/customers` | ✅ Create a new customer. |
| `PUT` | `/api/customers/:id` | ✏️ Update an existing customer by ID. |
| `DELETE` | `/api/customers/:id` | 🗑 Delete a customer by ID. |
| `GET` | `/api/customers/:id` | 🔍 Get a specific customer by ID. |
| `GET` | `/api/customers` | 📋 Fetch all customers from the system. |

---