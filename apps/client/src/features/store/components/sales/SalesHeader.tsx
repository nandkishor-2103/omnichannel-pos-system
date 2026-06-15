import { useState } from "react";

import { Button } from "@/components/ui/button";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

type SalesHeaderProps = {
  branches: string[];
  selectedBranch: string;
  onBranchChange: (branch: string) => void;
};

export default function SalesHeader({
  branches,
  selectedBranch,
  onBranchChange,
}: SalesHeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Sales Analytics</h1>

        <p className="text-muted-foreground">
          Monitor daily sales trends and payment performance.
        </p>
      </div>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" className="w-[280px] justify-between">
            {selectedBranch === "ALL" ? "All Branches" : selectedBranch}

            <ChevronsUpDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[280px] p-0">
          <Command>
            <CommandInput placeholder="Search branch..." />

            <CommandList>
              <CommandEmpty>No branch found.</CommandEmpty>

              <CommandGroup>
                {branches.map((branch) => (
                  <CommandItem
                    key={branch}
                    value={branch}
                    onSelect={() => {
                      onBranchChange(branch);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedBranch === branch ? "opacity-100" : "opacity-0"
                      )}
                    />

                    {branch === "ALL" ? "All Branches" : branch}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
