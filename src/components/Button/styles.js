import styled from "@emotion/styled";
import { COLORS } from "../../styles";

export const Container = styled.button`
  width: ${({ size }) => size === "full" ? "100%" : ""};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 17px;
  font-weight: 500;
  background-color: ${({ color }) => color === "primary" ? COLORS.primary : COLORS.secondary};
  color: ${({ color }) => color === "primary" ? "white" : COLORS.primary};
  border-radius: 12px;
  padding: 0.6rem 1rem;
  cursor: pointer;
  transition: .2s linear;
  border: none;
  outline: none;

  &:hover {
    filter:brightness(0.8);
  }

  &:disabled {
    filter:brightness(0.7);
    cursor: not-allowed;
  }
`;
