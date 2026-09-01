import { getSettings } from "@/lib/db";
import SettingsForm from "./SettingsForm";

export default function AdminSettingsPage() {
  const settings = getSettings();
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-white/45">
          Site identity, hero copy and admin credentials. Changes apply to the public site immediately.
        </p>
      </div>
      <SettingsForm initial={settings} />
    </div>
  );
}
