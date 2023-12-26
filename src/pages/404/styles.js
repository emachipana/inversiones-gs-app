import styled from "@emotion/styled";
import { COLORS } from "../../styles";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 1rem;
  background-color: ${({ theme }) => COLORS[theme].white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0rem;
`;

export const Text = styled.p`
  font-size: ${({ size }) => size || 2}rem;
  font-weight: ${({ weight }) => weight || 700};
  color: ${({ theme }) => COLORS[theme].gray.bold};
  text-align: center;
`;

export const Section = styled.section`
  align-self: center;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 0 1.5rem 0;
`;
