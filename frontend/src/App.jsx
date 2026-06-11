import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import MyTasks from "./pages/MyTasks";
import AdminDashboard from "./pages/AdminDashboard";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* --- PUBLIC ROUTES --- */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* --- USER ROUTES --- */}
      <Route
        path="/my-tasks"
        element={
          <ProtectedRoute requireAdmin={false}>
            <MyTasks />
          </ProtectedRoute>
        }
      />

      {/* --- ADMIN ROUTES --- */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute requireAdmin={true}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* --- FALLBACK ROUTE --- */}
      {/* If the user types a random URL, send them to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
