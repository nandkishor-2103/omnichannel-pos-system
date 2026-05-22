import CartSection from "@/features/cashier/components/cart-section/CartSection";
import CustomerPaymentSection from "@/features/cashier/components/customer-payment-section/CustomerPaymentSection";
import POSHeader from "@/features/cashier/components/Header/POSHeader";
import ProductSection from "@/features/cashier/components/product-section/ProductSection";

export default function CreateOrder() {
  return (
    <div className="h-screen flex flex-col bg-background overflow-y-hidden">
      <POSHeader />
      <div className="flex-1 flex overflow-hidden">
        <ProductSection />
        <CartSection />
        <CustomerPaymentSection />
      </div>
    </div>
  );
}
