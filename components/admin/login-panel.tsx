"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole } from "lucide-react";

export function LoginPanel() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(form.entries()))
    });
    if (!res.ok) {
      setError("Credentials were not accepted.");
      return;
    }
    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <main className="grid min-h-screen place-items-center px-5">
      <form onSubmit={submit} className="glass w-full max-w-md rounded-[0.5rem] p-7">
        <div className="mb-8 grid h-12 w-12 place-items-center rounded-full border border-aureate/40 text-aureate">
          <LockKeyhole size={20} />
        </div>
        <h1 className="font-display text-5xl">Command Center</h1>
        <p className="mt-3 text-sm leading-6 text-white/58">View leasing leads and event demand from the American Dream platform.</p>
        <div className="mt-8 grid gap-3">
          <input className="form-field" name="email" type="email" placeholder="Admin email" required />
          <input className="form-field" name="password" type="password" placeholder="Password" required />
          <button className="cta-button mt-2">Enter dashboard</button>
          {error && <p className="text-sm text-red-300">{error}</p>}
        </div>
      </form>
    </main>
  );
}
