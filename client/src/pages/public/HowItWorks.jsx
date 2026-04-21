export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-gray-950 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">How GolfDraw Works</h1>
        <div className="space-y-8">
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-semibold text-emerald-400 mb-3">1. Subscribe</h2>
            <p className="text-gray-300">Choose a Monthly ($9.99/mo) or Yearly ($99.99/yr) plan. Your subscription:</p>
            <ul className="text-gray-400 mt-2 space-y-1 list-disc list-inside">
              <li>Gives you access to enter scores and join draws</li>
              <li>Contributes at least 10% to your chosen charity</li>
              <li>Funds the monthly prize pool</li>
            </ul>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-semibold text-emerald-400 mb-3">2. Enter Your Scores</h2>
            <p className="text-gray-300">After each round of golf, enter your Stableford score (1-45 points).</p>
            <ul className="text-gray-400 mt-2 space-y-1 list-disc list-inside">
              <li>Keep your latest 5 scores — new scores replace the oldest</li>
              <li>One score per date</li>
              <li>Include course name, handicap, weather, and notes</li>
              <li>Your 5 scores are automatically your draw entry</li>
            </ul>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-semibold text-emerald-400 mb-3">3. Monthly Draw</h2>
            <p className="text-gray-300">Each month, 5 winning numbers (1-45) are generated. Your scores are matched:</p>
            <div className="mt-3 grid grid-cols-3 gap-3 text-center">
              <div className="bg-yellow-500/10 rounded-lg p-3 border border-yellow-500/20">
                <p className="text-yellow-400 font-bold">5 Match</p><p className="text-white text-sm">40% Pool</p>
              </div>
              <div className="bg-emerald-500/10 rounded-lg p-3 border border-emerald-500/20">
                <p className="text-emerald-400 font-bold">4 Match</p><p className="text-white text-sm">35% Pool</p>
              </div>
              <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/20">
                <p className="text-blue-400 font-bold">3 Match</p><p className="text-white text-sm">25% Pool</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mt-3">Order doesn't matter. 5-match jackpot rolls over if unclaimed!</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-semibold text-emerald-400 mb-3">4. Win & Verify</h2>
            <p className="text-gray-300">If you win:</p>
            <ul className="text-gray-400 mt-2 space-y-1 list-disc list-inside">
              <li>You'll be notified of your match</li>
              <li>Upload proof (screenshot from your golf platform)</li>
              <li>Admin verifies and processes your payout</li>
            </ul>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-semibold text-emerald-400 mb-3">5. Give Back</h2>
            <p className="text-gray-300">Every subscriber supports a charity. You choose which one and can increase your contribution beyond the 10% minimum.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
