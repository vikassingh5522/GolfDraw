import { Link, useLocation } from 'react-router-dom';

const links = [
  { path: '/admin', label: 'Dashboard' },
  { path: '/admin/users', label: 'Users' },
  { path: '/admin/draws', label: 'Draws' },
  { path: '/admin/charities', label: 'Charities' },
  { path: '/admin/winners', label: 'Winners' },
  { path: '/admin/reports', label: 'Reports' },
];

export default function AdminSidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="w-56 bg-gray-900 border-r border-gray-800 min-h-screen p-4">
      <h2 className="text-yellow-400 font-bold text-sm uppercase tracking-wider mb-4">Admin Panel</h2>
      <nav className="space-y-1">
        {links.map((link) => (
          <Link key={link.path} to={link.path}
            className={`block px-3 py-2 rounded-lg text-sm transition ${
              pathname === link.path ? 'bg-emerald-500/10 text-emerald-400' : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}>
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
