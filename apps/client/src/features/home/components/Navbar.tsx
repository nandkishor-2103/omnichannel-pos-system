import { useState } from "react";
import { Link } from "react-router-dom";

import { ShoppingCart, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";

const navLinks = [
  {
    label: "Features",
    href: "#features",
  },
  {
    label: "Pricing",
    href: "#pricing",
  },
  {
    label: "FAQ",
    href: "#faq",
  },
  {
    label: "Contact",
    href: "#footer",
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-sm">
            <ShoppingCart className="h-5 w-5 text-primary-foreground" />
          </div>

          <div>
            <h2 className="text-lg font-bold">POS Pro</h2>

            <p className="text-xs text-muted-foreground">Retail Management</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <Button asChild variant="ghost" className="cursor-pointer">
            <Link to="/login">Sign In</Link>
          </Button>

          <Button asChild className="cursor-pointer">
            <Link to="/signup">Start Free Trial</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <Button
          size="icon"
          variant="ghost"
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t bg-background md:hidden">
          <div className="container mx-auto flex flex-col gap-4 px-4 py-4">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}

            <div className="mt-2 flex flex-col gap-2">
              <Button asChild variant="outline">
                <Link to="/login">Sign In</Link>
              </Button>

              <Button asChild>
                <Link to="/signup">Start Free Trial</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
