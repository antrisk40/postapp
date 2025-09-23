"use client";
import Link from "next/link";

export default function PostCard({ post, hrefBase = "/posts" }) {
  if (!post) return null;
  const image = Array.isArray(post.images) && post.images.length ? post.images[0] : null;
  const link = `${hrefBase}/${post.id}`;
  return (
    <div className="border rounded p-4 flex gap-3">
      {image && (
        <Link href={link} className="block flex-shrink-0">
          <img src={image} alt={post.title} className="w-24 h-24 object-cover rounded border" />
        </Link>
      )}
      <div className="min-w-0 flex-1">
        <Link href={link} className="text-lg font-medium line-clamp-1">{post.title}</Link>
        <div className="text-sm text-gray-600 mt-1">
          {post.author?.username ? `by ${post.author.username}` : 'by Unknown'}
          {post.category ? ` • ${post.category}` : ''}
        </div>
        {post.content && (
          <p className="text-sm mt-2 line-clamp-2">{post.content}</p>
        )}
      </div>
    </div>
  );
}


