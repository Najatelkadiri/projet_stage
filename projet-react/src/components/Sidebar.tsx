import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronUp, LogOut, User } from 'lucide-react';

const menuItems = [
  { label: 'Dashboard', icon: 'fas fa-chart-pie', path: '/dashboard' },
  {
    label: 'Vente',
    icon: 'fas fa-shopping-bag',
    children: [
      { label: 'Vente', path: '/vente' },
      { label: 'Avance Détail', path: '/avance-detail' }
    ]
  },
  {
    label: 'Achat',
    icon: 'fas fa-hand-holding-usd',
    children: [
      { label: 'Devis', path: '/devis' },
      { label: 'Bon de Commande', path: '/achat/bon-commande' },
    ]
  },
  {
    label: 'Livre de Caisse',
    icon: 'fas fa-book-open',
    children: [
      { label: 'Caisse', path: '/caisse' },
      { label: 'Article', path: '/article' }
    ]
  },
];

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState({});
  const location = useLocation();

  const toggleMenu = (label) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <aside className="w-72 min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-2xl flex flex-col justify-between fixed top-0 left-0 z-50 border-r border-gray-700">
      {/* Logo */}
      <div className="p-6 flex items-center gap-4 border-b border-gray-700">
        <div className="relative">
          <img 
            src="/logo.jpeg" 
            alt="Logo" 
            className="w-12 h-12 rounded-full ring-2 ring-indigo-500 ring-opacity-50 shadow-lg" 
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full border-2 border-gray-900"></div>
        </div>
        <div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-400">
            Berrahal West
          </h1>
          <p className="text-xs text-gray-400">Gestion Commerciale</p>
        </div>
      </div>

      {/* User Info */}
      <div className="px-6 py-4">
        <div className="flex items-center gap-4 bg-gray-800/50 p-3 rounded-xl backdrop-blur-sm border border-gray-700 shadow-lg">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
              <User size={18} className="text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
          </div>
          <div>
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-gray-400">admin@berrahal.com</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 overflow-y-auto py-4">
        {menuItems.map((item) => (
          <div key={item.label} className="mb-2">
            {item.children ? (
              <>
                <button
                  onClick={() => toggleMenu(item.label)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
                    openMenus[item.label] 
                      ? 'bg-gray-800/50 backdrop-blur-sm shadow-inner' 
                      : 'hover:bg-gray-800/30 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <i className={`${item.icon} text-indigo-400 text-lg w-5 text-center`} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  {openMenus[item.label] ? (
                    <ChevronUp size={16} className="text-gray-400 transition-transform" />
                  ) : (
                    <ChevronDown size={16} className="text-gray-400 transition-transform" />
                  )}
                </button>
                {openMenus[item.label] && (
                  <div className="ml-8 mt-2 space-y-2 pl-2 border-l-2 border-gray-700/50">
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className={`block text-sm px-3 py-2 rounded-lg transition-all ${
                          isActive(child.path) 
                            ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-white shadow-md border-l-2 border-indigo-400'
                            : 'text-gray-300 hover:bg-gray-700/50 hover:pl-4'
                        }`}
                      >
                        <span className="relative">
                          {child.label}
                          {isActive(child.path) && (
                            <span className="absolute left-0 -ml-2 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-indigo-400 rounded-full"></span>
                          )}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                to={item.path}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                  isActive(item.path)
                    ? 'bg-gradient-to-r from-indigo-500/30 to-purple-500/30 text-white shadow-inner'
                    : 'hover:bg-gray-800/30 hover:shadow-md text-gray-300'
                }`}
              >
                <i className={`${item.icon} text-indigo-400 text-lg w-5 text-center`} />
                <span className="text-sm font-medium">{item.label}</span>
                {isActive(item.path) && (
                  <div className="ml-auto w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
                )}
              </Link>
            )}
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-700/50">
        <button className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-900/50 hover:from-red-500/20 hover:to-red-600/20 text-red-400 hover:text-red-300 transition-all duration-300 shadow hover:shadow-red-500/10 border border-gray-700/50 hover:border-red-500/30">
          <LogOut size={16} className="transition-transform group-hover:translate-x-1" />
          <span className="text-sm font-medium">Déconnexion</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;