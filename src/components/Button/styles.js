import styled from "@emotion/styled";
import { COLORS } from "../../styles";

export const Container = styled.button`
  width: ${({ size }) => size === "full" ? "100%" : ""};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ size }) => size === "sm" ? 0.3 : 0.5}rem;
  font-size: ${({ size }) => size === "sm" ? 15 : 17}px;
  font-weight: 500;
  background-color: ${({ color, theme }) => color === "primary" ? COLORS[theme].primary : (color === "danger" ? "#E05773" : COLORS[theme].secondary)};
  color: ${({ color, theme }) => color === "primary" ? COLORS[theme].white : (color === "danger" ? "white" : COLORS[theme].primary)};
  border-radius: 12px;
  padding: ${({ size }) => size === "sm" ? 0.4 : 0.6}rem 1rem;
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
