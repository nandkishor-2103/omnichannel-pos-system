import { Navigate, Route, Routes } from "react-router-dom";

// import CashierRoutes from "./routes/CashierRoutes";
import BranchRoutes from "@/routes/BranchRoutes.tsx";

export default function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Navigate to="/cashier" replace />} /> */}

      {/* <Route path="/cashier/*" element={<CashierRoutes />} /> */}


      <Route path="/" element={<Navigate to="/branch" replace />} />
      <Route path="/branch/*" element={<BranchRoutes />} />
    </Routes>
  );
}
