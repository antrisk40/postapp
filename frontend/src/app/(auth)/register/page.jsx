import RegisterForm from "@/components/forms/RegisterForm";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Create your account</h1>
      <RegisterForm />
      <p className="mt-4 text-sm text-center">
        Already have an account? <Link className="text-blue-600" href="/(auth)/login">Sign in</Link>
      </p>
    </div>
  );
}


