"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";
import { useProfile } from "@/hooks/useProfile";
import api from "@/libs/api.js";

export default function EditProfilePage() {
  const router = useRouter();
  const { profile, loading, update } = useProfile();
  const [form, setForm] = useState({ name: "", bio: "", avatar: "" });
  const [avatarFile, setAvatarFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  if (!loading && profile && form.name === "" && form.bio === "" && form.avatar === "") {
    setForm({ name: profile.name || "", bio: profile.bio || "", avatar: profile.avatar || "" });
  }

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
      await update({ name: form.name, bio: form.bio, avatar: avatarUrl });
      router.push("/profile");
    } catch (err) {
      setError(err?.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loading />;
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
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 p-[2px] rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-md">
                  <div className="w-full h-full rounded-full bg-white/10 overflow-hidden grid place-items-center">
                    {form.avatar ? (
                      <img src={form.avatar} alt="avatar" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-sm text-foreground/80">N/A</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <label htmlFor="avatar-input" className="block cursor-pointer rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 bg-transparent hover:bg-white/5 transition p-4 text-center">
                  <div className="text-sm">
                    <span className="font-medium text-foreground">Click to upload</span>
                    <span className="text-foreground/70"> or drag and drop</span>
                  </div>
                  <p className="text-xs text-foreground/60">PNG, JPG up to ~5MB</p>
                  <input id="avatar-input" type="file" accept="image/*" className="sr-only" onChange={(e) => setAvatarFile(e.target.files?.[0] || null)} />
                </label>
              </div>
            </div>
          </div>
          {error && <p className="text-danger text-sm">{error}</p>}
          <button disabled={saving} className="btn btn-primary w-full disabled:opacity-60">{saving ? 'Saving...' : 'Save'}</button>
        </form>
      </div>
    </div>
  );
}


