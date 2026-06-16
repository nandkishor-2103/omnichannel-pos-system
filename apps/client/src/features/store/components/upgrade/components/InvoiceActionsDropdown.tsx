import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import { Download, Mail, MoreHorizontal } from "lucide-react";

interface InvoiceActionsDropdownProps {
  invoiceId: string;

  onDownload: (invoiceId: string) => void;

  onResend: (invoiceId: string) => void;
}

export default function InvoiceActionsDropdown({
  invoiceId,
  onDownload,
  onResend,
}: InvoiceActionsDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline" aria-label="Invoice actions">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" side="top">
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => onDownload(invoiceId)}
        >
          <Download className="mr-2 h-4 w-4" />
          Download Invoice
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer" onClick={() => onResend(invoiceId)}>
          <Mail className="mr-2 h-4 w-4" />
          Resend Invoice
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
