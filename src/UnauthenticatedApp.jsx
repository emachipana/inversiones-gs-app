import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/auth";
import Login from "./pages/Login";

function UnauthenticatedApp() {
  const { isLoading } = useAuth();

  return (
    isLoading
    ? "Cargando..."
    : <Routes>
        <Route index path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
      </Routes>
  )
}

export default UnauthenticatedApp;
