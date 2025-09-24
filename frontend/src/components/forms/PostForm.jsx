"use client";
import { useState } from 'react';
import api from '@/libs/api.js';

export default function PostForm({ onSubmit, initialValues }) {
  const [title, setTitle] = useState(initialValues?.title || '');
  const [content, setContent] = useState(initialValues?.content || '');
  const [category, setCategory] = useState(initialValues?.category || '');
  const [tags, setTags] = useState(initialValues?.tags?.join(',') || '');
  const [images, setImages] = useState(initialValues?.images || []);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFilesSelected = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    try {
      const uploaded = [];
      for (const file of files) {
        const res = await api.upload.image(file);
        const data = res.data;
        if (data?.success && data?.data?.url) {
          uploaded.push(data.data.url);
        }
      }
      setImages((prev) => [...prev, ...uploaded]);
    } catch (err) {
      setError(err?.response?.data?.error || 'Image upload failed');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const removeImage = (url) => {
    setImages((prev) => prev.filter((u) => u !== url));
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      await onSubmit({
        title,
        content,
        category,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        images
      });
    } catch (err) {
      setError(err?.response?.data?.error || 'Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-5 text-foreground">
      <div>
        <label className="block text-sm font-medium text-foreground/90">Title</label>
        <input className="mt-1 w-full rounded-md p-2.5 bg-[#0f1629] border border-[var(--border)] text-foreground placeholder-[#7f8aa3]" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground/90">Content</label>
        <textarea className="mt-1 w-full rounded-md p-2.5 bg-[#0f1629] border border-[var(--border)] text-foreground placeholder-[#7f8aa3]" rows={6} value={content} onChange={(e) => setContent(e.target.value)} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground/90">Category</label>
          <input className="mt-1 w-full rounded-md p-2.5 bg-[#0f1629] border border-[var(--border)] text-foreground placeholder-[#7f8aa3]" value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground/90">Tags (comma separated)</label>
          <input className="mt-1 w-full rounded-md p-2.5 bg-[#0f1629] border border-[var(--border)] text-foreground placeholder-[#7f8aa3]" value={tags} onChange={(e) => setTags(e.target.value)} />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground/90">Images</label>
        <input type="file" accept="image/*" multiple className="mt-1 w-full file:mr-4 file:rounded file:border-0 file:bg-[var(--primary)] file:text-[var(--primary-foreground)] file:px-3 file:py-1.5" onChange={handleFilesSelected} />
        {(uploading) && <p className="text-sm text-muted mt-1">Uploading...</p>}
        {!!images.length && (
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {images.map((url) => (
              <div key={url} className="relative group">
                <img src={url} alt="uploaded" className="w-full h-28 object-cover rounded-md border border-[var(--border)]" />
                <button type="button" className="absolute top-1 right-1 bg-red-500/90 text-white text-xs px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition" onClick={() => removeImage(url)}>Remove</button>
              </div>
            ))}
          </div>
        )}
      </div>
      {error && <p className="text-danger text-sm">{error}</p>}
      <button type="submit" disabled={loading || uploading} className="btn btn-primary w-full mt-2 disabled:opacity-60">
        {loading ? 'Saving...' : (uploading ? 'Please wait for uploads...' : 'Save')}
      </button>
    </form>
  );
}


