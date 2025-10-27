import { useState } from "react";

interface Props {
  initialData?: { name: string; color?: string };
  onSubmit: (data: { name: string; color?: string }) => void;
  loading?: boolean;
}

export default function CategoryForm({ initialData, onSubmit, loading }: Props) {
  const [form, setForm] = useState({
    name: initialData?.name || "",
    color: initialData?.color || "#000000",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name.trim() === "") return alert("El nombre es obligatorio");
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div>
        <label className="block font-medium">Nombre de la categoría *</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Color</label>
        <input
          type="color"
          value={form.color}
          onChange={(e) => setForm({ ...form, color: e.target.value })}
          className="w-16 h-10 p-1 rounded"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        {loading ? "Guardando..." : "Guardar categoría"}
      </button>
    </form>
  );
}
