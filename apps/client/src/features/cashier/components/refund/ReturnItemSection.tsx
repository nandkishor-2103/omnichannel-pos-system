import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";

// import type { Order } from "../../types/refund";
import type { Order } from "@/app/store/order/orderTypes";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { createRefund } from "@/app/store/refund/refundThunk";
import { toast } from "sonner";

interface Props {
  selectedOrder: Order;

  setShowReturnReceiptDialog: Dispatch<SetStateAction<boolean>>;
}

const returnReasonOptions = [
  "Damage Product",
  "Expired Product",
  "Wrong Product",
  "Not interested anymore",
  "Other",
];

const refundMethods = ["UPI", "CARD", "CASH"];

export default function ReturnItemSection({
  selectedOrder,
  setShowReturnReceiptDialog,
}: Props) {
  const dispatch = useAppDispatch();
  const [returnReason, setReturnReason] = useState("");

  const [otherReason, setOtherReason] = useState("");

  const [refundMethod, setRefundMethod] = useState("UPI");

  const branch = useAppSelector((state) => state.branch.branch);
  const loading = useAppSelector((state) => state.refund.loading);

  async function processRefund() {
    if (!returnReason) {
      toast.error("Please select a return reason");
      return;
    }

    if (returnReason === "Other" && !otherReason.trim()) {
      toast.error("Please enter a reason");
      return;
    }

    const resultAction = await dispatch(
      createRefund({
        orderId: selectedOrder.id,
        branchId: branch!._id,
        reason: returnReason === "Other" ? otherReason.trim() : returnReason,
        refundAmount: selectedOrder.totalAmount,
        refundMethod,
      })
    );

    console.log(resultAction);

    if (createRefund.fulfilled.match(resultAction)) {
      setShowReturnReceiptDialog(true);
    }
  }

  return (
    <div>
      <Card className="sticky top-24">
        <CardContent className="space-y-6 p-6">
          <div>
            <h2 className="text-2xl font-bold">Refund Details</h2>

            <p className="text-sm text-muted-foreground">
              Process customer refund securely
            </p>
          </div>

          <div>
            <Label className="mb-2 block">Return Reason</Label>

            <Select value={returnReason} onValueChange={setReturnReason}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select reason" />
              </SelectTrigger>

              <SelectContent>
                {returnReasonOptions.map((reason) => (
                  <SelectItem key={reason} value={reason}>
                    {reason}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {returnReason === "Other" && (
            <div>
              <Label className="mb-2 block">Specify Reason</Label>

              <Textarea
                placeholder="Write return reason..."
                value={otherReason}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setOtherReason(e.target.value)
                }
              />
            </div>
          )}

          <div>
            <Label className="mb-2 block">Refund Method</Label>

            <Select value={refundMethod} onValueChange={setRefundMethod}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select refund method" />
              </SelectTrigger>

              <SelectContent>
                {refundMethods.map((method) => (
                  <SelectItem key={method} value={method}>
                    {method}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-xl border bg-muted/40 p-5">
            <div className="space-y-2">
              <label className="mt-2 flex justify-between text-sm text-muted-foreground">
                Maximum Refund
              </label>

              <div className="rounded-xl border bg-muted/40 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Refund Amount</span>

                  <span className="text-3xl font-bold">
                    ₹{selectedOrder.totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Button size="lg" className="w-full cursor-pointer" onClick={processRefund}>
            {loading ? (
              <LoadingSpinner size={18} text="Processing Refund..." />
            ) : (
              "Process Refund"
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
