"use client";
import { useEffect, useState, use as usePromise } from "react";
import { useRouter } from "next/navigation";
import api from "@/libs/api";
import { useAuthContext } from "@/context/AuthContext";
import Link from "next/link";

export default function PostViewPage({ params }) {
  const { id } = usePromise(params);
  const router = useRouter();
  const { user } = useAuthContext();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function run() {
      try {
        setLoading(true);
        const res = await api.posts.getById(id);
        setPost(res.data?.data || null);
      } catch (err) {
        setError(err?.response?.data?.error || 'Failed to load post');
      } finally {
        setLoading(false);
      }
    }
    run();
  }, [id]);

  const onDelete = async () => {
    if (!post) return;
    if (!confirm('Delete this post?')) return;
    try {
      setDeleting(true);
      await api.posts.delete(post.id);
      router.push("/");
    } catch (err) {
      alert(err?.response?.data?.error || 'Failed to delete');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!post) return <p>Not found</p>;

  const isAuthor = user?.id === post?.author?.id;
  const cover = Array.isArray(post.images) && post.images.length ? post.images[0] : null;

  return (
    <article className="space-y-6">
      {cover && (
        <div className="w-full overflow-hidden rounded-lg border border-[var(--color-border)]">
          <img src={cover} alt={post.title} className="w-full h-[320px] object-cover" />
        </div>
      )}

      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">{post.title}</h1>
        <div className="flex items-center justify-between text-sm text-[var(--color-muted)]">
          <div className="flex items-center gap-3">
            {post.author?.avatar && (
              <img src={post.author.avatar} alt={post.author.username} className="w-8 h-8 rounded-full object-cover ring-1 ring-[var(--color-border)]" />
            )}
            <div>
              <p className="text-[var(--color-foreground)]">{post.author?.username || 'Unknown'}</p>
              <p>{formatDate(post.createdAt)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {post.category && <span className="px-2 py-1 rounded bg-[var(--color-surface)] border border-[var(--color-border)] text-xs">{post.category}</span>}
            {Array.isArray(post.tags) && post.tags.length > 0 && (
              <div className="hidden md:flex flex-wrap gap-1">
                {post.tags.slice(0, 3).map((t) => (
                  <span key={t} className="px-2 py-1 rounded bg-[var(--color-surface)] border border-[var(--color-border)] text-xs">#{t}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {post.content && (
        <section className="prose prose-invert max-w-none">
          <p className="whitespace-pre-wrap leading-7">{post.content}</p>
        </section>
      )}

      {Array.isArray(post.images) && post.images.length > 1 && (
        <section className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {post.images.slice(1).map((url) => (
            <img key={url} src={url} alt="post" className="w-full h-40 object-cover rounded border border-[var(--color-border)]" />
          ))}
        </section>
      )}

      <footer className="flex items-center justify-between">
        <Link href="/" className="btn btn-outline">Back</Link>
        {isAuthor && (
          <div className="flex items-center gap-2">
            <Link href={`/(dashboard)/posts/${post.id}/edit`} className="btn btn-outline">Edit</Link>
            <button onClick={onDelete} disabled={deleting} className="btn btn-primary">{deleting ? 'Deleting...' : 'Delete'}</button>
          </div>
        )}
      </footer>
    </article>
  );
}

function formatDate(dateStr) {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return '';
  }
}

