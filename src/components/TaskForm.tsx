import { useState, useEffect } from "react";
import type { TaskData } from "../services/taskService";
import { getCategories } from "../services/categoryService";
import type { Category } from "../services/categoryService";

interface Props {
  initialData?: TaskData;
  onSubmit: (data: TaskData) => void;
  loading?: boolean;
}

export default function TaskForm({ initialData, onSubmit, loading }: Props) {
  const [formData, setFormData] = useState<TaskData>({
    title: "",
    description: "",
    planned_hours_per_day: 1,
    assigned_days: [],
    completed_hours: 0,
    start_time: "",
    end_time: "",
    categoryId: undefined,
    ...initialData,
  });

  const [timeError, setTimeError] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => alert("Error al cargar categorías"));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Caso especial: categoryId puede ser "" => null/undefined
    if (name === "categoryId") {
      setFormData((prev) => ({
        ...prev,
        categoryId: value === "" ? null : Number(value),
      }));
      return;
    }

    const numericFields = ["planned_hours_per_day", "completed_hours"];
    const newData = {
      ...formData,
      [name]: numericFields.includes(name) ? Number(value) : value,
    };

    if (newData.start_time && newData.end_time) {
      setTimeError(newData.start_time >= newData.end_time);
    }

    setFormData(newData);
  };

  const handleDaysChange = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      assigned_days: prev.assigned_days.includes(day)
        ? prev.assigned_days.filter((d) => d !== day)
        : [...prev.assigned_days, day],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!timeError) onSubmit(formData);
  };

  const weekdays = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
      <div>
        <label className="block font-medium">Título *</label>
        <input
          type="text"
          name="title"
          required
          value={formData.title}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Descripción</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Horas planificadas por día *</label>
        <input
          type="number"
          name="planned_hours_per_day"
          required
          min={1}
          value={formData.planned_hours_per_day}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Horas completadas</label>
        <input
          type="number"
          name="completed_hours"
          min={0}
          value={formData.completed_hours}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Días asignados *</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {weekdays.map((day) => (
            <label key={day} className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={formData.assigned_days.includes(day)}
                onChange={() => handleDaysChange(day)}
              />
              {day}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block font-medium">Hora de inicio</label>
        <input
          type="time"
          name="start_time"
          value={formData.start_time || ""}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Hora de finalización</label>
        <input
          type="time"
          name="end_time"
          value={formData.end_time || ""}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        {timeError && (
          <p className="text-red-600 text-sm mt-1">
            La hora de inicio debe ser anterior a la hora de finalización.
          </p>
        )}
      </div>

      <div>
        <label className="block font-medium">Categoría</label>
        <select
          name="categoryId"
          value={formData.categoryId ?? ""} // "" para "Sin categoría"
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Sin categoría</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={loading || timeError}
        className={`bg-blue-600 text-white px-4 py-2 rounded transition ${
          loading || timeError ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
        }`}
      >
        {loading ? "Guardando..." : "Guardar tarea"}
      </button>
    </form>
  );
}
