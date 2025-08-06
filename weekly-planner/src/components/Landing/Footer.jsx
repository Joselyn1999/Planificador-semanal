import React from "react";

function Footer() {
  return (
    <footer className="mt-12 border-t bg-white/30">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
        <div>© {new Date().getFullYear()} Weekly Planner</div>
        <div className="flex gap-4 mt-3 md:mt-0">
          <a href="#" className="hover:underline">Términos</a>
          <a href="#" className="hover:underline">Privacidad</a>
          <a href="#" className="hover:underline">Contacto</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
