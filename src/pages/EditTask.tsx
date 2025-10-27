// src/pages/EditTask.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTaskById, updateTask } from "../services/taskService";
import type { Task } from "../services/taskService";
import TaskForm from "../components/TaskForm";

export default function EditTask() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getTaskById(Number(id))
        .then(setTask)
        .catch(() => alert("Error al cargar tarea"))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleSubmit = async (updatedData: Partial<Task>) => {
    try {
      await updateTask(Number(id), updatedData);
      alert("Tarea actualizada correctamente");
      navigate("/dashboard");
    } catch (error) {
      alert("Error al actualizar la tarea");
    }
  };

  if (loading) return <p>Cargando tarea...</p>;
  if (!task) return <p>No se encontró la tarea</p>;

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Editar tarea</h2>
      <TaskForm initialData={task} onSubmit={handleSubmit} />
    </div>
  );
}
