"use client";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuthContext();
  return (
    <header className="w-full border-b border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between text-[var(--color-foreground)]">
        <Link href="/" className="font-semibold">Post App</Link>
        {user ? (
          <div className="flex items-center gap-4 text-sm">
            <Link className="hover:underline" href="/posts/create">Create Post</Link>
            <Link className="hover:underline" href="/profile">Profile</Link>
            {user.avatar && (
              <Link href="/profile" className="block">
                <img src={user.avatar} alt={user.username || 'avatar'} className="w-8 h-8 rounded-full object-cover ring-1 ring-[var(--color-border)]" />
              </Link>
            )}
            <button onClick={logout} className="text-[var(--color-danger)] hover:underline">Logout</button>
          </div>
        ) : (
          <div className="flex items-center gap-4 text-sm">
            <Link className="hover:underline" href="/login">Sign in</Link>
            <Link className="hover:underline" href="/register">Register</Link>
          </div>
        )}
      </div>
    </header>
  );
}


