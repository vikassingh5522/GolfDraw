import { useState, useEffect } from 'react';
import { adminGetReports } from '../../services/api';
import AdminSidebar from '../../components/layout/AdminSidebar';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminGetReports()
      .then((res) => setStats(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-white mb-6">Admin Dashboard</h1>
        {loading ? <p className="text-gray-400">Loading...</p> : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
              <p className="text-gray-400 text-sm">Total Users</p>
              <p className="text-3xl font-bold text-white">{stats?.totalUsers || 0}</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
              <p className="text-gray-400 text-sm">Active Subscribers</p>
              <p className="text-3xl font-bold text-emerald-400">{stats?.activeSubscribers || 0}</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
              <p className="text-gray-400 text-sm">Total Prize Pool</p>
              <p className="text-3xl font-bold text-yellow-400">${stats?.totalPrizePool?.toFixed(2) || '0.00'}</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
              <p className="text-gray-400 text-sm">Charity Contributions</p>
              <p className="text-3xl font-bold text-emerald-400">${stats?.totalCharityContributions?.toFixed(2) || '0.00'}</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
              <p className="text-gray-400 text-sm">Draws Completed</p>
              <p className="text-3xl font-bold text-white">{stats?.totalDraws || 0}</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
              <p className="text-gray-400 text-sm">Total Winners</p>
              <p className="text-3xl font-bold text-white">{stats?.totalWinners || 0}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
