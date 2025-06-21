import { Link, useNavigate } from "react-router-dom";
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
import { fetchCartData } from "../store/slices/cartSlice";

const Header = () => {
  const { userDetails } = useSelector((state) => state.user);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const { cartData } = useSelector((store) => store.cart);
  const navigate = useNavigate();

  console.log(cartData);

  useEffect(() => {
    if (!cartData.length) {
      dispatch(fetchCartData());
    }
  }, []);

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
    // cal logout API
    dispatch(setUser(null));
    localStorage.removeItem("token");
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
            <div className="relative w-fit" onClick={() => navigate("/cart")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-gray-800"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 
         1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 
         1.125 0 0 1-1.12-1.243l1.264-12A1.125 
         1.125 0 0 1 5.513 7.5h12.974c.576 
         0 1.059.435 1.119 1.007ZM8.625 
         10.5a.375.375 0 1 1-.75 0 .375.375 
         0 0 1 .75 0Zm7.5 0a.375.375 0 1 
         1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>

              {cartData.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-semibold rounded-full px-1.5 py-0.5">
                  {cartData.length}
                </span>
              )}
            </div>

            {userDetails ? (
              <div
                className="flex items-center cursor-pointer"
                onClick={() => setMenuOpen((prev) => !prev)}
                ref={menuRef}
              >
                <UserCircleIcon className="h-8 w-8 text-indigo-600 mr-2" />
                <span className="text-gray-700 font-medium">
                  {userDetails.firstName || "User"}
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
