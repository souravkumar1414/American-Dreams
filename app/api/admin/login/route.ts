import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { setSession } from "@/lib/auth";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const adminEmail = process.env.ADMIN_EMAIL || "partnerships@americandream.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "AmericanDream2026!";
  const storedHash = process.env.ADMIN_PASSWORD_HASH;

  const passwordOk = storedHash
    ? await bcrypt.compare(password, storedHash)
    : password === adminPassword;

  if (email !== adminEmail || !passwordOk) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  await setSession(email);
  return NextResponse.json({ ok: true });
}
