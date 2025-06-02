import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Home from './pages/Home';
import Calendar from './pages/Calendar';
import Team from './pages/Team';
import Analytics from './pages/Analytics';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <div className="min-h-screen bg-gray-50">
                  <Header />
                  <div className="flex">
                    <Sidebar />
                    <main className="flex-1 p-8">
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/calendar" element={<Calendar />} />
                        <Route path="/team" element={<Team />} />
                        <Route path="/analytics" element={<Analytics />} />
                      </Routes>
                    </main>
                  </div>
                </div>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App; 