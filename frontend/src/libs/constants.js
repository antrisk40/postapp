export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1';

export const STORAGE_KEYS = {
  TOKEN: 'postapp_token'
};

export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  POSTS: '/posts',
  POST_CREATE: '/posts/create',
  PROFILE: '/profile'
};


