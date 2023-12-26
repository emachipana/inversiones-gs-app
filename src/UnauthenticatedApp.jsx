import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import NotFound from "./pages/404";

function UnauthenticatedApp() {
  return (
    <Routes>
      <Route index path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />}/>
    </Routes>
  )
}

export default UnauthenticatedApp;
