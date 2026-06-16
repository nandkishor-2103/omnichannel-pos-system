import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { createStore } from "@/app/store/store/storeThunk";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";

import LoadingSpinner from "@/components/shared/LoadingSpinner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getUserProfile } from "@/app/store/user/userThunk";

const STORE_TYPES = [
  "Super Market",
  "Grocery Store",
  "Retail Store",
  "Pharmacy",
  "Electronics Store",
  "Clothing Store",
  "Restaurant",
  "Cafe",
  "Book Store",
  "Jewelry Store",
  "Hardware Store",
  "Other",
];

export default function CreateStore() {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const loading = useAppSelector((state) => state.store.loading);

  const [customStoreType, setCustomStoreType] = useState("");

  const [formData, setFormData] = useState({
    brand: "",
    description: "",
    storeType: "Super Market",

    contact: {
      address: "",
      phone: "",
      email: "",
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,

      [e.target.name]: e.target.value,
    }));
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,

      contact: {
        ...prev.contact,

        [e.target.name]: e.target.value,
      },
    }));
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      ...formData,

      storeType: formData.storeType === "Other" ? customStoreType : formData.storeType,
    };

    const result = await dispatch(createStore(payload));

    if (createStore.fulfilled.match(result)) {
      // Optional: refresh current user profile
      const profile = await dispatch(getUserProfile());

      if (getUserProfile.fulfilled.match(profile)) {
        const updatedUser = profile.payload;

        if (updatedUser.store?.status === "ACTIVE") {
          navigate("/store/dashboard", {
            replace: true,
          });

          return;
        }

        if (updatedUser.store?.status === "BLOCKED") {
          navigate("/store-blocked", {
            replace: true,
          });

          return;
        }

        navigate("/store-pending", {
          replace: true,
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Create Store</h1>

          <p className="mt-2 text-muted-foreground">
            Setup your store profile to start managing your business.
          </p>
        </div>

        <div className="rounded-2xl border bg-card p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Store Information */}
            <div>
              <h2 className="mb-4 text-lg font-semibold">Store Information</h2>

              <div className="grid gap-5">
                <div className="space-y-2">
                  <Label htmlFor="brand">Store Brand</Label>

                  <Input
                    id="brand"
                    name="brand"
                    placeholder="DMart"
                    value={formData.brand}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>

                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Retail Store"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Store Type</Label>

                  <Select
                    value={formData.storeType}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        storeType: value,
                      }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Store Type" />
                    </SelectTrigger>

                    <SelectContent>
                      {STORE_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {formData.storeType === "Other" && (
                    <Input
                      placeholder="Enter your store type"
                      value={customStoreType}
                      onChange={(e) => setCustomStoreType(e.target.value)}
                      className="mt-3"
                      required
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="mb-4 text-lg font-semibold">Contact Information</h2>

              <div className="grid gap-5">
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>

                  <Input
                    id="address"
                    name="address"
                    placeholder="India, Mumbai, Naigaon East"
                    value={formData.contact.address}
                    onChange={handleContactChange}
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Contact Phone</Label>

                    <Input
                      id="phone"
                      name="phone"
                      placeholder="+91 9876543210"
                      value={formData.contact.phone}
                      onChange={handleContactChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Contact Email</Label>

                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="store@example.com"
                      value={formData.contact.email}
                      onChange={handleContactChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 pt-4 sm:flex-row">
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer sm:flex-1"
                onClick={() => navigate("/")}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={loading}
                className="cursor-pointer sm:flex-1"
              >
                {loading ? (
                  <LoadingSpinner size={16} text="Creating Store..." />
                ) : (
                  "Create Store"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
