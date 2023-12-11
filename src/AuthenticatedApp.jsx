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
            <Route path="/pandero" element={<h1>Pandero</h1>} />
            <Route path="/clientes" element={<h1>Clientes</h1>} />
            <Route path="/perfil" element={<h1>Perfil</h1>}/>
            <Route path="*" element={<h1>Pagina no encontrada</h1>}/>
          </Routes>
        </Section>
      </Container>
    </DataProvider>
  )
}

export default AuthenticatedApp;
