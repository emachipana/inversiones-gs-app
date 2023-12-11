import { ClipLoader } from "react-spinners";
import { useTheme } from "../../context/theme";
import { Container } from "./styles";
import { COLORS } from "../../styles";

function Loader({ isMain }) {
  const { theme } = useTheme();

  return (
    <Container 
      theme={theme}
      isMain={isMain}
    >
      <ClipLoader 
        size={isMain ? 90 : 60}
        color={COLORS[theme].primary}
      />
    </Container>
  );
}

export default Loader;
