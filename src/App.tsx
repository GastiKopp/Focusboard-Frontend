import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateTask from "./pages/CreateTask";
import CreateCategory from "./pages/CreateCategory";
import EditTask from "./pages/EditTask";
import PrivateRoute from "./components/PrivateRoute";
import Sidebar from "./components/Sidebar";
import Progress from "./pages/Progress";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50 text-gray-900">
        {/* 🍔 Menú lateral visible solo en rutas privadas */}
        <PrivateRoute>
          <Sidebar />
        </PrivateRoute>

        <div className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* ✅ Rutas protegidas */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/nueva"
              element={
                <PrivateRoute>
                  <CreateTask />
                </PrivateRoute>
              }
            />
            <Route
              path="/nueva-categoria"
              element={
                <PrivateRoute>
                  <CreateCategory />
                </PrivateRoute>
              }
            />
            <Route
              path="/editar/:id"
              element={
                <PrivateRoute>
                  <EditTask />
                </PrivateRoute>
              }
            />
            <Route
              path="/progreso"
              element={
                <PrivateRoute>
                  <Progress />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
