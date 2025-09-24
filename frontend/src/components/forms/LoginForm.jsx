"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import { ROUTES } from '@/libs/constants.js';
import { z } from 'zod';
import { Button, Card, CardBody, CardHeader, Input } from '@/components/ui';

const schema = z.object({
  email: z.string().email({ message: 'Enter a valid email' }),
  password: z.string().min(6, { message: 'Password must be at least 6 chars' })
});

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuthContext();
  const [email, setEmail] = useState('');
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
      const parsed = schema.safeParse({ email, password });
      if (!parsed.success) {
        const errs = {};
        for (const issue of parsed.error.issues) {
          errs[issue.path[0]] = issue.message;
        }
        setFieldErrors(errs);
        throw new Error('Validation failed');
      }
      // For API compatibility, send email as emailOrUsername
      await login({ emailOrUsername: email, password });
      router.push(ROUTES.DASHBOARD);
    } catch (err) {
      setError(err?.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Welcome back</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Sign in to continue</p>
      </CardHeader>
      <CardBody>
        <form onSubmit={onSubmit} className="space-y-4 text-gray-900">
          <Input
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={fieldErrors.email}
            placeholder="you@example.com"
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={fieldErrors.password}
            placeholder="••••••••"
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}


