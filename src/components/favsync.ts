"use client";

// One-shot localStorage ⇄ server favorites bridge (#201). Call once per page;
// when a session exists it merges local favorites into the cloud, writes the
// merged list back locally and notifies listeners. Returns whether it synced.

let promise: Promise<boolean> | null = null;

export function ensureFavSync(): Promise<boolean> {
  if (!promise) {
    promise = (async () => {
      try {
        const me = await fetch("/api/auth/me").then((r) => r.json());
        if (!me?.user) return false;
        let local: string[] = [];
        try {
          local = JSON.parse(localStorage.getItem("mv_favs") ?? "[]");
        } catch {
          /* ignore */
        }
        const res = await fetch("/api/me/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slugs: local }),
        });
        if (!res.ok) return false;
        const data = await res.json();
        if (Array.isArray(data.favs)) {
          localStorage.setItem("mv_favs", JSON.stringify(data.favs));
          window.dispatchEvent(new Event("mv-favs-changed"));
        }
        return true;
      } catch {
        return false;
      }
    })();
  }
  return promise;
}

/** Fire-and-forget cloud toggle (silently skipped when signed out). */
export function pushFavToggle(slug: string) {
  fetch("/api/me/favorites", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ slug }),
  }).catch(() => {
    /* offline / signed out — local list remains the source of truth */
  });
}
