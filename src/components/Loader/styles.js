import styled from "@emotion/styled";
import { COLORS } from "../../styles";

export const Container = styled.div`
  position: absolute;
  z-index: 80;
  background-color: ${({ theme, isMain }) => isMain ? COLORS[theme].white : "transparent"};
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;
