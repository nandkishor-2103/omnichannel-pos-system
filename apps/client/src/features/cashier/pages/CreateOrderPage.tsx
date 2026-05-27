import CartSection from "@/features/cashier/components/cart-section/CartSection";
import CustomerPaymentSection from "@/features/cashier/components/customer-payment-section/CustomerPaymentSection";
import ProductSection from "@/features/cashier/components/product-section/ProductSection";

export default function CreateOrder() {
  return (
    <div className="flex h-full overflow-hidden bg-background">
      <ProductSection />

      <CartSection />

      <CustomerPaymentSection />
    </div>
  );
}
