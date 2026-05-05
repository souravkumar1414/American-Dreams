"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, CalendarDays, Send } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    setStatus(res.ok ? "success" : "error");
    if (res.ok) event.currentTarget.reset();
  }

  return (
    <form onSubmit={submit} className="grid gap-3">
      <div className="grid gap-3 md:grid-cols-2">
        <input name="name" required placeholder="Name" className="form-field" />
        <input name="email" required type="email" placeholder="Email" className="form-field" />
      </div>
      <input name="company" required placeholder="Company" className="form-field" />
      <select name="interest" required className="form-field">
        <option value="leasing">Retail leasing</option>
        <option value="sponsorship">Sponsorship partnership</option>
        <option value="events">Event booking</option>
      </select>
      <textarea
        name="message"
        required
        minLength={10}
        placeholder="Tell us what you want to own: attention, culture, footfall, or all three."
        className="form-field min-h-32 resize-none"
      />
      <button className="cta-button" disabled={status === "loading"}>
        <Send size={18} />
        {status === "loading" ? "Sending" : "Request a private conversation"}
      </button>
      <FormStatus status={status} />
    </form>
  );
}

export function EventForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    setStatus(res.ok ? "success" : "error");
    if (res.ok) event.currentTarget.reset();
  }

  return (
    <form onSubmit={submit} className="grid gap-3">
      <div className="grid gap-3 md:grid-cols-2">
        <input name="name" required placeholder="Name" className="form-field" />
        <input name="email" required type="email" placeholder="Email" className="form-field" />
      </div>
      <input name="company" required placeholder="Company" className="form-field" />
      <div className="grid gap-3 md:grid-cols-3">
        <input name="eventType" required placeholder="Activation type" className="form-field" />
        <input name="audience" required placeholder="Audience size" className="form-field" />
        <input name="date" required placeholder="Target date" className="form-field" />
      </div>
      <textarea
        name="notes"
        required
        minLength={10}
        placeholder="Describe the launch, concert, private experience, or cultural moment you want to create."
        className="form-field min-h-28 resize-none"
      />
      <button className="cta-button" disabled={status === "loading"}>
        <CalendarDays size={18} />
        {status === "loading" ? "Booking" : "Start an event brief"}
      </button>
      <FormStatus status={status} />
    </form>
  );
}

function FormStatus({ status }: { status: Status }) {
  if (status === "idle" || status === "loading") return null;
  return (
    <p className={status === "success" ? "text-sm text-aureate" : "text-sm text-red-300"}>
      {status === "success"
        ? "Received. The partnerships team has the signal."
        : "Something blocked the submission. Check the fields and try again."}
    </p>
  );
}

export function TextCta({ children, href = "#contact" }: { children: React.ReactNode; href?: string }) {
  return (
    <a href={href} className="group inline-flex items-center gap-3 text-sm uppercase tracking-[0.28em] text-aureate">
      {children}
      <span className="grid h-10 w-10 place-items-center rounded-full border border-aureate/40 transition group-hover:bg-aureate group-hover:text-black">
        <ArrowRight size={17} />
      </span>
    </a>
  );
}
