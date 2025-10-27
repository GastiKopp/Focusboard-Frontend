import { useNavigate } from "react-router-dom";
import { createTask } from "../services/taskService";
import TaskForm from "../components/TaskForm";
import type { TaskData } from "../services/taskService";

export default function CreateTask() {
  const navigate = useNavigate();

  const handleSubmit = async (data: TaskData) => {
    try {
      await createTask(data);
      alert("Tarea creada correctamente");
      navigate("/dashboard");
    } catch (err) {
      console.error("Error al crear tarea:", err);
      alert("Hubo un problema al crear la tarea.");
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Crear nueva tarea</h1>
      <TaskForm onSubmit={handleSubmit} />
    </div>
  );
}
