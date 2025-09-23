"use client";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    // console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] grid place-items-center p-6">
      <div className="max-w-md w-full text-center space-y-4">
        <h1 className="text-2xl font-semibold">Something went wrong</h1>
        {error?.message && (
          <p className="text-sm text-gray-600 break-words">{String(error.message)}</p>
        )}
        <div className="flex items-center justify-center gap-3">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => reset?.()}
          >
            Try again
          </button>
          <button
            className="border px-4 py-2 rounded"
            onClick={() => (window.location.href = "/")}
          >
            Go home
          </button>
        </div>
      </div>
    </div>
  );
}


