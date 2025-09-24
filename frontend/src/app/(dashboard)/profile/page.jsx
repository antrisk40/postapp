"use client";
import { useEffect, useState } from "react";
import api from "@/libs/api";
import Link from "next/link";
import PostCard from "@/components/PostCard";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function run() {
      try {
        setLoading(true);
        const res = await api.users.getProfile();
        setProfile(res.data?.data || null);
      } catch (err) {
        setError(err?.response?.data?.error || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    }
    run();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!profile) return <p className="text-muted">Not found</p>;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="card p-6 flex items-center gap-4">
        {profile.avatar && (
          <img src={profile.avatar} alt={profile.username} className="w-16 h-16 object-cover rounded-full border border-[var(--border)]" />
        )}
        <div>
          <h1 className="text-2xl font-semibold">Your Profile</h1>
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
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function run() {
      try {
        setLoading(true);
        const res = await api.posts.getAll({ author: 'me' });
        const data = res.data?.data || [];
        setPosts(data);
      } catch (err) {
        setError(err?.response?.data?.error || 'Failed to load');
      } finally {
        setLoading(false);
      }
    }
    run();
  }, []);

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


