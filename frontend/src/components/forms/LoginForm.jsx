"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '../../context/AuthContext';
import { ROUTES } from '../../lib/constants';
import { z } from 'zod';

const schema = z.object({
  emailOrUsername: z.string().min(3, { message: 'Enter email or username' }),
  password: z.string().min(6, { message: 'Password must be at least 6 chars' })
});

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuthContext();
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      setFieldErrors({});
      const parsed = schema.safeParse({ emailOrUsername, password });
      if (!parsed.success) {
        const errs = {};
        for (const issue of parsed.error.issues) {
          errs[issue.path[0]] = issue.message;
        }
        setFieldErrors(errs);
        throw new Error('Validation failed');
      }
      await login({ emailOrUsername, password });
      router.push(ROUTES.DASHBOARD);
    } catch (err) {
      setError(err?.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 text-gray-900">
      <div>
        <label className="block text-sm font-medium text-gray-900">Email or Username</label>
        <input className="mt-1 w-full border rounded p-2 text-gray-900 placeholder-gray-500" value={emailOrUsername} onChange={(e) => setEmailOrUsername(e.target.value)} />
        {fieldErrors.emailOrUsername && <p className="text-red-600 text-xs mt-1">{fieldErrors.emailOrUsername}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-900">Password</label>
        <input type="password" className="mt-1 w-full border rounded p-2 text-gray-900 placeholder-gray-500" value={password} onChange={(e) => setPassword(e.target.value)} />
        {fieldErrors.password && <p className="text-red-600 text-xs mt-1">{fieldErrors.password}</p>}
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <button type="submit" disabled={loading} className="btn btn-primary w-full">
        {loading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
}


