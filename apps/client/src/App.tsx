import { Navigate, Route, Routes } from "react-router-dom";

import CashierRoutes from "./routes/CashierRoutes";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/cashier" replace />} />

      <Route path="/cashier/*" element={<CashierRoutes />} />
    </Routes>
  );
}
