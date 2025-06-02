import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="glass-effect sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              TaskFlow
            </h1>
            <span className="text-sm text-gray-500">Organisez vos tâches efficacement</span>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm text-gray-600">
                  Bienvenue, {user.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-800"
                >
                  Se déconnecter
                </button>
              </>
            ) : (
              <>
                <button className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-800">
                  Connexion
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors">
                  S'inscrire
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header; 