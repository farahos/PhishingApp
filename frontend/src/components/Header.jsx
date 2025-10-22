// src/components/Header.jsx
import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);

  // Close mobile menu when clicking outside or on link
  useEffect(() => {
    const handleClickOutside = () => {
      setIsMobileMenuOpen(false);
    };

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className="bg-white border-b border-gray-200 text-gray-900 p-4 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        {/* Apple Style Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-semibold"></span>
          </div>
          <h1 className="text-xl font-semibold tracking-tight hover:opacity-80 transition-opacity duration-300 cursor-pointer">
          Apple Rewards
          </h1>
        </div>

        {/* Desktop Navigation - Hidden on mobile */}
        <ul className="hidden md:flex space-x-8 items-center">
          {user ? (
            <>
              <li>
                <Link
                  to="/Home"
                  className="relative group px-3 py-2 font-medium text-gray-700 hover:text-black transition-colors duration-300 text-sm"
                >
                  Home
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black transition-all group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link
                  to="/Books"
                  className="relative group px-3 py-2 font-medium text-gray-700 hover:text-black transition-colors duration-300 text-sm"
                >
                  Books
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black transition-all group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link
                  to="/Booked"
                  className="relative group px-3 py-2 font-medium text-gray-700 hover:text-black transition-colors duration-300 text-sm"
                >
                  My Books
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black transition-all group-hover:w-full"></span>
                </Link>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-sm text-gray-600 hidden lg:block">Welcome, {user.name}</span>
                <button
                  onClick={() => logout()}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-all duration-300 border border-gray-300 text-sm"
                >
                  Log Out
                </button>
              </li>
            </>
          ) : (
            <>
              {/* <li>
                <Link
                  to="/Home"
                  className="relative group px-3 py-2 font-medium text-gray-700 hover:text-black transition-colors duration-300 text-sm"
                >
                  Home
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black transition-all group-hover:w-full"></span>
                </Link>
              </li> */}
              <li className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-black transition-colors duration-300 font-medium text-sm"
                >
                 Home
                </Link>
                <Link
                  to="/Register"
                  className="bg-black text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 text-sm"
                >
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Menu Button - Visible only on mobile */}
        <div className="flex items-center space-x-3 md:hidden">
          {user && (
            <span className="text-sm text-gray-600">Hi, {user.name.split(' ')[0]}</span>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-all duration-300"
          >
            <div className="flex flex-col space-y-1">
              <div className="w-4 h-0.5 bg-gray-700"></div>
              <div className="w-4 h-0.5 bg-gray-700"></div>
              <div className="w-4 h-0.5 bg-gray-700"></div>
            </div>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div 
            className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg md:hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-3 space-y-3">
              {user ? (
                <>
                  <Link
                    to="/Home"
                    className="block py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-300 font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    📖 Home
                  </Link>
                  <Link
                    to="/Books"
                    className="block py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-300 font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    📚 Books
                  </Link>
                  <Link
                    to="/Booked"
                    className="block py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-300 font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    🎯 My Books
                  </Link>
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <button
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-medium transition-all duration-300 border border-gray-300 text-sm flex items-center justify-center"
                    >
                      🔓 Log Out
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* <Link
                    to="/Home"
                    className="block py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-300 font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                     Home
                  </Link> */}
                  <Link
                    to="/login"
                    className="block py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-300 font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                     🏠 Home
                  </Link>
                  <Link
                    to="/Register"
                    className="block py-2 px-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    🔑 Login
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;