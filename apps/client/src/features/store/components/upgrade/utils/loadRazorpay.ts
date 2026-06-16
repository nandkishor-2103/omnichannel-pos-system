export const loadRazorpay = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const existingRazorpay = (
      window as typeof window & {
        Razorpay?: unknown;
      }
    ).Razorpay;

    if (existingRazorpay) {
      resolve(true);
      return;
    }

    const existingScript = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    );

    if (existingScript) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");

    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.async = true;

    script.onload = () => resolve(true);

    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
};
