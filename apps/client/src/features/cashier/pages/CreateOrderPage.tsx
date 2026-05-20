import CartSection from "@/features/cashier/components/CartSection.tsx";
import CustomerPaymentSection from "@/features/cashier/components/CustomerPaymentSection.tsx";
import POSHeader from "@/features/cashier/components/POSHeader.tsx";
import ProductSection from "@/features/cashier/components/ProductSection.tsx";

export default function CreateOrder() {
  return (
    <div className="h-full flex flex-col bg-background">
      <POSHeader />
      <div className="flex-1 flex overflow-hidden">
        <ProductSection />
        <CartSection />
        <CustomerPaymentSection />
      </div>
    </div>
  );
}
