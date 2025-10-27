import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navItems = [
    { path: "/", label: "Inicio" },
    { path: "/dashboard", label: "Panel" },
  ];

  // Título contextual
  const getTitle = () => {
    if (location.pathname.startsWith("/dashboard")) return "📋 Tareas";
    if (location.pathname.startsWith("/nueva")) return "➕ Nueva tarea";
    if (location.pathname.startsWith("/nueva-categoria")) return "➕ Nueva categoría";
    if (location.pathname.startsWith("/progreso")) return "📈 Progreso";
    return "🏠 Inicio";
  };

  // Acciones rápidas contextuales
  const getActions = () => {
    if (location.pathname === "/dashboard") {
      return (
        <>
          <button onClick={() => navigate("/nueva")} className="btn-nav">Crear tarea</button>
          <button onClick={() => navigate("/nueva-categoria")} className="btn-nav">Crear categoría</button>
          <button onClick={() => navigate("/progreso")} className="btn-nav">Ver progreso</button>
        </>
      );
    }

    if (
      location.pathname === "/nueva" ||
      location.pathname === "/nueva-categoria"
    ) {
      return (
        <button onClick={() => navigate("/dashboard")} className="btn-nav">
          ⬅ Volver
        </button>
      );
    }

    return null;
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <div className="flex items-center gap-6">
        <h1
          className="text-xl font-bold text-blue-600 cursor-pointer"
          onClick={() => navigate("/")}
        >
          FocusBoard
        </h1>

        <span className="text-lg font-semibold hidden sm:inline-block">{getTitle()}</span>
      </div>

      <ul className="flex gap-4 items-center">
        {/* Acciones rápidas */}
        {getActions()}

        {/* Links principales */}
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`font-medium ${
                location.pathname === item.path
                  ? "text-blue-600 underline"
                  : "text-gray-700 hover:text-blue-500"
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}

        {/* Login / Logout */}
        {user ? (
          <>
            <li className="text-gray-800 font-medium hidden sm:block">
              Hola, {user.full_name.split(" ")[0]} 👋
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:underline font-medium"
              >
                Cerrar sesión
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to="/login"
                className={`font-medium ${
                  location.pathname === "/login"
                    ? "text-blue-600 underline"
                    : "text-gray-700 hover:text-blue-500"
                }`}
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className={`font-medium ${
                  location.pathname === "/register"
                    ? "text-blue-600 underline"
                    : "text-gray-700 hover:text-blue-500"
                }`}
              >
                Registrarse
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
