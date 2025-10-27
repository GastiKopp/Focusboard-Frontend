import { useNavigate } from "react-router-dom";
import CategoryForm from "../components/CategoryForm";
import { createCategory } from "../services/categoryService";
import type { CategoryData } from "../services/categoryService";

export default function CreateCategory() {
  const navigate = useNavigate();

  const handleSubmit = async (data: CategoryData) => {
    try {
      const payload: CategoryData = {
        name: data.name,
        color: data.color && data.color.trim() ? data.color : "#888888", // valor por defecto
      };
      await createCategory(payload);
      alert("Categoría creada con éxito");
      navigate("/dashboard"); // o "/categorias" si tenés vista de gestión
    } catch (error) {
      console.error("Error al crear categoría:", error);
      alert("Error al crear la categoría");
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Crear nueva categoría</h2>
      <CategoryForm onSubmit={handleSubmit} />
    </div>
  );
}
