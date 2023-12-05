import { useTheme } from "../../context/theme";
import { Container } from "./styles";

function Button({ children, Icon, ...args }) {
  const { theme } = useTheme();

  return (
    <Container
      theme={theme}
      {...args}
    >
      { Icon && <Icon size={20} />}
      { children }
    </Container>
  );
}

export default Button;
