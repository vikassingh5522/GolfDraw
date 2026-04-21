import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-950">
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Play Golf. <span className="text-emerald-400">Win Prizes.</span><br />Give Back.
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Enter your golf scores, join monthly prize draws, and support charities you care about — all in one platform.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/register" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-xl font-semibold text-lg transition">Get Started</Link>
            <Link to="/how-it-works" className="border border-gray-700 hover:border-gray-500 text-white px-8 py-3 rounded-xl font-semibold text-lg transition">How It Works</Link>
          </div>
        </div>
      </section>
      <section className="py-16 px-4 border-t border-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-emerald-400">1</span>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Subscribe</h3>
              <p className="text-gray-400">Choose a monthly or yearly plan. A portion goes to your chosen charity.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-emerald-400">2</span>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Enter Scores</h3>
              <p className="text-gray-400">Log your latest 5 Stableford scores. They become your draw entry.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-emerald-400">3</span>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Win & Give</h3>
              <p className="text-gray-400">Match the monthly draw numbers to win. Every subscription supports charity.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 px-4 border-t border-gray-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Prize Tiers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-b from-yellow-500/10 to-transparent rounded-xl p-6 border border-yellow-500/20">
              <p className="text-yellow-400 font-bold text-2xl">5 Match</p>
              <p className="text-3xl font-bold text-white mt-2">40%</p>
              <p className="text-gray-400 text-sm mt-1">Jackpot — rolls over!</p>
            </div>
            <div className="bg-gradient-to-b from-emerald-500/10 to-transparent rounded-xl p-6 border border-emerald-500/20">
              <p className="text-emerald-400 font-bold text-2xl">4 Match</p>
              <p className="text-3xl font-bold text-white mt-2">35%</p>
              <p className="text-gray-400 text-sm mt-1">of prize pool</p>
            </div>
            <div className="bg-gradient-to-b from-blue-500/10 to-transparent rounded-xl p-6 border border-blue-500/20">
              <p className="text-blue-400 font-bold text-2xl">3 Match</p>
              <p className="text-3xl font-bold text-white mt-2">25%</p>
              <p className="text-gray-400 text-sm mt-1">of prize pool</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 px-4 border-t border-gray-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Every Subscription Makes a Difference</h2>
          <p className="text-gray-400 text-lg mb-8">At least 10% of every subscription goes directly to a charity of your choice.</p>
          <Link to="/charities" className="text-emerald-400 hover:underline text-lg">Browse Our Charities</Link>
        </div>
      </section>
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Play?</h2>
          <p className="text-gray-400 mb-8">Join thousands of golfers making a difference.</p>
          <Link to="/register" className="bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-4 rounded-xl font-semibold text-lg transition">Start Your Subscription</Link>
        </div>
      </section>
    </div>
  );
}
