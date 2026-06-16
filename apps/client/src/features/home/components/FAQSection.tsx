import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is POS Pro?",
    answer:
      "POS Pro is a complete retail management platform that helps businesses manage sales, inventory, customers, employees, branches, and reporting from a single dashboard.",
  },
  {
    question: "Can I manage multiple branches?",
    answer:
      "Yes. POS Pro supports multi-branch operations, allowing you to monitor inventory, sales, and employees across all locations.",
  },
  {
    question: "Do I need technical knowledge to use POS Pro?",
    answer:
      "No. POS Pro is designed for business owners and staff with a simple and intuitive interface.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. We use industry-standard security practices, encrypted connections, and secure authentication to protect your business data.",
  },
  {
    question: "Can I access POS Pro from anywhere?",
    answer:
      "Yes. Since POS Pro is cloud-based, you can access your dashboard securely from anywhere with an internet connection.",
  },
  {
    question: "How do subscriptions work?",
    answer:
      "Choose a plan that fits your business. You can upgrade, downgrade, or renew your subscription at any time.",
  },
  {
    question: "What happens after I create my store?",
    answer:
      "After creating your store, it will be reviewed by the Super Admin. Once approved, you can start configuring branches, products, employees, and sales.",
  },
  {
    question: "Do you provide support?",
    answer:
      "Yes. We provide dedicated customer support to help you with setup, onboarding, and day-to-day operations.",
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="bg-muted/30 py-24">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold">Frequently Asked Questions</h2>

          <p className="mt-3 text-muted-foreground">
            Everything you need to know about POS Pro.
          </p>
        </div>

        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>

                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
