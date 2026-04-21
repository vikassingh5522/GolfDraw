import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { subscribe } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';

const plans = [
  { id: 'monthly', name: 'Monthly', price: '$9.99/mo', desc: 'Billed monthly, cancel anytime' },
  { id: 'yearly', name: 'Yearly', price: '$99.99/yr', desc: 'Save 17% — billed annually' }
];

export default function Subscribe() {
  const [selected, setSelected] = useState('monthly');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubscribe = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await subscribe({ plan: selected });
      setUser((prev) => ({ ...prev, subscription: data.subscription, role: 'subscriber' }));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Subscription failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 py-12 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-white text-center mb-2">Choose Your Plan</h1>
        <p className="text-gray-400 text-center mb-8">Subscribe to enter monthly draws and support charities</p>
        {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}
        <div className="space-y-4 mb-8">
          {plans.map((plan) => (
            <button key={plan.id} onClick={() => setSelected(plan.id)}
              className={`w-full p-6 rounded-xl border-2 text-left transition ${
                selected === plan.id
                  ? 'border-emerald-500 bg-emerald-500/10'
                  : 'border-gray-700 bg-gray-900 hover:border-gray-600'
              }`}>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                  <p className="text-gray-400 text-sm">{plan.desc}</p>
                </div>
                <span className="text-xl font-bold text-emerald-400">{plan.price}</span>
              </div>
            </button>
          ))}
        </div>
        <button onClick={handleSubscribe} disabled={loading}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-semibold text-lg transition disabled:opacity-50">
          {loading ? 'Processing...' : 'Subscribe Now'}
        </button>
        <p className="text-gray-500 text-xs text-center mt-4">Mock payment — no real charges</p>
      </div>
    </div>
  );
}
