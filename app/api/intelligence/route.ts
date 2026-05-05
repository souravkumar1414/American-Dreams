import { NextResponse } from "next/server";
import { intelligenceSchema, localRecommend } from "@/lib/intelligence";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = intelligenceSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid intelligence brief" }, { status: 400 });
  }

  const mlServiceUrl = process.env.ML_SERVICE_URL;
  if (mlServiceUrl) {
    try {
      const response = await fetch(`${mlServiceUrl.replace(/\/$/, "")}/recommend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
        signal: AbortSignal.timeout(2800)
      });

      if (response.ok) {
        const result = await response.json();
        return NextResponse.json({ result: { ...result, source: "sentence-transformers" } });
      }
    } catch {
      // Keep the product responsive if the ML service is cold or unavailable.
    }
  }

  return NextResponse.json({ result: localRecommend(parsed.data) });
}
