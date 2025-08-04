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

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">FocusBoard</h1>

      <ul className="flex gap-4 items-center">
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

        {user ? (
          <>
            <li className="text-gray-800 font-medium">
              Hola, {user.full_name}
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