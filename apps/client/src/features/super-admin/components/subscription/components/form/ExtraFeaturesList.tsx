import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Plus, Trash2 } from "lucide-react";

import type { PlanFormValues } from "../../../../types/types";

type Props = {
  values: PlanFormValues;
  setFieldValue: (field: string, value: unknown) => void;
};

export default function ExtraFeaturesList({ values, setFieldValue }: Props) {
  const addFeature = () => {
    setFieldValue("extraFeatures", [...values.extraFeatures, ""]);
  };

  const removeFeature = (index: number) => {
    setFieldValue(
      "extraFeatures",
      values.extraFeatures.filter((_, idx) => idx !== index)
    );
  };

  const updateFeature = (index: number, value: string) => {
    const updated = [...values.extraFeatures];

    updated[index] = value;

    setFieldValue("extraFeatures", updated);
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold">Extra Features</h3>

        <Button type="button" variant="outline" size="sm" onClick={addFeature}>
          <Plus className="mr-2 h-4 w-4" />
          Add Feature
        </Button>
      </div>

      <div className="space-y-3">
        {values.extraFeatures.map((feature, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={feature}
              placeholder="Enter feature"
              onChange={(e) => updateFeature(index, e.target.value)}
            />

            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => removeFeature(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
