import { Switch } from "@/components/ui/switch";

import type { PlanFormValues } from "../../../../types/types";


type Props = {
  values: PlanFormValues;
  setFieldValue: (field: string, value: unknown) => void;
};

const FEATURES = [
  {
    key: "enableAdvancedReports",
    label: "Advanced Reports",
  },
  {
    key: "enableInventory",
    label: "Inventory Management",
  },
  {
    key: "enableIntegrations",
    label: "Integrations",
  },
  {
    key: "enableEcommerce",
    label: "E-Commerce",
  },
  {
    key: "enableInvoiceBranding",
    label: "Invoice Branding",
  },
  {
    key: "prioritySupport",
    label: "Priority Support",
  },
  {
    key: "enableMultiLocation",
    label: "Multi Location",
  },
];

export default function FeaturesSwitchGrid({ values, setFieldValue }: Props) {
  return (
    <div>
      <h3 className="mb-4 font-semibold">Features</h3>

      <div className="grid gap-4 md:grid-cols-2">
        {FEATURES.map((feature) => (
          <div
            key={feature.key}
            className="flex items-center justify-between rounded-lg border p-4"
          >
            <span className="font-medium">{feature.label}</span>

            <Switch
              checked={values[feature.key as keyof PlanFormValues] as boolean}
              onCheckedChange={(checked) => setFieldValue(feature.key, checked)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
