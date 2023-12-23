import styled from "@emotion/styled";
import { COLORS } from "../../styles";

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Form = styled.form`
  width: ${({ width }) => width || 340}px;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, .2);
  background-color: ${({ theme }) => COLORS[theme].white};
  margin: 0 0 2rem 0;
`;
