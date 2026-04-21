import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { selectCharity, cancelSubscription } from '../../services/api';

export default function Settings() {
  const { user, setUser } = useAuth();
  const [charityPercent, setCharityPercent] = useState(user?.charity?.contributionPercent || 10);
  const [message, setMessage] = useState('');

  const handleUpdateCharity = async () => {
    try {
      await selectCharity({
        charityId: user.charity?.charityId,
        contributionPercent: Number(charityPercent)
      });
      setUser((prev) => ({ ...prev, charity: { ...prev.charity, contributionPercent: Number(charityPercent) } }));
      setMessage('Charity contribution updated');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Update failed');
    }
  };

  const handleCancel = async () => {
    if (!window.confirm('Are you sure you want to cancel your subscription?')) return;
    try {
      const { data } = await cancelSubscription();
      setUser((prev) => ({ ...prev, subscription: data.subscription }));
      setMessage('Subscription cancelled');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Cancellation failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 py-8 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Settings</h1>
        {message && <p className="text-emerald-400 text-sm mb-4">{message}</p>}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">Profile</h2>
          <p className="text-gray-400">Name: <span className="text-white">{user?.name}</span></p>
          <p className="text-gray-400 mt-1">Email: <span className="text-white">{user?.email}</span></p>
          <p className="text-gray-400 mt-1">Plan: <span className="text-emerald-400 capitalize">{user?.subscription?.plan || 'None'}</span></p>
        </div>
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">Charity Contribution</h2>
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <label className="block text-gray-400 text-sm mb-1">Contribution % (min 10%)</label>
              <input type="number" min="10" max="100" value={charityPercent}
                onChange={(e) => setCharityPercent(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500" />
            </div>
            <button onClick={handleUpdateCharity}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition">Update</button>
          </div>
        </div>
        <div className="bg-gray-900 rounded-xl p-6 border border-red-500/20">
          <h2 className="text-lg font-semibold text-white mb-2">Danger Zone</h2>
          <p className="text-gray-400 text-sm mb-4">Cancel your subscription. You'll lose access to draws.</p>
          <button onClick={handleCancel}
            className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-4 py-2 rounded-lg transition">
            Cancel Subscription
          </button>
        </div>
      </div>
    </div>
  );
}
