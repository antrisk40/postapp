"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import { ROUTES } from "@/lib/constants";
import api from "@/lib/api";
import { z } from "zod";

const schema = z.object({
  email: z.string().email({ message: "Enter a valid email" }),
  username: z.string().min(3, { message: "Username must be at least 3 chars" }).max(30),
  name: z.string().max(100).optional(),
  password: z.string().min(6, { message: "Password must be at least 6 chars" }).max(100),
});

export default function RegisterForm() {
  const router = useRouter();
  const { register } = useAuthContext();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      setFieldErrors({});
      const parsed = schema.safeParse({ email, username, name, password });
      if (!parsed.success) {
        const errs = {};
        for (const issue of parsed.error.issues) {
          errs[issue.path[0]] = issue.message;
        }
        setFieldErrors(errs);
        throw new Error("Validation failed");
      }
      // First register to obtain token
      await register({ email, username, password, name });
      // If avatar selected, upload after auth and update profile
      if (avatar) {
        try {
          setUploading(true);
          const res = await api.upload.image(avatar);
          const data = res.data;
          if (data?.success && data?.data?.url) {
            await api.users.updateProfile({ avatar: data.data.url });
          }
        } catch (_) {
          // ignore avatar upload failure during registration
        } finally {
          setUploading(false);
        }
      }
      router.push(ROUTES.DASHBOARD);
    } catch (err) {
      setError(err?.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 text-gray-900">
      <div>
        <label className="block text-sm font-medium text-gray-900">Email</label>
        <input className="mt-1 w-full border rounded p-2 text-gray-900 placeholder-gray-500" value={email} onChange={(e) => setEmail(e.target.value)} />
        {fieldErrors.email && <p className="text-red-600 text-xs mt-1">{fieldErrors.email}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-900">Username</label>
        <input className="mt-1 w-full border rounded p-2 text-gray-900 placeholder-gray-500" value={username} onChange={(e) => setUsername(e.target.value)} />
        {fieldErrors.username && <p className="text-red-600 text-xs mt-1">{fieldErrors.username}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-900">Name</label>
        <input className="mt-1 w-full border rounded p-2 text-gray-900 placeholder-gray-500" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-900">Password</label>
        <input type="password" className="mt-1 w-full border rounded p-2 text-gray-900 placeholder-gray-500" value={password} onChange={(e) => setPassword(e.target.value)} />
        {fieldErrors.password && <p className="text-red-600 text-xs mt-1">{fieldErrors.password}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-900">Avatar</label>
        <input type="file" accept="image/*" className="mt-1 w-full" onChange={(e) => setAvatar(e.target.files?.[0] || null)} />
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <button type="submit" disabled={loading || uploading} className="btn btn-primary w-full">
        {loading ? "Creating..." : (uploading ? "Uploading avatar..." : "Create account")}
      </button>
    </form>
  );
}


