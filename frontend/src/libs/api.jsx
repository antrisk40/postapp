import { getToken } from '../lib/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000/api';

async function request(path, { method = 'GET', body, headers = {} } = {}) {
  const token = getToken();
  const finalHeaders = {
    ...(body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...headers,
  };

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: finalHeaders,
    body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
    credentials: 'include',
  });

  let data;
  try {
    data = await res.json();
  } catch (_) {
    data = null;
  }

  if (!res.ok) {
    const message = data?.error || data?.message || 'Request failed';
    const error = new Error(message);
    error.status = res.status;
    error.data = data;
    throw error;
  }

  return { data };
}

const auth = {
  me: () => request('/auth/me'),
  login: (payload) => request('/auth/login', { method: 'POST', body: payload }),
  register: (payload) => request('/auth/register', { method: 'POST', body: payload }),
  logout: () => request('/auth/logout', { method: 'POST' }),
};

const posts = {
  getAll: (query = {}) => request(`/posts?${new URLSearchParams(query).toString()}`),
  getById: (id) => request(`/posts/${id}`),
  create: (payload) => request('/posts', { method: 'POST', body: payload }),
  update: (id, payload) => request(`/posts/${id}`, { method: 'PUT', body: payload }),
  delete: (id) => request(`/posts/${id}`, { method: 'DELETE' }),
};

const users = {
  getProfile: () => request('/users/me'),
  updateProfile: (payload) => request('/users/me', { method: 'PUT', body: payload }),
};

const upload = {
  image: (file) => {
    const form = new FormData();
    form.append('file', file);
    return request('/upload', { method: 'POST', body: form });
  },
};

const api = { auth, posts, users, upload };

export default api;

