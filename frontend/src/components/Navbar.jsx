import { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  // React Router hooks
  const navigate = useNavigate();
  const location = useLocation();

  // Handle user logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Apply active styling to current route
  const navLinkClass = (path) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition ${location.pathname === path
      ? "bg-slate-100 text-slate-900"
      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
    }`;

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left Section - Logo & Navigation Links */}
        <div className="flex items-center gap-8">
          {/* Application Logo */}
          <Link
            to="/"
            className="text-xl font-bold tracking-tight text-slate-900"
          >
            Avidus Tasks
          </Link>

          {/* Navigation Links (Visible only when logged in) */}
          {user && (
            <div className="flex items-center gap-2">
              <Link to="/my-tasks" className={navLinkClass("/my-tasks")}>
                My Tasks
              </Link>

              {/* Admin-only Dashboard Link */}
              {user.role === "Admin" && (
                <Link
                  to="/admin/dashboard"
                  className={navLinkClass("/admin/dashboard")}
                >
                  Dashboard
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Right Section - User Profile & Logout */}
        {user && (
          <div className="flex items-center gap-4">
            {/* User Information Card */}
            <div className="hidden sm:flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">
              {/* User Avatar (First Letter of Name) */}
              <div className="h-8 w-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-semibold">
                {user.name?.charAt(0).toUpperCase()}
              </div>

              {/* User Details */}
              <div className="text-sm">
                <p className="font-medium text-slate-900 leading-none">
                  {user.name}
                </p>
                <p className="text-slate-500 text-xs mt-1">{user.role}</p>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-100 transition cursor-pointer"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
