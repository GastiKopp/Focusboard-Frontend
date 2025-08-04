import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const context = useContext(AuthContext);
  if (!context)
    throw new Error("AuthContext must be used within an AuthProvider");
  const { login } = context;

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: typeof errors = {};
    if (!email) newErrors.email = "El email es obligatorio";
    if (!password) newErrors.password = "La contraseña es obligatoria";
    setErrors(newErrors);
    setApiError("");

    if (Object.keys(newErrors).length === 0) {
      try {
        setLoading(true);

        const res = await fetch("http://localhost:4000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || "Error al iniciar sesión");
        }

        const data = await res.json();
        login(data.user, data.token); // guarda en contexto
        navigate("/dashboard"); // redirige
      } catch (error: any) {
        setApiError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 shadow-md rounded mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>

      {apiError && (
        <p className="text-red-500 text-sm mb-4 text-center">{apiError}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            className={`w-full px-4 py-2 border rounded ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">Contraseña</label>
          <input
            type="password"
            className={`w-full px-4 py-2 border rounded ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
}

export default Login;
