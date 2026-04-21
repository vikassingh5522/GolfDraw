import { useState, useEffect } from 'react';
import { getScores, addScore, updateScore, deleteScore } from '../../services/api';

export default function Scores() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    score: '', date: '', courseName: '', handicap: '', weather: '', roundType: '', notes: ''
  });
  const [error, setError] = useState('');

  const fetchScores = async () => {
    try {
      const { data } = await getScores();
      setScores(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load scores');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchScores(); }, []);

  const resetForm = () => {
    setForm({ score: '', date: '', courseName: '', handicap: '', weather: '', roundType: '', notes: '' });
    setEditing(null);
    setShowForm(false);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (editing) {
        await updateScore(editing, { ...form, score: Number(form.score), handicap: form.handicap ? Number(form.handicap) : null });
      } else {
        await addScore({ ...form, score: Number(form.score), handicap: form.handicap ? Number(form.handicap) : null });
      }
      resetForm();
      fetchScores();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save score');
    }
  };

  const handleEdit = (s) => {
    setForm({
      score: s.score, date: s.date.split('T')[0], courseName: s.courseName || '',
      handicap: s.handicap || '', weather: s.weather || '', roundType: s.roundType || '', notes: s.notes || ''
    });
    setEditing(s._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteScore(id);
      fetchScores();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete');
    }
  };

  if (loading) return <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-950 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Your Scores</h1>
            <p className="text-gray-400 text-sm">{scores.length}/5 scores entered</p>
          </div>
          {!showForm && (
            <button onClick={() => setShowForm(true)}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition">
              Add Score
            </button>
          )}
        </div>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-gray-900 rounded-xl p-6 border border-gray-800 mb-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 text-sm mb-1">Score (1-45)</label>
                <input type="number" min="1" max="45" required value={form.score}
                  onChange={(e) => setForm({ ...form, score: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500" />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">Date</label>
                <input type="date" required value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500" />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">Course Name</label>
                <input type="text" value={form.courseName}
                  onChange={(e) => setForm({ ...form, courseName: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500" />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">Handicap</label>
                <input type="number" value={form.handicap}
                  onChange={(e) => setForm({ ...form, handicap: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500" />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">Weather</label>
                <select value={form.weather} onChange={(e) => setForm({ ...form, weather: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500">
                  <option value="">Select</option>
                  <option value="sunny">Sunny</option>
                  <option value="cloudy">Cloudy</option>
                  <option value="rainy">Rainy</option>
                  <option value="windy">Windy</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">Round Type</label>
                <select value={form.roundType} onChange={(e) => setForm({ ...form, roundType: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500">
                  <option value="">Select</option>
                  <option value="18-hole">18-hole</option>
                  <option value="9-hole">9-hole</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1">Notes</label>
              <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500" rows="2" />
            </div>
            <div className="flex gap-3">
              <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg transition">
                {editing ? 'Update' : 'Add'} Score
              </button>
              <button type="button" onClick={resetForm} className="text-gray-400 hover:text-white transition">Cancel</button>
            </div>
          </form>
        )}

        <div className="space-y-3">
          {scores.map((s) => (
            <div key={s._id} className="bg-gray-900 rounded-xl p-4 border border-gray-800 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-emerald-400">{s.score}</span>
                  <div>
                    <p className="text-white font-medium">{s.courseName || 'Round'}</p>
                    <p className="text-gray-500 text-sm">{new Date(s.date).toLocaleDateString()}</p>
                  </div>
                </div>
                {(s.weather || s.roundType || s.handicap) && (
                  <div className="flex gap-3 mt-2 text-xs text-gray-500">
                    {s.weather && <span>{s.weather}</span>}
                    {s.roundType && <span>{s.roundType}</span>}
                    {s.handicap && <span>HC: {s.handicap}</span>}
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(s)} className="text-gray-400 hover:text-emerald-400 transition text-sm">Edit</button>
                <button onClick={() => handleDelete(s._id)} className="text-gray-400 hover:text-red-400 transition text-sm">Delete</button>
              </div>
            </div>
          ))}
          {scores.length === 0 && (
            <p className="text-gray-500 text-center py-8">No scores yet. Add your first golf score to get started!</p>
          )}
        </div>
      </div>
    </div>
  );
}
