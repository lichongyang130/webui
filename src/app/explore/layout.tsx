// Content changes as admins add/edit items — always render fresh.
export const dynamic = "force-dynamic";

export default function ExploreLayout({ children }: { children: React.ReactNode }) {
  return children;
}
