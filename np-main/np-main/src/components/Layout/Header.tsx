import React, { useState } from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  onToggleSidebar?: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  const { user } = useAuth();
  const [notifications] = useState(3);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="h-5 w-5" />
          </button>
          
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search achievements, students, or documents..."
              className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 hover:bg-gray-100 rounded-lg">
            <Bell className="h-5 w-5 text-gray-600" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>

          <div className="flex items-center space-x-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900">{user?.full_name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
            <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center">
              <span className="text-white font-medium text-sm">
                {user?.full_name?.charAt(0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}