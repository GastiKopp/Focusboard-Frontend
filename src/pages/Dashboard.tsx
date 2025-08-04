import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {
  const context = useContext(AuthContext);

  if (!context) {
    return <p className="text-center mt-10 text-red-500">Error: contexto no disponible</p>;
  }

  const { user } = context;

  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold">Bienvenido, {user?.full_name} 👋</h1>
      <p className="mt-4 text-gray-600">Tu correo: {user?.email}</p>
    </div>
  );
}

export default Dashboard;
