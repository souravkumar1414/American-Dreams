import { redirect } from "next/navigation";
import { verifySession } from "@/lib/auth";
import { getEvents, getLeads } from "@/lib/db";
import { Dashboard } from "@/components/admin/dashboard";

export default async function AdminDashboardPage() {
  const session = await verifySession();
  if (!session) redirect("/admin/login");
  const [leads, events] = await Promise.all([getLeads(), getEvents()]);
  return <Dashboard leads={JSON.parse(JSON.stringify(leads))} events={JSON.parse(JSON.stringify(events))} />;
}
