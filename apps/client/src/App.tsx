
// import CreateOrder from "@/features/cashier/pages/CreateOrderPage";
import OrderHistoryPage from "./features/cashier/pages/OrderHistoryPage";

// import CreateOrderPage from "@/features/cashier/pages/CreateOrderPage";
// import  CustomerLookupPage from "./features/cashier/pages/CustomerLookupPage";


import ShiftReportPage from "./features/cashier/pages/ShiftReportPage";

export default function App() {
  return (
    <>

      {/*<CreateOrder />*/}
      <OrderHistoryPage/>

      {/* <CreateOrderPage /> */}
      {/* <CustomerLookupPage/> */}
      <ShiftReportPage />
    </>
  );
}