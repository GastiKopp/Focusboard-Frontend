import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Progress() {
  const data = {
    labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
    datasets: [
      {
        label: "Horas completadas",
        data: [2, 4, 3, 5, 1, 0, 2], // 🔧 esto lo vas a reemplazar con datos reales luego
        backgroundColor: "rgba(59, 130, 246, 0.6)",
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Progreso semanal (ejemplo)",
      },
    },
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Tu progreso 📈</h1>
      <Bar data={data} options={options} />
    </div>
  );
}
