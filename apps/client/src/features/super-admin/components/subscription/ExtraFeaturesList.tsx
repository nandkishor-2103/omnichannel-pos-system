import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

interface Props {
  values: {
    extraFeatures: string[];
  };

  handleExtraFeatureChange: (idx: number, value: string) => void;

  handleRemoveExtraFeatureChange: (idx: number) => void;

  handleAddExtraFeatureChange: () => void;
}

export default function ExtraFeaturesList({
  values,
  handleExtraFeatureChange,
  handleRemoveExtraFeatureChange,
  handleAddExtraFeatureChange,
}: Props) {
  return (
    <div className="space-y-2">
      {values.extraFeatures.map((feature, idx) => (
        <div key={idx} className="flex gap-2">
          <Input
            value={feature}
            placeholder="Extra feature"
            onChange={(e) => handleExtraFeatureChange(idx, e.target.value)}
          />

          <Button
            type="button"
            variant="destructive"
            disabled={values.extraFeatures.length === 1}
            onClick={() => handleRemoveExtraFeatureChange(idx)}
          >
            Remove
          </Button>
        </div>
      ))}

      <Button type="button" variant="outline" onClick={handleAddExtraFeatureChange}>
        <Plus className="mr-2 h-4 w-4" />
        Add Feature
      </Button>
    </div>
  );
}
