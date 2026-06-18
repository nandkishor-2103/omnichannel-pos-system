const verificationEmailTemplate = ({
  fullName,
  otp,
}: {
  fullName: string;
  otp: string;
}) => ({
  body: {
    name: fullName,

    intro: "Welcome to POS Pro. Please verify your email.",

    action: {
      instructions: "Use this OTP to verify your account:",

      button: {
        color: "#22BC66",
        text: otp,
        link: "#",
      },
    },

    outro: "OTP expires in 5 minutes.",
  },
});

export default verificationEmailTemplate;
