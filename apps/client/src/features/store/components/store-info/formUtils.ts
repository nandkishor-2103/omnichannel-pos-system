export type StoreContact = {
  address: string;
  phone: string;
  email: string;
};

export type StoreData = {
  brand?: string;
  description?: string;
  storeType?: string;
  contact?: StoreContact;
};

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

export const getInitialValues = (storeData?: StoreData | null): StoreFormValues => {
  if (!storeData) {
    return {
      brand: "",
      description: "",
      storeType: "",
      contact: {
        address: "",
        phone: "",
        email: "",
      },
    };
  }

  return {
    brand: storeData.brand || "",
    description: storeData.description || "",
    storeType: storeData.storeType || "",
    contact: {
      address: storeData.contact?.address || "",
      phone: storeData.contact?.phone || "",
      email: storeData.contact?.email || "",
    },
  };
};
