"use client";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuthContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <Link 
            href="/" 
            className="flex items-center gap-3 font-bold text-lg group transition-all duration-200 hover:scale-105"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:shadow-blue-500/25 transition-all duration-300">
                <img 
                  src="/post-app-logo.png" 
                  alt="Post Application logo" 
                  className="w-5 h-5 object-contain filter brightness-0 invert" 
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <span className="hidden text-white text-sm font-bold">P</span>
              </div>
            </div>
            <span className="bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Post Application
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <div className="flex items-center gap-4">
                {/* Navigation Links */}
                <div className="flex items-center gap-1">
                  <Link 
                    href="/posts/create"
                    className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all duration-200 flex items-center gap-2"
                  >
                    <div className="w-4 h-4 relative">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-0.5 bg-current rounded-full" />
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-4 bg-current rounded-full" />
                    </div>
                    Create Post
                  </Link>
                  
                  <Link 
                    href="/profile"
                    className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all duration-200 flex items-center gap-2"
                  >
                    <div className="w-4 h-4 rounded-full border-2 border-current" />
                    Profile
                  </Link>
                </div>

                {/* User Avatar */}
                {user.avatar && (
                  <Link 
                    href="/profile" 
                    className="relative group"
                  >
                    <div className="w-9 h-9 rounded-full ring-2 ring-slate-200 dark:ring-slate-700 group-hover:ring-blue-500 dark:group-hover:ring-blue-400 transition-all duration-200 overflow-hidden">
                      <img 
                        src={user.avatar} 
                        alt={user.username || 'avatar'} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200" 
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
                  </Link>
                )}

                {/* Logout Button */}
                <button 
                  onClick={logout}
                  className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:text-white hover:bg-red-600 dark:hover:bg-red-500 rounded-lg border border-red-200 dark:border-red-700 hover:border-red-600 dark:hover:border-red-500 transition-all duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link 
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all duration-200"
                >
                  Sign in
                </Link>
                <Link 
                  href="/register"
                  className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-200 transform hover:scale-105"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle mobile menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`bg-slate-600 dark:bg-slate-300 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
              <span className={`bg-slate-600 dark:bg-slate-300 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`bg-slate-600 dark:bg-slate-300 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 space-y-2 border-t border-slate-200/50 dark:border-slate-700/50">
            {user ? (
              <>
                {/* User Info */}
                <div className="px-4 py-3 bg-slate-50/50 dark:bg-slate-800/50 rounded-lg mb-3">
                  <div className="flex items-center gap-3">
                    {user.avatar && (
                      <div className="w-10 h-10 rounded-full ring-2 ring-slate-200 dark:ring-slate-700 overflow-hidden">
                        <img 
                          src={user.avatar} 
                          alt={user.username || 'avatar'} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">
                        {user.username || 'User'}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {user.email || 'user@example.com'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Navigation Links */}
                <Link
                  href="/posts/create"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/80 rounded-lg transition-all duration-200"
                >
                  <div className="w-5 h-5 relative">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-0.5 bg-current rounded-full" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-5 bg-current rounded-full" />
                  </div>
                  Create Post
                </Link>

                <Link
                  href="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/80 rounded-lg transition-all duration-200"
                >
                  <div className="w-5 h-5 rounded-full border-2 border-current" />
                  Profile
                </Link>

                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-600 dark:text-red-400 hover:text-white hover:bg-red-600 dark:hover:bg-red-500 rounded-lg transition-all duration-200"
                >
                  <div className="w-5 h-5 flex items-center justify-center">
                    <div className="w-4 h-0.5 bg-current rounded-full transform rotate-45" />
                    <div className="w-4 h-0.5 bg-current rounded-full transform -rotate-45 absolute" />
                  </div>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/80 rounded-lg transition-all duration-200"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 text-center text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}