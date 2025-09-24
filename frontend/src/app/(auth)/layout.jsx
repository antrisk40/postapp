export default function AuthLayout({ children }) {
  return (
    <section className="min-h-screen grid place-items-center p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="w-full max-w-md bg-white/80 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-xl p-6">
        {children}
      </div>
    </section>
  );
}


