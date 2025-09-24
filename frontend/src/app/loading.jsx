"use client";
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-8 h-8 border-3 border-gray-300 dark:border-gray-600 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
  );
}