import Navbar from "./components/Navbar";
import Aside from "./components/Aside";
import { useState } from "react";
import { useTheme } from "./context/theme";
import { Container, Section } from "./styles";
import { Route, Routes } from "react-router-dom";
import Calc from "./pages/Calc";

function AuthenticatedApp() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();

  return (
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
          <Route path="/calculadora" element={<Calc />} />
        </Routes>
      </Section>
    </Container>
  )
}

export default AuthenticatedApp;
