import { useState, useEffect } from 'react';
import { adminGetReports } from '../../services/api';
import AdminSidebar from '../../components/layout/AdminSidebar';

export default function AdminReports() {
  const [stats, setStats] = useState(null);

  useEffect(() => { adminGetReports().then((res) => setStats(res.data)).catch(console.error); }, []);

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-white mb-6">Reports & Analytics</h1>
        {stats ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h3 className="text-gray-400 text-sm mb-2">User Metrics</h3>
              <div className="space-y-3">
                <div className="flex justify-between"><span className="text-gray-400">Total Users</span><span className="text-white font-bold">{stats.totalUsers}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Active Subscribers</span><span className="text-emerald-400 font-bold">{stats.activeSubscribers}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Conversion Rate</span>
                  <span className="text-white font-bold">{stats.totalUsers ? ((stats.activeSubscribers / stats.totalUsers) * 100).toFixed(1) : 0}%</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h3 className="text-gray-400 text-sm mb-2">Financial Metrics</h3>
              <div className="space-y-3">
                <div className="flex justify-between"><span className="text-gray-400">Total Prize Pool</span><span className="text-yellow-400 font-bold">${stats.totalPrizePool?.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Charity Contributions</span><span className="text-emerald-400 font-bold">${stats.totalCharityContributions?.toFixed(2)}</span></div>
              </div>
            </div>
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h3 className="text-gray-400 text-sm mb-2">Draw Metrics</h3>
              <div className="space-y-3">
                <div className="flex justify-between"><span className="text-gray-400">Draws Completed</span><span className="text-white font-bold">{stats.totalDraws}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Total Winners</span><span className="text-white font-bold">{stats.totalWinners}</span></div>
              </div>
            </div>
          </div>
        ) : <p className="text-gray-400">Loading...</p>}
      </div>
    </div>
  );
}
