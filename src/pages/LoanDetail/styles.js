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
  padding: 2px 7px;
  border-radius: 4px;
  background-color: ${({ status }) => status === "pagado" ? "#9FBB73" : (status === "pendiente" ? "#FF9209" : "#E05773")};
  color: white;
  font-size: 14px;
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

// pays
export const PaysContainer = styled.div`
  width: 100%;
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;
`;

export const Divider = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  @media screen and (max-width: 1330px) {
    gap: 2rem;
  }
`;

export const PaysSection = styled.section`
  height: 100%;
  width: 50%;
  padding: 1rem;
  border-top: 2px solid ${({ theme }) => COLORS[theme].gray.bold};
  border-bottom: 2px solid ${({ theme }) => COLORS[theme].gray.bold};
  border-left: 2px solid ${({ theme }) => COLORS[theme].gray.bold};
  border-right: ${({ theme, isLeft }) => isLeft ? "none" : "2px solid" + COLORS[theme].gray.bold};
  border-top-left-radius: ${({ isLeft }) => isLeft ? "1rem" : 0};
  border-bottom-left-radius: ${({ isLeft }) => isLeft ? "1rem" : 0};
  border-top-right-radius: ${({ isLeft }) => isLeft ? 0 : "1rem"};
  border-bottom-right-radius: ${({ isLeft }) => isLeft ? 0 : "1rem"};
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 1rem;

  @media screen and (max-width: 1330px) {
    width: 100%;
    height: fit-content;
    border: 2px solid ${({ theme }) => COLORS[theme].gray.bold};
    border-radius: 1rem;
  }
`;
