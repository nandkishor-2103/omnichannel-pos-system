import { selectHeldOrders } from "@/app/store/cart/cartSelectors";
import { resumeOrder } from "@/app/store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { NotepadText, PackageSearch, Play } from "lucide-react";

type HeldOrdersDialogProps = {
  showHeldOrderDialog: boolean;
  setShowHeldOrderDialog: (open: boolean) => void;
};

export default function HeldOrdersDialog({
  showHeldOrderDialog,
  setShowHeldOrderDialog,
}: HeldOrdersDialogProps) {
  const heldOrders = useAppSelector(selectHeldOrders);

  const dispatch = useAppDispatch();

  const handleResumeOrder = (order: (typeof heldOrders)[0]) => {
    dispatch(resumeOrder(order));

    setShowHeldOrderDialog(false);
  };

  return (
    <Dialog open={showHeldOrderDialog} onOpenChange={setShowHeldOrderDialog}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>
            Held Orders
            {heldOrders.length > 0 && (
              <Badge className="ml-2 rounded bg-red-600 ">{heldOrders.length}</Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        {heldOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 rounded-full bg-muted p-4">
              <PackageSearch className="h-8 w-8 text-muted-foreground" />
            </div>

            <h3 className="text-lg font-semibold">No Held Orders</h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Orders placed on hold will appear here.
            </p>
          </div>
        ) : (
          <div className="max-h-[450px] space-y-3 overflow-y-auto pr-1">
            {heldOrders.map((order) => (
              <Card
                key={order.id}
                className="transition-all duration-200 hover:border-primary/40 hover:shadow-md"
              >
                <CardContent className=" px-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">
                          Order #{String(order.id).slice(-6)}
                        </h3>
                      </div>

                      <p className="mt-1 text-sm font-medium text-primary">
                        {order.customer?.fullName || "Walk-in Customer"}
                      </p>

                      <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                        <span>
                          {order.items.length} item{order.items.length > 1 ? "s" : ""}
                        </span>

                        <div className="h-1 w-1 rounded-full bg-muted-foreground" />

                        <span>
                          {new Date(order.timestamp).toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: true,
                          })}
                        </span>
                      </div>

                      {order.note && (
                        <div className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
                          <NotepadText className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-600" />

                          <p className="leading-relaxed">{order.note}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <p className="text-lg font-bold text-green-600">
                        ₹{order.totalAmount.toFixed(2)}
                      </p>

                      <Button
                        size="sm"
                        className="cursor-pointer bg-green-700 hover:bg-green-800"
                        onClick={() => handleResumeOrder(order)}
                      >
                        <Play className="mr-1 h-4 w-4" />
                        Resume
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
