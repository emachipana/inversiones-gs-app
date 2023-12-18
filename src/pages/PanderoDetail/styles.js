import styled from "@emotion/styled";
import { COLORS } from "../../styles";

export const Card = styled.div`
  background-color: ${({ theme }) => COLORS[theme].white};
  width: 90%;
  margin: auto;
  border-radius: 1rem;
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, .2);
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 1rem;

  @media screen and (max-width: 1000px) {
    width: 100%;
  }
`;

export const Text = styled.p`
  font-size: ${({ size }) => size || "1.65rem"};
  font-weight: ${({ weight }) => weight || 600};
  color: ${({ theme, color }) => color || COLORS[theme].gray.bold};
  line-height: 1.3;
`;

export const FlexRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding: 0 1rem;
  flex-wrap: wrap;

  @media screen and (max-width: 1160px) {
    justify-content: start;
    padding: 0;
    gap: 2rem;
  }
`;

export const FlexColumn = styled.div`
  width: ${({ width }) => width || "fit-content"};
  display: flex;
  flex-direction: column;
  align-items: ${({ align }) => align || "start"};
  gap: ${({ gap }) => gap || 0}rem;
`;

export const Badge = styled.div`
  max-width: 100px;
  border-radius: 0.7rem;
  padding: 4px 9px;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ isDelivered }) => isDelivered ? "#9FBB73" : "#FF9209"};
  white-space: nowrap;
`;

export const Section = styled.div`
  width: 88%;
  margin: auto;

  @media screen and (max-width: 1000px) {
    width: 100%;
  }
`;
