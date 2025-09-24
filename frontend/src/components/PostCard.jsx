"use client";
import Link from "next/link";

export default function PostCard({ post, hrefBase = "/posts" }) {
  if (!post) return null;
  const image = Array.isArray(post.images) && post.images.length ? post.images[0] : null;
  const link = `${hrefBase}/${post.id}`;
  return (
    <div className="group rounded-2xl overflow-hidden bg-white/80 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700/50 shadow hover:shadow-lg transition">
      {image && (
        <Link href={link} className="block overflow-hidden">
          <img src={image} alt={post.title} className="w-full h-40 object-cover group-hover:scale-[1.02] transition-transform duration-300" />
        </Link>
      )}
      <div className="p-4">
        <Link href={link} className="text-base font-semibold line-clamp-1 hover:underline">
          {post.title}
        </Link>
        <div className="text-xs text-slate-600 dark:text-slate-400 mt-1 flex items-center gap-2">
          <span>{post.author?.username ? `by ${post.author.username}` : 'by Unknown'}</span>
          {post.category && <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200">{post.category}</span>}
        </div>
        {post.content && (
          <p className="text-sm mt-2 text-slate-700 dark:text-slate-300 line-clamp-2">{post.content}</p>
        )}
      </div>
    </div>
  );
}


