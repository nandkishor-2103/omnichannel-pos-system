import { Mail, Phone, Building2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { toast } from "sonner";

export default function ContactSales() {
  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(formData);

    toast.success("Sales inquiry submitted. Our team will contact you shortly.");

    setFormData({
      fullName: "",
      company: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold">Contact Sales</h1>

          <p className="mt-3 text-muted-foreground">
            Tell us about your business and we'll help you find the right plan.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left */}
          <div className="rounded-2xl border bg-card p-8">
            <h2 className="mb-6 text-2xl font-semibold">Let's Talk</h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <Mail className="mt-1 h-5 w-5 text-primary" />

                <div>
                  <p className="font-medium">Email</p>

                  <p className="text-sm text-muted-foreground">sales@pospro.com</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Phone className="mt-1 h-5 w-5 text-primary" />

                <div>
                  <p className="font-medium">Phone</p>

                  <p className="text-sm text-muted-foreground">+91 9876543210</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Building2 className="mt-1 h-5 w-5 text-primary" />

                <div>
                  <p className="font-medium">Business Solutions</p>

                  <p className="text-sm text-muted-foreground">
                    Multi-Store, Franchise & Enterprise POS
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-xl bg-muted p-4">
              <h3 className="font-medium">Why Talk To Sales?</h3>

              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>• Product Demo</li>
                <li>• Enterprise Pricing</li>
                <li>• Franchise Setup</li>
                <li>• Multi-Branch Deployment</li>
                <li>• Custom Integrations</li>
              </ul>
            </div>
          </div>

          {/* Right */}
          <div className="rounded-2xl border bg-card p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label>Full Name</Label>

                <Input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Company Name</Label>

                <Input name="company" value={formData.company} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label>Email</Label>

                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Phone</Label>

                <Input name="phone" value={formData.phone} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label>Message</Label>

                <Textarea
                  rows={5}
                  name="message"
                  placeholder="Tell us about your business requirements..."
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <Button type="submit" className="w-full cursor-pointer">
                Submit Inquiry
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
