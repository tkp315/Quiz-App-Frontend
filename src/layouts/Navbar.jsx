
import { NavLink } from "react-router-dom";
import Avatar from "../components/Avatar";
import { useSelector } from "react-redux";
import { TEACHER } from "../helpers/constants";
import PropType from 'prop-types'

function Navbar({ children }) {
  const { auth } = useSelector((state) => state);
  const { user, isLoggedIn,googleUser } = auth;
  const role = user.role||googleUser?.role;

  return (
    <>
      {/* Navbar Container */}
      <div className="flex flex-row items-center justify-between p-4 shadow-md bg-gradient-to-r from-white via-[#f9f7f4] to-[#ece3da] border-b-2 border-slate-200">
        {/* Logo and Search Bar */}
        <div className="flex flex-row items-center gap-6">
          {/* Logo */}
          <h1 className="text-3xl font-bold font-mono text-[#007bff] tracking-wide">
            Quizz
          </h1>

          {/* Search Bar */}
          <div className="relative">
            <input
              className="px-4 py-2 w-72 rounded-full border-2 border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#007bff] transition-all"
              type="text"
              placeholder="Search quizzes..."
            />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-row gap-8 text-lg font-medium text-slate-600">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-[#007bff] font-bold border-b-2 border-[#007bff] pb-1"
                : "hover:text-[#007bff] transition-colors duration-300"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/quizzes"
            className={({ isActive }) =>
              isActive
                ? "text-[#007bff] font-bold border-b-2 border-[#007bff] pb-1"
                : "hover:text-[#007bff] transition-colors duration-300"
            }
          >
            Quizzes
          </NavLink>
           {
            role===TEACHER ?(<NavLink
              to={`/activity/${role}`}
              className={({ isActive }) =>
                isActive
                  ? "text-[#007bff] font-bold border-b-2 border-[#007bff] pb-1"
                  : "hover:text-[#007bff] transition-colors duration-300"
              }
            >
              Activity
            </NavLink>):("")
           }
          <NavLink
            to="/report"
            className={({ isActive }) =>
              isActive
                ? "text-[#007bff] font-bold border-b-2 border-[#007bff] pb-1"
                : "hover:text-[#007bff] transition-colors duration-300"
            }
          >
            Dashboard
          </NavLink>
        </div>

        {/* User Icon or Login Button */}
        {isLoggedIn ? (
          <Avatar />
        ) : (
          <NavLink to="/login">
            <button className="btn bg-[#4797ec] text-[#333] font-semibold rounded-lg shadow-md btn-ghost">
              Login
            </button>
          </NavLink>
        )}
      </div>

      {/* Page Content */}
      {children}

      {/* Footer */}
      <footer className="mt-auto bg-[#f1f1f1] text-center py-4 text-sm text-[#666] shadow-inner">
        &copy; 2024 QuizMaster. All rights reserved.
      </footer>
    </>
  );
}

Navbar.propTypes = {
  children:PropType.node.isRequired
}

export default Navbar;
