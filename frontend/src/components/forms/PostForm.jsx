"use client";
import { useState } from 'react';
import api from '@/libs/api.js';
import { Button, Card, CardBody, CardHeader, CardFooter, Input } from '@/components/ui';

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
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Post details</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">Share your thoughts</p>
      </CardHeader>
      <CardBody>
        <form onSubmit={submit} className="space-y-5 text-foreground">
          <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Give it a catchy title" />
          <Input as="textarea" rows={6} label="Content" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your content here" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Category" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="E.g. Tech" />
            <Input label="Tags" value={tags} onChange={(e) => setTags(e.target.value)} hint="Comma separated" placeholder="react,nextjs,webdev" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Images</label>
            <label htmlFor="images-input" className="block cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 bg-white/70 dark:bg-slate-800/60 hover:bg-slate-50/80 dark:hover:bg-slate-800/80 transition p-6 text-center">
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white grid place-items-center shadow-md">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4-4a2 2 0 012 0l4 4m0 0l2-2a2 2 0 012 0l2 2M12 8v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
                <div className="text-sm">
                  <span className="font-medium text-slate-800 dark:text-slate-100">Click to upload</span>
                  <span className="text-slate-500 dark:text-slate-400"> or drag and drop</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">PNG, JPG up to ~5MB</p>
              </div>
              <input id="images-input" type="file" accept="image/*" multiple className="sr-only" onChange={handleFilesSelected} />
            </label>
            {(uploading) && <p className="text-sm text-slate-500 mt-2">Uploading...</p>}
            {!!images.length && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {images.map((url) => (
                  <div key={url} className="relative group rounded-xl overflow-hidden border border-slate-200/60 dark:border-slate-700/50 shadow-sm">
                    <img src={url} alt="uploaded" className="w-full h-28 object-cover" />
                    <button type="button" className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition" onClick={() => removeImage(url)}>Remove</button>
                  </div>
                ))}
              </div>
            )}
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <Button type="submit" disabled={loading || uploading} className="w-full mt-2">
            {loading ? 'Saving...' : (uploading ? 'Please wait for uploads...' : 'Save')}
          </Button>
        </form>
      </CardBody>
      <CardFooter className="text-xs text-slate-500 dark:text-slate-400">
        Tip: Use meaningful tags to help others find your post.
      </CardFooter>
    </Card>
  );
}


