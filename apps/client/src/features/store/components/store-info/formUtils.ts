import type { Store } from "@/app/store/store/storeTypes";

export type StoreFormValues = {
  brand: string;

  description: string;

  storeType: string;

  contact: {
    address: string;
    phone: string;
    email: string;
  };
};

export const getInitialValues = (store?: Store | null): StoreFormValues => {
  return {
    brand: store?.brand ?? "",

    description: store?.description ?? "",

    storeType: store?.storeType ?? "",

    contact: {
      address: store?.contact?.address ?? "",

      phone: store?.contact?.phone ?? "",

      email: store?.contact?.email ?? "",
    },
  };
};
