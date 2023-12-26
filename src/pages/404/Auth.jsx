import { TbError404 } from "react-icons/tb";
import { useTheme } from "../../context/theme";
import { Section, Text } from "./styles";
import { COLORS } from "../../styles";

function Auth() {
  const { theme } = useTheme();

  return (
    <Section>
      <TbError404
        color={COLORS[theme].gray.bold}
        size={150}
      />
      <Text
        theme={theme}
      >
        Página no encontrada
      </Text>
    </Section>
  )
}

export default Auth;
