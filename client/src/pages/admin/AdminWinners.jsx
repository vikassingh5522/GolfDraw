import { useState, useEffect } from 'react';
import { adminGetWinners, adminVerifyWinner, adminMarkPayout } from '../../services/api';
import AdminSidebar from '../../components/layout/AdminSidebar';

export default function AdminWinners() {
  const [winners, setWinners] = useState([]);

  const fetchWinners = () => adminGetWinners().then((res) => setWinners(res.data));

  useEffect(() => { fetchWinners(); }, []);

  const handleVerify = async (id, status) => { await adminVerifyWinner(id, { status }); fetchWinners(); };
  const handlePayout = async (id) => { await adminMarkPayout(id); fetchWinners(); };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-white mb-6">Winner Verification</h1>
        <div className="space-y-3">
          {winners.map((w) => (
            <div key={w._id} className="bg-gray-900 rounded-xl p-5 border border-gray-800">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white font-medium">{w.userId?.name || 'Unknown'}</p>
                  <p className="text-gray-400 text-sm">{w.userId?.email}</p>
                  <p className="text-sm mt-1"><span className="text-emerald-400">{w.matchType}</span> — ${w.prizeAmount?.toFixed(2)}</p>
                  <p className="text-gray-500 text-xs">Draw: {w.drawId?.month}/{w.drawId?.year}</p>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <span className={`text-xs px-2 py-1 rounded ${
                    w.verification?.status === 'approved' ? 'bg-emerald-500/20 text-emerald-400' :
                    w.verification?.status === 'rejected' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>{w.verification?.status}</span>
                  {w.verification?.status === 'pending' && (
                    <div className="flex gap-2">
                      <button onClick={() => handleVerify(w._id, 'approved')} className="text-xs bg-emerald-500 text-white px-3 py-1 rounded hover:bg-emerald-600">Approve</button>
                      <button onClick={() => handleVerify(w._id, 'rejected')} className="text-xs bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Reject</button>
                    </div>
                  )}
                  {w.verification?.status === 'approved' && w.paymentStatus === 'pending' && (
                    <button onClick={() => handlePayout(w._id)} className="text-xs bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-600">Mark Paid</button>
                  )}
                  <span className={`text-xs ${w.paymentStatus === 'paid' ? 'text-emerald-400' : 'text-gray-500'}`}>{w.paymentStatus}</span>
                </div>
              </div>
            </div>
          ))}
          {winners.length === 0 && <p className="text-gray-500 text-center py-8">No winners yet.</p>}
        </div>
      </div>
    </div>
  );
}
