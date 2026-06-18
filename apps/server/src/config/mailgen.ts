import Mailgen from "mailgen";
import ENV_VARS from "./env.js";

const mailGenerator = new Mailgen({
  theme: "default",

  product: {
    name: "POS Pro",
    link: ENV_VARS.CLIENT_URL,
  },
});

export default mailGenerator;
