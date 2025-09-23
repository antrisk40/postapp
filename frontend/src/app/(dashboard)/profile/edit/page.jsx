"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export default function EditProfilePage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", bio: "", avatar: "" });
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function run() {
      try {
        setLoading(true);
        const res = await api.users.getProfile();
        const p = res.data?.data || {};
        setForm({ name: p.name || "", bio: p.bio || "", avatar: p.avatar || "" });
      } catch (err) {
        setError(err?.response?.data?.error || 'Failed to load');
      } finally {
        setLoading(false);
      }
    }
    run();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError(null);
      let avatarUrl = form.avatar || null;
      if (avatarFile) {
        const res = await api.upload.image(avatarFile);
        const data = res.data;
        if (data?.success && data?.data?.url) avatarUrl = data.data.url;
      }
      await api.users.updateProfile({ name: form.name, bio: form.bio, avatar: avatarUrl });
      router.push("/profile");
    } catch (err) {
      setError(err?.response?.data?.error || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  return (
    <div className="max-w-2xl mx-auto">
      <div className="card p-6 shadow-lg">
        <h1 className="text-2xl font-semibold mb-6">Edit Profile</h1>
        <form onSubmit={onSubmit} className="space-y-5 text-foreground">
          <div>
            <label className="block text-sm font-medium text-foreground/90">Name</label>
            <input className="mt-1 w-full rounded-md p-2.5 bg-[#0f1629] border border-[var(--border)] text-foreground placeholder-[#7f8aa3]" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground/90">Bio</label>
            <textarea className="mt-1 w-full rounded-md p-2.5 bg-[#0f1629] border border-[var(--border)] text-foreground placeholder-[#7f8aa3]" rows={5} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-medium text-foreground/90">Avatar</label>
            {form.avatar && (
              <img src={form.avatar} alt="avatar" className="w-20 h-20 object-cover rounded-full border border-[var(--border)]" />
            )}
            <input type="file" accept="image/*" className="file:mr-4 file:rounded file:border-0 file:bg-[var(--primary)] file:text-[var(--primary-foreground)] file:px-3 file:py-1.5" onChange={(e) => setAvatarFile(e.target.files?.[0] || null)} />
          </div>
          {error && <p className="text-danger text-sm">{error}</p>}
          <button disabled={saving} className="btn btn-primary w-full disabled:opacity-60">{saving ? 'Saving...' : 'Save'}</button>
        </form>
      </div>
    </div>
  );
}


