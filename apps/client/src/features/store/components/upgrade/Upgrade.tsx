import { useEffect } from "react";

import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";

import { getAllSubscriptionPlans } from "@/app/store/subscriptionPlan/subscriptionPlanThunk";

import {
  getCurrentSubscription,
  getMySubscriptions,
} from "@/app/store/store-subscription/storeSubscriptionThunk";

import {
  createSubscriptionPaymentOrder,
  verifySubscriptionPayment,
  getSubscriptionPaymentHistory,
} from "@/app/store/subscription-payment/subscriptionPaymentThunk";

import {
  getSubscriptionInvoices,
  resendSubscriptionInvoice,
  downloadSubscriptionInvoice,
} from "@/app/store/subscription-invoice/subscriptionInvoiceThunk";

import { loadRazorpay } from "./utils/loadRazorpay";

import CurrentSubscriptionCard from "./components/CurrentSubscriptionCard";
import SubscriptionPlansGrid from "./components/SubscriptionPlansGrid";
import PaymentHistoryTable from "./components/PaymentHistoryTable";
import InvoiceHistoryTable from "./components/InvoiceHistoryTable";

import type { UpgradePlan } from "./types/upgradeTypes";
import type { RazorpayOptions, RazorpaySuccessResponse } from "./types/razorpay.types";

export default function Upgrade() {
  const dispatch = useAppDispatch();

  const { plans, loading: plansLoading } = useAppSelector(
    (state) => state.subscriptionPlan
  );

  const { currentSubscription, loadingCurrent } = useAppSelector(
    (state) => state.storeSubscription
  );

  const { creatingOrder, verifyingPayment, payments } = useAppSelector(
    (state) => state.subscriptionPayment
  );

  const { invoices } = useAppSelector((state) => state.subscriptionInvoice);

  const subscriptionLoading = loadingCurrent;

  const paymentLoading = creatingOrder || verifyingPayment;

  useEffect(() => {
    dispatch(getAllSubscriptionPlans());

    dispatch(getCurrentSubscription());

    dispatch(getMySubscriptions());

    dispatch(getSubscriptionPaymentHistory());

    dispatch(getSubscriptionInvoices());
  }, [dispatch]);

  const handleUpgrade = async (plan: UpgradePlan) => {
    try {
      const razorpayLoaded = await loadRazorpay();

      if (!razorpayLoaded) {
        toast.error("Failed to load Razorpay");
        return;
      }

      const orderResponse = await dispatch(
        createSubscriptionPaymentOrder({
          subscriptionPlanId: plan._id,
        })
      ).unwrap();

      console.log("orderResponse =", orderResponse);

      const { orderId, amount, currency, key } = orderResponse.payload;

      const options: RazorpayOptions = {
        key,

        amount,

        currency,

        name: "POS System",

        description: `${plan.name} Subscription`,

        order_id: orderId,

        handler: async (response: RazorpaySuccessResponse) => {
          try {
            await dispatch(
              verifySubscriptionPayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              })
            ).unwrap();

            await Promise.all([
              dispatch(getCurrentSubscription()),
              dispatch(getMySubscriptions()),
              dispatch(getSubscriptionPaymentHistory()),
              dispatch(getSubscriptionInvoices()),
            ]);

            toast.success("Subscription activated successfully");
          } catch (error) {
            console.error(error);

            toast.error("Payment verification failed");
          }
        },

        theme: {
          color: "#2563eb",
        },

        modal: {
          ondismiss: () => {
            toast.info("Payment cancelled");
          },
        },
      };

      const Razorpay = (
        window as typeof window & {
          Razorpay?: new (options: RazorpayOptions) => {
            open: () => void;
          };
        }
      ).Razorpay;

      if (!Razorpay) {
        toast.error("Razorpay SDK not loaded");
        return;
      }

      const razorpay = new Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.error(error);

      toast.error("Failed to initiate payment");
    }
  };

  const handleDownloadInvoice = async (invoiceId: string) => {
    try {
      const blob = await dispatch(downloadSubscriptionInvoice(invoiceId)).unwrap();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;

      link.download = `invoice-${invoiceId}.pdf`;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

      toast.success("Invoice downloaded successfully");
    } catch (error) {
      console.error(error);

      toast.error("Failed to download invoice");
    }
  };

  const handleResendInvoice = async (invoiceId: string) => {
    try {
      await dispatch(resendSubscriptionInvoice(invoiceId)).unwrap();

      toast.success("Invoice sent successfully");

      dispatch(getSubscriptionInvoices());
    } catch (error) {
      console.error(error);

      toast.error("Failed to resend invoice");
    }
  };

  const isLoading = plansLoading || subscriptionLoading || paymentLoading;

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Upgrade Your Subscription</h1>

        <p className="mt-2 text-muted-foreground">
          Choose the perfect subscription plan for your business growth.
        </p>
      </div>

      <CurrentSubscriptionCard subscription={currentSubscription} />

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <p className="text-muted-foreground">Loading subscription plans...</p>
        </div>
      ) : (
        <>
          <SubscriptionPlansGrid
            plans={plans}
            currentSubscription={currentSubscription}
            onUpgrade={handleUpgrade}
            loading={paymentLoading}
          />

          <PaymentHistoryTable payments={payments} />

          <InvoiceHistoryTable
            invoices={invoices}
            onDownload={handleDownloadInvoice}
            onResend={handleResendInvoice}
          />
        </>
      )}
    </div>
  );
}
