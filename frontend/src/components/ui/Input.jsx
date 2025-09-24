"use client";

export default function Input({
  label,
  error,
  hint,
  as = "input",
  className = "",
  ...props
}) {
  const Field = as;
  const base = "mt-1 w-full rounded-xl px-3 py-2.5 bg-white/70 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700/50 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/60 transition";
  const cls = [base, error ? "border-red-400 focus:ring-red-500/40 focus:border-red-500/60" : "", className].join(" ");
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <Field className={cls} {...props} />
      {error ? (
        <p className="text-xs text-red-600 mt-1">{error}</p>
      ) : hint ? (
        <p className="text-xs text-slate-500 mt-1">{hint}</p>
      ) : null}
    </div>
  );
}
