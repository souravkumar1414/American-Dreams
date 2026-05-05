import { NextResponse } from "next/server";
import { getLeads, insertLead } from "@/lib/db";
import { verifySession } from "@/lib/auth";
import { leadSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid lead payload" }, { status: 400 });
  }
  const lead = await insertLead(parsed.data);
  return NextResponse.json({ lead }, { status: 201 });
}

export async function GET() {
  const session = await verifySession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ leads: await getLeads() });
}
