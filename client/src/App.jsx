import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AuthGuard from './guards/AuthGuard';
import SubscriptionGuard from './guards/SubscriptionGuard';
import AdminGuard from './guards/AdminGuard';

// Public pages
import Landing from './pages/public/Landing';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import HowItWorks from './pages/public/HowItWorks';
import CharityDirectory from './pages/public/CharityDirectory';
import CharityProfile from './pages/public/CharityProfile';

// Subscriber pages
import Dashboard from './pages/subscriber/Dashboard';
import Scores from './pages/subscriber/Scores';
import Draws from './pages/subscriber/Draws';
import Winnings from './pages/subscriber/Winnings';
import Subscribe from './pages/subscriber/Subscribe';
import Settings from './pages/subscriber/Settings';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminDraws from './pages/admin/AdminDraws';
import AdminCharities from './pages/admin/AdminCharities';
import AdminWinners from './pages/admin/AdminWinners';
import AdminReports from './pages/admin/AdminReports';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-gray-950 text-white flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              {/* Public */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/charities" element={<CharityDirectory />} />
              <Route path="/charities/:id" element={<CharityProfile />} />

              {/* Auth required */}
              <Route path="/subscribe" element={<AuthGuard><Subscribe /></AuthGuard>} />
              <Route path="/settings" element={<AuthGuard><Settings /></AuthGuard>} />

              {/* Subscriber */}
              <Route path="/dashboard" element={<SubscriptionGuard><Dashboard /></SubscriptionGuard>} />
              <Route path="/scores" element={<SubscriptionGuard><Scores /></SubscriptionGuard>} />
              <Route path="/draws" element={<SubscriptionGuard><Draws /></SubscriptionGuard>} />
              <Route path="/winnings" element={<SubscriptionGuard><Winnings /></SubscriptionGuard>} />

              {/* Admin */}
              <Route path="/admin" element={<AdminGuard><AdminDashboard /></AdminGuard>} />
              <Route path="/admin/users" element={<AdminGuard><AdminUsers /></AdminGuard>} />
              <Route path="/admin/draws" element={<AdminGuard><AdminDraws /></AdminGuard>} />
              <Route path="/admin/charities" element={<AdminGuard><AdminCharities /></AdminGuard>} />
              <Route path="/admin/winners" element={<AdminGuard><AdminWinners /></AdminGuard>} />
              <Route path="/admin/reports" element={<AdminGuard><AdminReports /></AdminGuard>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
