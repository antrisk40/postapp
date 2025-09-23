"use client";
import PostForm from "@/components/forms/PostForm";
import { useRouter } from "next/navigation";
import usePosts from "@/hooks/usePosts";

export default function CreatePostPage() {
  const router = useRouter();
  const { createPost } = usePosts();

  const handleCreate = async (payload) => {
    const created = await createPost(payload);
    router.push(`/posts/${created.id}`);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card p-6 shadow-lg">
        <h1 className="text-2xl font-semibold mb-6">Create Post</h1>
        <PostForm onSubmit={handleCreate} />
      </div>
    </div>
  );
}


