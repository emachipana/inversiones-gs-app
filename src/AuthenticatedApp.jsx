import Navbar from "./components/Navbar";
import Aside from "./components/Aside";
import { useState } from "react";
import { useTheme } from "./context/theme";
import { Container, Section } from "./styles";
import { Route, Routes } from "react-router-dom";
import Calc from "./pages/Calc";
import Loans from "./pages/Loans";
import { DataProvider } from "./context/data";
import LoanDetail from "./pages/LoanDetail";
import Pandero from "./pages/Pandero";
import PanderoDetail from "./pages/PanderoDetail";
import Profile from "./pages/Profile";

function AuthenticatedApp() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <DataProvider>
      <Container>
        <Navbar 
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
        <Aside 
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
        <Section theme={theme}>
          <Routes>
            <Route index path="/" element={<h1>Inicio</h1>} />
            <Route path="/calculadora" element={<Calc />} />
            <Route path="/prestamos" element={<Loans />} />
            <Route path="/prestamos/:id" element={<LoanDetail />} />
            <Route path="/pandero" element={<Pandero />} />
            <Route path="/pandero/:id" element={<PanderoDetail />} />
            <Route path="/refinanciamiento" element={<h1>refinanciamiento</h1>} />
            <Route path="/perfil" element={<Profile />} />
            <Route path="*" element={<h1>Pagina no encontrada</h1>} />
          </Routes>
        </Section>
      </Container>
    </DataProvider>
  )
}

export default AuthenticatedApp;
