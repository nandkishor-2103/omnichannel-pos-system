import { BrevoClient } from "@getbrevo/brevo";
import ENV from "./env.js";

const brevo = new BrevoClient({
  apiKey: ENV.BREVO_API_KEY,
});

export default brevo;
