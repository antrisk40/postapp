"use client";
import { useEffect, useState, use as usePromise } from "react";
import { useRouter } from "next/navigation";
import api from "@/libs/api.js";
import PostForm from "@/components/forms/PostForm";

export default function EditPostPage({ params }) {
  const { id } = usePromise(params);
  const router = useRouter();
  const [initial, setInitial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function run() {
      try {
        setLoading(true);
        const res = await api.posts.getById(id);
        const p = res.data?.data;
        if (!p) throw new Error('Not found');
        setInitial({
          title: p.title || '',
          content: p.content || '',
          category: p.category || '',
          tags: p.tags || [],
          images: p.images || []
        });
      } catch (err) {
        setError(err?.response?.data?.error || 'Failed to load');
      } finally {
        setLoading(false);
      }
    }
    run();
  }, [id]);

  const onSubmit = async (payload) => {
    try {
      const res = await api.posts.update(id, payload);
      if (res.data?.success) router.push(`/posts/${id}`);
    } catch (err) {
      const status = err?.response?.status;
      if (status === 403) {
        setError('This post does not belong to you.');
      } else {
        setError(err?.response?.data?.error || 'Failed to save');
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!initial) return <p>Not found</p>;

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Edit Post</h1>
      <PostForm onSubmit={onSubmit} initialValues={initial} />
    </div>
  );
}


