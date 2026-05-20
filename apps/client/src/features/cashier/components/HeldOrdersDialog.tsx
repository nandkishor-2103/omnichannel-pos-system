import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { Play } from "lucide-react";

const heldOrders = [
  {
    id: "4367846847",
    items: [1, 2, 3],
    timestamp: "2023-10-01 10:30:00",
  },
  {
    id: "4367846848",
    items: [4, 5],
    timestamp: "2023-10-01 11:45:00",
  },
];

type HeldOrdersDialogProps = {
  showHeldOrderDialog: boolean;
  setShowHeldOrderDialog: (open: boolean) => void;
};

export default function HeldOrdersDialog({
  showHeldOrderDialog,
  setShowHeldOrderDialog,
}: HeldOrdersDialogProps) {
  const handleResumeOrder = (order: (typeof heldOrders)[0]) => {
    console.log("Resuming order:", order);
  };

  return (
    <Dialog open={showHeldOrderDialog} onOpenChange={setShowHeldOrderDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Held Orders</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          {heldOrders.map((order) => (
            <Card key={order.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Order ID: {order.id}</h3>
                    <p className="text-sm text-gray-600">
                      {order.items.length} items •{" "}
                      {new Date(order.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                  <Button size="sm" onClick={() => handleResumeOrder(order)}>
                    <Play className="w-4 h-4 mr-1" />
                    Resume
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
