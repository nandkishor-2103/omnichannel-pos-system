import mongoose from "mongoose";

import User, { type IUser } from "../models/user.model.js";
import Store from "../models/store.model.js";
import Branch from "../models/branch.model.js";

import ApiError from "../utils/ApiError.js";

interface CreateEmployeeInput {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  role:
    | "ROLE_STORE_ADMIN"
    | "ROLE_STORE_MANAGER"
    | "ROLE_BRANCH_MANAGER"
    | "ROLE_BRANCH_ADMIN"
    | "ROLE_BRANCH_CASHIER";
  branch?: string;
}

interface UpdateEmployeeInput {
  fullName?: string;
  email?: string;
  password?: string;
  phone?: string;
  role?:
    | "ROLE_STORE_ADMIN"
    | "ROLE_STORE_MANAGER"
    | "ROLE_BRANCH_MANAGER"
    | "ROLE_BRANCH_ADMIN"
    | "ROLE_BRANCH_CASHIER";
}

export const createStoreEmployeeService = async (
  employeeData: CreateEmployeeInput,
  storeId: string,
  currentUser: Express.User
) => {
  if (!mongoose.Types.ObjectId.isValid(storeId)) {
    throw new ApiError({
      statusCode: 400,
      message: "Invalid store ID",
    });
  }

  const store = await Store.findById(storeId);

  if (!store) {
    throw new ApiError({
      statusCode: 404,
      message: "Store not found",
    });
  }

  // ==================================================
  // ROLE ACCESS CONTROL
  // ==================================================

  const currentUserRole = currentUser.role;

  if (currentUserRole === "ROLE_BRANCH_ADMIN") {
    throw new ApiError({
      statusCode: 403,
      message: "Branch admin is not allowed to create employees",
    });
  }

  if (currentUserRole === "ROLE_STORE_MANAGER") {
    if (employeeData.role !== "ROLE_BRANCH_ADMIN") {
      throw new ApiError({
        statusCode: 403,
        message: "Store manager can create only branch admins",
      });
    }
  }

  const allowedRoles = ["ROLE_STORE_MANAGER", "ROLE_BRANCH_ADMIN"];

  if (!allowedRoles.includes(employeeData.role)) {
    throw new ApiError({
      statusCode: 400,
      message: "Invalid role for store employee",
    });
  }

  // ==================================================
  // ONLY ONE STORE MANAGER PER STORE
  // ==================================================

  if (employeeData.role === "ROLE_STORE_MANAGER") {
    const existingStoreManager = await User.findOne({
      store: store._id,
      role: "ROLE_STORE_MANAGER",
    });

    if (existingStoreManager) {
      throw new ApiError({
        statusCode: 409,
        message: "Store already has a store manager",
      });
    }
  }

  let branch = null;

  // ==================================================
  // BRANCH ADMIN VALIDATIONS
  // ==================================================

  if (employeeData.role === "ROLE_BRANCH_ADMIN") {
    if (!employeeData.branch) {
      throw new ApiError({
        statusCode: 400,
        message: "Branch ID is required for branch admin",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(employeeData.branch)) {
      throw new ApiError({
        statusCode: 400,
        message: "Invalid branch ID",
      });
    }

    branch = await Branch.findById(employeeData.branch);

    if (!branch) {
      throw new ApiError({
        statusCode: 404,
        message: "Branch not found",
      });
    }

    if (branch.store.toString() !== store._id.toString()) {
      throw new ApiError({
        statusCode: 403,
        message: "Branch does not belong to this store",
      });
    }

    const existingBranchAdmin = await User.findOne({
      branch: branch._id,
      role: "ROLE_BRANCH_ADMIN",
    });

    if (existingBranchAdmin) {
      throw new ApiError({
        statusCode: 409,
        message: "Branch already has a branch admin",
      });
    }
  }

  // ==================================================
  // EMAIL UNIQUE CHECK
  // ==================================================

  const existingUser = await User.findOne({
    email: employeeData.email,
  });

  if (existingUser) {
    throw new ApiError({
      statusCode: 409,
      message: "Employee already exists with this email",
    });
  }

  // ==================================================
  // CREATE EMPLOYEE
  // ==================================================

  const employeePayload: {
    fullName: string;
    email: string;
    password: string;
    phone: string;
    role: IUser["role"];
    store: mongoose.Types.ObjectId;
    branch?: mongoose.Types.ObjectId;
  } = {
    fullName: employeeData.fullName,
    email: employeeData.email,
    password: employeeData.password,
    phone: employeeData.phone,
    role: employeeData.role,
    store: store._id,
  };

  if (branch) {
    employeePayload.branch = branch._id as mongoose.Types.ObjectId;
  }

  const employee = await User.create(employeePayload);

  return await User.findById(employee._id)
    .select("-password")
    .populate("store")
    .populate("branch");
};

export const createBranchEmployeeService = async (
  employeeData: CreateEmployeeInput,
  branchId: string,
  currentUser: IUser
) => {
  if (!mongoose.Types.ObjectId.isValid(branchId)) {
    throw new ApiError({
      statusCode: 400,
      message: "Invalid branch ID",
    });
  }

  const branch = await Branch.findById(branchId);

  if (!branch) {
    throw new ApiError({
      statusCode: 404,
      message: "Branch not found",
    });
  }

  if (!currentUser.branch || currentUser.branch.toString() !== branch._id.toString()) {
    throw new ApiError({
      statusCode: 403,
      message: "You can only manage employees in your own branch",
    });
  }

  const allowedRoles = ["ROLE_BRANCH_MANAGER", "ROLE_BRANCH_CASHIER"];

  if (!allowedRoles.includes(employeeData.role)) {
    throw new ApiError({
      statusCode: 400,
      message: "Invalid role for branch employee",
    });
  }

  if (
    currentUser.role === "ROLE_BRANCH_ADMIN" &&
    employeeData.role !== "ROLE_BRANCH_MANAGER"
  ) {
    throw new ApiError({
      statusCode: 403,
      message: "Branch admin can only create branch manager",
    });
  }

  if (
    currentUser.role === "ROLE_BRANCH_MANAGER" &&
    employeeData.role !== "ROLE_BRANCH_CASHIER"
  ) {
    throw new ApiError({
      statusCode: 403,
      message: "Branch manager can only create branch cashier",
    });
  }

  if (employeeData.role === "ROLE_BRANCH_MANAGER" && branch.manager) {
    throw new ApiError({
      statusCode: 409,
      message: "Branch manager already assigned",
    });
  }

  const existingUser = await User.findOne({
    email: employeeData.email,
  });

  if (existingUser) {
    throw new ApiError({
      statusCode: 409,
      message: "Employee already exists with this email",
    });
  }

  const employee = await User.create({
    fullName: employeeData.fullName,
    email: employeeData.email,
    password: employeeData.password,
    phone: employeeData.phone,
    role: employeeData.role,
    branch: branch._id,
    store: branch.store,
  });

  if (employee.role === "ROLE_BRANCH_MANAGER") {
    branch.manager = employee._id as mongoose.Types.ObjectId;
    await branch.save();
  }

  return await User.findById(employee._id)
    .select("-password")
    .populate("store")
    .populate("branch");
};

export const updateEmployeeService = async (
  employeeId: string,
  employeeData: UpdateEmployeeInput,
  currentUser: IUser
) => {
  if (!mongoose.Types.ObjectId.isValid(employeeId)) {
    throw new ApiError({
      statusCode: 400,
      message: "Invalid employee ID",
    });
  }

  const employee = await User.findById(employeeId);

  if (!employee) {
    throw new ApiError({
      statusCode: 404,
      message: "Employee not found",
    });
  }

  if (["ROLE_STORE_ADMIN", "ROLE_STORE_MANAGER"].includes(currentUser.role)) {
    if (
      !employee.store ||
      !currentUser.store ||
      employee.store.toString() !== currentUser.store.toString()
    ) {
      throw new ApiError({
        statusCode: 403,
        message: "You can only update employees from your own store",
      });
    }
  }

  if (["ROLE_BRANCH_ADMIN", "ROLE_BRANCH_MANAGER"].includes(currentUser.role)) {
    if (
      !employee.branch ||
      !currentUser.branch ||
      employee.branch.toString() !== currentUser.branch.toString()
    ) {
      throw new ApiError({
        statusCode: 403,
        message: "You can only update employees from your own branch",
      });
    }
  }

  if (employeeData.email && employeeData.email !== employee.email) {
    const existingUser = await User.findOne({
      email: employeeData.email,
    });

    if (existingUser) {
      throw new ApiError({
        statusCode: 409,
        message: "Email already in use",
      });
    }

    employee.email = employeeData.email;
  }

  if (employeeData.fullName) {
    employee.fullName = employeeData.fullName;
  }

  if (employeeData.phone) {
    employee.phone = employeeData.phone;
  }

  if (employeeData.password) {
    employee.password = employeeData.password;
  }

  if (employeeData.role) {
    employee.role = employeeData.role;
  }

  await employee.save();

  return await User.findById(employee._id)
    .select("-password")
    .populate("store")
    .populate("branch");
};

export const deleteEmployeeService = async (employeeId: string, currentUser: IUser) => {
  if (!mongoose.Types.ObjectId.isValid(employeeId)) {
    throw new ApiError({
      statusCode: 400,
      message: "Invalid employee ID",
    });
  }

  const employee = await User.findById(employeeId);

  if (!employee) {
    throw new ApiError({
      statusCode: 404,
      message: "Employee not found",
    });
  }

  if (currentUser.role === "ROLE_STORE_ADMIN") {
    if (
      !employee.store ||
      !currentUser.store ||
      employee.store.toString() !== currentUser.store.toString()
    ) {
      throw new ApiError({
        statusCode: 403,
        message: "You can only delete employees from your own store",
      });
    }
  }

  if (employee.role === "ROLE_STORE_MANAGER" && currentUser.role !== "ROLE_STORE_ADMIN") {
    throw new ApiError({
      statusCode: 403,
      message: "Only Store Admin can delete Store Manager",
    });
  }

  if (
    employee.role === "ROLE_BRANCH_ADMIN" &&
    currentUser.role !== "ROLE_STORE_MANAGER"
  ) {
    throw new ApiError({
      statusCode: 403,
      message: "Only Store Manager can delete Branch Admin",
    });
  }

  if (
    ["ROLE_BRANCH_MANAGER", "ROLE_BRANCH_CASHIER"].includes(employee.role) &&
    currentUser.role !== "ROLE_BRANCH_ADMIN"
  ) {
    throw new ApiError({
      statusCode: 403,
      message: "Only Branch Admin can delete Branch Employees",
    });
  }

  if (currentUser.role === "ROLE_BRANCH_ADMIN") {
    if (
      !employee.branch ||
      !currentUser.branch ||
      employee.branch.toString() !== currentUser.branch.toString()
    ) {
      throw new ApiError({
        statusCode: 403,
        message: "You can only delete employees from your own branch",
      });
    }
  }

  await User.findByIdAndDelete(employeeId);
};

export const getEmployeeByIdService = async (employeeId: string, currentUser: IUser) => {
  if (!mongoose.Types.ObjectId.isValid(employeeId)) {
    throw new ApiError({
      statusCode: 400,
      message: "Invalid employee ID",
    });
  }

  const employee = await User.findById(employeeId)
    .select("-password")
    .populate("store")
    .populate("branch");

  if (!employee) {
    throw new ApiError({
      statusCode: 404,
      message: "Employee not found",
    });
  }

  if (["ROLE_STORE_ADMIN", "ROLE_STORE_MANAGER"].includes(currentUser.role)) {
    if (
      !employee.store ||
      !currentUser.store ||
      employee.store._id.toString() !== currentUser.store.toString()
    ) {
      throw new ApiError({
        statusCode: 403,
        message: "You can only access employees from your own store",
      });
    }

    const allowedRoles = ["ROLE_STORE_ADMIN", "ROLE_STORE_MANAGER", "ROLE_BRANCH_ADMIN"];

    if (!allowedRoles.includes(employee.role)) {
      throw new ApiError({
        statusCode: 403,
        message: "Access denied",
      });
    }
  }

  if (["ROLE_BRANCH_ADMIN", "ROLE_BRANCH_MANAGER"].includes(currentUser.role)) {
    if (
      !employee.branch ||
      !currentUser.branch ||
      employee.branch._id.toString() !== currentUser.branch.toString()
    ) {
      throw new ApiError({
        statusCode: 403,
        message: "You can only access employees from your own branch",
      });
    }

    const allowedRoles = [
      "ROLE_BRANCH_ADMIN",
      "ROLE_BRANCH_MANAGER",
      "ROLE_BRANCH_CASHIER",
    ];

    if (!allowedRoles.includes(employee.role)) {
      throw new ApiError({
        statusCode: 403,
        message: "Access denied",
      });
    }
  }

  return employee;
};

export const getStoreEmployeesService = async (storeId: string, currentUser: IUser) => {
  if (!mongoose.Types.ObjectId.isValid(storeId)) {
    throw new ApiError({
      statusCode: 400,
      message: "Invalid store ID",
    });
  }

  const store = await Store.findById(storeId);

  if (!store) {
    throw new ApiError({
      statusCode: 404,
      message: "Store not found",
    });
  }

  const currentStore = currentUser.store as {
    _id: mongoose.Types.ObjectId;
  };

  if (currentStore._id.toString() !== storeId) {
    throw new ApiError({
      statusCode: 403,
      message: "You can only access your own store employees",
    });
  }

  return await User.find({
    store: storeId,
    role: {
      $in: ["ROLE_STORE_ADMIN", "ROLE_STORE_MANAGER", "ROLE_BRANCH_ADMIN"],
    },
  })
    .select("-password")
    .populate("store")
    .populate("branch");
};

export const getBranchEmployeesService = async (
  branchId: string,
  role: string | undefined,
  currentUser: IUser
) => {
  if (!mongoose.Types.ObjectId.isValid(branchId)) {
    throw new ApiError({
      statusCode: 400,
      message: "Invalid branch ID",
    });
  }

  const branch = await Branch.findById(branchId);

  if (!branch) {
    throw new ApiError({
      statusCode: 404,
      message: "Branch not found",
    });
  }

  if (!currentUser.branch || currentUser.branch.toString() !== branch._id.toString()) {
    throw new ApiError({
      statusCode: 403,
      message: "You can only access employees from your own branch",
    });
  }

  const filter: {
    branch: string;
    role:
      | IUser["role"]
      | {
          $in: IUser["role"][];
        };
  } = {
    branch: branchId,
    role: {
      $in: ["ROLE_BRANCH_ADMIN", "ROLE_BRANCH_MANAGER", "ROLE_BRANCH_CASHIER"],
    },
  };

  if (role) {
    filter.role = role as IUser["role"];
  }

  return await User.find(filter).select("-password").populate("store").populate("branch");
};

export const enableEmployeeService = async (employeeId: string, currentUser: IUser) => {
  if (!mongoose.Types.ObjectId.isValid(employeeId)) {
    throw new ApiError({
      statusCode: 400,
      message: "Invalid employee ID",
    });
  }

  const employee = await User.findById(employeeId);

  if (!employee) {
    throw new ApiError({
      statusCode: 404,
      message: "Employee not found",
    });
  }

  if (["ROLE_STORE_ADMIN", "ROLE_STORE_MANAGER"].includes(currentUser.role)) {
    if (
      !employee.store ||
      !currentUser.store ||
      employee.store.toString() !== currentUser.store.toString()
    ) {
      throw new ApiError({
        statusCode: 403,
        message: "You can only manage employees from your own store",
      });
    }
  }

  if (["ROLE_BRANCH_ADMIN", "ROLE_BRANCH_MANAGER"].includes(currentUser.role)) {
    if (
      !employee.branch ||
      !currentUser.branch ||
      employee.branch.toString() !== currentUser.branch.toString()
    ) {
      throw new ApiError({
        statusCode: 403,
        message: "You can only manage employees from your own branch",
      });
    }
  }

  employee.verified = true;

  await employee.save();

  return await User.findById(employee._id)
    .select("-password")
    .populate("store")
    .populate("branch");
};

export const disableEmployeeService = async (employeeId: string, currentUser: IUser) => {
  if (!mongoose.Types.ObjectId.isValid(employeeId)) {
    throw new ApiError({
      statusCode: 400,
      message: "Invalid employee ID",
    });
  }

  const employee = await User.findById(employeeId);

  if (!employee) {
    throw new ApiError({
      statusCode: 404,
      message: "Employee not found",
    });
  }

  if (["ROLE_STORE_ADMIN", "ROLE_STORE_MANAGER"].includes(currentUser.role)) {
    if (
      !employee.store ||
      !currentUser.store ||
      employee.store.toString() !== currentUser.store.toString()
    ) {
      throw new ApiError({
        statusCode: 403,
        message: "You can only manage employees from your own store",
      });
    }
  }

  if (["ROLE_BRANCH_ADMIN", "ROLE_BRANCH_MANAGER"].includes(currentUser.role)) {
    if (
      !employee.branch ||
      !currentUser.branch ||
      employee.branch.toString() !== currentUser.branch.toString()
    ) {
      throw new ApiError({
        statusCode: 403,
        message: "You can only manage employees from your own branch",
      });
    }
  }

  if (employee._id.toString() === currentUser._id.toString()) {
    throw new ApiError({
      statusCode: 400,
      message: "You cannot disable your own account",
    });
  }

  employee.verified = false;

  await employee.save();

  return await User.findById(employee._id)
    .select("-password")
    .populate("store")
    .populate("branch");
};
