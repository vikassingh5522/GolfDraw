import { useState, useEffect } from 'react';
import { adminGetUsers, adminUpdateUser } from '../../services/api';
import AdminSidebar from '../../components/layout/AdminSidebar';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = () => {
    adminGetUsers().then((res) => setUsers(res.data)).catch(console.error).finally(() => setLoading(false));
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleRoleChange = async (id, role) => {
    await adminUpdateUser(id, { role });
    fetchUsers();
  };

  const handleSubscriptionToggle = async (user) => {
    const newStatus = user.subscription?.status === 'active' ? 'inactive' : 'active';
    await adminUpdateUser(user._id, { subscription: { ...user.subscription, status: newStatus } });
    fetchUsers();
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-white mb-6">User Management</h1>
        {loading ? <p className="text-gray-400">Loading...</p> : (
          <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-800">
                <tr>
                  <th className="text-left text-gray-400 px-4 py-3">Name</th>
                  <th className="text-left text-gray-400 px-4 py-3">Email</th>
                  <th className="text-left text-gray-400 px-4 py-3">Role</th>
                  <th className="text-left text-gray-400 px-4 py-3">Subscription</th>
                  <th className="text-left text-gray-400 px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="border-t border-gray-800">
                    <td className="px-4 py-3 text-white">{u.name}</td>
                    <td className="px-4 py-3 text-gray-400">{u.email}</td>
                    <td className="px-4 py-3">
                      <select value={u.role} onChange={(e) => handleRoleChange(u._id, e.target.value)}
                        className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-white text-xs">
                        <option value="visitor">Visitor</option>
                        <option value="subscriber">Subscriber</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded ${u.subscription?.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-700 text-gray-400'}`}>{u.subscription?.status || 'inactive'}</span>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => handleSubscriptionToggle(u)} className="text-xs text-emerald-400 hover:underline">
                        {u.subscription?.status === 'active' ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
