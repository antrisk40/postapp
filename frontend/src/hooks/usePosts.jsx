import { useCallback, useEffect, useMemo, useState } from 'react';
import api from '../libs/api.jsx';
import { handleApiError } from '../lib/utils.jsx';

export function usePosts(initialParams) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [params, setParams] = useState(initialParams || {});

  const fetchPosts = useCallback(async (override) => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.posts.getAll({ ...(params || {}), ...(override || {}) });
      const data = res.data;
      if (data?.success) {
        setPosts(data.data || []);
        setPagination(data.pagination || null);
      } else {
        setError(data?.error || 'Failed to fetch posts');
      }
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  }, [params]);

  const createPost = useCallback(async (payload) => {
    const res = await api.posts.create(payload);
    const data = res.data;
    if (data?.success && data?.data) {
      setPosts((prev) => [data.data, ...prev]);
      return data.data;
    }
    throw new Error(data?.error || 'Failed to create post');
  }, []);

  const updatePost = useCallback(async (id, updates) => {
    const res = await api.posts.update(id, updates);
    const data = res.data;
    if (data?.success && data?.data) {
      setPosts((prev) => prev.map((p) => (p.id === id ? data.data : p)));
      return data.data;
    }
    throw new Error(data?.error || 'Failed to update post');
  }, []);

  const deletePost = useCallback(async (id) => {
    await api.posts.delete(id);
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  return useMemo(() => ({ posts, loading, error, pagination, refetch: fetchPosts, setParams, createPost, updatePost, deletePost }), [posts, loading, error, pagination, fetchPosts, createPost, updatePost, deletePost]);
}

export default usePosts;


