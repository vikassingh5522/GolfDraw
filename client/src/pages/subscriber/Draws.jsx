import { useState, useEffect } from 'react';
import { getDraws, getUpcomingDraw } from '../../services/api';

export default function Draws() {
  const [draws, setDraws] = useState([]);
  const [upcoming, setUpcoming] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getDraws(), getUpcomingDraw()])
      .then(([drawsRes, upcomingRes]) => {
        setDraws(drawsRes.data);
        setUpcoming(upcomingRes.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">Loading...</div>;

  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  return (
    <div className="min-h-screen bg-gray-950 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Draw Results</h1>
        {upcoming && (
          <div className="bg-gradient-to-r from-emerald-500/10 to-yellow-500/10 rounded-xl p-6 border border-emerald-500/20 mb-8">
            <h2 className="text-lg font-semibold text-white">Upcoming Draw</h2>
            <p className="text-gray-300">{monthNames[(upcoming.month || 1) - 1]} {upcoming.year}</p>
            <p className="text-gray-400 text-sm mt-1">Status: {upcoming.status}</p>
          </div>
        )}
        <div className="space-y-4">
          {draws.map((draw) => (
            <div key={draw._id} className="bg-gray-900 rounded-xl p-5 border border-gray-800">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-white font-semibold">{monthNames[draw.month - 1]} {draw.year}</h3>
                <span className="text-xs text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">{draw.drawType}</span>
              </div>
              <div className="flex gap-2 mb-3">
                {draw.winningNumbers.map((num, i) => (
                  <span key={i} className="bg-emerald-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm">{num}</span>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="text-gray-400">5-Match: <span className="text-yellow-400">${draw.prizePool.fiveMatch?.toFixed(2)}</span></div>
                <div className="text-gray-400">4-Match: <span className="text-white">${draw.prizePool.fourMatch?.toFixed(2)}</span></div>
                <div className="text-gray-400">3-Match: <span className="text-white">${draw.prizePool.threeMatch?.toFixed(2)}</span></div>
              </div>
            </div>
          ))}
          {draws.length === 0 && <p className="text-gray-500 text-center py-8">No draws published yet.</p>}
        </div>
      </div>
    </div>
  );
}
