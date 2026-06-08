import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Customer } from "../customer/customerTypes";

import type {
  CartItem,
  CartState,
  Discount,
  HeldOrder,
  PaymentMethod,
} from "./cartTypes";

const initialState: CartState = {
  items: [],
  selectedCustomer: null,
  note: "",
  discount: {
    type: "percentage",
    value: 0,
  },
  paymentMethod: "cash",
  heldOrders: [],
  currentOrder: null,
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const product = action.payload;

      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        if (existingItem.quantity < existingItem.availableQuantity) {
          existingItem.quantity += 1;
        }
      } else {
        state.items.push({
          ...product,
          quantity: 1,
        });
      }
    },

    updateCartItemQuantity: (
      state,
      action: PayloadAction<{
        id: string;
        quantity: number;
      }>
    ) => {
      const { id, quantity } = action.payload;

      if (quantity <= 0) {
        state.items = state.items.filter((item) => item.id !== id);
        return;
      }

      const item = state.items.find((item) => item.id === id);

      if (item) {
        item.quantity = Math.min(quantity, item.availableQuantity);
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    clearCart: (state) => {
      state.items = [];
      state.selectedCustomer = null;
      state.note = "";
      state.discount = {
        type: "percentage",
        value: 0,
      };
      state.paymentMethod = "cash";
      state.currentOrder = null;
    },

    setSelectedCustomer: (state, action: PayloadAction<Customer | null>) => {
      state.selectedCustomer = action.payload;
    },

    setNote: (state, action: PayloadAction<string>) => {
      state.note = action.payload;
    },

    setDiscount: (state, action: PayloadAction<Discount>) => {
      state.discount = action.payload;
    },

    setPaymentMethod: (state, action: PayloadAction<PaymentMethod>) => {
      state.paymentMethod = action.payload;
    },

    holdOrder: (state) => {
      if (state.items.length === 0) return;

      const subtotal = state.items.reduce(
        (total, item) => total + item.sellingPrice * item.quantity,
        0
      );

      const discountAmount =
        state.discount.type === "percentage"
          ? subtotal * (state.discount.value / 100)
          : state.discount.value;

      const totalAmount = Math.max(0, subtotal - discountAmount);

      const heldOrder: HeldOrder = {
        id: Date.now(),
        items: [...state.items],
        customer: state.selectedCustomer,
        note: state.note,
        discount: state.discount,
        totalAmount,
        timestamp: new Date().toISOString(),
      };

      state.heldOrders.push(heldOrder);

      // Clear state
      state.items = [];
      state.selectedCustomer = null;
      state.note = "";
      state.discount = {
        type: "percentage",
        value: 0,
      };
    },

    resumeOrder: (state, action: PayloadAction<HeldOrder>) => {
      const order = action.payload;

      state.items = order.items;
      state.selectedCustomer = order.customer;
      state.note = order.note;
      state.discount = order.discount;

      state.heldOrders = state.heldOrders.filter((o) => o.id !== order.id);
    },

    setCurrentOrder: (state, action: PayloadAction<HeldOrder | null>) => {
      state.currentOrder = action.payload;
    },

    resetOrder: (state) => {
      state.items = [];
      state.selectedCustomer = null;
      state.note = "";
      state.discount = {
        type: "percentage",
        value: 0,
      };
      state.paymentMethod = "cash";
      state.currentOrder = null;
    },
  },
});

export const {
  addToCart,
  updateCartItemQuantity,
  removeFromCart,
  clearCart,
  setSelectedCustomer,
  setNote,
  setDiscount,
  setPaymentMethod,
  holdOrder,
  resumeOrder,
  setCurrentOrder,
  resetOrder,
} = cartSlice.actions;

export default cartSlice.reducer;
