import styled from "@emotion/styled";
import { COLORS } from "../../styles";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: start;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 1rem;

  @media screen and (max-width: 1150px) {
    justify-content: center;
    align-items: start;
    gap: 2rem;
    padding: 1rem;
  } 
`;

export const Section = styled.section`
  width: ${({ width }) => width || "300px"};
  background-color: ${({ theme }) => COLORS[theme].white};
  border-radius: 1rem;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, .3);
  padding: 1.5rem;

  @media screen and (max-width: 1000px) {
    width: ${({ resWidth }) => resWidth};
  }

  @media screen and (max-width: 560px) {
    width: ${({ resWidth }) => resWidth ? "100%" : ""};
  }
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

export const FlexRow = styled.div`
  width: 100%;
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
  padding: 0 0.5rem;

  @media screen and (max-width: 400px) {
    padding: 0;
    gap: 1.5rem;
  }
`;

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ align }) => align || "start"};
  justify-content: center;
  gap: ${({ gap }) => gap || 0.4}rem;
  color: ${({ theme }) => COLORS[theme].gray.bold}
`;

export const Text = styled.p`
  font-size: ${({ size }) => size || 1.1}rem;
  font-weight: ${({ weight }) => weight || 700};
`;
