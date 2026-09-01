export const dynamic = "force-dynamic";

import { isAuthed } from "@/lib/auth";
import { getSettings, getStats } from "@/lib/db";
import AdminLogin from "./login";
import AdminShell from "./AdminShell";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const authed = await isAuthed();
  if (!authed) return <AdminLogin />;
  const settings = getSettings();
  const stats = getStats();
  return (
    <AdminShell username={settings.adminUser} pendingCount={stats.pending}>
      {children}
    </AdminShell>
  );
}
