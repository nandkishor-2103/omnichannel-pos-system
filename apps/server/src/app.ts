import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import ENV_VARS from "./config/env.js";

import errorHandler from "./middleware/errorHandler.js";
import { authRoutes } from "./routes/auth.routes.js";
import { userRoutes } from "./routes/user.routes.js";
import { storeRoutes } from "./routes/store.routes.js";
import { productRoutes } from "./routes/product.route.js";
import { categoryRoutes } from "./routes/category.route.js";
import { branchRoutes } from "./routes/branch.routes.js";
import { inventoryRoutes } from "./routes/inventory.route.js";
import { employeeRoutes } from "./routes/employee.routes.js";
import { customerRoutes } from "./routes/customer.routes.js";
import { orderRoutes } from "./routes/order.routes.js";
import { refundRoutes } from "./routes/refund.routes.js";
import { shiftReportRoutes } from "./routes/shiftReport.routes.js";

const app = express();

// ========== 🛡️ Middleware ===========
app.use(
  cors({
    // In production, allow only the specified client URL. In development, allow localhost:5173.
    origin:
      ENV_VARS.NODE_ENV === "production" ? ENV_VARS.CLIENT_URL : "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());

// ===========🧑‍⚕️👩‍⚕️👨‍⚕️ Health Check Routes ===========
app.get("/api/health", (req: express.Request, res: express.Response) => {
  res.status(200).json({
    success: true,
    message: "Ding! Server is healthy",
    status: "OK",
  });
});

app.get("/health", (req: express.Request, res: express.Response) => {
  res.status(200).json({
    success: true,
    message: "Pong! Server is healthy",
    status: "OK",
  });
});

// ============ 📚 API Routes ===========
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/branches", branchRoutes);
app.use("/api/inventories", inventoryRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/refunds", refundRoutes);
app.use("/api/shift-reports", shiftReportRoutes);
// =========== 🚨 Global Error Handling Middleware ===========
app.use(errorHandler);

export default app;
