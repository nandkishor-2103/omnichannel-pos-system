import { CheckCircle } from "lucide-react";

interface SubscriptionFeatureListProps {
  features: string[];
}

export default function SubscriptionFeatureList({
  features,
}: SubscriptionFeatureListProps) {
  if (!features.length) {
    return (
      <p className="text-sm text-muted-foreground">No additional features available.</p>
    );
  }

  return (
    <ul className="space-y-2">
      {features.map((feature, index) => (
        <li
          key={`${feature}-${index}`}
          className="flex items-start gap-2 text-sm text-muted-foreground"
        >
          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />

          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
}
