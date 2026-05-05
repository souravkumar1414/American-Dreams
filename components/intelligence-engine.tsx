"use client";

import { FormEvent, useState } from "react";
import { BrainCircuit, Loader2, MapPinned, Sparkles, Target, TrendingUp } from "lucide-react";
import type { IntelligenceResult } from "@/lib/intelligence";

type Status = "idle" | "loading" | "success" | "error";

export function IntelligenceEngine() {
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<IntelligenceResult | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setResult(null);

    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    const response = await fetch("/api/intelligence", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      setStatus("error");
      return;
    }

    const data = await response.json();
    setResult(data.result);
    setStatus("success");
  }

  return (
    <section id="intelligence" className="section-pad relative overflow-hidden border-y border-white/10 bg-[#070706]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(216,180,106,0.12),transparent_32rem)]" />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 xl:grid-cols-[0.82fr_1fr] xl:items-start">
        <div data-reveal>
          <p className="mb-4 flex items-center gap-3 text-sm uppercase tracking-[0.34em] text-aureate">
            <BrainCircuit size={18} />
            AI Experience Intelligence Engine
          </p>
          <h2 className="font-display text-5xl leading-none md:text-7xl">
            Find the space where your brand has the strongest right to win.
          </h2>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/64">
            The engine compares your brand brief against destination zones, audience behavior, activation formats, and budget fit to recommend the most strategic placement.
          </p>
          <div className="mt-8 grid gap-3 text-sm text-white/52">
            <p className="flex items-center gap-3"><Target size={17} className="text-aureate" /> Semantic matching across brand, audience, budget, and goals</p>
            <p className="flex items-center gap-3"><TrendingUp size={17} className="text-aureate" /> Practical activation strategy, not generic recommendations</p>
            <p className="flex items-center gap-3"><Sparkles size={17} className="text-aureate" /> Sentence Transformers-ready ML service with instant local fallback</p>
          </div>
        </div>

        <div className="grid gap-5" data-reveal>
          <form onSubmit={submit} className="glass rounded-[0.5rem] p-5 md:p-7">
            <div className="grid gap-3 md:grid-cols-2">
              <input name="brandType" required className="form-field" placeholder="Brand type, e.g. luxury skincare" />
              <input name="targetAudience" required className="form-field" placeholder="Target audience, e.g. affluent millennial women" />
            </div>
            <div className="mt-3 grid gap-3 md:grid-cols-[0.7fr_1.3fr]">
              <input name="budget" required className="form-field" placeholder="Budget, e.g. $250k growth activation" />
              <input name="goals" required className="form-field" placeholder="Experience goals, e.g. product trial, VIP buzz, lead capture" />
            </div>
            <button className="cta-button mt-4 w-full" disabled={status === "loading"}>
              {status === "loading" ? <Loader2 className="animate-spin" size={18} /> : <BrainCircuit size={18} />}
              {status === "loading" ? "Reading the opportunity" : "Find My Space"}
            </button>
            {status === "error" && <p className="mt-3 text-sm text-red-300">The brief needs a little more detail before the engine can model it.</p>}
          </form>

          <article className="relative min-h-[28rem] overflow-hidden rounded-[0.5rem] border border-white/10 bg-black/45 p-5 md:p-7">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-aureate/80 to-transparent" />
            {!result && (
              <div className="flex min-h-[24rem] flex-col justify-center">
                <div className="mb-6 grid h-14 w-14 place-items-center rounded-full border border-aureate/35 text-aureate">
                  <MapPinned size={22} />
                </div>
                <h3 className="font-display text-4xl">Your recommendation will appear here.</h3>
                <p className="mt-4 max-w-xl text-sm leading-6 text-white/52">
                  Enter a realistic commercial brief and the engine will return a placement thesis, activation strategy, audience profile, and confidence score.
                </p>
              </div>
            )}
            {result && (
              <div>
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full border border-aureate/35 bg-aureate/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-aureate">
                    {result.source === "sentence-transformers" ? "ML match" : "Semantic match"}
                  </span>
                  <span className="text-sm text-white/45">{result.confidence}% confidence</span>
                </div>
                <h3 className="font-display text-5xl leading-none gold-text">{result.location}</h3>
                <div className="mt-8 grid gap-5">
                  <Insight label="Suggested Activation Strategy" value={result.strategy} />
                  <Insight label="Expected Audience Type" value={result.audience} />
                  <Insight label="Why This Fit Is Optimal" value={result.why} />
                  <Insight label="Recommended Next Move" value={result.nextMove} />
                </div>
                <div className="mt-7 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/58">
                  Budget fit: <span className="ml-2 text-aureate">{result.budgetFit}</span>
                </div>
              </div>
            )}
          </article>
        </div>
      </div>
    </section>
  );
}

function Insight({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-white/10 pt-5">
      <p className="mb-2 text-xs uppercase tracking-[0.24em] text-aureate/80">{label}</p>
      <p className="text-sm leading-7 text-white/68">{value}</p>
    </div>
  );
}
