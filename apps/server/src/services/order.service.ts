import mongoose, { type QueryFilter } from "mongoose";

import Order, { type IOrder } from "../models/order.model.js";
import Customer from "../models/customer.model.js";
import Branch from "../models/branch.model.js";
import User, { type IUser } from "../models/user.model.js";
import { Product } from "../models/product.model.js";

import ApiError from "../utils/ApiError.js";

import { PaymentType } from "../enums/paymentType.enums.js";
import { OrderStatus } from "../enums/orderStatus.enums.js";

import { mapOrderToResponse, mapOrdersToResponse } from "../mappers/order.mapper.js";

interface CreateOrderPayload {
  customerId: string;

  paymentType: PaymentType;

  items: {
    productId: string;
    quantity: number;
  }[];
}

export async function createOrderService(
  orderData: CreateOrderPayload,
  currentUser: IUser
) {
  if (currentUser.role !== "ROLE_BRANCH_CASHIER") {
    throw new ApiError({
      statusCode: 403,
      message: "Only branch cashier can create orders",
    });
  }

  if (!currentUser.branch) {
    throw new ApiError({
      statusCode: 400,
      message: "Cashier branch not found",
    });
  }

  if (!currentUser.store) {
    throw new ApiError({
      statusCode: 400,
      message: "Cashier store not found",
    });
  }

  const customer = await Customer.findById(orderData.customerId);

  if (!customer) {
    throw new ApiError({
      statusCode: 404,
      message: "Customer not found",
    });
  }

  if (customer.branch.toString() !== currentUser.branch.toString()) {
    throw new ApiError({
      statusCode: 403,
      message: "Customer does not belong to cashier branch",
    });
  }

  let totalAmount = 0;

  const orderItems = [];

  for (const item of orderData.items) {
    const product = await Product.findById(item.productId);

    if (!product) {
      throw new ApiError({
        statusCode: 404,
        message: "Product not found",
      });
    }

    if (product.store.toString() !== currentUser.store.toString()) {
      throw new ApiError({
        statusCode: 403,
        message: "Product does not belong to your store",
      });
    }

    const itemPrice = product.sellingPrice * item.quantity;

    totalAmount += itemPrice;

    orderItems.push({
      product: product._id,
      quantity: item.quantity,
      price: itemPrice,
    });
  }

  const order = await Order.create({
    totalAmount,
    branch: currentUser.branch,
    cashier: currentUser._id,
    customer: customer._id,
    paymentType: orderData.paymentType,
    status: OrderStatus.COMPLETED,
    items: orderItems,
  });

  const populatedOrder = await Order.findById(order._id)
    .populate("branch")
    .populate("cashier")
    .populate("customer")
    .populate("items.product");

  return mapOrderToResponse(populatedOrder);
}

export async function getOrderByIdService(orderId: string, currentUser: IUser) {
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    throw new ApiError({
      statusCode: 400,
      message: "Invalid order ID",
    });
  }

  const order = await Order.findById(orderId)
    .populate("customer")
    .populate("cashier", "-password")
    .populate("branch")
    .populate({
      path: "items.product",
      populate: {
        path: "category",
      },
    });

  if (!order) {
    throw new ApiError({
      statusCode: 404,
      message: "Order not found",
    });
  }

  // Access control: Only users from the same branch can access the order
  if (
    currentUser.branch &&
    order.branch &&
    order.branch._id.toString() !== currentUser.branch.toString()
  ) {
    throw new ApiError({
      statusCode: 403,
      message: "Access denied for this branch order",
    });
  }

  // Access control: Only users from the same store can access the order
  const populatedBranch = order.branch as any;

  if (
    currentUser.store &&
    populatedBranch &&
    populatedBranch.store.toString() !== currentUser.store.toString()
  ) {
    throw new ApiError({
      statusCode: 403,
      message: "Access denied for this store order",
    });
  }

  return mapOrderToResponse(order);
}

