import { useState, useEffect } from 'react';
import { getWinnings } from '../../services/api';

export default function Winnings() {
  const [winnings, setWinnings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getWinnings()
      .then((res) => setWinnings(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">Loading...</div>;

  const totalWon = winnings.filter((w) => w.verification?.status === 'approved').reduce((sum, w) => sum + w.prizeAmount, 0);

  return (
    <div className="min-h-screen bg-gray-950 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Your Winnings</h1>
          <div className="text-right">
            <p className="text-gray-400 text-sm">Total Won</p>
            <p className="text-2xl font-bold text-yellow-400">${totalWon.toFixed(2)}</p>
          </div>
        </div>
        <div className="space-y-3">
          {winnings.map((w) => (
            <div key={w._id} className="bg-gray-900 rounded-xl p-5 border border-gray-800">
              <div className="flex justify-between items-start">
                <div>
                  <span className={`text-sm font-medium px-2 py-1 rounded ${
                    w.matchType === '5-match' ? 'bg-yellow-500/20 text-yellow-400' :
                    w.matchType === '4-match' ? 'bg-emerald-500/20 text-emerald-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>{w.matchType}</span>
                  <p className="text-white font-semibold mt-2">${w.prizeAmount.toFixed(2)}</p>
                  <p className="text-gray-500 text-sm">{w.drawId?.month}/{w.drawId?.year} — Matched: [{w.matchedNumbers?.join(', ')}]</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm ${
                    w.verification?.status === 'approved' ? 'text-emerald-400' :
                    w.verification?.status === 'rejected' ? 'text-red-400' : 'text-yellow-400'
                  }`}>{w.verification?.status || 'pending'}</p>
                  <p className={`text-sm mt-1 ${w.paymentStatus === 'paid' ? 'text-emerald-400' : 'text-gray-400'}`}>{w.paymentStatus}</p>
                </div>
              </div>
            </div>
          ))}
          {winnings.length === 0 && <p className="text-gray-500 text-center py-8">No winnings yet. Keep entering your scores!</p>}
        </div>
      </div>
    </div>
  );
}
