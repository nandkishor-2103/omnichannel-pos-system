import { Field, type FieldProps } from "formik";
import { Switch } from "@/components/ui/switch";

const FEATURE_FIELDS = [
  { key: "enableAdvancedReports", label: "Advanced Reports" },
  { key: "enableInventory", label: "Inventory System" },
  { key: "enableIntegrations", label: "Integrations" },
  { key: "enableEcommerce", label: "eCommerce" },
  { key: "enableInvoiceBranding", label: "Invoice Branding" },
  { key: "prioritySupport", label: "Priority Support" },
  { key: "enableMultiLocation", label: "Multi Location" },
];

interface Props {
  handleFeatureSwitch: (key: string, value: boolean) => void;
}

export default function FeaturesSwitchGrid({ handleFeatureSwitch }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {FEATURE_FIELDS.map((feature) => (
        <Field key={feature.key} name={feature.key}>
          {({ field }: FieldProps) => (
            <label
              htmlFor={feature.key}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <span className="text-sm font-medium">{feature.label}</span>

              <Switch
                id={feature.key}
                checked={field.value}
                onCheckedChange={(value) => handleFeatureSwitch(feature.key, value)}
              />
            </label>
          )}
        </Field>
      ))}
    </div>
  );
}
