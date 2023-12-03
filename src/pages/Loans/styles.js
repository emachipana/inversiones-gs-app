import styled from "@emotion/styled";
import { COLORS } from "../../styles";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FlexRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: ${({ justify }) => justify || "space-between"};
  gap: ${({ gap }) => gap || 0}rem;
  flex-wrap: wrap;
  @media screen and (max-width: 840px) {
    ${({ isCard }) => 
      !isCard
      ? `
          justify-content: center;
          gap: 1rem;
        `
      : ""
    }
  }
`;

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 4px;
`;

export const Section = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: ${({ isLoading }) => isLoading ? "center" : "space-between"};
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1.5rem 0.5rem;

  @media screen and (max-width: 1020px) {
    justify-content: center;
  }
`;

export const Card = styled.div`
  width: 320px;
  border-radius: 1rem;
  background-color: ${({ theme }) => COLORS[theme].white};
  cursor: pointer;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, .3);
  transition: .2s linear;
  color: ${({ theme }) => COLORS[theme].gray.bold};
  padding: 0.8rem;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  gap: 1rem;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const Name = styled.div`
  background-color: ${({ theme }) => COLORS[theme].primary};
  width: 100%;
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  gap: 0.1rem;
`;

export const Text = styled.p`
  font-size: ${({ size }) => size || 16}px;
  font-weight: ${({ weight }) => weight || 600};
  color: ${({ theme, color }) => color || COLORS[theme].white};
`;