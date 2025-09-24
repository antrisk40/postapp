export function Card({ className = "", children }) {
  return (
    <div className={[
      "bg-white/80 dark:bg-slate-800/70 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 rounded-2xl shadow-xl",
      className,
    ].join(" ")}>{children}</div>
  );
}

export function CardHeader({ className = "", children }) {
  return (
    <div className={[
      "px-6 py-4 border-b border-slate-200/60 dark:border-slate-700/50 bg-gradient-to-r from-slate-100/60 to-slate-200/40 dark:from-slate-800/60 dark:to-slate-700/40",
      className,
    ].join(" ")}>{children}</div>
  );
}

export function CardBody({ className = "", children }) {
  return <div className={["px-6 py-5", className].join(" ")}>{children}</div>;
}

export function CardFooter({ className = "", children }) {
  return (
    <div className={[
      "px-6 py-4 border-t border-slate-200/60 dark:border-slate-700/50",
      className,
    ].join(" ")}>{children}</div>
  );
}
