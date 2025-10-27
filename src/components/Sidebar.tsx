import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="relative">
      {/* 🍔 Botón hamburguesa */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-md md:hidden"
      >
        ☰
      </button>

      {/* 📦 Menú lateral */}
      <div
        className={`bg-gray-800 text-white h-screen w-64 p-6 space-y-4 fixed top-0 left-0 transition-transform z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:block`}
      >
        <h2 className="text-xl font-bold mb-6">Menú</h2>

        <nav className="space-y-2">
          <Link
            to="/"
            className={`block hover:text-blue-300 ${isActive("/") ? "underline" : ""}`}
            onClick={() => setIsOpen(false)}
          >
            🏠 Inicio
          </Link>

          <Link
            to="/dashboard"
            className={`block hover:text-blue-300 ${isActive("/dashboard") ? "underline" : ""}`}
            onClick={() => setIsOpen(false)}
          >
            📋 Dashboard
          </Link>

          <Link
            to="/progreso"
            className={`block hover:text-blue-300 ${isActive("/progreso") ? "underline" : ""}`}
            onClick={() => setIsOpen(false)}
          >
            📈 Progreso
          </Link>

          {/* Crear → submenu */}
          <div>
            <button
              onClick={() => setShowCreateMenu(!showCreateMenu)}
              className="block w-full text-left hover:text-blue-300"
            >
              ➕ Crear {showCreateMenu ? "▲" : "▼"}
            </button>

            {showCreateMenu && (
              <div className="ml-4 mt-2 space-y-1 text-sm">
                <Link
                  to="/nueva"
                  className="block hover:text-blue-400"
                  onClick={() => setIsOpen(false)}
                >
                  ➕ Tarea
                </Link>
                <Link
                  to="/nueva-categoria"
                  className="block hover:text-blue-400"
                  onClick={() => setIsOpen(false)}
                >
                  ➕ Categoría
                </Link>
              </div>
            )}
          </div>

          <button className="block hover:text-blue-300" disabled>
            ⚙️ Configuración
          </button>

          <button
            onClick={handleLogout}
            className="block text-red-400 hover:text-red-300 mt-4"
          >
            🔓 Cerrar sesión
          </button>
        </nav>
      </div>
    </aside>
  );
}