export async function getOrdersByBranchService(
  branchId: string,
  query: {
    customerId?: string;
    cashierId?: string;
    paymentType?: string;
    status?: string;
  },
  currentUser: IUser
) {
  // Validate branch ID
  if (!mongoose.Types.ObjectId.isValid(branchId)) {
    throw new ApiError({
      statusCode: 400,
      message: "Branch ID is invalid",
    });
  }

  // Branch Access Control
  if (currentUser.branch && currentUser.branch.toString() !== branchId) {
    throw new ApiError({
      statusCode: 403,
      message: "Access denied for this branch",
    });
  }

  const branch = await Branch.findById(branchId);
  if (!branch) {
    throw new ApiError({
      statusCode: 404,
      message: "Branch not found",
    });
  }

  // Store Access Control
  if (currentUser.store && branch.store.toString() !== currentUser.store.toString()) {
    throw new ApiError({
      statusCode: 403,
      message: "Access denied for this store branch",
    });
  }

  // Build filter
  const filter: QueryFilter<IOrder> = {
    branch: branchId,
  };

  // Apply query filters
  if (query.customerId) {
    filter.customer = query.customerId;
  }

  if (query.cashierId) {
    filter.cashier = query.cashierId;
  }

  if (query.paymentType) {
    filter.paymentType = PaymentType[query.paymentType as PaymentType];
  }

  if (query.status) {
    filter.status = OrderStatus[query.status as OrderStatus];
  }

  // Execute query
  const orders = await Order.find(filter)
    .populate("customer")
    .populate("cashier", "-password")
    .populate("branch")
    .populate({
      path: "items.product",
      populate: {
        path: "category",
      },
    })
    .sort({ createdAt: -1 })
    .exec();

  return mapOrdersToResponse(orders);
}

export async function getOrdersByCashierService(cashierId: string, currentUser: IUser) {
  // Validate cashier ID
  if (!mongoose.Types.ObjectId.isValid(cashierId)) {
    throw new ApiError({
      statusCode: 400,
      message: "Invalid cashier ID",
    });
  }

  const cashier = await User.findById(cashierId).exec();

  if (!cashier) {
    throw new ApiError({
      statusCode: 404,
      message: "Cashier not found",
    });
  }

  // Branch Access Control
  if (
    currentUser.branch &&
    cashier.branch &&
    cashier.branch.toString() !== currentUser.branch.toString()
  ) {
    throw new ApiError({
      statusCode: 403,
      message: "Cashier belongs to another branch",
    });
  }

  // Store Access Control
  if (
    currentUser.store &&
    cashier.store &&
    cashier.store.toString() !== currentUser.store.toString()
  ) {
    throw new ApiError({
      statusCode: 403,
      message: "Access denied for this store cashier",
    });
  }

  const orders = await Order.find({
    cashier: cashierId,
  })
    .populate("customer")
    .populate("cashier", "-password")
    .populate("branch")
    .populate({
      path: "items.product",
      populate: {
        path: "category",
      },
    })
    .sort({ createdAt: -1 })
    .exec();

  return mapOrdersToResponse(orders);
}

export async function getTodayOrdersByBranchService(
  branchId: string,
  currentUser: IUser
) {
  // Validate branch ID
  if (!mongoose.Types.ObjectId.isValid(branchId)) {
    throw new ApiError({
      statusCode: 400,
      message: "Invalid branch ID",
    });
  }

  const branch = await Branch.findById(branchId).exec();

  if (!branch) {
    throw new ApiError({
      statusCode: 404,
      message: "Branch not found",
    });
  }

  // Branch Access Control
  if (currentUser.branch && currentUser.branch.toString() !== branchId) {
    throw new ApiError({
      statusCode: 403,
      message: "Access denied for this branch",
    });
  }

  // Store Access Control
  if (currentUser.store && branch.store.toString() !== currentUser.store.toString()) {
    throw new ApiError({
      statusCode: 403,
      message: "Access denied for this store branch",
    });
  }

  // Today's date range
  const today = new Date();

  const startOfDay = new Date(today);
  startOfDay.setHours(0, 0, 0, 0); // Set to start of day

  const endOfDay = new Date(today);
  endOfDay.setHours(23, 59, 59, 999); // Set to end of day

  // Fetch today's orders
  const orders = await Order.find({
    branch: branchId,
    createdAt: {
      $gte: startOfDay,
      $lte: endOfDay,
    },
  })
    .populate("customer")
    .populate("cashier", "-password")
    .populate("branch")
    .populate({
      path: "items.product",
      populate: {
        path: "category",
      },
    })
    .sort({ createdAt: -1 })
    .exec();

  return mapOrdersToResponse(orders);
}

