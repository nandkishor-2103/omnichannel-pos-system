import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { AlertTriangle, Edit, Trash2 } from "lucide-react";

import { useState } from "react";

import type { Branch } from "@/app/store/branch/branchTypes";
import { useAppSelector } from "@/app/store/hooks";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

type BranchTableProps = {
  branches: Branch[];
  onEdit: (branch: Branch) => void;
  onDelete: (branchId: string) => void;
};

export default function BranchTable({ branches, onEdit, onDelete }: BranchTableProps) {
  const [branchToDelete, setBranchToDelete] = useState<Branch | null>(null);
  const loading = useAppSelector((state) => state.branch.loading);

  const formatTimeTo12Hour = (time?: string) => {
    if (!time) return "-";

    const [hours, minutes] = time.split(":");

    const hour = Number(hours);

    const suffix = hour >= 12 ? "PM" : "AM";

    const formattedHour = hour % 12 || 12;

    return `${String(formattedHour).padStart(2, "0")}:${minutes} ${suffix}`;
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[70px]">#</TableHead>
            <TableHead>Branch</TableHead>
            <TableHead>Manager</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Working Hours</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {branches.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                No branches found
              </TableCell>
            </TableRow>
          ) : (
            branches.map((branch, index) => (
              <TableRow
                key={branch._id}
                className={`transition-colors hover:bg-muted/30 ${
                  !branch.manager ? "bg-amber-50/60 dark:bg-amber-950/20" : ""
                }`}
              >
                <TableCell className="font-medium">{index + 1}</TableCell>

                <TableCell>
                  <div>
                    <p className="font-medium">{branch.name}</p>

                    <p className="max-w-[250px] truncate text-xs text-muted-foreground">
                      {branch.address}
                    </p>
                  </div>
                </TableCell>

                <TableCell>
                  {branch.manager?.fullName ? (
                    <div>
                      <p className="font-medium">{branch.manager.fullName}</p>

                      <p className="text-xs text-muted-foreground">
                        {branch.manager.email}
                      </p>
                    </div>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                      <AlertTriangle className="h-3 w-3" />
                      Manager Not Assigned
                    </span>
                  )}
                </TableCell>

                <TableCell>{branch.phone ?? "-"}</TableCell>

                <TableCell>
                  {branch.openTime && branch.closeTime
                    ? `${formatTimeTo12Hour(branch.openTime)} - ${formatTimeTo12Hour(branch.closeTime)}`
                    : "-"}
                </TableCell>

                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onEdit(branch)}
                      className="cursor-pointer"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="outline"
                      size="icon"
                      className="cursor-pointer hover:text-red-500"
                      onClick={() => setBranchToDelete(branch)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <AlertDialog open={!!branchToDelete} onOpenChange={() => setBranchToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Branch Permanently?</AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want to delete <strong>{branchToDelete?.name}</strong>?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">No</AlertDialogCancel>

            <AlertDialogAction
              className="cursor-pointer"
              onClick={() => {
                if (branchToDelete) {
                  onDelete(branchToDelete._id);
                }

                setBranchToDelete(null);
              }}
            >
              {loading? <LoadingSpinner size={16} text="Deleting..."/>: "Yes, Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
