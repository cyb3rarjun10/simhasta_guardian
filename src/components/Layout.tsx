import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home, MessageSquare, Shield, Heart, Settings, AlertTriangle } from 'lucide-react';

const Layout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isAdmin = location.pathname.startsWith('/admin');
  
  const mainNavItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: AlertTriangle, label: 'Report', path: '/report' },
    { icon: Shield, label: 'Emergency', path: '/emergency' },
    { icon: Heart, label: 'Seva', path: '/seva' },
    { icon: MessageSquare, label: 'Chat', path: '/chat' }
  ];
  
  if (isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-orange-600 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Settings className="w-6 h-6" />
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
            </div>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-orange-700 rounded-lg hover:bg-orange-800 transition-colors"
            >
              Back to App
            </button>
          </div>
        </header>
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-orange-600 font-bold text-lg">🚩</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Simhastha Guardian</h1>
              <p className="text-sm opacity-90">सिंहस्थ गार्जियन</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/admin')}
            className="p-2 bg-orange-700 rounded-lg hover:bg-orange-800 transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                  isActive 
                    ? 'text-orange-600 bg-orange-50' 
                    : 'text-gray-600 hover:text-orange-600'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Layout;