import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutGrid, CheckSquare, Users, Settings, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { path: '/', label: 'Dashboard', icon: LayoutGrid },
    { path: '/tasks', label: 'Tasks', icon: CheckSquare },
    { path: '/team', label: 'Team', icon: Users },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6 text-gray-600" />
        ) : (
          <Menu className="w-6 h-6 text-gray-600" />
        )}
      </button>

      {/* Backdrop for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static',
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center space-x-2 mb-8">
            <LayoutGrid className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-bold">ProjectHub</span>
          </div>

          <nav className="space-y-2 flex-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-150',
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto pt-6 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <Users className="w-4 h-4 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">John Doe</p>
                <p className="text-xs text-gray-500">Project Manager</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8 lg:ml-0 ml-0">
        <div className="max-w-7xl mx-auto">
          {/* Top spacing for mobile to prevent content from hiding under the menu button */}
          <div className="h-16 lg:h-0" />
          {children}
        </div>
      </main>
    </div>
  );
}