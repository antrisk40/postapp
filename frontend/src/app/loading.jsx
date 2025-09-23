export default function Loading() {
  return (
    <div className="min-h-screen grid place-items-center">
      <div className="flex items-center gap-3 text-gray-600">
        <span className="inline-block h-5 w-5 rounded-full border-2 border-gray-300 border-t-gray-600 animate-spin" />
        <span>Loading...</span>
      </div>
    </div>
  );
}


