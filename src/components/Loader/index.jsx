import { ClipLoader } from "react-spinners";
import { useTheme } from "../../context/theme";
import { Container } from "./styles";
import { COLORS } from "../../styles";

function Loader() {
  const { theme } = useTheme();

  return (
    <Container theme={theme}>
      <ClipLoader 
        size={90}
        color={COLORS[theme].primary}
      />
    </Container>
  );
}

export default Loader;