export async function getOrdersByCustomerService(customerId: string, currentUser: IUser) {
  // Validate customer ID
  if (!mongoose.Types.ObjectId.isValid(customerId)) {
    throw new ApiError({
      statusCode: 400,
      message: "Invalid customer ID",
    });
  }

  const customer = await Customer.findById(customerId).populate("branch").exec();
  if (!customer) {
    throw new ApiError({
      statusCode: 404,
      message: "Customer not found",
    });
  }

  const customerBranch = customer.branch as any;
  // Branch Access Control
  if (
    currentUser.branch &&
    customerBranch &&
    customerBranch._id.toString() !== currentUser.branch.toString()
  ) {
    throw new ApiError({
      statusCode: 403,
      message: "Access denied for this branch customer",
    });
  }

  // Store Access Control
  if (
    currentUser.store &&
    customerBranch &&
    customerBranch.store.toString() !== currentUser.store.toString()
  ) {
    throw new ApiError({
      statusCode: 403,
      message: "Access denied for this store customer",
    });
  }

  // Fetch customer orders
  const orders = await Order.find({
    customer: customerId,
  })
    .populate("customer")
    .populate("cashier", "-password")
    .populate("branch")
    .populate({
      path: "items.product",
      populate: {
        path: "category",
      },
    })
    .sort({ createdAt: -1 })
    .exec();

  return mapOrdersToResponse(orders);
}

export async function getTop5RecentOrdersByBranchService(
  branchId: string,
  currentUser: IUser
) {
  // Validate branch ID
  if (!mongoose.Types.ObjectId.isValid(branchId)) {
    throw new ApiError({
      statusCode: 400,
      message: "Invalid branch ID",
    });
  }

  // Find branch
  const branch = await Branch.findById(branchId).exec();

  if (!branch) {
    throw new ApiError({
      statusCode: 404,
      message: "Branch not found",
    });
  }

  // Branch Access Control
  if (currentUser.branch && currentUser.branch.toString() !== branchId) {
    throw new ApiError({
      statusCode: 403,
      message: "Access denied for this branch",
    });
  }

  // Store Access Control
  if (currentUser.store && branch.store.toString() !== currentUser.store.toString()) {
    throw new ApiError({
      statusCode: 403,
      message: "Access denied for this store branch",
    });
  }

  // Fetch latest 5 orders
  const orders = await Order.find({
    branch: branchId,
  })
    .populate("customer")
    .populate("cashier", "-password")
    .populate("branch")
    .populate({
      path: "items.product",
      populate: {
        path: "category",
      },
    })
    .sort({ createdAt: -1 })
    .limit(5)
    .exec();

  return mapOrdersToResponse(orders);
}

export async function deleteOrderService(orderId: string, currentUser: IUser) {
  // Validate order ID
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    throw new ApiError({
      statusCode: 400,
      message: "Invalid order ID",
    });
  }

  // Find order
  const order = await Order.findById(orderId).populate("branch").exec();

  if (!order) {
    throw new ApiError({
      statusCode: 404,
      message: "Order not found",
    });
  }

  const branch = order.branch as any;

  // Store Access Control
  if (
    currentUser.store &&
    branch &&
    branch.store.toString() !== currentUser.store.toString()
  ) {
    throw new ApiError({
      statusCode: 403,
      message: "Access denied for this store order",
    });
  }

  // Delete order
  await Order.findByIdAndDelete(orderId);
}
