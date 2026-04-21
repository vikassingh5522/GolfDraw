import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDashboardSummary } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';

export default function Dashboard() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardSummary()
      .then((res) => setData(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-950 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Welcome back, {user?.name}</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <p className="text-gray-400 text-sm">Subscription</p>
            <p className="text-emerald-400 font-semibold text-lg capitalize">{data?.subscription?.plan || 'None'}</p>
            <p className="text-gray-500 text-xs mt-1">Renews {data?.subscription?.renewalDate ? new Date(data.subscription.renewalDate).toLocaleDateString() : 'N/A'}</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <p className="text-gray-400 text-sm">Scores</p>
            <p className="text-white font-semibold text-lg">{data?.scores?.length || 0}/5</p>
            <p className="text-gray-500 text-xs mt-1">{data?.hasEnoughScores ? 'Eligible for draws' : 'Need 5 to enter draws'}</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <p className="text-gray-400 text-sm">Total Won</p>
            <p className="text-yellow-400 font-semibold text-lg">${data?.totalWon?.toFixed(2) || '0.00'}</p>
            <p className="text-gray-500 text-xs mt-1">{data?.pendingPayouts || 0} pending payouts</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <p className="text-gray-400 text-sm">Charity</p>
            <p className="text-white font-semibold text-lg">{data?.charity?.contributionPercent || 10}%</p>
            <p className="text-gray-500 text-xs mt-1">of subscription donated</p>
          </div>
        </div>
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white">Your Scores</h2>
            <Link to="/scores" className="text-emerald-400 text-sm hover:underline">Manage Scores</Link>
          </div>
          {data?.scores?.length > 0 ? (
            <div className="flex gap-3 flex-wrap">
              {data.scores.map((s) => (
                <div key={s._id} className="bg-gray-800 rounded-lg px-4 py-3 text-center min-w-[80px]">
                  <p className="text-2xl font-bold text-emerald-400">{s.score}</p>
                  <p className="text-gray-500 text-xs">{new Date(s.date).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No scores yet. <Link to="/scores" className="text-emerald-400 hover:underline">Add scores</Link></p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/draws" className="bg-gray-900 rounded-xl p-5 border border-gray-800 hover:border-emerald-500/50 transition">
            <h3 className="text-white font-semibold">Draw Results</h3>
            <p className="text-gray-400 text-sm mt-1">View past and upcoming draws</p>
          </Link>
          <Link to="/winnings" className="bg-gray-900 rounded-xl p-5 border border-gray-800 hover:border-emerald-500/50 transition">
            <h3 className="text-white font-semibold">Winnings</h3>
            <p className="text-gray-400 text-sm mt-1">Track your prizes and payouts</p>
          </Link>
          <Link to="/charities" className="bg-gray-900 rounded-xl p-5 border border-gray-800 hover:border-emerald-500/50 transition">
            <h3 className="text-white font-semibold">Charities</h3>
            <p className="text-gray-400 text-sm mt-1">Change your charity selection</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
