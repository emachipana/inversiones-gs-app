import styled from "@emotion/styled";
import { COLORS } from "../../styles";

export const FlexRow = styled.div`
  width: ${({ width }) => width || "100%"};
  display: flex;
  align-items: start;
  justify-content: ${({ justify }) => justify || "space-between"};
  padding: ${({ padding }) => padding || 0};
  gap: ${({ gap }) => gap || 1.5}rem;
  flex-wrap: ${({ wrap }) => wrap || "wrap"};

  @media screen and (max-width: 1270px) {
    justify-content: ${({ isMain }) => isMain ? "center" : ""};
  }

  @media screen and (max-width: 550px) {
    flex-wrap: wrap;
  }

  @media screen and (max-width: 500px) {
    padding: 0;
  }
`;

export const Info = styled.div`
  width: ${({ width }) => width || 380}px;
  padding: 1rem;
  background-color: ${({ theme }) => COLORS[theme].white};
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  @media screen and (max-width: 500px) {
    width: 100%;
  }
`;

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 0.2rem;
`;

export const Text = styled.p`
  font-size: ${({ size }) => size || 18}px;
  font-weight: ${({ weight }) => weight || 600};
  color: ${({ theme, color }) => color || COLORS[theme].gray.bold};
`;

export const Badge = styled.div`
  padding: 3px 8px;
  border-radius: 4px;
  background-color: ${({ status }) => status === "pagado" ? "#9FBB73" : (status === "pendiente" ? "#FF9209" : "#E05773")};
  color: white;
  font-size: 14.5px;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

export const Image = styled.img`
  width: 228px;
  height: 220px;
  border-radius: 1rem;
  transition: .2s ease-in;
  cursor: pointer;
  object-fit: cover;

  &:hover {
    transform: scale(1.05);
  }
`;
