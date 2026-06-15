import * as React from "react";

import { Check, ChevronsUpDown, ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { cn } from "@/lib/utils";

type Category = {
  categoryName: string;
  totalSales: number;
};

type Props = {
  categories: Category[];
  value: string;
  onChange: (value: string) => void;
};

const ITEMS_PER_PAGE = 5;

export default function CategoryFilterCombobox({ categories, value, onChange }: Props) {
  const [open, setOpen] = React.useState(false);

  const [search, setSearch] = React.useState("");

  const [page, setPage] = React.useState(1);

  const filteredCategories = React.useMemo(() => {
    if (!search.trim()) {
      return categories;
    }

    return categories.filter((category) =>
      category.categoryName.toLowerCase().includes(search.toLowerCase())
    );
  }, [categories, search]);

  const totalPages = Math.max(1, Math.ceil(filteredCategories.length / ITEMS_PER_PAGE));

  const currentPage = Math.min(page, totalPages);

  const paginatedCategories = React.useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredCategories.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredCategories, currentPage]);

  const selectedLabel = value || "All Categories";

  return (
    <Popover
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);

        if (!isOpen) {
          setSearch("");
          setPage(1);
        }
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[260px] justify-between"
        >
          {selectedLabel}

          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        side="bottom"
        align="start"
        sideOffset={8}
        avoidCollisions={false}
        className="z-50 w-[var(--radix-popover-trigger-width)] p-0"
      >
        <Command>
          <CommandInput
            placeholder="Search category..."
            value={search}
            onValueChange={(value) => {
              setSearch(value);
              setPage(1);
            }}
          />

          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>

            <CommandGroup>
              <CommandItem
                value="all"
                onSelect={() => {
                  onChange("");
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === "" ? "opacity-100" : "opacity-0"
                  )}
                />
                All Categories
              </CommandItem>

              {paginatedCategories.map((category) => (
                <CommandItem
                  key={category.categoryName}
                  value={category.categoryName}
                  onSelect={() => {
                    onChange(category.categoryName);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === category.categoryName ? "opacity-100" : "opacity-0"
                    )}
                  />

                  <div className="flex w-full items-center justify-between">
                    <span>{category.categoryName}</span>

                    <span className="text-xs text-muted-foreground">
                      ₹{category.totalSales.toLocaleString("en-IN")}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>

          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t px-3 py-2">
              <Button
                variant="ghost"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <span className="text-xs text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>

              <Button
                variant="ghost"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
