import React from "react";

function Footer() {
  return (
    <footer className="text-center py-4 text-sm bg-indigo-600">
      © {new Date().getFullYear()} Weekly Planner — hecho con ❤️ en React y Firebase
    </footer>
  );
}

export default Footer;
