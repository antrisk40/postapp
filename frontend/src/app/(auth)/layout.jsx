export default function AuthLayout({ children }) {
  return (
    <section className="min-h-screen grid place-items-center p-6">
      <div className="w-full max-w-md bg-white rounded shadow p-6">
        {children}
      </div>
    </section>
  );
}


