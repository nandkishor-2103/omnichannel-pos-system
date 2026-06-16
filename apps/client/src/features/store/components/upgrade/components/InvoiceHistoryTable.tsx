import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

import type { SubscriptionInvoice } from "@/app/store/subscription-invoice/subscriptionInvoiceTypes";

import InvoiceActionsDropdown from "./InvoiceActionsDropdown";

interface InvoiceHistoryTableProps {
  invoices: SubscriptionInvoice[];

  onDownload: (invoiceId: string) => void;

  onResend: (invoiceId: string) => void;
}

export default function InvoiceHistoryTable({
  invoices,
  onDownload,
  onResend,
}: InvoiceHistoryTableProps) {
  if (!invoices.length) {
    return (
      <div className="rounded-xl border p-6 text-center text-muted-foreground">
        No invoices found.
      </div>
    );
  }

  return (
    <div className="rounded-xl border">
      <div className="border-b p-4">
        <h3 className="font-semibold">Invoice History</h3>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice Number</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Issued On</TableHead>
            <TableHead className="w-[120px]">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice._id}>
              <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>

              <TableCell>₹{invoice.amount.toLocaleString()}</TableCell>

              <TableCell>
                <Badge
                  variant={
                    invoice.status === "SENT"
                      ? "default"
                      : invoice.status === "FAILED"
                        ? "destructive"
                        : "secondary"
                  }
                >
                  {invoice.status}
                </Badge>
              </TableCell>

              <TableCell>{new Date(invoice.issuedAt).toLocaleString()}</TableCell>

              <TableCell>
                <InvoiceActionsDropdown
                  invoiceId={invoice._id}
                  onDownload={onDownload}
                  onResend={onResend}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
