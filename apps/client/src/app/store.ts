import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../app/store/auth/authSlice";
import userReducer from "../app/store/user/userSlice";
import customerReducer from "../app/store/customer/customerSlice";
import orderReducer from "../app/store/order/orderSlice";
import refundReducer from "../app/store/refund/refundSlice";
import shiftReportReducer from "./store/shiftReport/shiftReportSlice";
import branchReducer from "./store/branch/branchSlice";
import categoryReducer from "./store/category/categorySlice";
import employeeReducer from "./store/employee/employeeSlice";
import storeReducer from "./store/store/storeSlice";
import productReducer from "./store/product/productSlice";
import inventoryReducer from "./store/inventory/inventorySlice";
import branchAnalyticsReducer from "./store/branchAnalytics/branchAnalyticsSlice";
import storeAnalyticsReducer from "./store/storeAnalytics/storeAnalyticsSlice";
import subscriptionPlanReducer from "./store/subscriptionPlan/subscriptionPlanSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    customer: customerReducer,
    order: orderReducer,
    refund: refundReducer,
    shiftReport: shiftReportReducer,
    branch: branchReducer,
    category: categoryReducer,
    employee: employeeReducer,
    store: storeReducer,
    product: productReducer,
    inventory: inventoryReducer,
    branchAnalytics: branchAnalyticsReducer,
    storeAnalytics: storeAnalyticsReducer,
    subscriptionPlan: subscriptionPlanReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
