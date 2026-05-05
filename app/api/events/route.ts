import { NextResponse } from "next/server";
import { getEvents, insertEvent } from "@/lib/db";
import { verifySession } from "@/lib/auth";
import { eventSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = eventSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid event payload" }, { status: 400 });
  }
  const event = await insertEvent(parsed.data);
  return NextResponse.json({ event }, { status: 201 });
}

export async function GET() {
  const session = await verifySession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ events: await getEvents() });
}
