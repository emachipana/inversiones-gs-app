import Button from "../../components/Button";
import { useTheme } from "../../context/theme";
import { COLORS } from "../../styles";
import { Container, Text } from "./styles";
import { TbError404 } from "react-icons/tb";
import { IoPerson } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function Unauth() {
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <Container
      theme={theme}
    >
      <TbError404 
        color={COLORS[theme].gray.bold}
        size={150}
      />
      <Text
        theme={theme}
      >
        Página no encontrada
      </Text>
      <Button
        Icon={IoPerson}
        color="primary"
        style={{margin: "2rem 0"}}
        onClick={() => navigate("/login")}
      >
        Iniciar sesión
      </Button>
    </Container>
  )
}

export default Unauth;
