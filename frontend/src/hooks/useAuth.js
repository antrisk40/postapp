import { useCallback, useEffect, useMemo, useState } from 'react';
import api from '../libs/api';
import { getToken, setToken, removeToken } from '../libs/auth';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMe = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      if (!getToken()) {
        setUser(null);
        setLoading(false);
        return;
      }
      const res = await api.auth.me();
      setUser(res.data?.data || null);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (credentials) => {
    const res = await api.auth.login(credentials);
    const { token, user: u } = res.data?.data || {};
    if (token) setToken(token);
    setUser(u || null);
    return u;
  }, []);

  const register = useCallback(async (payload) => {
    const res = await api.auth.register(payload);
    const { token, user: u } = res.data?.data || {};
    if (token) setToken(token);
    setUser(u || null);
    return u;
  }, []);

  const logout = useCallback(async () => {
    try { await api.auth.logout(); } catch (_) {}
    removeToken();
    setUser(null);
  }, []);

  useEffect(() => { fetchMe(); }, [fetchMe]);

  return useMemo(() => ({ user, loading, error, login, register, logout, refresh: fetchMe }), [user, loading, error, login, register, logout, fetchMe]);
}

export default useAuth;


