import { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/libs/api';
import { handleApiError } from '@/libs/utils';

export function useProfile() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const res = await api.users.getProfile();
      const payload = res.data;
      if (!payload?.success) throw new Error(payload?.error || 'Failed to load profile');
      return payload?.data || null;
    },
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const update = useMutation({
    mutationFn: (updates) => api.users.updateProfile(updates).then((r) => r.data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['profile'] }); },
    onError: (err) => { throw new Error(handleApiError(err)); },
  });

  return useMemo(() => ({
    profile: data,
    loading: isLoading,
    error: isError ? (error?.message || 'Failed to load profile') : null,
    refetch,
    update: update.mutateAsync,
  }), [data, isLoading, isError, error, refetch, update.mutateAsync]);
}

export default useProfile;
