"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import { ROUTES } from "@/libs/constants.js";
import api from "@/libs/api.js";
import { z } from "zod";
import { Button, Card, CardBody, CardHeader, Input } from "@/components/ui";

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
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Create your account</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Join Post Application</p>
      </CardHeader>
      <CardBody>
        <form onSubmit={onSubmit} className="space-y-4 text-gray-900">
          <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} error={fieldErrors.email} placeholder="you@example.com" />
          <Input label="Username" value={username} onChange={(e) => setUsername(e.target.value)} error={fieldErrors.username} placeholder="cooluser" />
          <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name (optional)" />
          <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} error={fieldErrors.password} placeholder="••••••••" />
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Avatar</label>
            <label htmlFor="reg-avatar-input" className="block cursor-pointer rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 bg-transparent hover:bg-white/5 transition p-4 text-center">
              <div className="text-sm">
                <span className="font-medium text-foreground">Click to upload</span>
                <span className="text-foreground/70"> or drag and drop</span>
              </div>
              <p className="text-xs text-foreground/60">PNG, JPG up to ~5MB</p>
              <input id="reg-avatar-input" type="file" accept="image/*" className="sr-only" onChange={(e) => setAvatar(e.target.files?.[0] || null)} />
            </label>
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <Button type="submit" disabled={loading || uploading} className="w-full">
            {loading ? "Creating..." : (uploading ? "Uploading avatar..." : "Create account")}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}


