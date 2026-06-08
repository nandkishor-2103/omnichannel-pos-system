import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, getErrorMessage } from "@/lib/axios";

import type {
  EmployeeResponse,
  EmployeesResponse,
  CreateStoreEmployeePayload,
  CreateBranchEmployeePayload,
  UpdateEmployeePayload,
  BranchEmployeeParams,
} from "./employeeTypes";

// ================= CREATE STORE EMPLOYEE =================

export const createStoreEmployee = createAsyncThunk<
  EmployeeResponse,
  CreateStoreEmployeePayload,
  { rejectValue: string }
>("employee/createStoreEmployee", async ({ employee, storeId }, { rejectWithValue }) => {
  try {
    const res = await api.post<EmployeeResponse>(`/employees/store/${storeId}`, employee);

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// ================= CREATE BRANCH EMPLOYEE =================

export const createBranchEmployee = createAsyncThunk<
  EmployeeResponse,
  CreateBranchEmployeePayload,
  { rejectValue: string }
>(
  "employee/createBranchEmployee",
  async ({ employee, branchId }, { rejectWithValue }) => {
    try {
      const res = await api.post<EmployeeResponse>(
        `/employees/branch/${branchId}`,
        employee
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// ================= UPDATE EMPLOYEE =================

export const updateEmployee = createAsyncThunk<
  EmployeeResponse,
  UpdateEmployeePayload,
  { rejectValue: string }
>(
  "employee/updateEmployee",
  async ({ employeeId, employeeDetails }, { rejectWithValue }) => {
    try {
      const res = await api.put<EmployeeResponse>(
        `/employees/${employeeId}`,
        employeeDetails
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// ================= DELETE EMPLOYEE =================

export const deleteEmployee = createAsyncThunk<string, string, { rejectValue: string }>(
  "employee/deleteEmployee",
  async (employeeId, { rejectWithValue }) => {
    try {
      await api.delete(`/employees/${employeeId}`);

      return employeeId;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// ================= FIND EMPLOYEE BY ID =================

export const findEmployeeById = createAsyncThunk<
  EmployeeResponse,
  string,
  { rejectValue: string }
>("employee/findEmployeeById", async (employeeId, { rejectWithValue }) => {
  try {
    const res = await api.get<EmployeeResponse>(`/employees/${employeeId}`);

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// ================= FIND STORE EMPLOYEES =================

export const findStoreEmployees = createAsyncThunk<
  EmployeesResponse,
  string,
  { rejectValue: string }
>("employee/findStoreEmployees", async (storeId, { rejectWithValue }) => {
  try {
    const res = await api.get<EmployeesResponse>(`/employees/store/${storeId}`);

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// ================= FIND BRANCH EMPLOYEES =================

export const findBranchEmployees = createAsyncThunk<
  EmployeesResponse,
  BranchEmployeeParams,
  { rejectValue: string }
>("employee/findBranchEmployees", async ({ branchId, role }, { rejectWithValue }) => {
  try {
    const query = role ? `?role=${encodeURIComponent(role)}` : "";

    const res = await api.get<EmployeesResponse>(`/employees/branch/${branchId}${query}`);

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});
