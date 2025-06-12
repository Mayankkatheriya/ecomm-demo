import { Link } from "react-router-dom";
import {
  HomeIcon,
  Cog6ToothIcon,
  UserGroupIcon,
  UserCircleIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { setUser } from "../store/slices/userSlice";

const Header = () => {
  const { userDetails } = useSelector((state) => state.user);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const dispatch = useDispatch();

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setMenuOpen(false);
    dispatch(setUser(null));
  };

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

          {/* Auth/Profile Section */}
          <div className="relative flex items-center space-x-4">
            {userDetails ? (
              <div
                className="flex items-center cursor-pointer"
                onClick={() => setMenuOpen((prev) => !prev)}
                ref={menuRef}
              >
                <UserCircleIcon className="h-8 w-8 text-indigo-600 mr-2" />
                <span className="text-gray-700 font-medium">
                  {userDetails.name || "User"}
                </span>
                {/* Dropdown Menu */}
                {menuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-40 bg-white border rounded shadow-lg z-50">
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setMenuOpen(false)}
                    >
                      <UserCircleIcon className="h-5 w-5 text-indigo-600" />
                      Profile
                    </Link>
                    <button
                      className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      <ArrowRightEndOnRectangleIcon className="h-5 w-5 text-indigo-600" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
