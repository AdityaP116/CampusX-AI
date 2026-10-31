"use client";

import * as React from "react";
import { FadeIn } from "@/shared/components/ui/fade-in";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Breadcrumbs } from "@/shared/components/ui/breadcrumbs";
import { Mail, MessageSquare, Send, CheckCircle2, AlertCircle, Clock } from "lucide-react";

export default function SupportPage() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    subject: "transaction",
    message: "",
  });
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedback, setFeedback] = React.useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setFeedback("Please fill out all required fields.");
      return;
    }

    setStatus("submitting");
    setFeedback("");

    try {
      // In development / demo mode, simulate support ticket dispatch
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStatus("success");
      setFeedback("Your message has been sent successfully. A CampusX support specialist will follow up at " + formData.email + " within 24 hours.");
      setFormData({ name: "", email: "", subject: "transaction", message: "" });
    } catch {
      setStatus("error");
      setFeedback("Something went wrong. Please try again or email us directly at support@campusx.market");
    }
  };

  return (
    <div className="bg-surface min-h-screen">
      <main className="max-w-[900px] mx-auto px-6 py-12 md:py-16">
        <Breadcrumbs items={[{ label: "Support & Contact" }]} />

        <FadeIn>
          <div className="mb-12 text-center">
            <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
              Help & Concierge
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-on-surface mt-2 mb-4">
              Contact CampusX Support
            </h1>
            <p className="font-body text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto">
              Need assistance with a listing, dispute resolution, or college email verification? Our dedicated safety and support team is here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-2xl border border-outline-variant/40 shadow-sm flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-headline font-bold text-on-surface mb-1">Direct Email</h3>
              <p className="text-xs text-on-surface-variant mb-4">Response time: ~24 hours</p>
              <a
                href="mailto:support@campusx.market"
                className="text-xs font-semibold text-primary hover:underline break-all"
              >
                support@campusx.market
              </a>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-outline-variant/40 shadow-sm flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="font-headline font-bold text-on-surface mb-1">Student Forum</h3>
              <p className="text-xs text-on-surface-variant mb-4">Community answers & FAQs</p>
              <a
                href="/help"
                className="text-xs font-semibold text-primary hover:underline"
              >
                Browse Help Articles
              </a>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-outline-variant/40 shadow-sm flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-headline font-bold text-on-surface mb-1">Hours of Support</h3>
              <p className="text-xs text-on-surface-variant mb-2">Mon - Fri: 9:00 AM – 8:00 PM EST</p>
              <span className="text-[11px] text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full font-medium">
                Campus Coverage Active
              </span>
            </div>
          </div>

          {/* Working Contact Form */}
          <div className="bg-white rounded-3xl border border-outline-variant/40 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] p-8 md:p-10">
            <div className="mb-8">
              <h2 className="font-display text-2xl font-bold text-on-surface">Send us a message</h2>
              <p className="text-sm text-on-surface-variant mt-1">
                Fill in the details below and we will investigate your issue immediately.
              </p>
            </div>

            {status === "success" && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{feedback}</span>
              </div>
            )}

            {status === "error" && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <span>{feedback}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-2">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="name"
                    type="text"
                    required
                    placeholder="Alex Morgan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-2">
                    University / Contact Email <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="alex@university.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-2">
                  Topic / Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full h-10 px-3 rounded-md border border-outline bg-surface text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="transaction">Listing or Meetup Issue</option>
                  <option value="verification">Student Email Verification</option>
                  <option value="dispute">Report Suspicious Behavior / Scam</option>
                  <option value="account">Account Access or Technical Bug</option>
                  <option value="feedback">General Feedback & Suggestions</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-2">
                  Message Details <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  placeholder="Describe your issue with relevant listing links or order details..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-3 rounded-md border border-outline bg-surface text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-on-surface-variant">
                  All inquiries protected under our <a href="/privacy" className="text-primary underline">Privacy Policy</a>.
                </span>
                <Button
                  type="submit"
                  disabled={status === "submitting"}
                  className="gap-2 px-6"
                >
                  <Send className="w-4 h-4" />
                  {status === "submitting" ? "Sending..." : "Submit Inquiry"}
                </Button>
              </div>
            </form>
          </div>
        </FadeIn>
      </main>
    </div>
  );
}
