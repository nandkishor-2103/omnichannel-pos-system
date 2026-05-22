import CustomerSection from "./CustomerSection";
import DiscountSection from "./DiscountSection";
import NoteSection from "./NoteSection";
import PaymentSection from "./PaymentSection";

export default function CustomerPaymentSection() {
  return (
    <div className="w-1/5 flex flex-col bg-card">
      <CustomerSection />
      <DiscountSection />
      <NoteSection />
      <PaymentSection />
    </div>
  );
}
