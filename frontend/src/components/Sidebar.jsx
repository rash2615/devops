import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Tableau de bord', icon: '📊' },
    { path: '/tasks', label: 'Mes tâches', icon: '✓' },
    { path: '/calendar', label: 'Calendrier', icon: '📅' },
    { path: '/team', label: 'Équipe', icon: '👥' },
    { path: '/analytics', label: 'Analytiques', icon: '' },
  ];

  return (
    <nav className="w-64 min-h-screen bg-white shadow-lg">
      <div className="p-6">
        <div className="space-y-6">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t">
          <div className="px-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase">Projets</h3>
            <div className="mt-4 space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>Site Web</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span>Application Mobile</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <span>Marketing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar; 