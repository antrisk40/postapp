"use client";
import Link from "next/link";
import PostCard from "@/components/PostCard";
import Loading from "@/app/loading";
import { useProfile } from "@/hooks/useProfile";
import usePosts from "@/hooks/usePosts";

export default function ProfilePage() {
  const { profile, loading, error } = useProfile();
  const initial = (profile?.name || profile?.username)?.[0]?.toUpperCase();

  if (loading) return <Loading />;
  if (error) return <p className="text-danger">{error}</p>;
  if (!profile) return <p className="text-muted">Not found</p>;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="card p-6 flex items-center gap-4">
        <div className="relative group">
          <div className="w-16 h-16 p-[2px] rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 overflow-hidden grid place-items-center">
              {profile.avatar ? (
                <img src={profile.avatar} alt={profile.username} className="w-full h-full object-cover" />
              ) : (
                <span className="text-lg font-semibold text-slate-700 dark:text-slate-200">{initial}</span>
              )}
            </div>
          </div>
          <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-green-500 ring-2 ring-white dark:ring-slate-900"></span>
        </div>
        <div>
          <h1 className="text-2xl font-semibold">{profile.name || profile.username}</h1>
          <p className="text-sm text-muted">@{profile.username}</p>
        </div>
        <div className="ml-auto">
          <Link className="btn btn-primary" href="/profile/edit">Edit profile</Link>
        </div>
      </div>
      <div className="card p-6 space-y-2">
        <p><span className="text-muted">Username:</span> {profile.username}</p>
        {profile.name && <p><span className="text-muted">Name:</span> {profile.name}</p>}
        {profile.email && <p><span className="text-muted">Email:</span> {profile.email}</p>}
        {profile.bio && <p><span className="text-muted">Bio:</span> {profile.bio}</p>}
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Your Posts</h2>
        <UserPosts />
      </section>
    </div>
  );
}

function UserPosts() {
  const { posts, loading, error } = usePosts({ author: 'me' });

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600 text-sm">{error}</p>;
  if (!posts.length) return <p className="text-sm text-gray-500">No posts yet.</p>;

  return (
    <ul className="space-y-3">
      {posts.map((p) => (
        <li key={p.id}>
          <PostCard post={p} hrefBase="/posts" />
        </li>
      ))}
    </ul>
  );
}


