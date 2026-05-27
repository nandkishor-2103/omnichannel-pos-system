export const getChangeType = (growth: number): "positive" | "negative" | "neutral" => {
  if (growth > 0) return "positive";

  if (growth < 0) return "negative";

  return "neutral";
};
