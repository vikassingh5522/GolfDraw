export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} GolfDraw. All rights reserved.</p>
        <p className="mt-1">Play. Win. Give Back.</p>
      </div>
    </footer>
  );
}
