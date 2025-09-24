"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const isActive = (href) => pathname === href || pathname?.startsWith(href + "/");
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Main Content - Full Width */}
      <main className="min-h-screen pb-20">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>

      {/* Bottom Navigation Bar - Always Visible */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-700/50 px-4 py-2 z-50 shadow-lg">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <Link
            href="/dashboard"
            className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all duration-200 min-w-0 ${
              isActive("/dashboard")
                ? "text-blue-600 dark:text-blue-400"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            <div className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all duration-300 ${
              isActive("/dashboard")
                ? "bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-blue-400/30 dark:to-purple-400/30 shadow-lg shadow-blue-500/25"
                : "bg-slate-100/50 dark:bg-slate-800/50 hover:bg-slate-200/80 dark:hover:bg-slate-700/80"
            }`}>
              <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                isActive("/dashboard")
                  ? "bg-blue-500 dark:bg-blue-400 shadow-lg shadow-blue-500/50"
                  : "bg-slate-400 dark:bg-slate-500"
              }`} />
            </div>
            <span className="text-xs font-medium truncate">Dashboard</span>
          </Link>
          
          <Link
            href="/posts/create"
            className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all duration-200 min-w-0 ${
              isActive("/posts/create")
                ? "text-blue-600 dark:text-blue-400"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            <div className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all duration-300 ${
              isActive("/posts/create")
                ? "bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-blue-400/30 dark:to-purple-400/30 shadow-lg shadow-blue-500/25"
                : "bg-slate-100/50 dark:bg-slate-800/50 hover:bg-slate-200/80 dark:hover:bg-slate-700/80"
            }`}>
              <div className="w-4 h-4 relative">
                <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-0.5 rounded-full transition-all duration-300 ${
                  isActive("/posts/create")
                    ? "bg-blue-500 dark:bg-blue-400 shadow-lg shadow-blue-500/50"
                    : "bg-slate-400 dark:bg-slate-500"
                }`} />
                <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-4 rounded-full transition-all duration-300 ${
                  isActive("/posts/create")
                    ? "bg-blue-500 dark:bg-blue-400 shadow-lg shadow-blue-500/50"
                    : "bg-slate-400 dark:bg-slate-500"
                }`} />
              </div>
            </div>
            <span className="text-xs font-medium truncate">Create</span>
          </Link>
          
          <Link
            href="/profile"
            className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all duration-200 min-w-0 ${
              isActive("/profile")
                ? "text-blue-600 dark:text-blue-400"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            <div className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all duration-300 ${
              isActive("/profile")
                ? "bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-blue-400/30 dark:to-purple-400/30 shadow-lg shadow-blue-500/25"
                : "bg-slate-100/50 dark:bg-slate-800/50 hover:bg-slate-200/80 dark:hover:bg-slate-700/80"
            }`}>
              <div className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                isActive("/profile")
                  ? "border-blue-500 dark:border-blue-400 shadow-lg shadow-blue-500/50"
                  : "border-slate-400 dark:border-slate-500"
              }`} />
            </div>
            <span className="text-xs font-medium truncate">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}