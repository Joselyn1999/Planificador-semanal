import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="py-4 bg-white/60 backdrop-blur sticky top-0 z-20 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">WP</div>
          <h1 className="text-lg font-semibold">Weekly Planner</h1>
        </div>

        <nav className="flex items-center gap-4">
          <a href="#features" className="text-sm text-gray-600 hover:text-indigo-600">Características</a>
          <Link
            to="/login"
            className="text-sm px-4 py-2 rounded-md border border-indigo-600 text-indigo-600 hover:bg-indigo-50"
          >
            Iniciar sesión
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
