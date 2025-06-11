import { Link } from "react-router-dom";
import {
  HomeIcon,
  Cog6ToothIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              EComm
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="flex items-center text-gray-700 hover:text-indigo-600"
            >
              <HomeIcon className="h-5 w-5 mr-1" />
              Home
            </Link>
            <Link
              to="/settings"
              className="flex items-center text-gray-700 hover:text-indigo-600"
            >
              <Cog6ToothIcon className="h-5 w-5 mr-1" />
              Settings
            </Link>
            <Link
              to="/contacts"
              className="flex items-center text-gray-700 hover:text-indigo-600"
            >
              <UserGroupIcon className="h-5 w-5 mr-1" />
              Contacts
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md text-sm font-medium"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
