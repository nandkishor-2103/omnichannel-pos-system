import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";

import {
  createBranch,
  deleteBranch,
  getAllBranchesByStore,
  updateBranch,
} from "@/app/store/branch/branchThunk";

import type { Branch } from "@/app/store/branch/branchTypes";

import BranchForm, { type BranchInfoType } from "./BranchForm";
import BranchTable from "./BranchTable";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { PlusIcon } from "lucide-react";

export default function Branches() {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);

  const branches = useAppSelector((state) => state.branch.branches);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (user?.store?.id) {
      dispatch(getAllBranchesByStore(user.store.id));
    }
  }, [dispatch, user?.store?.id]);

  const convertTo24Hour = (time: string) => {
    const [clock, modifier] = time.split(" ");

    const [hourPart, minutes] = clock.split(":");

    let hours = hourPart;

    if (modifier === "PM" && hours !== "12") {
      hours = String(Number(hours) + 12);
    }

    if (modifier === "AM" && hours === "12") {
      hours = "00";
    }

    return `${hours.padStart(2, "0")}:${minutes}`;
  };

  const convertTo12Hour = (time?: string) => {
    if (!time) return "09:00 AM";

    const [hours, minutes] = time.split(":");

    const hour = Number(hours);

    const suffix = hour >= 12 ? "PM" : "AM";

    const formattedHour = hour % 12 || 12;

    return `${String(formattedHour).padStart(2, "0")}:${minutes} ${suffix}`;
  };

  const handleCreateBranch = async (values: BranchInfoType) => {
    if (!user?.store?.id) return;

    await dispatch(
      createBranch({
        ...values,
        openTime: convertTo24Hour(values.openTime),
        closeTime: convertTo24Hour(values.closeTime),
        storeId: user.store.id,
      })
    ).unwrap();

    setIsAddDialogOpen(false);
  };

  const handleUpdateBranch = async (values: BranchInfoType) => {
    if (!selectedBranch) return;

    await dispatch(
      updateBranch({
        id: selectedBranch._id,
        dto: {
          ...values,
          openTime: convertTo24Hour(values.openTime),
          closeTime: convertTo24Hour(values.closeTime),
        },
      })
    ).unwrap();

    setIsEditDialogOpen(false);

    setSelectedBranch(null);
  };

  const handleDeleteBranch = async (branchId: string) => {
    await dispatch(deleteBranch(branchId)).unwrap();
  };

  const filteredBranches = branches.filter((branch) =>
    [branch.name, branch.address, branch.phone, branch.email, branch.manager?.fullName]
      .filter(Boolean)
      .some((value) => value?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold">Branch Management</h1>

          <div className="flex items-center gap-3 rounded-xl border bg-background px-4 py-2 shadow-sm">
            <div className="rounded-lg bg-primary/10 p-2">
              <span className="text-lg">🏪</span>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Total Branches</p>

              <p className="text-lg font-bold">{branches.length}</p>
            </div>
          </div>
        </div>

        {searchTerm && (
          <div className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
            {filteredBranches.length} Results
          </div>
        )}

        <Input
          placeholder="Search branches..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-sm"
        />

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon className="h-4 w-4" />
              Add New Branch
            </Button>
          </DialogTrigger>

          <DialogContent className="min-w-[650px]">
            <DialogHeader>
              <DialogTitle className="text-center">Add New Branch</DialogTitle>
            </DialogHeader>

            <BranchForm
              onCancel={() => setIsAddDialogOpen(false)}
              onSubmit={handleCreateBranch}
            />
          </DialogContent>
        </Dialog>
      </div>

      <BranchTable
        branches={filteredBranches}
        onEdit={(branch) => {
          setSelectedBranch(branch);
          setIsEditDialogOpen(true);
        }}
        onDelete={handleDeleteBranch}
      />

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="min-w-[650px]">
          <DialogHeader>
            <DialogTitle className="text-center">Edit Branch</DialogTitle>
          </DialogHeader>

          {selectedBranch && (
            <BranchForm
              isEditing
              initialValues={{
                name: selectedBranch.name,
                address: selectedBranch.address,
                phone: selectedBranch.phone ?? "",
                email: selectedBranch.email ?? "",
                workingDays: selectedBranch.workingDays ?? [],
                openTime: convertTo12Hour(selectedBranch.openTime),
                closeTime: convertTo12Hour(selectedBranch.closeTime),
              }}
              onCancel={() => {
                setIsEditDialogOpen(false);
                setSelectedBranch(null);
              }}
              onSubmit={handleUpdateBranch}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
