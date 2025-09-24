import { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../libs/api';
import { handleApiError } from '../libs/utils';

export function usePosts(initialParams) {
  const queryClient = useQueryClient();
  const params = initialParams || {};
  const queryKey = useMemo(() => ['posts', params], [params]);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey,
    queryFn: async () => {
      const res = await api.posts.getAll(params);
      const payload = res.data;
      if (!payload?.success) throw new Error(payload?.error || 'Failed to fetch posts');
      return payload;
    },
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  const createPost = useMutation({
    mutationFn: (payload) => api.posts.create(payload).then((r) => r.data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['posts'] }); },
    onError: (err) => { throw new Error(handleApiError(err)); },
  });

  const updatePost = useMutation({
    mutationFn: ({ id, updates }) => api.posts.update(id, updates).then((r) => r.data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['posts'] }); },
    onError: (err) => { throw new Error(handleApiError(err)); },
  });

  const deletePost = useMutation({
    mutationFn: (id) => api.posts.delete(id).then((r) => r.data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['posts'] }); },
    onError: (err) => { throw new Error(handleApiError(err)); },
  });

  const posts = data?.data || [];
  const pagination = data?.pagination || null;

  return useMemo(() => ({
    posts,
    loading: isLoading,
    error: isError ? (error?.message || 'Failed to fetch posts') : null,
    pagination,
    refetch,
    setParams: () => {},
    createPost: createPost.mutateAsync,
    updatePost: ({ id, updates }) => updatePost.mutateAsync({ id, updates }),
    deletePost: deletePost.mutateAsync,
  }), [posts, isLoading, isError, error, pagination, refetch, createPost.mutateAsync, updatePost.mutateAsync, deletePost.mutateAsync]);
}

export default usePosts;


