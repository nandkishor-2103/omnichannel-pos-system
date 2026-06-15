import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";

import {
  getStoreByAdmin,
  updateStore,
  deactivateStore,
} from "@/app/store/store/storeThunk";

import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { EditIcon, Power } from "lucide-react";

import BasicInfo from "./BasicInfo";
import ContactInfo from "./ContactInfo";

import EditStoreForm from "./EditStoreForm";

import DeactivateStoreDialog from "./DeactivateStoreDialog";

import { getInitialValues, type StoreFormValues } from "./formUtils";
import { logout } from "@/app/store/auth/authThunk";
import { useNavigate } from "react-router";

export default function StoreInfo() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.auth.user);

  const store = useAppSelector((state) => state.store.store);

  const loading = useAppSelector((state) => state.store.loading);

  const [isEditOpen, setIsEditOpen] = useState(false);

  const [isDeactivateOpen, setIsDeactivateOpen] = useState(false);

  useEffect(() => {
    if (user?.store?.id) {
      dispatch(getStoreByAdmin());
    }
  }, [dispatch, user?.store?.id]);

  const handleUpdateStore = async (values: StoreFormValues) => {
    if (user?.store?.id) {
      if (!store?._id) return;

      await dispatch(
        updateStore({
          id: store._id,
          storeData: values,
        })
      );
    }

    setIsEditOpen(false);
  };

  const handleDeactivateStore = async () => {
    if (user?.store?.id) {
      await dispatch(deactivateStore());
      
      await dispatch(logout());

      navigate("/login");
    }

    setIsDeactivateOpen(false);
  };

  if (!store) {
    return (
      <Card>
        <CardContent className="py-10 text-center text-muted-foreground">
          Loading store information...
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-semibold">Store Information</CardTitle>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="cursor-pointer"
                onClick={() => setIsEditOpen(true)}
              >
                <EditIcon className="h-4 w-4" />
                Edit Details
              </Button>

              <Button
                variant="destructive"
                className="cursor-pointer"
                size="sm"
                onClick={() => setIsDeactivateOpen(true)}
              >
                <Power className="h-4 w-4 " />
                Deactivate Store
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <BasicInfo store={store} />

            <ContactInfo store={store} />
          </div>

          <div className="mt-6 border-t pt-4">
            <p className="text-sm text-muted-foreground">
              Store Created On:{" "}
              {store.createdAt
                ? new Date(store.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })
                : "-"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* EDIT STORE */}

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[650px]">
          <DialogHeader>
            <DialogTitle>Edit Store Details</DialogTitle>
          </DialogHeader>

          <EditStoreForm
            initialValues={getInitialValues(store)}
            onSubmit={handleUpdateStore}
            onCancel={() => setIsEditOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* DEACTIVATE STORE */}

      <DeactivateStoreDialog
        open={isDeactivateOpen}
        onOpenChange={setIsDeactivateOpen}
        loading={loading}
        onConfirm={handleDeactivateStore}
      />
    </>
  );
}
