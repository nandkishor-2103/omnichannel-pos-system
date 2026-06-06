import type { RootState } from "@/app/store";

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartItemCount = (state: RootState) => state.cart.items.length;

export const selectSelectedCustomer = (state: RootState) => state.cart.selectedCustomer;

export const selectNote = (state: RootState) => state.cart.note;

export const selectDiscount = (state: RootState) => state.cart.discount;

export const selectPaymentMethod = (state: RootState) => state.cart.paymentMethod;

export const selectHeldOrders = (state: RootState) => state.cart.heldOrders;

export const selectCurrentOrder = (state: RootState) => state.cart.currentOrder;

export const selectSubtotal = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + item.sellingPrice * item.quantity, 0);

export const selectTax = (state: RootState) => selectSubtotal(state) * 0.18;

export const selectDiscountAmount = (state: RootState) => {
  const subtotal = selectSubtotal(state);
  const discount = state.cart.discount;

  return discount.type === "percentage"
    ? subtotal * (discount.value / 100)
    : discount.value;
};

export const selectTotal = (state: RootState) =>
  selectSubtotal(state) + selectTax(state) - selectDiscountAmount(state);
