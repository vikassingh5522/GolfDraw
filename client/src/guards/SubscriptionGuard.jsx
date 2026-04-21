import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function SubscriptionGuard({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (user.subscription?.status !== 'active') return <Navigate to="/subscribe" replace />;
  return children;
}
