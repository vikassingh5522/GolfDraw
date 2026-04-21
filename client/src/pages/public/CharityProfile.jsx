import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCharity, selectCharity } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';

export default function CharityProfile() {
  const { id } = useParams();
  const { user, setUser } = useAuth();
  const [charity, setCharity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getCharity(id)
      .then((res) => setCharity(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const handleSelect = async () => {
    try {
      await selectCharity({ charityId: id, contributionPercent: user?.charity?.contributionPercent || 10 });
      setUser((prev) => ({ ...prev, charity: { ...prev.charity, charityId: id } }));
      setMessage('Charity selected!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to select charity');
    }
  };

  if (loading) return <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">Loading...</div>;
  if (!charity) return <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">Charity not found</div>;

  return (
    <div className="min-h-screen bg-gray-950 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">{charity.name}</h1>
        {charity.featured && <span className="text-yellow-400 text-sm bg-yellow-400/10 px-2 py-1 rounded">Featured</span>}
        <p className="text-gray-300 mt-4 leading-relaxed">{charity.description}</p>
        <div className="bg-gray-900 rounded-xl p-5 border border-gray-800 mt-6">
          <p className="text-gray-400 text-sm">Total Contributions</p>
          <p className="text-2xl font-bold text-emerald-400">${charity.totalContributions?.toFixed(2) || '0.00'}</p>
        </div>
        {charity.events?.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-white mb-3">Upcoming Events</h2>
            <div className="space-y-3">
              {charity.events.map((event, i) => (
                <div key={i} className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                  <h3 className="text-white font-medium">{event.title}</h3>
                  <p className="text-gray-500 text-sm">{new Date(event.date).toLocaleDateString()}</p>
                  {event.description && <p className="text-gray-400 text-sm mt-1">{event.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
        {user && (
          <div className="mt-6">
            {message && <p className="text-emerald-400 text-sm mb-3">{message}</p>}
            <button onClick={handleSelect}
              className={`px-6 py-2.5 rounded-lg font-medium transition ${
                user.charity?.charityId === id
                  ? 'bg-gray-700 text-gray-300 cursor-default'
                  : 'bg-emerald-500 hover:bg-emerald-600 text-white'
              }`}>
              {user.charity?.charityId === id ? 'Currently Selected' : 'Select This Charity'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
