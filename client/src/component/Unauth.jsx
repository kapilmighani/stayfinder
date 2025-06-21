import { Link } from "react-router-dom";

function Unauthorized() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p className="text-lg text-gray-700 mb-6">
          You are not authorized to view this page.
        </p>
        <Link
          to="/"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default Unauthorized;
