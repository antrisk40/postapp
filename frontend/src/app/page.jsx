"use client";
import Link from "next/link";
import { useState } from "react";
import usePosts from "@/hooks/usePosts";
import PostCard from "@/components/PostCard";
import { useAuthContext } from "@/context/AuthContext";
import Loading from "@/app/loading";
import { Button, Input } from "@/components/ui";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;
  const { posts, loading, error, pagination, refetch, deletePost } = usePosts({ limit, page });
  const { user } = useAuthContext();

  return (
    <main className="space-y-6">

      <div className="flex items-center gap-2">
        <Input
          placeholder="Search posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') refetch({ search: query, page: 1, limit }); }}
        />
        <Button onClick={() => refetch({ search: query, page: 1, limit })}>Search</Button>
      </div>

      {loading && <Loading />}
      {error && <p className="text-red-600">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((p) => (
          <div key={p.id} className="relative">
            <PostCard post={p} hrefBase="/posts" />
            {user?.id === p.author?.id && (
              <div className="absolute top-2 right-2 flex gap-2">
                <Link className="text-xs px-2 py-1 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 shadow hover:shadow-md transition" href={`/posts/${p.id}/edit`}>Edit</Link>
                <button className="text-xs px-2 py-1 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 shadow hover:shadow-md transition" onClick={async () => { await deletePost(p.id); refetch({ search: query, page, limit }); }}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
      {!loading && posts.length === 0 && (
        <p className="text-sm text-gray-500">No posts yet.</p>
      )}

      {pagination && pagination.pages > 1 && (
        <div className="flex items-center justify-between">
          <Button variant="secondary" onClick={() => { const np = page - 1; setPage(np); refetch({ search: query, page: np, limit }); }} disabled={page <= 1}>Previous</Button>
          <p className="text-sm text-muted-foreground">Page {pagination.page} of {pagination.pages}</p>
          <Button variant="secondary" onClick={() => { const np = page + 1; setPage(np); refetch({ search: query, page: np, limit }); }} disabled={page >= pagination.pages}>Next</Button>
        </div>
      )}
    </main>
  );
}


