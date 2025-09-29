import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LayoutDashboard, Trophy, FileText, Users, MessageSquare, Settings, ChartBar as BarChart3, SquareCheck as CheckSquare, GraduationCap, LogOut } from 'lucide-react';

const studentNavItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/achievements', icon: Trophy, label: 'Achievements' },
  { to: '/transcripts', icon: FileText, label: 'Transcripts' },
  { to: '/mentorship', icon: Users, label: 'Mentorship' },
  { to: '/chat', icon: MessageSquare, label: 'AI Counselor' },
  { to: '/profile', icon: Settings, label: 'Profile' },
];

const facultyNavItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/verifications', icon: CheckSquare, label: 'Verifications' },
  { to: '/students', icon: GraduationCap, label: 'Students' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
];

const adminNavItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/users', icon: Users, label: 'Users' },
  { to: '/verifications', icon: CheckSquare, label: 'Verifications' },
  { to: '/reports', icon: FileText, label: 'Reports' },
];

export default function Sidebar() {
  const { user, signOut } = useAuth();

  const getNavItems = () => {
    switch (user?.role) {
      case 'student':
        return studentNavItems;
      case 'faculty':
        return facultyNavItems;
      case 'admin':
        return adminNavItems;
      default:
        return [];
    }
  };

  return (
    <div className="w-64 bg-white h-full shadow-lg flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 rounded-lg p-2">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">AchieveHub</h1>
            <p className="text-sm text-gray-500 capitalize">{user?.role} Portal</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {getNavItems().map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center">
            <span className="text-gray-700 font-medium">
              {user?.full_name?.charAt(0)}
            </span>
          </div>
          <div>
            <p className="font-medium text-gray-900">{user?.full_name}</p>
            <p className="text-sm text-gray-500">{user?.department}</p>
          </div>
        </div>
        <button
          onClick={signOut}
          className="flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg w-full transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}