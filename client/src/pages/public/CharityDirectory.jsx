import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCharities } from '../../services/api';

export default function CharityDirectory() {
  const [charities, setCharities] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCharities({ search })
      .then((res) => setCharities(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [search]);

  const featured = charities.filter((c) => c.featured);
  const regular = charities.filter((c) => !c.featured);

  return (
    <div className="min-h-screen bg-gray-950 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">Our Charities</h1>
        <p className="text-gray-400 mb-6">Support causes that matter. A portion of every subscription goes directly to charity.</p>
        <input type="text" placeholder="Search charities..." value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white mb-8 focus:outline-none focus:border-emerald-500" />
        {featured.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-yellow-400 mb-4">Featured Charities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featured.map((c) => (
                <Link key={c._id} to={`/charities/${c._id}`}
                  className="bg-gradient-to-r from-yellow-500/5 to-emerald-500/5 rounded-xl p-5 border border-yellow-500/20 hover:border-yellow-500/40 transition">
                  <h3 className="text-white font-semibold text-lg">{c.name}</h3>
                  <p className="text-gray-400 text-sm mt-1 line-clamp-2">{c.description}</p>
                  <p className="text-emerald-400 text-sm mt-2">${c.totalContributions?.toFixed(2) || '0.00'} raised</p>
                </Link>
              ))}
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {regular.map((c) => (
            <Link key={c._id} to={`/charities/${c._id}`}
              className="bg-gray-900 rounded-xl p-5 border border-gray-800 hover:border-emerald-500/30 transition">
              <h3 className="text-white font-semibold">{c.name}</h3>
              <p className="text-gray-400 text-sm mt-1 line-clamp-2">{c.description}</p>
              <p className="text-emerald-400 text-sm mt-2">${c.totalContributions?.toFixed(2) || '0.00'} raised</p>
            </Link>
          ))}
        </div>
        {!loading && charities.length === 0 && (
          <p className="text-gray-500 text-center py-8">No charities found.</p>
        )}
      </div>
    </div>
  );
}
