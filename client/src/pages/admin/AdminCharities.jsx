import { useState, useEffect } from 'react';
import { getCharities, adminCreateCharity, adminUpdateCharity, adminDeleteCharity } from '../../services/api';
import AdminSidebar from '../../components/layout/AdminSidebar';

export default function AdminCharities() {
  const [charities, setCharities] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', description: '', featured: false });

  const fetchCharities = () => getCharities().then((res) => setCharities(res.data));

  useEffect(() => { fetchCharities(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) { await adminUpdateCharity(editing, form); } else { await adminCreateCharity(form); }
    setForm({ name: '', description: '', featured: false });
    setEditing(null);
    setShowForm(false);
    fetchCharities();
  };

  const handleEdit = (c) => {
    setForm({ name: c.name, description: c.description, featured: c.featured });
    setEditing(c._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this charity?')) return;
    await adminDeleteCharity(id);
    fetchCharities();
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Charity Management</h1>
          <button onClick={() => { setShowForm(!showForm); setEditing(null); setForm({ name: '', description: '', featured: false }); }}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition">
            {showForm ? 'Cancel' : 'Add Charity'}
          </button>
        </div>
        {showForm && (
          <form onSubmit={handleSubmit} className="bg-gray-900 rounded-xl p-6 border border-gray-800 mb-6 space-y-4">
            <input type="text" required placeholder="Charity name" value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500" />
            <textarea required placeholder="Description" value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500" rows="3" />
            <label className="flex items-center gap-2 text-gray-400">
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /> Featured charity
            </label>
            <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg transition">
              {editing ? 'Update' : 'Create'} Charity
            </button>
          </form>
        )}
        <div className="space-y-3">
          {charities.map((c) => (
            <div key={c._id} className="bg-gray-900 rounded-xl p-4 border border-gray-800 flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-medium">{c.name}</h3>
                  {c.featured && <span className="text-yellow-400 text-xs bg-yellow-400/10 px-2 py-0.5 rounded">Featured</span>}
                </div>
                <p className="text-gray-400 text-sm line-clamp-1">{c.description}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(c)} className="text-emerald-400 hover:underline text-sm">Edit</button>
                <button onClick={() => handleDelete(c._id)} className="text-red-400 hover:underline text-sm">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
