"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl font-black text-black mb-4">Error</h1>
            <p className="text-xl text-gray-600 mb-8">Something went wrong</p>
            <button
              onClick={reset}
              className="inline-block px-6 py-3 bg-black text-white font-bold"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
