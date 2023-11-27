import NavItem from "./NavItem";
import { BackDrop, Container } from "./styles";
import { IoHome, IoCalculator, IoDocumentTextSharp } from "react-icons/io5";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { ImExit } from "react-icons/im";

function Aside({ isOpen, setIsOpen }) {
  return (
    <>
      {
        isOpen && <BackDrop onClick={() => setIsOpen(!isOpen)} />
      }
      <Container
        isOpen={isOpen}
      >
        <NavItem 
          setIsOpen={setIsOpen}
          Icon={IoHome}
          to="/"
        >
          Inicio
        </NavItem>
        <NavItem 
          setIsOpen={setIsOpen}
          Icon={IoCalculator}
          to="/calculadora"
        >
          Calculadora
        </NavItem>
        <NavItem 
          setIsOpen={setIsOpen}
          Icon={IoDocumentTextSharp}
          to="/prestamos"
        >
          Préstamos
        </NavItem>
        <NavItem 
          setIsOpen={setIsOpen}
          Icon={FaMoneyBillTransfer}
          to="/pagos"
        >
          Pagos
        </NavItem>
        <NavItem 
          setIsOpen={setIsOpen}
          Icon={BsFillPersonVcardFill}
          to="/clientes"
        >
          Clientes
        </NavItem>
        <NavItem 
          setIsOpen={setIsOpen}
          Icon={CgProfile}
          to="/perfil"
        >
          Perfil
        </NavItem>
        <NavItem 
          setIsOpen={setIsOpen}
          Icon={ImExit}
          to="/login"
          isToLogout
        >
          Salir
        </NavItem>
      </Container>
    </>
  );
}

export default Aside;
