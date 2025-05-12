import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';

const menuItems = [
  { label: 'Dashboard', icon: 'fas fa-home', path: '/dashboard' },
  {
    label: 'Vente',
    icon: 'fas fa-cart-arrow-down',
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
    icon: 'fas fa-book',
    children: [
      { label: 'Caisse', path: '/caisse' },
      { label: 'Article', path: '/article' }
    ]
  },
  { label: 'Stock', icon: 'fas fa-boxes', path: '/stock' }
];

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState({});
  const location = useLocation();

  const toggleMenu = (label) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
<aside className="w-72 min-h-screen bg-[#1F2937] text-white shadow-lg flex flex-col justify-between fixed top-0 left-0 z-50">
      {/* Logo */}
      <div className="p-6 flex items-center gap-4 border-b border-gray-700">
        <img src="/logo.jpeg" alt="Logo" className="w-12 h-12 rounded-full ring-2 ring-indigo-500" />
        <h1 className="text-xl font-semibold">Berrahal West</h1>
      </div>

      {/* User Info */}
      <div className="px-6 py-4">
        <div className="flex items-center gap-4 bg-gray-800 p-3 rounded-lg">
          <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center">
            <i className="fas fa-user text-white text-sm" />
          </div>
          <div>
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-gray-400">admin@berrahal.com</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 overflow-y-auto">
        {menuItems.map((item) => (
          <div key={item.label} className="mb-1">
            {item.children ? (
              <>
                <button
                  onClick={() => toggleMenu(item.label)}
                  className={`w-full flex items-center justify-between p-3 rounded-md hover:bg-gray-700 transition ${
                    openMenus[item.label] ? 'bg-gray-800' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <i className={`${item.icon} text-indigo-400`} />
                    <span className="text-sm">{item.label}</span>
                  </div>
                  {openMenus[item.label] ? (
                    <ChevronUp size={16} className="text-gray-400" />
                  ) : (
                    <ChevronDown size={16} className="text-gray-400" />
                  )}
                </button>
                {openMenus[item.label] && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className={`block text-sm px-3 py-1.5 rounded-md hover:bg-indigo-600 transition ${
                          isActive(child.path) ? 'bg-indigo-600 text-white' : 'text-gray-300'
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                to={item.path}
                className={`flex items-center gap-3 p-3 rounded-md hover:bg-indigo-600 transition ${
                  isActive(item.path) ? 'bg-indigo-600 text-white' : 'text-gray-300'
                }`}
              >
                <i className={`${item.icon} text-indigo-400`} />
                <span className="text-sm">{item.label}</span>
              </Link>
            )}
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-700">
        <button className="w-full flex items-center justify-center gap-2 text-red-400 hover:bg-red-500/20 p-2 rounded-md transition">
          <i className="fas fa-sign-out-alt" />
          <span className="text-sm">Déconnexion</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
