import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  ClipboardList,
  LogOut,
  Menu,
} from 'lucide-react';
import { endPoints } from '../../../routes/endPoints';

export default function Layout() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Tableau de bord', path: endPoints.Admin.DASHBOARD },
    { icon: Briefcase, label: 'Missions', path: endPoints.Admin.MISSION },
    { icon: ClipboardList, label: 'Rapports', path: endPoints.Admin.REPPORT }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-[#0a192f] text-white w-52 py-4 px-2 border-r`}
      >
        <div className="flex items-center justify-between mb-8">
          <img
            src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1"
            alt="SONABEL Logo"
            className="h-8 w-auto"
          />
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex items-center text-md space-x-1 w-full py-2 px-1 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className={`${isSidebarOpen ? 'lg:ml-52' : ''}`}>
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-2">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu className="h-6 w-6" />
            </button>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">John Doe</span>
              <button
                onClick={() => navigate('/login')}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main><Outlet /></main>

        {/* Footer */}
        <footer className="bg-white border-t mt-auto py-4 px-6">
          <p className="text-center text-sm text-gray-600">
            © {new Date().getFullYear()} SONABEL - Tous droits réservés
          </p>
        </footer>
      </div>
    </div>
  );
}