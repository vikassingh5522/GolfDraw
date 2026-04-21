import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-emerald-400">GolfDraw</Link>
          <div className="flex items-center gap-6">
            <Link to="/charities" className="text-gray-300 hover:text-white transition">Charities</Link>
            <Link to="/how-it-works" className="text-gray-300 hover:text-white transition">How It Works</Link>
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-300 hover:text-white transition">Dashboard</Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-yellow-400 hover:text-yellow-300 transition">Admin</Link>
                )}
                <button onClick={handleLogout} className="text-gray-400 hover:text-white transition">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-300 hover:text-white transition">Login</Link>
                <Link to="/register" className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
