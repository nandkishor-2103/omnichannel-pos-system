import mongoose from "mongoose";
import Customer from "../models/customer.model.js";
import type { IUser } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

interface CreateCustomerPayload {
  fullName: string;
  email?: string;
  phone: string;
}

interface UpdateCustomerPayload {
  fullName?: string;
  email?: string;
  phone?: string;
}

export const createCustomerService = async (
  customerData: CreateCustomerPayload,
  currentUser: IUser
) => {
  if (!currentUser.branch) {
    throw new ApiError({
      statusCode: 403,
      message: "Branch access required",
    });
  }

  const query = [];

  if (customerData.email) {
    query.push({ email: customerData.email });
  }

  if (customerData.phone) {
    query.push({ phone: customerData.phone });
  }

  const existingCustomer = await Customer.findOne({ $or: query });

  if (existingCustomer) {
    if (customerData.email && existingCustomer.email === customerData.email) {
      throw new ApiError({
        statusCode: 409,
        message: "Customer with this email already exists",
        errors: [{ field: "email", message: "Email is already in use" }],
      });
    }

    if (customerData.phone && existingCustomer.phone === customerData.phone) {
      throw new ApiError({
        statusCode: 409,
        message: "Customer with this phone already exists",
        errors: [{ field: "phone", message: "Phone number is already in use" }],
      });
    }
  }

  const customerPayload: {
    fullName: string;
    email?: string;
    phone: string;
    branch: mongoose.Types.ObjectId;
  } = {
    fullName: customerData.fullName,
    phone: customerData.phone,
    branch: currentUser.branch,
  };

  if (customerData.email) {
    customerPayload.email = customerData.email;
  }

  const customer = await Customer.create(customerPayload);

  return customer;
};

export const updateCustomerService = async (
  customerId: string,
  customerData: UpdateCustomerPayload,
  currentUser: IUser
) => {
  if (!mongoose.Types.ObjectId.isValid(customerId)) {
    throw new ApiError({
      statusCode: 400,
      message: "Invalid customer ID",
    });
  }

  const customer = await Customer.findById(customerId);

  if (!customer) {
    throw new ApiError({
      statusCode: 404,
      message: "Customer not found",
    });
  }

  if (customer.branch.toString() !== currentUser.branch?.toString()) {
    throw new ApiError({
      statusCode: 403,
      message: "You can only update customers from your own branch",
    });
  }

  if (customerData.email || customerData.phone) {
    const orConditions = [];

    if (customerData.email) {
      orConditions.push({ email: customerData.email });
    }

    if (customerData.phone) {
      orConditions.push({ phone: customerData.phone });
    }

    const filter = {
      branch: currentUser.branch!,
      _id: {
        $ne: customerId,
      },
      $or: orConditions,
    };

    const existingCustomer = await Customer.findOne(filter);

    if (existingCustomer) {
      throw new ApiError({
        statusCode: 409,
        message: "Customer with this email or phone already exists",
      });
    }
  }

  if (customerData.fullName !== undefined) {
    customer.fullName = customerData.fullName;
  }

  if (customerData.email !== undefined) {
    customer.email = customerData.email;
  }

  if (customerData.phone !== undefined) {
    customer.phone = customerData.phone;
  }

  await customer.save();

  return customer;
};

export const deleteCustomerService = async (customerId: string, currentUser: IUser) => {
  if (!mongoose.Types.ObjectId.isValid(customerId)) {
    throw new ApiError({
      statusCode: 400,
      message: "Invalid customer ID",
    });
  }

  const customer = await Customer.findById(customerId);

  if (!customer) {
    throw new ApiError({
      statusCode: 404,
      message: "Customer not found",
    });
  }

  if (customer.branch.toString() !== currentUser.branch?.toString()) {
    throw new ApiError({
      statusCode: 403,
      message: "You can only delete customers from your own branch",
    });
  }

  await Customer.findByIdAndDelete(customerId);
};

export const getCustomerByIdService = async (customerId: string, currentUser: IUser) => {
  if (!mongoose.Types.ObjectId.isValid(customerId)) {
    throw new ApiError({
      statusCode: 400,
      message: "Invalid customer ID",
    });
  }

  const customer = await Customer.findById(customerId); // .populate("branch");

  if (!customer) {
    throw new ApiError({
      statusCode: 404,
      message: "Customer not found",
    });
  }

  if (customer.branch._id.toString() !== currentUser.branch?.toString()) {
    throw new ApiError({
      statusCode: 403,
      message: "You can only access customers from your own branch",
    });
  }

  return customer;
};

export const getAllCustomersService = async (currentUser: IUser) => {
  if (!currentUser.branch) {
    throw new ApiError({
      statusCode: 403,
      message: "Branch access required",
    });
  }

  return await Customer.find({
    branch: currentUser.branch,
  })
    // .populate("branch")
    .sort({
      createdAt: -1,
    });
};

export const searchCustomersService = async (keyword: string, currentUser: IUser) => {
  if (!currentUser.branch) {
    throw new ApiError({
      statusCode: 403,
      message: "Branch access required",
    });
  }

  return await Customer.find({
    branch: currentUser.branch,
    $or: [
      {
        fullName: {
          $regex: keyword,
          $options: "i",
        },
      },

      {
        email: {
          $regex: keyword,
          $options: "i",
        },
      },

      {
        phone: {
          $regex: keyword,
          $options: "i",
        },
      },
    ],
  }).sort({
    createdAt: -1,
  });
};