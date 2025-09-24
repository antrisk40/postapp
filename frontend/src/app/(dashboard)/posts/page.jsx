"use client";
import Link from "next/link";
import usePosts from "@/hooks/usePosts";
import PostCard from "@/components/PostCard";

export default function PostsPage() {
  const { posts, loading, error } = usePosts();
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Posts</h1>
      <ul className="space-y-2">
        {posts.map((p) => (
          <li key={p.id}>
            <PostCard post={p} hrefBase="/posts" />
          </li>
        ))}
      </ul>
    </div>
  );
}


