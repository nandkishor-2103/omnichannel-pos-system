import {  Navigate, Route, Routes } from "react-router-dom";

import StoreRoutes from "./routes/StoreRoutes";
import BranchRoutes from "./routes/BranchRoutes";
import CashierRoutes from "./routes/CashierRoutes";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/store" replace />} />

      <Route path="/cashier/*" element={<CashierRoutes />} />
      <Route path="/branch/*" element={<BranchRoutes />} />
      <Route path="/store/*" element={<StoreRoutes />} />
    </Routes>
  );
}
