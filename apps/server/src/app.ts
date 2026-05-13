import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import errorHandler from "./middleware/errorHandler.js";
import { authRoutes } from "./routes/auth.routes.js";
import { userRoutes } from "./routes/user.routes.js";

const app = express();

// ========== 🛡️ Middleware ===========
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());

// ===========🧑‍⚕️👩‍⚕️👨‍⚕️ Health Check Routes ===========
app.get("/api/health", (req: express.Request, res: express.Response) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
    status: "OK",
  });
});

// ============ 📚 API Routes ===========
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
// =========== 🚨 Global Error Handling Middleware ===========
app.use(errorHandler);

export default app;
