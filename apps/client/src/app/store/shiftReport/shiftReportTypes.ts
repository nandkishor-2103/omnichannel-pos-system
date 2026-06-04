export interface ShiftReport {
  _id: string;
  cashierId: string;
  branchId: string;

  startTime: string;
  endTime?: string;

  totalOrders?: number;
  totalSales?: number;
  totalRefunds?: number;

  status?: "OPEN" | "CLOSED";

  createdAt?: string;
  updatedAt?: string;
}

export interface ShiftReportResponse {
  shiftReport: ShiftReport;
  message?: string;
}

export interface ShiftReportsResponse {
  shiftReports: ShiftReport[];
  message?: string;
}

export interface ShiftReportByDatePayload {
  cashierId: string;
  date: string;
}

export interface ShiftReportState {
  shifts: ShiftReport[];
  currentShift: ShiftReport | null;
  selectedShift: ShiftReport | null;
  shiftsByCashier: ShiftReport[];
  shiftsByBranch: ShiftReport[];
  loading: boolean;
  error: string | null;
}
