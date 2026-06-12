import { createSlice } from "@reduxjs/toolkit";

import {
  createStoreEmployee,
  createBranchEmployee,
  updateEmployee,
  deleteEmployee,
  findEmployeeById,
  findStoreEmployees,
  findBranchEmployees,
  disableEmployee,
  enableEmployee,
} from "./employeeThunk";

import type { EmployeeState } from "./employeeTypes";

const initialState: EmployeeState = {
  employees: [],
  employee: null,
  loading: false,
  error: null,
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,

  reducers: {
    clearEmployeeState: (state) => {
      state.employee = null;
      state.employees = [];
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // CREATE STORE EMPLOYEE

      .addCase(createStoreEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createStoreEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees.push(action.payload.payload.employee);
      })

      .addCase(createStoreEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to create employee";
      })

      // CREATE BRANCH EMPLOYEE

      .addCase(createBranchEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createBranchEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees.push(action.payload.payload.employee);
      })

      .addCase(createBranchEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to create employee";
      })

      // UPDATE EMPLOYEE

      .addCase(updateEmployee.fulfilled, (state, action) => {
        const updatedEmployee = action.payload.payload.employee;

        const index = state.employees.findIndex(
          (employee) => employee._id === updatedEmployee._id
        );

        if (index !== -1) {
          state.employees[index] = updatedEmployee;
        }

        if (state.employee?._id === updatedEmployee._id) {
          state.employee = updatedEmployee;
        }
      })

      // DELETE EMPLOYEE

      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter(
          (employee) => employee._id !== action.payload
        );

        if (state.employee?._id === action.payload) {
          state.employee = null;
        }
      })

      // FIND BY ID

      .addCase(findEmployeeById.fulfilled, (state, action) => {
        state.employee = action.payload.payload.employee;
      })

      // FIND STORE EMPLOYEES

      .addCase(findStoreEmployees.fulfilled, (state, action) => {
        state.employees = action.payload.payload.employees;
      })

      // FIND BRANCH EMPLOYEES

      .addCase(findBranchEmployees.fulfilled, (state, action) => {
        state.employees = action.payload.payload.employees;
      })

      // ENABLE EMPLOYEE

      .addCase(enableEmployee.fulfilled, (state, action) => {
        const updatedEmployee = action.payload;

        const index = state.employees.findIndex(
          (employee) => employee._id === updatedEmployee._id
        );

        if (index !== -1) {
          state.employees[index] = updatedEmployee;
        }

        if (state.employee?._id === updatedEmployee._id) {
          state.employee = updatedEmployee;
        }
      })

      // DISABLE EMPLOYEE

      .addCase(disableEmployee.fulfilled, (state, action) => {
        const updatedEmployee = action.payload;

        const index = state.employees.findIndex(
          (employee) => employee._id === updatedEmployee._id
        );

        if (index !== -1) {
          state.employees[index] = updatedEmployee;
        }

        if (state.employee?._id === updatedEmployee._id) {
          state.employee = updatedEmployee;
        }
      });
  },
});

export const { clearEmployeeState } = employeeSlice.actions;

export default employeeSlice.reducer;
