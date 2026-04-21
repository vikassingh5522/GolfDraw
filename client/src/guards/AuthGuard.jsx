import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function AuthGuard({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">Loading...</div>;
  const currentUser = user || JSON.parse(localStorage.getItem('user'));
  if (!currentUser) return <Navigate to="/login" replace />;
  return children;
}
