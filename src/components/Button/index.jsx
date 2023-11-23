import { Container } from "./styles";

function Button({ children, Icon, ...args }) {
  return (
    <Container
      {...args}
    >
      { Icon && <Icon />}
      { children }
    </Container>
  );
}

export default Button;
