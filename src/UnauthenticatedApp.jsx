import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";

function UnauthenticatedApp() {
  return (
    <Routes>
      <Route index path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<h1>Pagina no encontrada</h1>}/>
    </Routes>
  )
}

export default UnauthenticatedApp;
