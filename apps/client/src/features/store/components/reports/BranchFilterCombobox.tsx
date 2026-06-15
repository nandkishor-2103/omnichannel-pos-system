import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { cn } from "@/lib/utils";

type Branch = {
  _id: string;
  name: string;
};

type Props = {
  branches: Branch[];
  value: string;
  onChange: (value: string) => void;
};

export default function BranchFilterCombobox({ branches, value, onChange }: Props) {
  const [open, setOpen] = React.useState(false);

  const selectedBranch = branches.find((branch) => branch._id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[260px] justify-between"
        >
          {value ? selectedBranch?.name : "All Branches"}

          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[260px] p-0">
        <Command>
          <CommandInput placeholder="Search branch..." />

          <CommandEmpty>No branch found.</CommandEmpty>

          <CommandGroup>
            <CommandItem
              value="all"
              onSelect={() => {
                onChange("");
                setOpen(false);
              }}
            >
              <Check
                className={cn("mr-2 h-4 w-4", value === "" ? "opacity-100" : "opacity-0")}
              />
              All Branches
            </CommandItem>

            {branches.map((branch) => (
              <CommandItem
                key={branch._id}
                value={branch.name}
                onSelect={() => {
                  onChange(branch._id);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === branch._id ? "opacity-100" : "opacity-0"
                  )}
                />

                {branch.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
