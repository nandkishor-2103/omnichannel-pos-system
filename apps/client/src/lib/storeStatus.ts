export const getStoreStatusMessage = (status?: string) => {
  switch (status) {
    case "PENDING":
      return "Your store is awaiting approval from the Super Admin.";

    case "BLOCKED":
      return "Your store has been blocked. Please contact support.";

    case "INACTIVE":
      return "Your store is currently inactive.";

    default:
      return "Store access is restricted.";
  }
};
