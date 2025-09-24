import axios from 'axios';
import { getToken } from './auth.js';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5000/api/v1';

const client = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const data = error?.response?.data;
    const message = data?.error || data?.message || error.message || 'Request failed';
    const wrapped = new Error(message);
    wrapped.status = status;
    wrapped.data = data;
    return Promise.reject(wrapped);
  }
);

const unwrap = (promise) => promise.then((res) => ({ data: res.data ?? null }));

const auth = {
  me: () => unwrap(client.get('/auth/me')),
  login: (payload) => unwrap(client.post('/auth/login', payload)),
  register: (payload) => unwrap(client.post('/auth/register', payload)),
  logout: () => unwrap(client.post('/auth/logout')),
};

const posts = {
  getAll: (query = {}) => unwrap(client.get(`/posts`, { params: query })),
  getById: (id) => unwrap(client.get(`/posts/${id}`)),
  create: (payload) => unwrap(client.post('/posts', payload)),
  update: (id, payload) => unwrap(client.put(`/posts/${id}`, payload)),
  delete: (id) => unwrap(client.delete(`/posts/${id}`)),
};

const users = {
  getProfile: () => unwrap(client.get('/users/profile')),
  updateProfile: (payload) => unwrap(client.put('/users/profile', payload)),
};

const upload = {
  image: (file) => {
    const form = new FormData();
    form.append('file', file);
    return unwrap(client.post('/upload', form, { headers: {} }));
  },
};

const api = { auth, posts, users, upload };

export default api;

