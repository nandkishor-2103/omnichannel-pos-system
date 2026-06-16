import { ShoppingCart, Mail, Phone, MapPin } from "lucide-react";

import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer id="footer" className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <ShoppingCart className="h-5 w-5 text-primary-foreground" />
              </div>

              <div>
                <h3 className="font-bold text-lg">POS Pro</h3>

                <p className="text-xs text-muted-foreground">
                  Retail Management Platform
                </p>
              </div>
            </div>

            <p className="max-w-sm text-sm text-muted-foreground">
              Modern cloud-based POS software for retailers, supermarkets, pharmacies,
              restaurants and multi-branch businesses.
            </p>

            <div className="mt-6 space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                support@pospro.com
              </div>

              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                +91 9876543210
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Mumbai, India
              </div>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="mb-4 font-semibold">Product</h4>

            <div className="space-y-3 text-sm">
              <Link to="/" className="block text-muted-foreground hover:text-primary">
                Features
              </Link>

              <Link to="/" className="block text-muted-foreground hover:text-primary">
                Pricing
              </Link>

              <Link
                to="/signup"
                className="block text-muted-foreground hover:text-primary"
              >
                Start Free Trial
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 font-semibold">Company</h4>

            <div className="space-y-3 text-sm">
              <Link to="/" className="block text-muted-foreground hover:text-primary">
                About Us
              </Link>

              <Link to="/" className="block text-muted-foreground hover:text-primary">
                Contact
              </Link>

              <Link to="/" className="block text-muted-foreground hover:text-primary">
                Careers
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 font-semibold">Legal</h4>

            <div className="space-y-3 text-sm">
              <Link to="/" className="block text-muted-foreground hover:text-primary">
                Privacy Policy
              </Link>

              <Link to="/" className="block text-muted-foreground hover:text-primary">
                Terms of Service
              </Link>

              <Link to="/" className="block text-muted-foreground hover:text-primary">
                Refund Policy
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-6 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} POS Pro. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-primary">
              <FaFacebook className="h-5 w-5" />
            </a>

            <a href="#" className="text-muted-foreground hover:text-primary">
              <FaLinkedin className="h-5 w-5" />
            </a>

            <a href="#" className="text-muted-foreground hover:text-primary">
              <FaGithub className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
