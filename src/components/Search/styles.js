import styled from "@emotion/styled";
import { COLORS } from "../../styles";

export const Container = styled.div`
  width: 280px;
  background-color: ${({ theme }) => COLORS[theme].white};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  border-radius: 1rem;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, .3);
  padding: 0.6rem;
  color: ${({ theme }) => COLORS[theme].gray.bold};
`;

export const Input = styled.input`
  background-color: transparent;
  border: none;
  outline: none;
  width: 100%;
  color: ${({ theme }) => COLORS[theme].gray.bold};
`;
