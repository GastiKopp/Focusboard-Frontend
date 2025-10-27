import { useEffect, useState } from "react";
import { getTasks, createTask } from "../services/taskService";

export default function TaskList() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    planned_hours_per_day: 1,
    assigned_days: [] as string[],
  });

  const daysOfWeek = [
    { label: "Lun", value: "monday" },
    { label: "Mar", value: "tuesday" },
    { label: "Mié", value: "wednesday" },
    { label: "Jue", value: "thursday" },
    { label: "Vie", value: "friday" },
    { label: "Sáb", value: "saturday" },
    { label: "Dom", value: "sunday" },
  ];

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = () => {
    getTasks()
      .then(setTasks)
      .catch((err) => {
        console.error("Error al obtener tareas:", err);
      });
  };

  const toggleDay = (day: string) => {
    setForm((prev) => ({
      ...prev,
      assigned_days: prev.assigned_days.includes(day)
        ? prev.assigned_days.filter((d) => d !== day)
        : [...prev.assigned_days, day],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    try {
      await createTask({
        ...form,
        completed_hours: 0, // ✅ agregado para evitar error del backend
      });

      setForm({
        title: "",
        description: "",
        planned_hours_per_day: 1,
        assigned_days: [],
      });

      loadTasks(); // 🔁 Refrescar lista
    } catch (err) {
      console.error("Error al crear tarea:", err);
    }
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Tus tareas</h2>

      {/* 🔼 Formulario para nueva tarea */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 p-4 rounded mb-8 space-y-4"
      >
        <input
          type="text"
          placeholder="Nombre de la tarea"
          className="w-full border p-2 rounded"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          placeholder="Descripción / notas"
          className="w-full border p-2 rounded"
          rows={2}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          type="number"
          min={1}
          className="w-full border p-2 rounded"
          value={form.planned_hours_per_day}
          onChange={(e) =>
            setForm({ ...form, planned_hours_per_day: Number(e.target.value) })
          }
          placeholder="Horas planificadas por día"
        />

        <div className="flex flex-wrap gap-2">
          {daysOfWeek.map((day) => (
            <label key={day.value} className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={form.assigned_days.includes(day.value)}
                onChange={() => toggleDay(day.value)}
              />
              <span>{day.label}</span>
            </label>
          ))}
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Agregar tarea
        </button>
      </form>

      {/* 🔽 Lista de tareas */}
      {tasks.length === 0 ? (
        <p className="text-gray-600 text-center">
          Aún no tenés tareas cargadas.
        </p>
      ) : (
        <ul className="space-y-6">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="border p-4 rounded-lg shadow-sm bg-gray-50"
            >
              <h3 className="text-lg font-bold text-blue-700">{task.title}</h3>

              {task.description && (
                <p className="text-gray-700 mt-1">{task.description}</p>
              )}

              <div className="mt-2 text-sm text-gray-600">
                <p>
                  <strong>Horas/día:</strong> {task.planned_hours_per_day}
                </p>
                <p>
                  <strong>Completadas:</strong> {task.completed_hours ?? 0}
                </p>
              </div>

              <div className="mt-2 flex flex-wrap gap-2">
                {task.assigned_days.map((day: string, index: number) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs"
                  >
                    {day}
                  </span>
                ))}
              </div>

              <div className="mt-4">
                <p className="text-sm mb-1">Progreso:</p>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-green-500 h-4 rounded-full"
                    style={{ width: `${task.progress_percent}%` }}
                  />
                </div>
                <p className="text-sm text-right mt-1 text-green-700">
                  {task.progress_percent.toFixed(1)}%
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
