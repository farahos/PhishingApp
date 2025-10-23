// src/components/Sidebar.jsx
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, BookOpen, BarChart2, LogOut } from "lucide-react";

const Sidebar = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  // kaliya admin ayuu muujiyaa sidebar-ka
  if (!user || user.role !== "admin") return "No Access";

  const linkClasses = (path) =>
    `flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
      location.pathname === path
        ? "bg-gray-800 text-white"
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    }`;

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 py-6 font-medium text-base flex flex-col">
      {/* Apple-style Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-semibold"></span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Admin</h1>
            <p className="text-sm text-gray-500">{user.username}</p>
          </div>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 mt-6 space-y-1 px-3">
        <Link to="/admin-dashboard" className={linkClasses("/admin-dashboard")}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>

        <Link to="/allRequest" className={linkClasses("/allRequest")}>
          <BarChart2 size={20} />
          <span>All Requests</span>
        </Link>
      </nav>

      {/* Logout */}
      <div className="px-3 mt-auto">
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;