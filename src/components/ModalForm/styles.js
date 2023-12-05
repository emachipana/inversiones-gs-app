import styled from "@emotion/styled";
import { COLORS } from "../../styles";
import { css } from "@emotion/react";

export const Background = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => COLORS[theme].white};
  padding: 1rem;
  color: ${({ theme }) => COLORS[theme].gray.bold};
  border-radius: 6.5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  position: relative;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: ${({ theme }) => COLORS[theme].primary};
`;

export const IconStyle = css`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  font-size: 1.8rem;
  cursor: pointer;
`;

export const Form = styled.form`
  width: 100%;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
