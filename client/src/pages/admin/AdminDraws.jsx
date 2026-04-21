import { useState } from 'react';
import { adminConfigureDraw, adminSimulateDraw, adminPublishDraw } from '../../services/api';
import AdminSidebar from '../../components/layout/AdminSidebar';

export default function AdminDraws() {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());
  const [drawType, setDrawType] = useState('random');
  const [draw, setDraw] = useState(null);
  const [simulation, setSimulation] = useState(null);
  const [message, setMessage] = useState('');

  const handleConfigure = async () => {
    try {
      const { data } = await adminConfigureDraw({ month, year, drawType });
      setDraw(data);
      setSimulation(null);
      setMessage('Draw configured — ready to simulate');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Configuration failed');
    }
  };

  const handleSimulate = async () => {
    try {
      const { data } = await adminSimulateDraw({ drawId: draw._id });
      setSimulation(data);
      setMessage('Simulation complete');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Simulation failed');
    }
  };

  const handlePublish = async () => {
    if (!window.confirm('Publish this draw? This cannot be undone.')) return;
    try {
      await adminPublishDraw(draw._id);
      setMessage('Draw published!');
      setDraw({ ...draw, status: 'published' });
    } catch (err) {
      setMessage(err.response?.data?.message || 'Publish failed');
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-white mb-6">Draw Management</h1>
        {message && <p className="text-emerald-400 text-sm mb-4">{message}</p>}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">Configure Draw</h2>
          <div className="flex gap-4 items-end flex-wrap">
            <div>
              <label className="block text-gray-400 text-sm mb-1">Month</label>
              <select value={month} onChange={(e) => setMonth(Number(e.target.value))}
                className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white">
                {Array.from({ length: 12 }, (_, i) => (<option key={i + 1} value={i + 1}>{i + 1}</option>))}
              </select>
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1">Year</label>
              <input type="number" value={year} onChange={(e) => setYear(Number(e.target.value))}
                className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white w-24" />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1">Type</label>
              <select value={drawType} onChange={(e) => setDrawType(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white">
                <option value="random">Random</option>
                <option value="algorithmic">Algorithmic</option>
              </select>
            </div>
            <button onClick={handleConfigure} className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition">Configure</button>
          </div>
        </div>
        {draw && (
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 mb-6">
            <h2 className="text-lg font-semibold text-white mb-3">Draw: {draw.month}/{draw.year}</h2>
            <div className="flex gap-2 mb-4">
              {draw.winningNumbers?.map((num, i) => (
                <span key={i} className="bg-emerald-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">{num}</span>
              ))}
            </div>
            <p className="text-gray-400 text-sm">Prize Pool: ${draw.prizePool?.total?.toFixed(2)}</p>
            <p className="text-gray-400 text-sm">Status: <span className="text-yellow-400">{draw.status}</span></p>
            <div className="flex gap-3 mt-4">
              <button onClick={handleSimulate} disabled={draw.status === 'published'} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition disabled:opacity-50">Simulate</button>
              <button onClick={handlePublish} disabled={draw.status === 'published'} className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg transition disabled:opacity-50">Publish</button>
            </div>
          </div>
        )}
        {simulation && (
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h2 className="text-lg font-semibold text-white mb-3">Simulation Results</h2>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div><p className="text-2xl font-bold text-yellow-400">{simulation.summary.fiveMatch}</p><p className="text-gray-400 text-sm">5-Match</p></div>
              <div><p className="text-2xl font-bold text-emerald-400">{simulation.summary.fourMatch}</p><p className="text-gray-400 text-sm">4-Match</p></div>
              <div><p className="text-2xl font-bold text-blue-400">{simulation.summary.threeMatch}</p><p className="text-gray-400 text-sm">3-Match</p></div>
              <div><p className="text-2xl font-bold text-gray-400">{simulation.summary.noMatch}</p><p className="text-gray-400 text-sm">No Match</p></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
