export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-black text-black mb-4">404</h1>
        <p className="text-xl text-gray-600">Page not found</p>
        <a href="/" className="inline-block mt-8 px-6 py-3 bg-black text-white font-bold">
          Go Home
        </a>
      </div>
    </div>
  );
}
