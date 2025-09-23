"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const isActive = (href) => pathname === href || pathname?.startsWith(href + "/");
  return (
    <div className="min-h-screen grid grid-cols-[220px_1fr]">
      <aside className="border-r border-[var(--color-border)] bg-[var(--color-surface)] p-5 space-y-4 text-[var(--color-foreground)]">
        <h2 className="text-lg font-semibold">Post App</h2>
        <nav className="flex flex-col gap-1.5 text-sm">
          <Link
            className={`px-3 py-2 rounded transition ${isActive("/dashboard") ? "bg-[#0f1629] border border-[var(--color-border)]" : "hover:bg-[#0f1629]"}`}
            href="/dashboard"
            aria-current={isActive("/dashboard") ? "page" : undefined}
          >
            Dashboard
          </Link>
          <Link
            className={`px-3 py-2 rounded transition ${isActive("/posts/create") ? "bg-[#0f1629] border border-[var(--color-border)]" : "hover:bg-[#0f1629]"}`}
            href="/posts/create"
            aria-current={isActive("/posts/create") ? "page" : undefined}
          >
            Create Post
          </Link>
          <Link
            className={`px-3 py-2 rounded transition ${isActive("/profile") ? "bg-[#0f1629] border border-[var(--color-border)]" : "hover:bg-[#0f1629]"}`}
            href="/profile"
            aria-current={isActive("/profile") ? "page" : undefined}
          >
            Profile
          </Link>
        </nav>
      </aside>
      <main className="p-6">{children}</main>
    </div>
  );
}


