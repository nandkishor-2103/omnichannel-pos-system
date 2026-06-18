const resetPasswordTemplate = ({ fullName, otp }: { fullName: string; otp: string }) => ({
  body: {
    name: fullName,

    intro: "We received a password reset request.",

    action: {
      instructions: "Use this OTP to reset password:",

      button: {
        color: "#DC4D2F",
        text: otp,
        link: "#",
      },
    },

    outro: "OTP expires in 5 minutes.",
  },
});

export default resetPasswordTemplate;
