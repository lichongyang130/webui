"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/icons";
import type { Settings } from "@/lib/types";

export default function SettingsForm({ initial }: { initial: Settings }) {
  const router = useRouter();
  const [s, setS] = useState<Settings>(initial);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  const set = <K extends keyof Settings>(k: K, v: Settings[K]) => {
    setS((old) => ({ ...old, [k]: v }));
    setSaved(false);
  };

  async function save() {
    setErr("");
    setSaving(true);
    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(s),
    });
    setSaving(false);
    if (!res.ok) return setErr("Could not save settings.");
    setSaved(true);
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <section className="glass rounded-2xl p-6">
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/40">Site identity</h2>
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-white/50">Site name</label>
              <input className="input-dark" value={s.siteName} onChange={(e) => set("siteName", e.target.value)} />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-white/50">Tagline</label>
              <input className="input-dark" value={s.tagline} onChange={(e) => set("tagline", e.target.value)} />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-white/50">Hero title</label>
            <textarea className="input-dark resize-y" value={s.heroTitle} onChange={(e) => set("heroTitle", e.target.value)} />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-white/50">Hero subtitle</label>
            <textarea
              className="input-dark min-h-[100px] resize-y"
              value={s.heroSubtitle}
              onChange={(e) => set("heroSubtitle", e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="glass rounded-2xl p-6">
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/40">Admin credentials</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-white/50">Username</label>
            <input className="input-dark" value={s.adminUser} onChange={(e) => set("adminUser", e.target.value)} />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-white/50">Password</label>
            <input
              type="text"
              className="input-dark"
              value={s.adminPass}
              onChange={(e) => set("adminPass", e.target.value)}
            />
          </div>
        </div>
        <p className="mt-3 text-xs text-amber-300/70">
          ⚠ This demo stores credentials in a local JSON file. Use a real auth provider + hashed passwords in production.
        </p>
      </section>

      {err && <p className="rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">{err}</p>}

      <div className="flex items-center gap-3">
        <button onClick={save} disabled={saving} className="grad-btn disabled:opacity-60">
          <Icon name="check" className="h-4 w-4" /> {saving ? "Saving…" : "Save settings"}
        </button>
        {saved && (
          <span className="flex items-center gap-1.5 text-sm font-semibold text-emerald-300">
            <Icon name="check" className="h-4 w-4" /> Saved — public site updated
          </span>
        )}
      </div>
    </div>
  );
}
