"use client";
import usePosts from "@/hooks/usePosts";
import { useAuthContext } from "@/context/AuthContext";
import Link from "next/link";
import PostCard from "@/components/PostCard";

export default function DashboardPage() {
  const { user, logout } = useAuthContext();
  const { posts, loading } = usePosts({ limit: 5, author: 'me' });

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <button onClick={logout} className="text-sm text-danger">Logout</button>
      </div>

      <div className="card p-6">
        <p className="text-sm text-muted">Signed in as</p>
        <p className="font-medium">{user?.username || user?.email}</p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium">Recent Posts</h2>
          <Link className="text-sm hover:underline" href="/posts">View all</Link>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="space-y-2">
            {posts.slice(0, 5).map((p) => (
              <li key={p.id}>
                <PostCard post={p} hrefBase="/posts" />
              </li>
            ))}
            {posts.length === 0 && <p className="text-sm text-muted">No posts yet.</p>}
          </ul>
        )}
      </div>
    </div>
  );
}


