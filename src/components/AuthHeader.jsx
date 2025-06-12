import { Link, useLocation } from "react-router-dom";

const AuthHeader = () => {
  const location = useLocation();
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              EComm
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {location.pathname !== "/login" && (
              <Link
                to="/login"
                className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
            )}
            {location.pathname !== "/signup" && (
              <Link
                to="/signup"
                className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md text-sm font-medium"
              >
                Sign Up
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AuthHeader;
