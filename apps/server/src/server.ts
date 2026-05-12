import app from "./app.js";
import ENV_VARS from "./config/env.js";
import connectDB from "./config/db.js";

const PORT: number = Number(ENV_VARS.SERVER_PORT);

async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`[ SERVER ] 🌎 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("[ SERVER ] ❌ Failed to start the server:", error);
    process.exit(1);
  }
}

startServer();
