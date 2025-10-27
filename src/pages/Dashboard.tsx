import { useEffect, useState } from "react";
import { getTasks, updateTask } from "../services/taskService";
import type { Task } from "../services/taskService";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const today = new Date();
  const fullDate = today.toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const currentDayKey = today
    .toLocaleDateString("en-US", { weekday: "long" })
    .toLowerCase(); // ej: "wednesday"

  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch((err) => console.error("Error al cargar tareas:", err))
      .finally(() => setLoading(false));
  }, []);

  const dailyTasks = tasks.filter((task) => task.assigned_days.includes(currentDayKey));

  const handleFieldChange = (taskId: number, field: string, value: any) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, [field]: value } : task))
    );
  };

  const handleSave = async (task: Task) => {
    try {
      await updateTask(task.id, {
        completed_hours: task.completed_hours,
      });
      alert("Progreso actualizado");
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
      alert("Error al actualizar la tarea.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Tus tareas</h1>

      {/* 👉 Botones de acción */}
      <div className="flex justify-end gap-4 mb-6">
        <Link
          to="/nueva"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          ➕ Crear tarea
        </Link>
        <Link
          to="/nueva-categoria"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          ➕ Crear categoría
        </Link>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          Hoy {fullDate.charAt(0).toUpperCase() + fullDate.slice(1)} te toca...
        </h2>

        {loading ? (
          <p>Cargando tareas...</p>
        ) : dailyTasks.length === 0 ? (
          <p>No tenés tareas asignadas para hoy.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 shadow">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-2 border-b">Nombre</th>
                  <th className="p-2 border-b">Descripción</th>
                  <th className="p-2 border-b text-center">Horas planificadas</th>
                  <th className="p-2 border-b text-center">Inicio</th>
                  <th className="p-2 border-b text-center">Fin</th>
                  <th className="p-2 border-b text-center">Completadas</th>
                  <th className="p-2 border-b text-center">¿Hecha hoy?</th>
                  <th className="p-2 border-b text-center">Progreso</th>
                  <th className="p-2 border-b text-center">Guardar</th>
                  <th className="p-2 border-b text-center">Editar</th>
                </tr>
              </thead>
              <tbody>
                {dailyTasks.map((task) => {
                  const percent = Math.min(
                    Math.round((task.completed_hours / task.planned_hours_per_day) * 100),
                    100
                  );

                  return (
                    <tr
                      key={task.id}
                      className={`hover:bg-gray-50 ${
                        task.completed_hours >= task.planned_hours_per_day
                          ? "bg-green-100"
                          : task.completed_hours === 0
                          ? "bg-red-100"
                          : ""
                      }`}
                    >
                      <td className="p-2 border-b font-semibold">
                        <div className="flex items-center gap-2">
                          {task.category && (
                            <span
                              title={task.category.name}
                              className="px-2 py-0.5 rounded-full border text-xs"
                              style={{ background: task.category.color ?? "#eee" }}
                            >
                              {task.category.name}
                            </span>
                          )}
                          {task.title}
                        </div>
                      </td>
                      <td className="p-2 border-b">{task.description || "-"}</td>
                      <td className="p-2 border-b text-center">
                        {task.planned_hours_per_day}
                      </td>
                      <td className="p-2 border-b text-center text-sm text-gray-700">
                        {task.start_time ? task.start_time.slice(0, 5) : "-"}
                      </td>
                      <td className="p-2 border-b text-center text-sm text-gray-700">
                        {task.end_time ? task.end_time.slice(0, 5) : "-"}
                      </td>
                      <td className="p-2 border-b">
                        <input
                          type="number"
                          value={task.completed_hours}
                          min={0}
                          onChange={(e) =>
                            handleFieldChange(task.id, "completed_hours", Number(e.target.value))
                          }
                          className="border px-2 py-1 w-24 rounded"
                        />
                      </td>
                      <td className="p-2 border-b text-center">
                        <input
                          type="checkbox"
                          checked={task.completed_hours > 0}
                          onChange={(e) =>
                            handleFieldChange(
                              task.id,
                              "completed_hours",
                              e.target.checked ? task.planned_hours_per_day : 0
                            )
                          }
                        />
                      </td>
                      <td className="p-2 border-b text-center">
                        <div className="w-24 h-4 bg-gray-200 rounded overflow-hidden mx-auto">
                          <div
                            className={`h-full ${
                              task.completed_hours >= task.planned_hours_per_day
                                ? "bg-green-500"
                                : task.completed_hours > 0
                                ? "bg-yellow-400"
                                : "bg-red-400"
                            }`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <small className="text-gray-600">{percent}%</small>
                      </td>
                      <td className="p-2 border-b text-center">
                        <button
                          onClick={() => handleSave(task)}
                          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                        >
                          Guardar
                        </button>
                      </td>
                      <td className="p-2 border-b text-center">
                        <Link
                          to={`/editar/${task.id}`}
                          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm"
                        >
                          ✏️ Editar
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
