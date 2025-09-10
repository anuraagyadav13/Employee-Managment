import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaTasks, FaUsers, FaChartBar, FaCog } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen fixed left-0 top-0 pt-16">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-6 px-4">Admin Panel</h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive ? 'bg-emerald-700' : 'hover:bg-gray-700'
                  }`
                }
              >
                <FaHome className="mr-3" />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/tasks"
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive ? 'bg-emerald-700' : 'hover:bg-gray-700'
                  }`
                }
              >
                <FaTasks className="mr-3" />
                Tasks
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/employees"
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive ? 'bg-emerald-700' : 'hover:bg-gray-700'
                  }`
                }
              >
                <FaUsers className="mr-3" />
                Employees
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/analytics"
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive ? 'bg-emerald-700' : 'hover:bg-gray-700'
                  }`
                }
              >
                <FaChartBar className="mr-3" />
                Analytics
              </NavLink>
            </li>
            <li className="border-t border-gray-700 mt-4 pt-4">
              <NavLink
                to="/admin/settings"
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive ? 'bg-emerald-700' : 'hover:bg-gray-700'
                  }`
                }
              >
                <FaCog className="mr-3" />
                Settings
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
