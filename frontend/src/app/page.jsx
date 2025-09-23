"use client";
import Link from "next/link";
import { useState } from "react";
import usePosts from "@/hooks/usePosts";
import PostCard from "@/components/PostCard";
import { useAuthContext } from "@/context/AuthContext";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;
  const { posts, loading, error, pagination, refetch, deletePost } = usePosts({ limit, page });
  const { user } = useAuthContext();

  return (
    <main className="space-y-6">

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="flex items-center gap-2">
        <input
          className="w-full border rounded p-2 bg-[var(--surface)]"
          placeholder="Search posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') refetch({ search: query, page: 1, limit }); }}
        />
        <button className="btn btn-primary" onClick={() => refetch({ search: query, page: 1, limit })}>Search</button>
      </div>

      <ul className="space-y-3">
        {posts.map((p) => (
          <li key={p.id}>
            <div className="relative">
              <PostCard post={p} hrefBase="/posts" />
              {user?.id === p.author?.id && (
                <div className="absolute top-2 right-2 flex gap-2">
                  <Link className="btn btn-outline text-xs" href={`/posts/${p.id}/edit`}>Edit</Link>
                  <button className="btn btn-outline text-xs" onClick={async () => { await deletePost(p.id); refetch({ search: query, page, limit }); }}>Delete</button>
                </div>
              )}
            </div>
          </li>
        ))}
        {!loading && posts.length === 0 && (
          <p className="text-sm text-gray-500">No posts yet.</p>
        )}
      </ul>

      {pagination && pagination.pages > 1 && (
        <div className="flex items-center justify-between">
          <button className="btn btn-outline" disabled={page <= 1} onClick={() => { const np = page - 1; setPage(np); refetch({ search: query, page: np, limit }); }}>Previous</button>
          <p className="text-sm text-muted-foreground">Page {pagination.page} of {pagination.pages}</p>
          <button className="btn btn-outline" disabled={page >= pagination.pages} onClick={() => { const np = page + 1; setPage(np); refetch({ search: query, page: np, limit }); }}>Next</button>
        </div>
      )}
    </main>
  );
}


